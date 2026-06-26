export function CvProjectCard({ project, featured = false, compact = false }) {
  const badgeClass =
    project.badgeKind === "glow" ? "cv-tag-glow" :
    project.badgeKind === "warm" ? "cv-tag-warm" :
    "cv-tag";

  const hasCtas = project.repo || project.demo;
  const cardClass =
    "cv-card group flex h-full flex-col " +
    (featured ? "p-6 md:p-7" : "p-4 md:p-5");

  return (
    <article className={cardClass}>
      {featured && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className={badgeClass + " text-[10px] uppercase tracking-wider"}>
            {project.badge}
          </span>
          {project.context && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
              {project.context}
            </span>
          )}
        </div>
      )}

      <h3
        className={
          "mb-2 font-display font-bold text-text-primary " +
          (featured ? "text-xl md:text-2xl" : "text-base")
        }
      >
        {project.title}
      </h3>

      {featured && (
        <p className="mb-4 text-sm leading-relaxed text-text-secondary md:text-base">
          {project.description}
        </p>
      )}

      <div className={"flex flex-wrap gap-1.5 " + (featured ? "mb-4" : "")}>
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
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-focusable inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              Ver
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-focusable inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              Código
            </a>
          )}
        </div>
      )}

      {!featured && (
        <span className={badgeClass + " mt-3 self-start text-[10px] uppercase tracking-wider"}>
          {project.badge}
        </span>
      )}
    </article>
  );
}
