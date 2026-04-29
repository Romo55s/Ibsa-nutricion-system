/**
 * Contenido de la guía de desayunos pre-entreno.
 * Edita aquí para actualizar la página y el PDF exportado (misma fuente).
 * Imágenes en `public/guide/` para URLs estables en web y en el HTML del PDF (Puppeteer).
 */

export const guideMeta = {
  documentTitle: "Guía gratuita · Desayunos pre-entreno | IBSA Nutrición",
  pdfFileName: "IBSA-guia-desayunos-pre-entreno.pdf",
  brandLine: "IBSA Nutrición · Clínica y Deportiva",
} as const;

export const guideHero = {
  kicker: "Recurso gratuito",
  title: "Desayunos pre-entreno",
  subtitle:
    "Ideas prácticas para desayunar antes de entrenar: energía digestible, buen rendimiento y sin complicarte la vida.",
} as const;

export const guideIntro = {
  paragraphs: [
    "Esta guía está pensada para personas que entrenan por la mañana y necesitan un desayuno que aporte combustible sin pesar en el estómago.",
    "No sustituye una valoración personalizada: tus horarios, tolerancia digestiva y objetivos son únicos. Úsala como punto de partida y ajusta porciones con tu nutrióloga.",
  ],
} as const;

export const timingGuide = {
  title: "¿Cuánto tiempo antes de entrenar?",
  rows: [
    {
      window: "3 h o más",
      focus:
        "Desayuno más completo: puedes incluir más fibra y algo más de grasa si te sienta bien.",
    },
    {
      window: "1,5 – 3 h",
      focus:
        "Mezcla de carbohidratos + proteína moderada; grasas en cantidad razonable según tolerancia.",
    },
    {
      window: "60 – 90 min",
      focus:
        "Prioriza carbohidratos de digestión cómoda; texturas suaves o líquidas suelen funcionar mejor.",
    },
    {
      window: "Menos de 60 min",
      focus:
        "Algo pequeño y rápido: fruta, tostada sencilla o batido ligero; evita platos muy grandes.",
    },
  ],
} as const;

export const principles = {
  title: "Claves para el pre-entreno matutino",
  items: [
    {
      title: "Carbohidratos primero",
      body: "Son tu combustible principal. Elige fuentes que ya sabes que te sientan bien antes de correr o levantar.",
    },
    {
      title: "Proteína en dosis razonable",
      body: "Ayuda a la saciedad y al mantenimiento muscular; no hace falta un plato enorme justo antes de salir al gym.",
    },
    {
      title: "Grasa y fibra: a tu tolerancia",
      body: "Si te sientes pesado o con molestias, reduce grasas muy pesadas y fibra abundante en la comida previa al entreno.",
    },
    {
      title: "Hidratación desde que amaneces",
      body: "Agua o té; si sudas mucho o hace calor, puedes acompañar con una bebida con electrolitos según tu plan.",
    },
  ],
} as const;

export type GuideRecipe = {
  name: string;
  timingLabel: string;
  /** Ruta pública bajo `public/` (p. ej. `/guide/photo.png`). */
  imageUrl: string;
  imageAlt: string;
  ingredients: string[];
  tip: string;
};

export const recipes: GuideRecipe[] = [
  {
    name: "Overnight oats express",
    timingLabel: "Ideal ~90–120 min antes",
    imageUrl: "/guide/overnight-oats.png",
    imageAlt: "Tarrito de avena overnight con frutos rojos y semillas",
    ingredients: [
      "40–50 g avena en hojuelas",
      "150–200 ml leche o bebida vegetal",
      "1 yogur griego natural (opcional, si lo toleras)",
      "½ plátano en rodajas o frutos rojos",
      "Canela o vainilla al gusto",
    ],
    tip: "Pruébalo un día de entreno ligero; si lo digieres bien, queda perfecto para días de mayor volumen.",
  },
  {
    name: "Tostadas integrales + fruta",
    timingLabel: "Ideal ~1,5–2,5 h antes",
    imageUrl: "/guide/toastadas-fruta.png",
    imageAlt: "Tostadas integrales con fruta",
    ingredients: [
      "2 rebanadas pan integral",
      "Mermelada sin azúcar añadida o miel en moderación",
      "1 plátano o 1 pieza de fruta de tu elección",
      "Opcional: 1 huevo cocido si entrenas varias horas después",
    ],
    tip: "Combinación clásica, rápida y fácil de ajustar según hambre.",
  },
  {
    name: "Batido pre-entreno",
    timingLabel: "Ideal ~45–90 min antes",
    imageUrl: "/guide/batido-pre-entreno.png",
    imageAlt: "Batido o smoothie de fruta en vaso, pre-entreno",
    ingredients: [
      "1 plátano congelado o natural",
      "30–40 g avena en hojuelas",
      "250 ml leche o bebida vegetal",
      "Opcional: scoop de proteína o yogur si lo toleras",
    ],
    tip: "Útil cuando tienes poco tiempo; bebe con calma para no sentir molestias.",
  },
  {
    name: "Tortilla + pan integral + cítrico",
    timingLabel: "Ideal ~2–3 h antes",
    imageUrl: "/guide/tortilla-pan.png",
    imageAlt: "Tortilla o huevo con pan integral y cítrico",
    ingredients: [
      "2 huevos enteros o 3 claras + 1 yema",
      "1 rebanada pan integral",
      "½ naranja o mandarina",
      "Verdura finamente picada al gusto (opcional)",
    ],
    tip: "Más saciante; mejor cuando el entreno no es inmediato.",
  },
  {
    name: "Yogur + granola en porción medida",
    timingLabel: "Ideal ~60–120 min antes",
    imageUrl: "/guide/yogurt-granola.png",
    imageAlt: "Bol con yogur, granola y frutos rojos",
    ingredients: [
      "1 yogur griego natural",
      "20–30 g granola (revisa etiqueta: menos azúcar añadido)",
      "Frutos rojos o kiwi",
    ],
    tip: "Si la granola es muy alta en fibra, reduce porción los días que entrenas muy pronto.",
  },
  {
    name: "Waffle o hotcake integral liviano",
    timingLabel: "Ideal ~1,5–2 h antes",
    imageUrl: "/guide/waffle.png",
    imageAlt: "Waffle o hotcake integral con fruta",
    ingredients: [
      "1 porción de mezcla integral casera o comercial",
      "Miel o maple en moderación",
      "Fruta fresca",
    ],
    tip: "Buen plan domingo–gym; evita exceso de jarabe si el entreno es en menos de 90 min.",
  },
];

export const closing = {
  title: "Siguiente paso",
  body: "Si quieres ajustar porciones a tu gasto energético, objetivos y horarios reales, agenda una consulta en IBSA Nutrición.",
  bookingUrl: "https://cal.com/mariana-ibarra-santos",
  bookingCtaLabel: "Agendar ahora",
} as const;

export const disclaimer =
  "Material educativo. No reemplaza diagnóstico ni tratamiento médico. Ante patologías, alergias o molestias digestivas, consulta a un profesional de la salud.";
