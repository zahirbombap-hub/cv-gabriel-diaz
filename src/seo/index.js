import seoConfig from "./seo.config.json";

const TRAILING_SLASH_REGEX = /\/+$/;

export const SITE_SEO = seoConfig;

export function normalizePath(pathname = "/") {
  const rawPath = String(pathname || "/").trim();
  if (rawPath === "/" || rawPath === "") {
    return "/";
  }

  const [pathOnly] = rawPath.split(/[?#]/);
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const normalized = withLeadingSlash.replace(TRAILING_SLASH_REGEX, "");

  return normalized || "/";
}

export function getSiteUrl() {
  const envUrl = process.env.REACT_APP_SITE_URL?.trim() || process.env.SITE_URL?.trim();
  const resolvedUrl = envUrl || seoConfig.siteUrl || "";

  return resolvedUrl.replace(TRAILING_SLASH_REGEX, "");
}

export function toAbsoluteUrl(pathname = "/") {
  return new URL(normalizePath(pathname), `${getSiteUrl()}/`).toString();
}

export function resolveImageUrl(imagePath) {
  if (!imagePath) {
    return undefined;
  }

  return new URL(imagePath, `${getSiteUrl()}/`).toString();
}

export function getRouteDefinition(routePath) {
  const normalizedPath = normalizePath(routePath);

  return (
    seoConfig.routes.find((route) => normalizePath(route.path) === normalizedPath) ||
    null
  );
}

export function matchRouteDefinition(currentPath) {
  const normalizedPath = normalizePath(currentPath);

  return (
    seoConfig.routes.find((route) => {
      if (normalizePath(route.path) === normalizedPath) {
        return true;
      }

      return (route.aliases || []).some(
        (alias) => normalizePath(alias) === normalizedPath
      );
    }) || null
  );
}

export function getRouteSeo(routePath, currentPath = routePath) {
  const route =
    getRouteDefinition(routePath) ||
    matchRouteDefinition(routePath) ||
    matchRouteDefinition(currentPath);

  if (!route) {
    return null;
  }

  const normalizedCurrentPath = normalizePath(currentPath);
  const canonicalPath = normalizePath(route.path);
  const aliases = (route.aliases || []).map((alias) => normalizePath(alias));
  const isAlias =
    normalizedCurrentPath !== canonicalPath && aliases.includes(normalizedCurrentPath);

  return {
    ...route,
    canonicalPath,
    currentPath: normalizedCurrentPath,
    canonicalUrl: toAbsoluteUrl(canonicalPath),
    currentUrl: toAbsoluteUrl(normalizedCurrentPath),
    imageUrl: resolveImageUrl(route.imagePath || seoConfig.defaultImagePath),
    isAlias,
    noindex: route.indexable === false || isAlias,
  };
}
