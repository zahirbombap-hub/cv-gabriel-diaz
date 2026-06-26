import { memo } from "react";

/**
 * Componente Picture optimizado con soporte para WebP y srcSet responsivo.
 *
 * - Si pasas `src` apuntando a .jpg/.png y no das un WebP explícito,
 *   deriva la versión `.webp` reemplazando la extensión (modo simple).
 * - Si pasas `webpSrcSet` o `webpSrc`, se usan tal cual en el <source>.
 * - `srcSet` se aplica al <img> para que dispositivos de alta densidad
 *   reciban la variante 2x incluso en el fallback.
 *
 * @param {string}  src            URL fallback para <img> (formato universal)
 * @param {string}  srcSet         Set responsivo para <img> (ej. "...1x.webp 1x, ...2x.webp 2x")
 * @param {string}  webpSrc        URL WebP única para <source> (modo simple)
 * @param {string}  webpSrcSet     Set responsivo WebP para <source>
 * @param {string}  alt
 * @param {string}  className
 * @param {number}  width
 * @param {number}  height
 * @param {string}  priority       'high' para carga eager
 * @param {boolean} lazy           Lazy loading (default true)
 */
function OptimizedImageComponent({
  src,
  srcSet,
  webpSrc,
  webpSrcSet,
  alt,
  className = "",
  width,
  height,
  priority = false,
  lazy = true,
  ...props
}) {
  // Si `src` ya es WebP, no generamos un <source> adicional — el <img>
  // se encarga y soporta srcSet directamente.
  const srcIsWebp = src && /\.webp(\?.*)?$/i.test(src);

  // Solo derivamos una versión .webp cuando `src` termina en un formato
  // que tiene equivalente WebP (jpg/jpeg/png) y no se pasó un WebP explícito.
  const derivedWebp =
    src && !srcIsWebp && !webpSrc && !webpSrcSet
      ? src.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, ".webp$2")
      : null;

  const sourceSrcSet =
    webpSrcSet ||
    (webpSrc ? `${webpSrc} 1x` : null) ||
    (derivedWebp ? `${derivedWebp} 1x` : null);

  const loading = priority ? "eager" : lazy ? "lazy" : "auto";
  const decoding = priority ? "sync" : "async";

  return (
    <picture>
      {sourceSrcSet && <source srcSet={sourceSrcSet} type="image/webp" />}
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...props}
      />
    </picture>
  );
}

export const OptimizedImage = memo(OptimizedImageComponent);
