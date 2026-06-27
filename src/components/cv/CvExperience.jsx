import { motion } from 'framer-motion';
import { cvData } from './cvData.js';
import { BlurFade } from '../ui/blur-fade.jsx';
import { BorderBeam } from '../ui/border-beam.jsx';

export function CvExperience() {
  const { experience } = cvData;

  return (
    <BlurFade inView inViewMargin="-80px" className="py-12 md:py-20">
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <BlurFade inView delay={0.05}>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
            Experiencia
          </p>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <h2 className="mb-10 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Trilliant Networks Colombia
          </h2>
        </BlurFade>

        <div className="relative">
          <motion.div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px md:left-[11px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ background: 'var(--border-subtle)', transformOrigin: 'top' }}
          />

          {experience.map((job) => (
            <article key={job.company} className="relative pl-8 md:pl-12">
              <motion.div
                aria-hidden="true"
                className="absolute left-0 top-3 h-4 w-4 rounded-full border-4 md:h-6 md:w-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.2 }}
                style={{
                  background: 'var(--bg-base)',
                  borderColor: 'var(--accent-primary)',
                }}
              />

              <div className="cv-card relative overflow-hidden p-6 md:p-8">
                <BorderBeam
                  size={150}
                  duration={8}
                  colorFrom="var(--accent-primary)"
                  colorTo="var(--accent-glow)"
                  borderWidth={1}
                />
                <header className="relative flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-primary md:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-gray-700 dark:text-gray-300">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-text-muted">{job.period}</p>
                    <p className="text-xs text-text-muted">{job.location}</p>
                  </div>
                </header>

                <ul className="relative mt-6 space-y-3">
                  {job.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                      className="flex gap-3 text-sm leading-relaxed text-gray-950 dark:text-gray-100 font-medium"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="relative mt-6 flex flex-wrap gap-2"
                >
                  {job.tags.map((t) => (
                    <span key={t} className="cv-tag font-mono">{t}</span>
                  ))}
                </motion.div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}
