import { cvData } from "./cvData.js";
import { useReveal } from "../../hooks/useReveal.js";

const ICONS = {
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export function CvAbout() {
  const { about, stats } = cvData;
  const [ref, visible] = useReveal();
  const revealClass = visible ? "is-visible" : "";

  return (
    <section ref={ref} className={"cv-reveal " + revealClass + " py-12 md:py-20"}>
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
              01 · Sobre mí
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Construyo sistemas que sustituyen tareas repetitivas
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
              {about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stats.map((s) => (
              <div key={s.label} className="cv-card flex items-start gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-elevated text-accent">
                  {ICONS[s.icon] || ICONS.globe}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">
                    {s.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
