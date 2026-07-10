import { motion } from 'framer-motion';
import { OptimizedImage } from '../OptimizedImage.jsx';
import { cvData } from './cvData.js';
import { BlurFade } from '../ui/blur-fade.jsx';
import { ShimmerButton } from '../ui/shimmer-button.jsx';
import { Particles } from '../ui/particles.jsx';
import { useTypingEffect } from '../../hooks/useTypingEffect.js';

const spring = { type: 'spring', stiffness: 300, damping: 20 };

const stackTags = ['React', 'Python', 'LLMs', 'ZeroClaw', 'Tailwind', 'Node.js'];

export function CvHero() {
  const { profile } = cvData;
  const { displayed: taglineDisplayed, done: taglineDone } = useTypingEffect(profile.tagline, 22);

  const scrollToProjects = () => {
    const el = document.getElementById('cv-proyectos');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={30}
        color="#7C9CFF"
        size={0.3}
        staticity={30}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 400px at 80% 0%, rgba(var(--accent-primary-rgb), 0.18), transparent 60%)',
        }}
      />

      <div className="mx-auto max-w-cv px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[140px_1fr] md:gap-12 lg:grid-cols-[168px_1fr] lg:gap-16">
          <BlurFade className="relative mx-auto md:mx-0" direction="up" offset={10} delay={0.1}>
            <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={spring}>
              <OptimizedImage
                src={profile.photoFallback}
                srcSet={`${profile.photoBase} 1x, ${profile.photoBase2x} 2x`}
                webpSrcSet={`${profile.photoBase} 1x, ${profile.photoBase2x} 2x`}
                alt={`Foto de ${profile.fullName}`}
                width={168}
                height={245}
                sizes="(min-width: 1024px) 168px, (min-width: 768px) 140px, 168px"
                priority="high"
                lazy={false}
                className="relative z-10 rounded-2xl border border-border-subtle shadow-card-hover"
              />
              <motion.div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-3xl opacity-60 blur-2xl"
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(var(--accent-primary-rgb), 0.55), rgba(var(--accent-warm-rgb), 0.4))',
                }}
              />
            </motion.div>
          </BlurFade>

          <div className="text-center md:text-left">
            <BlurFade direction="up" offset={10} delay={0.2}>
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-success-cv"
              >
                <motion.span
                  className="relative inline-flex"
                >
                  <motion.span
                    className="h-3 w-3 rounded-full bg-success-cv"
                    animate={{
                      opacity: [1, 0.4, 1],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      boxShadow: '0 0 6px var(--success), 0 0 12px color-mix(in srgb, var(--success) 50%, transparent)',
                    }}
                  />
                </motion.span>
                Disponible para contrato
              </motion.p>
            </BlurFade>

            <BlurFade direction="up" offset={10} delay={0.3}>
              <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
                {profile.shortName}
              </h1>
            </BlurFade>

            <BlurFade direction="up" offset={10} delay={0.4}>
              <p className="mt-3 font-display text-lg text-text-secondary md:text-xl">
                {profile.role} · {profile.company}
              </p>
            </BlurFade>

            <BlurFade direction="up" offset={10} delay={0.5}>
              <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
                {taglineDisplayed}
                {!taglineDone && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                    className="ml-0.5 inline-block h-4 w-0.5 bg-accent"
                  />
                )}
              </p>
            </BlurFade>

            <BlurFade direction="up" offset={10} delay={0.6}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                <ShimmerButton
                  onClick={scrollToProjects}
                  shimmerColor="rgba(255,255,255,0.7)"
                  background="linear-gradient(135deg, var(--accent-primary), var(--accent-glow))"
                  borderRadius="18px"
                  className="px-6 py-3 text-sm font-semibold"
                >
                  Ver proyectos
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 h-4 w-4">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ShimmerButton>
                <motion.a
                  href={`mailto:${profile.email}`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                  className="cv-focusable inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-border-strong hover:bg-elevated"
                >
                  Contactar
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
                <motion.a
                  href={cvData.cvPdf.es}
                  download
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                  className="cv-focusable inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-elevated px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-border-strong"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  CV
                </motion.a>
              </div>
            </BlurFade>

            <BlurFade direction="up" offset={10} delay={0.7}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                {stackTags.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="cv-tag font-mono cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
