/** Stable URLs for files served directly from `public/`. */
export const publicAssets = {
  brand: {
    whiteLogo: "/brand/ibsa-logo-white.svg",
    favicon: "/brand/favicon.ico",
    favicon16: "/brand/favicon-16x16.png",
    favicon32: "/brand/favicon-32x32.png",
    appleTouchIcon: "/brand/apple-touch-icon.png",
    androidIcon192: "/brand/android-chrome-192x192.png",
    androidIcon512: "/brand/android-chrome-512x512.png",
    webManifest: "/brand/site.webmanifest",
  },
  guide: {
    overnightOats: "/images/guide/overnight-oats.webp",
    toastadasFruta: "/images/guide/toastadas-fruta.webp",
    batidoPreEntreno: "/images/guide/batido-pre-entreno.webp",
    tortillaPan: "/images/guide/tortilla-pan.webp",
    yogurtGranola: "/images/guide/yogurt-granola.webp",
    waffle: "/images/guide/waffle.webp",
  },
  exercises: {
    baseUrl: "/images/exercises/",
    wallSit: "/images/exercises/wall-sit.webp",
  },
} as const;
