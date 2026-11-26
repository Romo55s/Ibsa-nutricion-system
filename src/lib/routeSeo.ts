export type RouteSeo = {
  title: string;
  description: string;
  canonical: string;
  breadcrumbName?: string;
};

export const publicRouteSeo: Record<string, RouteSeo> = {
  "/": {
    title: "Nutrióloga en Aguascalientes | IBSA Nutrición",
    description:
      "Agenda tu consulta de nutrición clínica y deportiva en Aguascalientes o en línea. Planes personalizados para tus hábitos, composición corporal y rendimiento.",
    canonical: "https://www.ibsa-nutricion.com/",
  },
  "/evento": {
    title: "Eventos y conferencias de nutrición | IBSA Nutrición",
    description:
      "Conoce las carreras, actividades y conferencias de nutrición y deporte en las que participa Mariana Ibarra en Aguascalientes y otras sedes.",
    canonical: "https://www.ibsa-nutricion.com/evento",
    breadcrumbName: "Eventos y conferencias",
  },
  "/guia-desayunos-pre-entreno": {
    title:
      "Desayunos pre-entreno: qué comer antes de entrenar | IBSA Nutrición",
    description:
      "Descubre qué comer antes de entrenar, cuándo hacerlo y recetas sencillas. Descarga gratis la guía de desayunos pre-entreno de IBSA Nutrición.",
    canonical: "https://www.ibsa-nutricion.com/guia-desayunos-pre-entreno",
    breadcrumbName: "Desayunos pre-entreno",
  },
};

const setMetaContent = (
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string
) => {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.append(meta);
  }
  meta.content = content;
};

export const applyRouteSeo = (seo: RouteSeo) => {
  document.title = seo.title;

  setMetaContent(
    'meta[name="description"]',
    "name",
    "description",
    seo.description
  );
  setMetaContent(
    'meta[property="og:title"]',
    "property",
    "og:title",
    seo.title
  );
  setMetaContent(
    'meta[property="og:description"]',
    "property",
    "og:description",
    seo.description
  );
  setMetaContent(
    'meta[property="og:url"]',
    "property",
    "og:url",
    seo.canonical
  );
  setMetaContent(
    'meta[name="twitter:title"]',
    "name",
    "twitter:title",
    seo.title
  );
  setMetaContent(
    'meta[name="twitter:description"]',
    "name",
    "twitter:description",
    seo.description
  );

  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = seo.canonical;

  const existingBreadcrumb = document.getElementById(
    "route-breadcrumb-schema"
  );
  if (!seo.breadcrumbName) {
    existingBreadcrumb?.remove();
    return;
  }

  const breadcrumb =
    existingBreadcrumb instanceof HTMLScriptElement
      ? existingBreadcrumb
      : document.createElement("script");
  breadcrumb.id = "route-breadcrumb-schema";
  breadcrumb.type = "application/ld+json";
  breadcrumb.textContent = JSON.stringify({
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
        name: seo.breadcrumbName,
      },
    ],
  });
  if (!breadcrumb.isConnected) document.head.append(breadcrumb);
};
