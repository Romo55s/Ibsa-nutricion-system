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
    overnightOats: "/images/guide/overnight-oats-25ac460ce7.webp",
    toastadasFruta: "/images/guide/toastadas-fruta-8b6d6aefad.webp",
    batidoPreEntreno: "/images/guide/batido-pre-entreno-0a73638b30.webp",
    tortillaPan: "/images/guide/tortilla-pan-705c7d941b.webp",
    yogurtGranola: "/images/guide/yogurt-granola-f7679c5ceb.webp",
    waffle: "/images/guide/waffle-93f74aab20.webp",
  },
  people: {
    formalHero: {
      avif640: "/images/people/mariana-hero-formal-640-57555a6b72.avif",
      avif768: "/images/people/mariana-hero-formal-768-a6176cc170.avif",
      avif960: "/images/people/mariana-hero-formal-960-3278f598b4.avif",
      webp640: "/images/people/mariana-hero-formal-640-68cd794834.webp",
      webp768: "/images/people/mariana-hero-formal-768-8ca6ce8bb3.webp",
      webp960: "/images/people/mariana-hero-formal-960-df7126412b.webp",
    },
  },
  exercises: {
    baseUrl: "/images/exercises/",
    wallSit: "/images/exercises/wall-sit-0a21274362.webp",
  },
} as const;
