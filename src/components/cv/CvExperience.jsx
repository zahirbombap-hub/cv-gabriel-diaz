import { cvData } from "./cvData.js";
import { useReveal } from "../../hooks/useReveal.js";

export function CvExperience() {
  const [ref, visible] = useReveal();
  const revealClass = visible ? "is-visible" : "";
  const { experience } = cvData;

  return (
    <section ref={ref} className={"cv-reveal " + revealClass + " py-12 md:py-20"}>
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
          02 · Experiencia
        </p>
        <h2 className="mb-10 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Trilliant Networks Colombia
        </h2>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px md:left-[11px]"
            style={{ background: "var(--border-subtle)" }}
          />

          {experience.map((job) => (
            <article key={job.company} className="relative pl-8 md:pl-12">
              <div
                aria-hidden="true"
                className="absolute left-0 top-3 h-4 w-4 rounded-full border-4 md:h-6 md:w-6"
                style={{
                  background: "var(--bg-base)",
                  borderColor: "var(--accent-primary)",
                }}
              />

              <div className="cv-card p-6 md:p-8">
                <header className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-primary md:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-accent">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-text-muted">{job.period}</p>
                    <p className="text-xs text-text-muted">{job.location}</p>
                  </div>
                </header>

                <ul className="mt-6 space-y-3">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-text-secondary md:text-base">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span key={t} className="cv-tag font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
