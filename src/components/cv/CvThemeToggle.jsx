import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../../hooks/useThemeMode.js';

const spring = { type: 'spring', stiffness: 300, damping: 20 };

export function CvThemeToggle({ className = '' }) {
  const { theme, toggle } = useThemeMode();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-pressed={isDark}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      transition={spring}
      className={
        'cv-focusable group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary shadow-card transition-colors duration-200 hover:border-border-strong hover:bg-elevated hover:shadow-card-hover ' +
        className
      }
    >
      <span aria-hidden="true" className="relative block h-5 w-5">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 h-5 w-5"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 h-5 w-5"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
