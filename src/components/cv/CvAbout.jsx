import { motion } from 'framer-motion';
import { cvData } from './cvData.js';
import { BlurFade } from '../ui/blur-fade.jsx';
import { NumberTicker } from '../ui/number-ticker.jsx';

const spring = { type: 'spring', stiffness: 300, damping: 20 };

const ICONS = {
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
};

const newStats = [
  { label: 'Experiencia', value: '+4 años en el rubro', icon: 'briefcase', num: 4, prefix: '+' },
  { label: 'Proyectos', value: '10+ proyectos', icon: 'code', num: 10, suffix: '+' },
  { label: 'Título', value: 'Tecnólogo en Desarrollo de Software', icon: 'graduation', num: null },
  { label: 'Estudio actual', value: '6.º semestre de Ing. de Software', icon: 'book', num: 6, prefix: '' },
];

export function CvAbout() {
  const { about } = cvData;

  return (
    <BlurFade inView inViewMargin="-80px" className="py-12 md:py-20">
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Sobre mí
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Construyo sistemas que sustituyen tareas repetitivas
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
              {about.map((p, i) => (
                <BlurFade key={i} inView delay={0.2 + i * 0.1} direction="up" offset={10}>
                  <p>{p}</p>
                </BlurFade>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {newStats.map((s) => (
              <BlurFade key={s.label} inView delay={0.2 + newStats.indexOf(s) * 0.08}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02, transition: spring }}
                  className="cv-card flex h-full items-center gap-3 p-4"
                >
                  <motion.div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-elevated text-accent"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={spring}
                  >
                    {ICONS[s.icon]}
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {s.label}
                    </p>
                    <p className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">
                      {s.num != null ? (
                        <>
                          {s.prefix || ''}
                          <NumberTicker value={s.num} className="inline" />
                          {s.suffix || ''}
                        </>
                      ) : (
                        s.value
                      )}
                    </p>
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </BlurFade>
  );
}
