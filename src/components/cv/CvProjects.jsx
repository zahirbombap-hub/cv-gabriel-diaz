import { cvData } from "./cvData.js";
import { useReveal } from "../../hooks/useReveal.js";
import { CvProjectCard } from "./CvProjectCard.jsx";

export function CvProjects() {
  const [ref, visible] = useReveal();
  const revealClass = visible ? "is-visible" : "";
  const { projects } = cvData;
  const featured = projects.filter((p) => p.featured);
  const bonus = projects.filter((p) => !p.featured);

  return (
    <section
      ref={ref}
      id="cv-proyectos"
      className={"cv-reveal " + revealClass + " py-12 md:py-20"}
    >
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
          04 · Proyectos
        </p>
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Lo que he construido
        </h2>
        <p className="mb-10 max-w-2xl text-base text-text-secondary md:text-lg">
          Selección con énfasis en automatización e IA. Los marcados son {" "}
          <span className="font-semibold text-glow">IA / Automatización</span>;
          los demás son mini-proyectos personales.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <div
              key={project.title}
              className="animate-cv-reveal"
              style={{ animationDelay: i * 80 + "ms" }}
            >
              <CvProjectCard project={project} featured />
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-text-secondary">
            Mini-proyectos personales
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {bonus.map((project) => (
              <CvProjectCard key={project.title} project={project} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
