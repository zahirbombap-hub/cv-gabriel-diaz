import { motion } from 'framer-motion';
import { cvData } from './cvData.js';
import { BlurFade } from '../ui/blur-fade.jsx';
import { MagicCard } from '../ui/magic-card.jsx';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function CvEducation() {
  const { education } = cvData;

  return (
    <BlurFade inView inViewMargin="-80px" className="py-12 md:py-20">
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <BlurFade inView delay={0.05}>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
            05 · Educación
          </p>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <h2 className="mb-10 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Formación
          </h2>
        </BlurFade>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {education.map((edu) => (
            <motion.div key={edu.institution + edu.title} variants={staggerItem}>
              <MagicCard
                className="rounded-xl p-6"
                gradientColor="rgba(var(--accent-primary-rgb), 0.06)"
                gradientFrom="var(--accent-primary)"
                gradientTo="var(--accent-glow)"
                gradientSize={200}
                gradientOpacity={0.1}
              >
                <p className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  {edu.period}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-text-primary md:text-xl">
                  {edu.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-accent">{edu.institution}</p>
                <p className="mt-1 text-xs text-text-muted">{edu.location}</p>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </BlurFade>
  );
}
