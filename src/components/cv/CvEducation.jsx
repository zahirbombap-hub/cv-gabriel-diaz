import { cvData } from "./cvData.js";
import { useReveal } from "../../hooks/useReveal.js";

export function CvEducation() {
  const [ref, visible] = useReveal();
  const revealClass = visible ? "is-visible" : "";
  const { education } = cvData;

  return (
    <section ref={ref} className={"cv-reveal " + revealClass + " py-12 md:py-20"}>
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
          05 · Educación
        </p>
        <h2 className="mb-10 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Formación
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((edu) => (
            <article key={edu.institution + edu.title} className="cv-card p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-text-muted">
                {edu.period}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-text-primary md:text-xl">
                {edu.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-accent">{edu.institution}</p>
              <p className="mt-1 text-xs text-text-muted">{edu.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
