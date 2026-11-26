import { publicAssets } from "../assets/publicAssets";
import { colors, typography } from "../design-system";
import {
  getExerciseById,
  getExerciseImageUrl,
  getExerciseVideoUrl,
  muscleGroupLabels,
} from "../data/exercises";
import { isCustomExercise } from "./customExercisesStorage";
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

function renderExercisePhoto(exercise: {
  name: string;
  imagePath: string;
  id: string;
  isCustom?: boolean;
}): string {
  const img = getExerciseImageUrl(exercise.imagePath);
  if (!img || isCustomExercise(exercise)) {
    const initial = esc(exercise.name.trim().charAt(0).toUpperCase() || "?");
    return `<div class="ex-photo-placeholder" aria-hidden="true"><span>${initial}</span></div>`;
  }
  return `<img src="${esc(img)}" alt="${esc(exercise.name)}" />`;
}

function renderExerciseCards(
  items: RoutineExercise[],
  sectionLabel: string
): string {
  return items
    .map((item, index) => {
      const exercise = getExerciseById(item.exerciseId);
      if (!exercise) return "";
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
              ${renderExercisePhoto(exercise)}
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
    @page { size: A4; margin: 13mm 13mm 15mm; }

    :root {
      --ink: ${colors.primary};
      --slate: ${colors.accent};
      --muted: ${colors.muted};
      --rule: ${colors.light};
      --mist: #f5f6f7;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font: 10pt/1.4 ${typography.fontFamily};
      color: var(--ink);
      background: white;
      overflow-wrap: anywhere;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    h1, h2 {
      font-family: "DM Serif Display", Georgia, serif;
      font-weight: 400;
      line-height: 1.12;
    }
    .header {
      padding-bottom: 12pt;
      border-bottom: 1.5pt solid var(--ink);
    }
    .header, .week-overview, .day-head, .block-title {
      page-break-after: avoid;
      break-after: avoid;
    }
    .header-top {
      display: flex;
      align-items: center;
      gap: 10pt;
      margin-bottom: 13pt;
    }
    .header-top img {
      width: auto;
      height: 26pt;
      filter: brightness(0);
    }
    .kicker, .ex-index, .block-title, .stats span {
      font-size: 8pt;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--slate);
    }
    .kicker, .brand, .subtitle, .empty-day, .ex-index { margin: 0; }
    .brand, .subtitle, .empty-day, .ex-meta, .video-link, .footer { color: var(--muted); }
    .brand { font-size: 9pt; }
    h1 { margin: 0; font-size: 26pt; }
    .subtitle { max-width: 64ch; margin-top: 5pt; }

    .week-overview {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      margin: 10pt 0 16pt;
      border-block: 0.65pt solid var(--rule);
    }
    .week-day { padding: 6pt 3pt; text-align: center; background: var(--mist); }
    .week-day + .week-day { border-left: 0.65pt solid var(--rule); }
    .week-day strong { display: block; font-size: 9pt; }
    .week-day span { display: block; margin-top: 2pt; font-size: 8pt; color: var(--slate); }
    .week-day--rest { background: white; }

    .day { margin: 0 0 14pt; }
    .day-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 10pt;
      padding-bottom: 4pt;
      border-bottom: 0.85pt solid var(--ink);
    }
    .day-head h2 { margin: 0; font-size: 17pt; }
    .day--rest { margin-bottom: 8pt; break-inside: avoid; }
    .day--rest .day-head { border-color: var(--rule); }
    .day--rest h2 { font-size: 13pt; }
    .train-chip, .rest-chip { flex: none; font-size: 8.5pt; color: var(--slate); }
    .block-title { margin: 10pt 0 3pt; }
    .empty-day { padding-top: 6pt; }

    .ex-card {
      padding: 8pt 0;
      border-bottom: 0.65pt solid var(--rule);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .ex-grid {
      display: grid;
      grid-template-columns: 82pt minmax(0, 1fr);
      align-items: start;
      gap: 10pt;
    }
    .ex-photo {
      height: 70pt;
      overflow: hidden;
      background: var(--mist);
    }
    .ex-photo img { width: 100%; height: 100%; object-fit: cover; }
    .ex-photo-placeholder {
      display: grid;
      height: 100%;
      place-items: center;
      font: 24pt Georgia, serif;
      color: var(--muted);
    }
    .ex-body h3 { margin: 2pt 0; font-size: 13pt; line-height: 1.2; }
    .ex-meta { margin: 0 0 5pt; font-size: 9pt; }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 3pt;
    }
    .stats--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .stats div { padding: 3pt; border-top: 0.65pt solid var(--rule); background: var(--mist); }
    .stats span, .stats strong { display: block; }
    .stats span { font-size: 7.5pt; }
    .stats strong { font-size: 10pt; }
    .ex-notes, .video-link { margin: 4pt 0 0; font-size: 9pt; }
    .video-link a { color: var(--slate); text-decoration: underline; }
    .footer { margin-top: 12pt; padding-top: 7pt; border-top: 0.65pt solid var(--rule); font-size: 8.5pt; }
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
  const logoSrc = new URL(
    publicAssets.brand.whiteLogo,
    window.location.origin,
  ).toString();
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
