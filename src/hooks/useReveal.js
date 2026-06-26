import { useEffect, useRef, useState } from "react";

/**
 * Returns a [ref, isVisible] tuple. When the element scrolls into view,
 * `isVisible` flips to true. The component should add the class
 * `is-visible` to itself when true (the `cv-reveal` class provides the
 * base hidden state via src/styles/theme.css).
 *
 * Respects prefers-reduced-motion via the CSS rule that disables the
 * transition entirely.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isVisible];
}
