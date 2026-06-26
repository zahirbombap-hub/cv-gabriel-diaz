import { OptimizedImage } from "../OptimizedImage.jsx";
import { cvData } from "./cvData.js";

export function CvHero() {
  const { profile } = cvData;

  const scrollToProjects = () => {
    const el = document.getElementById("cv-proyectos");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Decorative gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 400px at 80% 0%, rgba(var(--accent-primary-rgb), 0.18), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-cv px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[200px_1fr] md:gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* Photo */}
          <div className="relative mx-auto md:mx-0">
            <div className="relative">
              <OptimizedImage
                src={profile.photoFallback}
                srcSet={`${profile.photoBase} 1x, ${profile.photoBase2x} 2x`}
                webpSrcSet={`${profile.photoBase} 1x, ${profile.photoBase2x} 2x`}
                alt={`Foto de ${profile.fullName}`}
                width={240}
                height={350}
                sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 120px"
                priority="high"
                lazy={false}
                className="relative z-10 rounded-2xl border border-border-subtle shadow-card-hover"
              />
              {/* Glow halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-3xl opacity-60 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(var(--accent-primary-rgb), 0.55), rgba(var(--accent-warm-rgb), 0.4))",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-success-cv">
              <span className="h-2 w-2 rounded-full bg-success-cv animate-cv-float" />
              Disponible para contrato
            </p>

            <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              {profile.shortName}
            </h1>

            <p className="mt-3 font-display text-lg text-text-secondary md:text-xl">
              {profile.role} · {profile.company}
            </p>

            <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
              {profile.tagline}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
              <button
                onClick={scrollToProjects}
                type="button"
                className="cv-focusable inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-primary), var(--accent-glow))",
                }}
              >
                Ver proyectos
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="cv-focusable inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-elevated"
              >
                Contactar
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Stack badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {["React", "Python", "LLMs", "ZeroClaw", "Tailwind", "Node.js"].map((t) => (
                <span key={t} className="cv-tag font-mono">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
