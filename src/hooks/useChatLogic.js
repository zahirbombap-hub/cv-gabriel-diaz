import { useState, useRef, useCallback } from 'react';

const STORAGE_KEY = 'gabrielbot-history';
const MAX_HISTORY = 30;

function getSessionId() {
  let id = sessionStorage.getItem('gb-session');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
    sessionStorage.setItem('gb-session', id);
  }
  return id;
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(-MAX_HISTORY);
  } catch {
    return [];
  }
}

function saveHistory(messages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
  } catch {}
}

export function useChatLogic() {
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const append = useCallback(async (content) => {
    const userMsg = { role: 'user', content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        const content = assistantContent;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content };
          return copy;
        });
      }

      setMessages((prev) => {
        saveHistory(prev);
        return prev;
      });

      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: getSessionId(),
          messageCount: messages.length + 2,
          userMessage: content.slice(0, 200),
          botResponseLength: assistantContent.length,
        }),
      }).catch(() => {});
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message);
      setMessages((prev) => {
        const copy = [...prev];
        copy.push({
          role: 'assistant',
          content: `Lo siento, ocurrió un error: ${err.message}. Intenta de nuevo.`,
        });
        saveHistory(copy);
        return copy;
      });
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [messages]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const stopGenerating = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    append,
    clearHistory,
    stopGenerating,
  };
}
