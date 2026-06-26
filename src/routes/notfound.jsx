import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="cv-page-bg flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          404
        </p>
        <h1 className="mb-4 font-display text-4xl font-bold text-text-primary md:text-5xl">
          Página no encontrada
        </h1>
        <p className="mb-8 text-text-secondary">
          La ruta que buscas no existe en este CV.
        </p>
        <Link
          to="/cv"
          className="cv-focusable inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-primary), var(--accent-glow))",
          }}
        >
          Ir al CV
        </Link>
      </div>
    </div>
  );
}
