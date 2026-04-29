import {
  closing,
  disclaimer,
  guideHero,
  guideIntro,
  guideMeta,
  principles,
  recipes,
  timingGuide,
} from "../../src/data/breakfastGuideContent";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absUrl(base: string, path: string): string {
  const b = base.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${b}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * HTML completo para page.setContent + page.pdf (Chromium).
 * Imágenes y logo deben resolverse con baseUrl absoluto (misma app en Vercel).
 */
export function buildBreakfastGuideHtml(baseUrl: string): string {
  const logoSrc = absUrl(baseUrl, "/ibsa-logo-white.svg");

  const introHtml = guideIntro.paragraphs
    .map((p) => `<p class="intro-p">${esc(p)}</p>`)
    .join("");

  const timingRows = timingGuide.rows
    .map(
      (row) => `
      <tr>
        <td class="timing-window">${esc(row.window)}</td>
        <td class="timing-focus">${esc(row.focus)}</td>
      </tr>`,
    )
    .join("");

  const principlesHtml = principles.items
    .map(
      (item) => `
      <div class="principle">
        <h4>${esc(item.title)}</h4>
        <p>${esc(item.body)}</p>
      </div>`,
    )
    .join("");

  const recipesHtml = recipes
    .map((recipe) => {
      const imgSrc = absUrl(baseUrl, recipe.imageUrl);
      const timingChip = esc(recipe.timingLabel.replace(/^Ideal\s*/, ""));
      const safeAlt = esc(recipe.imageAlt);
      const ingredientsHtml = recipe.ingredients
        .map(
          (ing) => `
        <li class="ing-row">
          <span class="ing-dash" aria-hidden="true"></span>
          <span>${esc(ing)}</span>
        </li>`,
        )
        .join("");

      return `
      <article class="recipe-card">
        <div class="recipe-grid">
          <div class="recipe-photo">
            <img src="${imgSrc}" alt="${safeAlt}" width="900" height="720" />
            <span class="time-chip">${timingChip}</span>
          </div>
          <div class="recipe-body">
            <h3>${esc(recipe.name)}</h3>
            <p class="ing-label">Ingredientes</p>
            <ul class="ing-list">${ingredientsHtml}</ul>
            <div class="tip">
              <span class="tip-label">Tip</span>
              <p>${esc(recipe.tip)}</p>
            </div>
          </div>
        </div>
      </article>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${esc(guideMeta.documentTitle)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      color: #222d3b;
      background: #fff;
      font-size: 11pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      background: linear-gradient(145deg, #0a1626 0%, #0a1626 40%, #222d3b 100%);
      color: #fff;
      padding: 28px 32px 32px;
    }
    .header-top {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 20px;
    }
    .header-top img { height: 40px; width: auto; }
    .kicker {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #7eb8ff;
      margin: 0 0 4px;
    }
    .brand { font-size: 11px; color: #cbd5e1; margin: 0; }
    h1 {
      font-size: 22pt;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 0 0 12px;
      line-height: 1.15;
    }
    .subtitle { font-size: 11pt; color: #cbd5e1; max-width: 36em; margin: 0; line-height: 1.5; }
    .wrap { padding: 24px 32px 40px; }
    .intro-p { margin: 0 0 12px; color: #222d3b; }
    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14pt;
      font-weight: 600;
      color: #0a1626;
      margin: 28px 0 14px;
      /* Mantener título pegado al bloque siguiente (evita cabeceras huérfanas al paginar) */
      page-break-after: avoid;
      break-after: avoid-page;
      orphans: 3;
      widows: 3;
    }
    /* Refuerzo explícito: “Ideas de desayuno” + primera ficha */
    .section-title--recipes-lede {
      margin-top: 32px;
      page-break-after: avoid;
      break-after: avoid-page;
    }
    .section-title--recipes-lede + .recipe-card {
      page-break-before: avoid;
      break-before: avoid-page;
      margin-top: 0;
    }
    .section-title .bar {
      width: 3px;
      height: 26px;
      border-radius: 2px;
      background: #2e8bff;
    }
    .timing-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid rgba(10,22,38,0.08);
      border-radius: 8px;
      overflow: hidden;
      font-size: 10pt;
    }
    .timing-table td { padding: 10px 14px; border-bottom: 1px solid rgba(10,22,38,0.07); vertical-align: top; }
    .timing-table tr:last-child td { border-bottom: none; }
    .timing-window { width: 28%; font-weight: 600; color: #2e8bff; background: #fafbfc; }
    .timing-focus { color: #535b67; }
    .principles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .principle {
      border: 1px solid rgba(10,22,38,0.07);
      border-radius: 8px;
      padding: 12px 14px;
      background: #fff;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .principle h4 { margin: 0 0 6px; font-size: 10.5pt; color: #0a1626; }
    .principle p { margin: 0; font-size: 10pt; color: #535b67; }
    .recipe-card {
      page-break-inside: avoid;
      break-inside: avoid;
      margin-bottom: 28px;
      border: 1px solid rgba(10,22,38,0.1);
      border-radius: 12px;
      overflow: hidden;
    }
    .recipe-grid {
      display: grid;
      grid-template-columns: minmax(0, 42%) 1fr;
      align-items: stretch;
      width: 100%;
    }
    .recipe-photo {
      position: relative;
      align-self: stretch;
      min-height: 220px;
      background: #0a1626;
      overflow: hidden;
    }
    .recipe-photo img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .time-chip {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(255,255,255,0.96);
      color: #0a1626;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 6px 10px;
      border-radius: 999px;
    }
    .recipe-body {
      padding: 18px 20px;
      min-width: 0;
      background: #fff;
    }
    .recipe-body h3 {
      margin: 0 0 12px;
      font-size: 13pt;
      font-weight: 700;
      color: #0a1626;
      line-height: 1.2;
    }
    .ing-label {
      margin: 0 0 8px;
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #535b67;
    }
    .ing-list {
      list-style: none;
      margin: 0;
      padding: 0;
      border-top: 1px solid rgba(10,22,38,0.1);
    }
    .ing-row {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      border-bottom: 1px solid rgba(10,22,38,0.06);
      padding: 8px 0;
      font-size: 10.5pt;
      line-height: 1.55;
      color: #222d3b;
    }
    .ing-row:last-child { border-bottom: none; }
    .ing-dash {
      width: 18px;
      height: 2px;
      margin-top: 0.55em;
      flex-shrink: 0;
      background: #2e8bff;
    }
    .tip {
      margin-top: 14px;
      border-left: 3px solid #2e8bff;
      padding-left: 12px;
    }
    .tip-label {
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #2e8bff;
    }
    .tip p { margin: 6px 0 0; font-size: 10.5pt; color: #222d3b; }
    .closing {
      background: linear-gradient(145deg, #0a1626, #222d3b);
      color: #fff;
      padding: 20px 22px;
      border-radius: 10px;
      margin-top: 8px;
    }
    .closing h2 { margin: 0 0 8px; font-size: 12pt; }
    .closing p { margin: 0; color: #cbd5e1; font-size: 10.5pt; }
    .closing-cta { margin: 14px 0 0; font-size: 10.5pt; line-height: 1.5; }
    .closing-cta a {
      color: #7eb8ff;
      font-weight: 600;
      text-decoration: underline;
    }
    .footer {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(10,22,38,0.08);
      text-align: center;
      font-size: 8pt;
      color: #535b67;
    }
    /* Bloques compactos: título + tabla / rejilla no parten en mitad si caben razonablemente */
    .block-keep {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    @media print {
      .section-title {
        page-break-after: avoid;
        break-after: avoid-page;
      }
      .recipe-card {
        page-break-inside: avoid;
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-top">
      <img src="${logoSrc}" alt="IBSA" />
      <div>
        <p class="kicker">${esc(guideHero.kicker)}</p>
        <p class="brand">${esc(guideMeta.brandLine)}</p>
      </div>
    </div>
    <h1>${esc(guideHero.title)}</h1>
    <p class="subtitle">${esc(guideHero.subtitle)}</p>
  </header>
  <main class="wrap">
    ${introHtml}
    <div class="block-keep">
      <div class="section-title"><span class="bar"></span><span>${esc(timingGuide.title)}</span></div>
      <table class="timing-table">${timingRows}</table>
    </div>
    <div class="block-keep">
      <div class="section-title"><span class="bar"></span><span>${esc(principles.title)}</span></div>
      <div class="principles">${principlesHtml}</div>
    </div>
    <div class="section-title section-title--recipes-lede"><span class="bar"></span><span>Ideas de desayuno</span></div>
    ${recipesHtml}
    <div class="closing">
      <h2>${esc(closing.title)}</h2>
      <p>${esc(closing.body)}</p>
      <p class="closing-cta">
        <a href="${esc(closing.bookingUrl)}">${esc(closing.bookingCtaLabel)}</a>
      </p>
    </div>
    <footer class="footer">
      <p>${esc(disclaimer)}</p>
      <p style="margin-top:8px">© IBSA Nutrición · Mariana Ibarra Santos</p>
    </footer>
  </main>
</body>
</html>`;
}
