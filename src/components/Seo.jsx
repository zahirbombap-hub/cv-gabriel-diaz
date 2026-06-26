import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SITE_SEO,
  getRouteSeo,
  getSiteUrl,
  normalizePath,
  resolveImageUrl,
  toAbsoluteUrl,
} from "../seo/index.js";

function upsertMeta({ name, property, content }) {
  if (!content) {
    return;
  }

  const selector = name
    ? `meta[name="${name}"]`
    : `meta[property="${property}"]`;
  const head = document.head;
  let metaTag = head.querySelector(selector);

  if (!metaTag) {
    metaTag = document.createElement("meta");

    if (name) {
      metaTag.setAttribute("name", name);
    }

    if (property) {
      metaTag.setAttribute("property", property);
    }

    head.appendChild(metaTag);
  }

  metaTag.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) {
    return;
  }

  const head = document.head;
  let linkTag = head.querySelector(`link[rel="${rel}"]`);

  if (!linkTag) {
    linkTag = document.createElement("link");
    linkTag.setAttribute("rel", rel);
    head.appendChild(linkTag);
  }

  linkTag.setAttribute("href", href);
}

function pruneEmptyFields(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => pruneEmptyFields(item))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    const nextEntries = Object.entries(value)
      .map(([key, nestedValue]) => [key, pruneEmptyFields(nestedValue)])
      .filter(([, nestedValue]) => nestedValue !== undefined);

    if (nextEntries.length === 0) {
      return undefined;
    }

    return Object.fromEntries(nextEntries);
  }

  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  return value;
}

function updateStructuredData(structuredData) {
  document
    .querySelectorAll('script[type="application/ld+json"][data-route-seo="true"]')
    .forEach((node) => node.remove());

  structuredData.forEach((entry, index) => {
    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.dataset.routeSeo = "true";
    scriptTag.dataset.routeSeoIndex = String(index);
    scriptTag.text = JSON.stringify(entry);
    document.head.appendChild(scriptTag);
  });
}

function buildStructuredData({ canonicalUrl, description, imageUrl, label, schemaType, title }) {
  const siteUrl = getSiteUrl();
  const language = SITE_SEO.locale?.replace("_", "-") || "es-CO";
  const webSite = pruneEmptyFields({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_SEO.siteName,
    url: siteUrl,
    description: SITE_SEO.defaultDescription,
    inLanguage: language,
  });

  if (schemaType === "ProfessionalService") {
    return [
      webSite,
      pruneEmptyFields({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE_SEO.siteName,
        url: canonicalUrl,
        description,
        image: imageUrl,
        areaServed: "Colombia",
      }),
    ].filter(Boolean);
  }

  const pageSchema = pruneEmptyFields({
    "@context": "https://schema.org",
    "@type": schemaType || "WebPage",
    name: label || title,
    url: canonicalUrl,
    description,
    inLanguage: language,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_SEO.siteName,
      url: siteUrl,
    },
    primaryImageOfPage: imageUrl
      ? {
          "@type": "ImageObject",
          url: imageUrl,
        }
      : undefined,
  });

  const breadcrumbSchema =
    normalizePath(canonicalUrl.replace(siteUrl, "") || "/") === "/"
      ? undefined
      : pruneEmptyFields({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Inicio",
              item: `${siteUrl}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: label || title,
              item: canonicalUrl,
            },
          ],
        });

  return [pageSchema, breadcrumbSchema].filter(Boolean);
}

export function Seo({
  canonicalPath = "/",
  description = SITE_SEO.defaultDescription,
  imagePath = SITE_SEO.defaultImagePath,
  label,
  noindex = false,
  schemaType = "WebPage",
  structuredData = [],
  title = SITE_SEO.defaultTitle,
  type = "website",
}) {
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const imageUrl = resolveImageUrl(imagePath || SITE_SEO.defaultImagePath);
  const locale = SITE_SEO.locale || "es_CO";
  const robots = noindex ? "noindex, follow" : "index, follow";
  const resolvedStructuredData = [
    ...buildStructuredData({
      canonicalUrl,
      description,
      imageUrl,
      label,
      schemaType,
      title,
    }),
    ...structuredData,
  ]
    .map((entry) => pruneEmptyFields(entry))
    .filter(Boolean);

  useEffect(() => {
    document.documentElement.lang = "es";
    document.title = title;

    upsertMeta({ name: "description", content: description });
    upsertMeta({ name: "robots", content: robots });
    upsertMeta({ property: "og:locale", content: locale });
    upsertMeta({ property: "og:site_name", content: SITE_SEO.siteName });
    upsertMeta({ property: "og:type", content: type });
    upsertMeta({ property: "og:title", content: title });
    upsertMeta({ property: "og:description", content: description });
    upsertMeta({ property: "og:url", content: canonicalUrl });
    upsertMeta({
      name: "twitter:card",
      content: imageUrl ? "summary_large_image" : "summary",
    });
    upsertMeta({ name: "twitter:title", content: title });
    upsertMeta({ name: "twitter:description", content: description });

    if (imageUrl) {
      upsertMeta({ property: "og:image", content: imageUrl });
      upsertMeta({ name: "twitter:image", content: imageUrl });
    }

    upsertLink("canonical", canonicalUrl);
    updateStructuredData(resolvedStructuredData);
  }, [
    canonicalUrl,
    description,
    imageUrl,
    locale,
    resolvedStructuredData,
    robots,
    title,
    type,
  ]);

  return null;
}

export function RouteSeo({
  noindex = false,
  noindexWhenSearch = false,
  routePath,
  structuredData = [],
}) {
  const location = useLocation();
  const routeSeo = getRouteSeo(routePath, location.pathname);

  if (!routeSeo) {
    return null;
  }

  const shouldNoindex =
    noindex ||
    routeSeo.noindex ||
    (noindexWhenSearch && Boolean(location.search));

  return (
    <Seo
      canonicalPath={routeSeo.canonicalPath}
      description={routeSeo.description}
      imagePath={routeSeo.imagePath}
      label={routeSeo.label}
      noindex={shouldNoindex}
      schemaType={routeSeo.schemaType}
      structuredData={structuredData}
      title={routeSeo.title}
      type={routeSeo.type}
    />
  );
}
