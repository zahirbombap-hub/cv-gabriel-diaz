import { motion } from 'framer-motion';
import { cvData } from './cvData.js';
import { BlurFade } from '../ui/blur-fade.jsx';
import { CvProjectCard } from './CvProjectCard.jsx';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function CvProjects() {
  const { projects } = cvData;
  const featured = projects.filter((p) => p.featured);
  const bonus = projects.filter((p) => !p.featured);

  return (
    <BlurFade inView inViewMargin="-80px" id="cv-proyectos" className="py-12 md:py-20">
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <BlurFade inView delay={0.05}>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
            Proyectos
          </p>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Lo que he construido
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <p className="mb-10 max-w-2xl text-base text-text-secondary md:text-lg">
            Selección con énfasis en automatización e IA. Los marcados son {' '}
            <span className="font-semibold text-glow">IA / Automatización</span>;
            los demás son mini-proyectos personales.
          </p>
        </BlurFade>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((project) => (
            <motion.div key={project.title} variants={staggerItem}>
              <CvProjectCard project={project} featured />
            </motion.div>
          ))}
        </motion.div>

        <div>
          <BlurFade inView delay={0.1}>
            <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-text-secondary">
              Mini-proyectos personales
            </h3>
          </BlurFade>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {bonus.map((project) => (
              <motion.div key={project.title} variants={staggerItem}>
                <CvProjectCard project={project} compact />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </BlurFade>
  );
}
