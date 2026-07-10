import { motion } from 'framer-motion';

export function BotButton({ onClick, isOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg md:bottom-8 md:right-8 md:h-16 md:w-16"
      style={{
        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-glow))',
        boxShadow: '0 4px 20px rgba(var(--accent-primary-rgb), 0.4)',
      }}
      aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
    >
      {isOpen ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="h-6 w-6">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )}
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center"
      >
        <span className="h-3 w-3 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 6px #10b981' }} />
      </motion.span>
    </motion.button>
  );
}
