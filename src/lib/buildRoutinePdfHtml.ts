import {
  getExerciseById,
  getExerciseImageUrl,
  getExerciseVideoUrl,
  muscleGroupLabels,
} from "../data/exercises";
import type { Routine, RoutineExercise } from "../types/routines";
import { WEEKDAYS } from "../types/routines";
import {
  formatExerciseLoad,
  formatExerciseLoadLabel,
  formatExerciseWeight,
  weekdayLabels,
  weekdayShortLabels,
} from "./weekPlan";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderExerciseCards(
  items: RoutineExercise[],
  sectionLabel: string
): string {
  return items
    .map((item, index) => {
      const exercise = getExerciseById(item.exerciseId);
      if (!exercise) return "";
      const img = getExerciseImageUrl(exercise.imagePath);
      const video = getExerciseVideoUrl(exercise);
      const notes = item.notes?.trim()
        ? `<p class="ex-notes"><strong>Notas:</strong> ${esc(item.notes)}</p>`
        : "";
      const weight = formatExerciseWeight(item);
      const weightHtml = weight
        ? `<div><span>Peso</span><strong>${esc(weight)}</strong></div>`
        : "";
      const load = formatExerciseLoad(item);
      const loadLabel = formatExerciseLoadLabel(item.loadType);

      return `
        <article class="ex-card">
          <div class="ex-grid">
            <div class="ex-photo">
              <img src="${esc(img)}" alt="${esc(exercise.name)}" />
            </div>
            <div class="ex-body">
              <p class="ex-index">${esc(sectionLabel)} ${index + 1}</p>
              <h3>${esc(exercise.name)}</h3>
              <p class="ex-meta">${esc(muscleGroupLabels[exercise.muscleGroup])} · ${esc(exercise.nameEn)}</p>
              <div class="stats ${weight ? "stats--4" : ""}">
                <div><span>Series</span><strong>${esc(String(item.sets))}</strong></div>
                <div><span>${esc(loadLabel)}</span><strong>${esc(load)}</strong></div>
                <div><span>Descanso</span><strong>${esc(String(item.restSeconds))}s</strong></div>
                ${weightHtml}
              </div>
              ${notes}
              <p class="video-link">Video: <a href="${esc(video)}">${esc(video)}</a></p>
            </div>
          </div>
        </article>`;
    })
    .join("");
}

/**
 * HTML completo para exportar la rutina a PDF.
 * Se usa en el navegador vía ventana de impresión / Guardar como PDF.
 */
export function buildRoutinePdfHtml(routine: Routine, logoSrc: string): string {
  const weekOverview = WEEKDAYS.map((day) => {
    const plan = routine.days[day];
    if (!plan.enabled) {
      return `<div class="week-day week-day--rest">
        <strong>${esc(weekdayShortLabels[day])}</strong>
        <span>Descanso</span>
      </div>`;
    }
    const focus = plan.focus.trim();
    const warmupCount = plan.warmupEnabled ? plan.warmupExercises.length : 0;
    const total = warmupCount + plan.exercises.length;
    return `<div class="week-day">
      <strong>${esc(weekdayShortLabels[day])}</strong>
      <span>${focus ? esc(focus) : `${total} ej.`}</span>
    </div>`;
  }).join("");

  const daySections = WEEKDAYS.map((day) => {
    const plan = routine.days[day];
    if (!plan.enabled) {
      return `
      <section class="day day--rest">
        <div class="day-head">
          <h2>${esc(weekdayLabels[day])}</h2>
          <span class="rest-chip">Descanso</span>
        </div>
      </section>`;
    }

    const focus = plan.focus.trim();
    const warmupCount = plan.warmupEnabled ? plan.warmupExercises.length : 0;
    const total = warmupCount + plan.exercises.length;

    const warmupHtml =
      plan.warmupEnabled && plan.warmupExercises.length > 0
        ? `
        <h3 class="block-title">Calentamiento</h3>
        ${renderExerciseCards(plan.warmupExercises, "Activación")}
      `
        : "";

    const mainHtml =
      plan.exercises.length > 0
        ? `
        ${warmupHtml ? `<h3 class="block-title">Trabajo principal</h3>` : ""}
        ${renderExerciseCards(plan.exercises, "Ejercicio")}
      `
        : "";

    const empty =
      total === 0
        ? `<p class="empty-day">Sin ejercicios asignados este día.</p>`
        : "";

    return `
    <section class="day">
      <div class="day-head">
        <h2>${esc(weekdayLabels[day])}${focus ? ` — ${esc(focus)}` : ""}</h2>
        <span class="train-chip">${total} ejercicio${total === 1 ? "" : "s"}</span>
      </div>
      ${empty}
      ${warmupHtml}
      ${mainHtml}
    </section>`;
  }).join("");

  const description = routine.description.trim()
    ? `<p class="subtitle">${esc(routine.description)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${esc(routine.name)} | IBSA Nutrición</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 12mm 14mm;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      color: #222d3b;
      background: #fff;
      font-size: 10pt;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      background: linear-gradient(145deg, #0a1626 0%, #0a1626 40%, #222d3b 100%);
      color: #fff;
      padding: 18px 20px 16px;
      border-radius: 10px;
      page-break-after: avoid;
      break-after: avoid;
    }
    .header-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .header-top img { height: 32px; width: auto; }
    .kicker {
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #7eb8ff;
      margin: 0 0 2px;
    }
    .brand { font-size: 10px; color: #cbd5e1; margin: 0; }
    h1 {
      font-size: 18pt;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 0 0 6px;
      line-height: 1.15;
    }
    .subtitle {
      font-size: 10pt;
      color: #cbd5e1;
      max-width: 40em;
      margin: 0;
      line-height: 1.4;
    }
    .week-overview {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      margin: 14px 0 18px;
      page-break-after: avoid;
      break-after: avoid;
    }
    .week-day {
      border: 1px solid rgba(10,22,38,0.1);
      border-radius: 8px;
      padding: 8px 6px;
      text-align: center;
      background: #f8fafc;
    }
    .week-day strong {
      display: block;
      font-size: 9px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #0a1626;
      margin-bottom: 3px;
    }
    .week-day span {
      display: block;
      font-size: 8.5px;
      color: #535b67;
      line-height: 1.25;
      word-break: break-word;
    }
    .week-day--rest {
      background: #fff;
      border-style: dashed;
    }
    .week-day--rest span { color: #94a3b8; }
    .wrap { padding: 0; }
    .day {
      margin: 0 0 16px;
      padding-bottom: 4px;
    }
    .day-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin: 0 0 8px;
      padding-bottom: 6px;
      border-bottom: 2px solid rgba(10,22,38,0.08);
      page-break-after: avoid;
      break-after: avoid;
    }
    .day-head h2 {
      margin: 0;
      font-size: 12.5pt;
      color: #0a1626;
    }
    .day--rest {
      margin-bottom: 10px;
      padding: 8px 10px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px dashed rgba(10,22,38,0.12);
    }
    .day--rest .day-head {
      margin: 0;
      padding: 0;
      border: 0;
    }
    .day--rest .day-head h2 { font-size: 11pt; color: #64748b; }
    .block-title {
      margin: 10px 0 6px;
      font-size: 9pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #2e8bff;
      page-break-after: avoid;
      break-after: avoid;
    }
    .train-chip, .rest-chip {
      font-size: 7.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 5px 9px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .train-chip { background: #e8f2ff; color: #1d6fd8; }
    .rest-chip { background: #e2e8f0; color: #64748b; }
    .empty-day { color: #535b67; font-size: 9.5pt; margin: 0; }
    .ex-card {
      border: 1px solid rgba(10,22,38,0.1);
      border-radius: 10px;
      overflow: hidden;
      margin: 0 0 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .ex-grid {
      display: grid;
      grid-template-columns: 108px 1fr;
      align-items: stretch;
      min-height: 96px;
    }
    .ex-photo {
      position: relative;
      background: #0a1626;
      min-height: 96px;
    }
    .ex-photo img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .ex-body { padding: 10px 12px; }
    .ex-index {
      margin: 0 0 2px;
      font-size: 7.5px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #2e8bff;
    }
    .ex-body h3 {
      margin: 0 0 2px;
      font-size: 11pt;
      color: #0a1626;
      line-height: 1.2;
    }
    .ex-meta { margin: 0 0 6px; font-size: 8.5pt; color: #535b67; }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      margin-bottom: 4px;
    }
    .stats--4 { grid-template-columns: repeat(4, 1fr); }
    .stats div {
      background: #f8fafc;
      border-radius: 6px;
      padding: 5px 4px;
      text-align: center;
    }
    .stats span {
      display: block;
      font-size: 7px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #64748b;
      margin-bottom: 1px;
    }
    .stats strong { font-size: 10.5pt; color: #0a1626; }
    .ex-notes { margin: 4px 0 0; font-size: 8.5pt; color: #334155; }
    .video-link {
      margin: 4px 0 0;
      font-size: 7.5pt;
      color: #64748b;
      word-break: break-all;
    }
    .video-link a { color: #2e8bff; text-decoration: none; }
    .footer {
      margin-top: 16px;
      padding-top: 10px;
      border-top: 1px solid rgba(10,22,38,0.08);
      font-size: 8pt;
      color: #64748b;
    }
    @media print {
      .header, .train-chip, .week-day {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-top">
      <img src="${esc(logoSrc)}" alt="IBSA" />
      <div>
        <p class="kicker">Plan semanal</p>
        <p class="brand">IBSA Nutrición · Clínica y Deportiva</p>
      </div>
    </div>
    <h1>${esc(routine.name)}</h1>
    ${description}
  </header>

  <div class="wrap">
    <div class="week-overview">
      ${weekOverview}
    </div>
    ${daySections}
    <p class="footer">
      Generado desde IBSA Nutrición · ${esc(new Date().toLocaleDateString("es-MX"))}.
      Consulta los videos en los enlaces de cada ejercicio.
    </p>
  </div>
</body>
</html>`;
}

export async function exportRoutinePdf(routine: Routine): Promise<void> {
  const logoSrc = `${window.location.origin}/ibsa-logo-white.svg`;
  const html = buildRoutinePdfHtml(routine, logoSrc);

  const iframe = document.createElement("iframe");
  iframe.setAttribute("title", "Exportar rutina PDF");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  document.body.appendChild(iframe);

  const frameWindow = iframe.contentWindow;
  const frameDocument = iframe.contentDocument ?? frameWindow?.document;

  if (!frameWindow || !frameDocument) {
    iframe.remove();
    throw new Error("No se pudo preparar la vista de impresión.");
  }

  frameDocument.open();
  frameDocument.write(html);
  frameDocument.close();

  await new Promise<void>((resolve) => {
    if (frameDocument.readyState === "complete") {
      resolve();
      return;
    }
    iframe.addEventListener("load", () => resolve(), { once: true });
  });

  if (frameDocument.fonts?.ready) {
    await frameDocument.fonts.ready.catch(() => undefined);
  }

  await Promise.race([
    frameDocument.images.length === 0
      ? Promise.resolve()
      : Promise.all(
          [...frameDocument.images].map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete) {
                  resolve();
                  return;
                }
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              })
          )
        ),
    new Promise<void>((resolve) => setTimeout(resolve, 8000)),
  ]);

  const cleanup = () => {
    iframe.remove();
  };

  frameWindow.addEventListener("afterprint", cleanup, { once: true });
  window.setTimeout(cleanup, 60_000);

  frameWindow.focus();
  frameWindow.print();
}
