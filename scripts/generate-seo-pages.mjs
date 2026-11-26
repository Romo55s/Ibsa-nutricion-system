import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const outputDir = join(process.cwd(), "dist");
const baseHtml = await readFile(join(outputDir, "index.html"), "utf8");

const pages = [
  {
    path: "evento",
    title: "Eventos y conferencias de nutrición | IBSA Nutrición",
    description:
      "Conoce las carreras, actividades y conferencias de nutrición y deporte en las que participa Mariana Ibarra en Aguascalientes y otras sedes.",
    canonical: "https://www.ibsa-nutricion.com/evento",
    breadcrumbName: "Eventos y conferencias",
  },
  {
    path: "guia-desayunos-pre-entreno",
    title:
      "Desayunos pre-entreno: qué comer antes de entrenar | IBSA Nutrición",
    description:
      "Descubre qué comer antes de entrenar, cuándo hacerlo y recetas sencillas. Descarga gratis la guía de desayunos pre-entreno de IBSA Nutrición.",
    canonical: "https://www.ibsa-nutricion.com/guia-desayunos-pre-entreno",
    breadcrumbName: "Desayunos pre-entreno",
  },
];

const escapeAttribute = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

const replaceMeta = (html, attribute, key, content) => {
  const tagPattern = new RegExp(
    `<meta\\b(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`,
    "i"
  );
  const existing = html.match(tagPattern)?.[0];
  const encoded = escapeAttribute(content);
  const updated = existing
    ? /\bcontent=["'][^"']*["']/i.test(existing)
      ? existing.replace(/\bcontent=["'][^"']*["']/i, `content="${encoded}"`)
      : existing.replace(/\s*\/?>$/, ` content="${encoded}" />`)
    : `<meta ${attribute}="${key}" content="${encoded}" />`;
  return existing
    ? html.replace(tagPattern, updated)
    : html.replace("</head>", `  ${updated}\n  </head>`);
};

for (const page of pages) {
  let html = baseHtml.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${page.title}</title>`
  );
  html = replaceMeta(html, "name", "description", page.description);
  html = replaceMeta(html, "property", "og:title", page.title);
  html = replaceMeta(html, "property", "og:description", page.description);
  html = replaceMeta(html, "property", "og:url", page.canonical);
  html = replaceMeta(html, "name", "twitter:title", page.title);
  html = replaceMeta(html, "name", "twitter:description", page.description);

  const canonicalPattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i;
  const canonicalTag = `<link rel="canonical" href="${page.canonical}" />`;
  html = canonicalPattern.test(html)
    ? html.replace(canonicalPattern, canonicalTag)
    : html.replace("</head>", `  ${canonicalTag}\n  </head>`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.ibsa-nutricion.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.breadcrumbName,
      },
    ],
  };
  const breadcrumbTag = `<script type="application/ld+json" id="route-breadcrumb-schema">${JSON.stringify(breadcrumbSchema)}</script>`;
  html = html.replace("</head>", `  ${breadcrumbTag}\n  </head>`);

  const destination = join(outputDir, page.path, "index.html");
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
}
