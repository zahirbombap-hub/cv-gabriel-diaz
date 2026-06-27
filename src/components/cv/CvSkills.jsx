import { motion } from 'framer-motion';
import { cvData } from './cvData.js';
import { BlurFade } from '../ui/blur-fade.jsx';
import { MagicCard } from '../ui/magic-card.jsx';
import { BorderBeam } from '../ui/border-beam.jsx';

export function CvSkills() {
  const { skills } = cvData;

  return (
    <BlurFade inView inViewMargin="-80px" className="py-12 md:py-20">
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <BlurFade inView delay={0.05}>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
            03 · Habilidades
          </p>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Stack técnico
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <p className="mb-10 max-w-2xl text-base text-text-secondary md:text-lg">
            Niveles basados en uso real en producción y proyectos personales.
            El bloque destacado es donde más estoy invirtiendo energía hoy.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, idx) => (
            <BlurFade key={group.category} inView delay={0.2 + idx * 0.08}>
              <MagicCard
                className="relative overflow-hidden rounded-xl p-6"
                gradientColor="rgba(var(--accent-primary-rgb), 0.08)"
                gradientFrom="var(--accent-primary)"
                gradientTo="var(--accent-glow)"
                gradientSize={250}
                gradientOpacity={0.12}
              >
                {group.featured && (
                  <BorderBeam
                    size={120}
                    duration={6}
                    colorFrom="var(--accent-primary)"
                    colorTo="var(--accent-glow)"
                    borderWidth={1}
                  />
                )}
                <header className="relative mb-5 flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {group.category}
                  </h3>
                  {group.featured && (
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="cv-tag-glow text-[10px] uppercase tracking-wider"
                    >
                      Foco
                    </motion.span>
                  )}
                </header>

                <ul className="relative space-y-4">
                  {group.items.map((skill) => (
                    <li key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium text-text-primary">{skill.name}</span>
                        <span className="font-mono text-xs text-text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-code">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.level + '%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                          style={{
                            background: group.featured
                              ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-glow))'
                              : 'var(--accent-primary)',
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}
