import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const configPath = path.join(projectRoot, "src", "seo", "seo.config.json");
const publicDir = path.join(projectRoot, "public");

function normalizePath(pathname = "/") {
  const rawPath = String(pathname || "/").trim();
  if (rawPath === "/" || rawPath === "") {
    return "/";
  }

  const [pathOnly] = rawPath.split(/[?#]/);
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const normalized = withLeadingSlash.replace(/\/+$/, "");

  return normalized || "/";
}

function formatPriority(priority) {
  const numericPriority = Number(priority ?? 0.5);
  return numericPriority.toFixed(1);
}

const config = JSON.parse(await readFile(configPath, "utf8"));
const configuredSiteUrl =
  process.env.REACT_APP_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  config.siteUrl;
const siteUrl = configuredSiteUrl.replace(/\/+$/, "");
const lastmod = new Date().toISOString().slice(0, 10);

const sitemapEntries = config.routes
  .filter((route) => route.indexable !== false)
  .map((route) => {
    const routeUrl = new URL(normalizePath(route.path), `${siteUrl}/`).toString();

    return [
      "  <url>",
      `    <loc>${routeUrl}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${route.changefreq || "monthly"}</changefreq>`,
      `    <priority>${formatPriority(route.priority)}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapEntries,
  "</urlset>",
  "",
].join("\n");

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${siteUrl}/sitemap.xml`,
  "",
].join("\n");

await writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
