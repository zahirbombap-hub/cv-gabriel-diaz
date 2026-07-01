import { motion } from 'framer-motion';
import { CvThemeToggle } from './CvThemeToggle.jsx';

const navLinks = [
  { label: 'Experiencia', href: '#cv-experiencia' },
  { label: 'Proyectos', href: '#cv-proyectos' },
  { label: 'GitHub', href: '#cv-github' },
  { label: 'Contacto', href: '#cv-contacto' },
];

function scrollTo(href) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function CvHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-base backdrop-blur-xl">
      <div className="mx-auto flex max-w-cv items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-6">
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-display text-xl font-bold text-gray-900 dark:text-white outline-none"
            aria-label="Ir al inicio"
          >
            GDDG
          </motion.a>

          <nav className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="cv-focusable rounded-lg px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary hover:bg-surface/50"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <motion.a
            href="https://donprueba.online"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cv-focusable hidden rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-mono font-semibold text-text-muted transition-colors duration-200 hover:border-border-strong hover:text-text-primary sm:inline-flex"
          >
            Don Prueba
          </motion.a>
          <CvThemeToggle />
        </div>
      </div>
    </header>
  );
}
