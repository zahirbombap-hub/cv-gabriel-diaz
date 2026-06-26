import { memo } from "react";

/**
 * Componente Picture optimizado que proporciona WebP con fallback
 * Automáticamente busca versiones WebP de las imágenes
 * @param {string} src - URL de la imagen (puede ser .jpg, .jpeg, .png)
 * @param {string} alt - Texto alternativo
 * @param {string} className - Clases CSS
 * @param {number} width - Ancho de la imagen
 * @param {number} height - Alto de la imagen
 * @param {string} priority - 'high' para cargar con prioridad
 * @param {boolean} lazy - Usar lazy loading (default true)
 */
function OptimizedImageComponent({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  lazy = true,
  ...props
}) {
  // Convertir ruta para obtener versión WebP
  const getWebPSrc = (imageSrc) => {
    if (!imageSrc) return imageSrc;
    return imageSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  };

  const webpSrc = getWebPSrc(src);
  const loading = priority ? "eager" : lazy ? "lazy" : "auto";
  const decoding = priority ? "sync" : "async";

  return (
    <picture>
      {/* WebP format - primary */}
      <source srcSet={webpSrc} type="image/webp" />
      {/* JPEG/PNG fallback */}
      <img
        src={src}
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
