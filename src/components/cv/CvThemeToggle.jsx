import { useThemeMode } from "../../hooks/useThemeMode.js";

/**
 * Floating theme toggle (dark / light).
 * Designed to be placed fixed top-right on the CV page so it works
 * even when the global Header is themed for the Don Prueba landing.
 */
export function CvThemeToggle({ className = "" }) {
  const { theme, toggle } = useThemeMode();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={
        "cv-focusable group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-elevated hover:shadow-card-hover " +
        className
      }
    >
      <span aria-hidden="true" className="relative block h-5 w-5">
        {/* Sun */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            "absolute inset-0 h-5 w-5 transition-all duration-300 " +
            (isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100")
          }
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            "absolute inset-0 h-5 w-5 transition-all duration-300 " +
            (isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0")
          }
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
