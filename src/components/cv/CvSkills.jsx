import { cvData } from "./cvData.js";
import { useReveal } from "../../hooks/useReveal.js";

export function CvSkills() {
  const [ref, visible] = useReveal();
  const revealClass = visible ? "is-visible" : "";
  const { skills } = cvData;

  return (
    <section ref={ref} className={"cv-reveal " + revealClass + " py-12 md:py-20"}>
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
          03 · Habilidades
        </p>
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Stack técnico
        </h2>
        <p className="mb-10 max-w-2xl text-base text-text-secondary md:text-lg">
          Niveles basados en uso real en producción y proyectos personales.
          El bloque destacado es donde más estoy invirtiendo energía hoy.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const featuredStyle = group.featured
              ? { borderColor: "var(--accent-primary)", boxShadow: "0 0 0 1px var(--accent-primary)" }
              : undefined;
            return (
              <article
                key={group.category}
                className={"cv-card p-6" + (group.featured ? " ring-1" : "")}
                style={featuredStyle}
              >
                <header className="mb-5 flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {group.category}
                  </h3>
                  {group.featured && (
                    <span className="cv-tag-glow text-[10px] uppercase tracking-wider">
                      Foco
                    </span>
                  )}
                </header>

                <ul className="space-y-4">
                  {group.items.map((skill) => {
                    const barStyle = {
                      width: visible ? skill.level + "%" : "0%",
                      background: group.featured
                        ? "linear-gradient(90deg, var(--accent-primary), var(--accent-glow))"
                        : "var(--accent-primary)",
                    };
                    return (
                      <li key={skill.name}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium text-text-primary">{skill.name}</span>
                          <span className="font-mono text-xs text-text-muted">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-code">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={barStyle}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
