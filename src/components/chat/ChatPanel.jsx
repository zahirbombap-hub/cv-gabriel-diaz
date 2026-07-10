import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  'Que sabe hacer Gabriel?',
  'Cual es su experiencia?',
  'Quiero contactarlo',
  'Hablame de sus proyectos',
  'Que skills tiene?',
];

export function ChatPanel({ messages, input, setInput, isLoading, append, clearHistory, stopGenerating, onClose }) {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) setShowSuggestions(false);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    append(trimmed);
  };

  const handleSuggestion = (text) => {
    append(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border shadow-2xl md:bottom-8 md:right-8 md:w-[400px] md:h-[520px]"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderColor: 'var(--border-subtle)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
        left: '0.75rem',
        right: '0.75rem',
        bottom: '5.5rem',
        maxHeight: 'calc(100vh - 8rem)',
      }}
    >
      <header
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" className="h-5 w-5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            GabrielBot AI
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            En línea
          </span>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs transition-colors hover:bg-surface"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Limpiar chat"
              title="Limpiar chat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs transition-colors hover:bg-surface"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollBehavior: 'smooth' }}>
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" className="mb-4 h-12 w-12" style={{ opacity: 0.5 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p className="mb-1 text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                Hola! Soy GabrielBot
              </p>
              <p className="max-w-xs text-xs" style={{ color: 'var(--text-muted)' }}>
                Pregúntame sobre Gabriel, sus proyectos, habilidades o cómo contactarlo.
              </p>
            </motion.div>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-md'
                      : 'rounded-bl-md'
                  }`}
                  style={{
                    backgroundColor: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-surface)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border-subtle)',
                  }}
                >
                  {msg.content || (msg.role === 'assistant' ? (
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '0ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '150ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '300ms' }} />
                    </span>
                  ) : null)}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSuggestion(s)}
                disabled={isLoading}
                className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: 'rgba(var(--accent-primary-rgb), 0.1)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(var(--accent-primary-rgb), 0.25)',
                }}
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t px-4 py-3"
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          disabled={isLoading}
          className="flex-1 rounded-xl border bg-base px-3 py-2 text-sm outline-none transition-all"
          style={{
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent-primary)';
            e.target.style.boxShadow = '0 0 0 2px rgba(var(--accent-primary-rgb), 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-subtle)';
            e.target.style.boxShadow = 'none';
          }}
        />

        {isLoading ? (
          <button
            type="button"
            onClick={stopGenerating}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent-warm)' }}
            aria-label="Detener"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
            style={{
              background: !input.trim()
                ? 'var(--text-muted)'
                : 'linear-gradient(135deg, var(--accent-primary), var(--accent-glow))',
            }}
            aria-label="Enviar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        )}
      </form>
    </motion.div>
  );
}
