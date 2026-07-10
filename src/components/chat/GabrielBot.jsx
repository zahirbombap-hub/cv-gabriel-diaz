import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useChatLogic } from '../../hooks/useChatLogic.js';
import { BotButton } from './BotButton.jsx';
import { ChatPanel } from './ChatPanel.jsx';

export function GabrielBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, setInput, isLoading, append, clearHistory, stopGenerating } = useChatLogic();

  return (
    <>
      <BotButton onClick={() => setIsOpen((v) => !v)} isOpen={isOpen} />

      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            append={append}
            clearHistory={clearHistory}
            stopGenerating={stopGenerating}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
