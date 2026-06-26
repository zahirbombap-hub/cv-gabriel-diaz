import { useState } from "react";
import { cvData } from "./cvData.js";
import { useReveal } from "../../hooks/useReveal.js";

const ICONS = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.18c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
};

export function CvContact() {
  const [ref, visible] = useReveal();
  const revealClass = visible ? "is-visible" : "";
  const { contact, profile } = cvData;

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent("Contacto desde CV web — " + form.name);
    const body = encodeURIComponent(
      "Nombre: " + form.name + "\n" +
      "Email: " + form.email + "\n\n" +
      form.message
    );
    window.location.href =
      "mailto:" + profile.email + "?subject=" + subject + "&body=" + body;
  };

  return (
    <section ref={ref} className={"cv-reveal " + revealClass + " py-12 md:py-20"}>
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
          06 · Contacto
        </p>
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Hablemos
        </h2>
        <p className="mb-10 max-w-2xl text-base text-text-secondary md:text-lg">
          ¿Tienes un proceso que quieres automatizar o una idea con IA?
          Escríbeme por cualquier canal.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contact.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="cv-card cv-focusable flex items-center gap-3 p-4 hover:border-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-elevated text-accent">
                {ICONS[c.icon] || ICONS.mail}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                  {c.label}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-text-primary">
                  {c.value}
                </p>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-text-muted">
                <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>

        <div className="cv-card p-6 md:p-8">
          <h3 className="mb-2 font-display text-xl font-bold text-text-primary">
            Mensaje rápido
          </h3>
          <p className="mb-6 text-sm text-text-secondary">
            Completa el formulario y se abrirá tu cliente de correo con el mensaje listo para enviar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-text-muted">
                  Tu nombre
                </span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="cv-focusable w-full rounded-lg border border-border-subtle bg-elevated px-3 py-2 text-sm text-text-primary placeholder:text-text-muted"
                  placeholder="Ej. María López"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-text-muted">
                  Tu email
                </span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="cv-focusable w-full rounded-lg border border-border-subtle bg-elevated px-3 py-2 text-sm text-text-primary placeholder:text-text-muted"
                  placeholder="maria@empresa.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-text-muted">
                Mensaje
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="cv-focusable w-full rounded-lg border border-border-subtle bg-elevated px-3 py-2 text-sm text-text-primary placeholder:text-text-muted"
                placeholder="Cuéntame qué quieres automatizar o construir..."
              />
            </label>
            <button
              type="submit"
              className="cv-focusable inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
              style={{
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-glow))",
              }}
            >
              Enviar por email
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
