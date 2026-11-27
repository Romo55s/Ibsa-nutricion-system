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
      avif640: "/images/people/mariana-hero-formal-640-e7bfaa7eef.avif",
      avif768: "/images/people/mariana-hero-formal-768-5231b064d3.avif",
      avif960: "/images/people/mariana-hero-formal-960-dbf75a09b1.avif",
      avif1064: "/images/people/mariana-hero-formal-1064-6d3d19f91b.avif",
      webp640: "/images/people/mariana-hero-formal-640-e90eaa751a.webp",
      webp768: "/images/people/mariana-hero-formal-768-48b49f5a46.webp",
      webp960: "/images/people/mariana-hero-formal-960-6dbd614dbb.webp",
      webp1064: "/images/people/mariana-hero-formal-1064-6e22c76665.webp",
    },
  },
  exercises: {
    baseUrl: "/images/exercises/",
    wallSit: "/images/exercises/wall-sit-0a21274362.webp",
  },
} as const;
