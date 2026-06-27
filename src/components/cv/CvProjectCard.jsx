import { motion } from 'framer-motion';
import { MagicCard } from '../ui/magic-card.jsx';

export function CvProjectCard({ project, featured = false, compact = false }) {
  const badgeClass =
    project.badgeKind === 'glow' ? 'cv-tag-glow' :
    project.badgeKind === 'warm' ? 'cv-tag-warm' :
    'cv-tag';

  const hasCtas = project.repo || project.demo;

  return (
    <MagicCard
      className="flex h-full flex-col rounded-xl p-6 md:p-7"
      gradientColor="rgba(var(--accent-primary-rgb), 0.06)"
      gradientFrom="var(--accent-primary)"
      gradientTo="var(--accent-glow)"
      gradientSize={250}
      gradientOpacity={0.1}
    >
      {featured && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            className={badgeClass + ' text-[10px] uppercase tracking-wider'}
          >
            {project.badge}
          </motion.span>
          {project.context && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
              {project.context}
            </span>
          )}
        </div>
      )}

      <h3
        className={
          'mb-2 font-display font-bold text-text-primary ' +
          (featured ? 'text-xl md:text-2xl' : 'text-base')
        }
      >
        {project.title}
      </h3>

      {featured && (
        <p className="mb-4 text-sm leading-relaxed text-text-secondary md:text-base">
          {project.description}
        </p>
      )}

      <div className={'flex flex-wrap gap-1.5 ' + (featured ? 'mb-4' : '')}>
        {project.tags.map((t) => (
          <span key={t} className="cv-tag font-mono text-[10px]">
            {t}
          </span>
        ))}
      </div>

      {featured && <div className="flex-1" />}

      {hasCtas && (
        <div className="flex gap-4 pt-2">
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              className="cv-focusable inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              Ver
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          )}
          {project.repo && (
            <motion.a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              className="cv-focusable inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              Código
            </motion.a>
          )}
        </div>
      )}

      {!featured && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={badgeClass + ' mt-3 self-start text-[10px] uppercase tracking-wider'}
        >
          {project.badge}
        </motion.span>
      )}
    </MagicCard>
  );
}
