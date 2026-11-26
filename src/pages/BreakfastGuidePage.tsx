import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { assets } from "../assets";
import {
  closing,
  disclaimer,
  guideHero,
  guideIntro,
  guideMeta,
  principles,
  recipes,
  timingGuide,
} from "../data/breakfastGuideContent";

const Logo = assets.brand.logoWhite;

/** PDF estático en `public/` (generar con `npm run generate:pdf`). */
const pdfPublicPath = `/${guideMeta.pdfFileName}`;

const guideContents = {
  timing: { id: "timing-heading", title: timingGuide.title },
  principles: { id: "principles-heading", title: principles.title },
  recipes: { id: "recipes-heading", title: "Ideas de desayuno" },
  closing: { id: "closing-heading", title: closing.title },
} as const;

const GuidePdfDownload = () => (
  <Button
    href={pdfPublicPath}
    download={guideMeta.pdfFileName}
    className="w-full min-[400px]:w-auto print:hidden"
  >
    <span className="inline-flex items-center gap-3 text-left">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
        aria-hidden
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
      </svg>
      <span>
        <span className="block font-semibold">Descargar guía en PDF</span>
        <span className="block text-xs text-light">Gratis · listo para imprimir</span>
      </span>
    </span>
  </Button>
);

export const BreakfastGuidePage = () => {
  return (
    <div className="page">
      <a href="#main-content" className="skip-to-content" data-router-link>
        Saltar al contenido
      </a>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-20">
        <nav aria-label="Migas de pan" className="border-b border-light">
          <ol className="editorial-container flex flex-wrap items-center gap-x-3 py-1 text-sm">
            <li>
              <Link
                to="/"
                className="editorial-link min-h-11 font-medium text-accent hover:text-primary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Atrás
              </Link>
            </li>
            <li aria-hidden className="text-muted">
              /
            </li>
            <li className="py-1">
              <span className="font-medium text-muted" aria-current="page">
                Guía · Desayunos pre-entreno
              </span>
            </li>
          </ol>
        </nav>

        <article data-guide-pdf-root>
          <header className="editorial-container pb-10 pt-8 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14">
            <div className="flex flex-col gap-4 border-t border-primary pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex items-center gap-3">
                <img src={Logo} alt="" className="h-10 w-auto shrink-0 invert" />
                <div>
                  <p className="editorial-label text-accent">{guideHero.kicker}</p>
                  <p className="mt-1 text-sm font-medium text-primary-2">
                    {guideMeta.brandLine}
                  </p>
                </div>
              </div>
              <p className="max-w-[30ch] text-sm leading-snug text-muted sm:text-right">
                Nutrición clínica y deportiva · Material para personas activas
              </p>
            </div>

            <div className="mt-8 grid items-end gap-7 sm:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(13rem,17rem)] lg:gap-12">
              <div className="min-w-0">
                <h1 className="max-w-[15ch] font-display text-[clamp(2.75rem,6.6vw,6rem)] font-normal leading-[0.98] tracking-[-0.035em] text-primary">
                  {guideHero.title}
                </h1>
                <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-primary-2 sm:text-xl">
                  {guideHero.subtitle}
                </p>
              </div>

              <div className="flex min-w-0 flex-col items-start gap-3 border-t border-light pt-4 lg:border-0 lg:pt-0 print:hidden">
                <GuidePdfDownload />
                <p className="max-w-[32ch] text-sm leading-relaxed text-muted">
                  Misma guía en pantalla y en el archivo{" "}
                  <span className="break-words font-medium text-primary-2">
                    {guideMeta.pdfFileName.replace(".pdf", "")}
                  </span>
                  .
                </p>
              </div>
            </div>
          </header>

          <div className="border-t border-light">
            <div className="editorial-container editorial-section grid items-start lg:grid-cols-[minmax(0,42rem)_minmax(13rem,1fr)] lg:gap-12 xl:gap-20">
              <nav
                aria-labelledby="guide-contents-label"
                className="hidden border-t border-primary lg:sticky lg:col-start-2 lg:row-start-1 lg:top-28 lg:block lg:w-full lg:max-w-[17rem] lg:justify-self-end print:!hidden"
              >
                <p
                  id="guide-contents-label"
                  className="editorial-label pb-3 pt-4 text-accent"
                >
                  Contenido
                </p>
                <ul className="divide-y divide-light border-y border-light">
                  {Object.values(guideContents).map(({ id, title }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        data-router-link
                        className="editorial-link min-h-11 py-2 text-sm font-medium leading-snug text-primary-2 hover:text-primary"
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mx-auto w-full min-w-0 max-w-[42rem] space-y-12 text-base leading-relaxed text-primary-2 sm:space-y-16 lg:col-start-1 lg:row-start-1 lg:mx-0">
                <section
                  className="max-w-[65ch] space-y-4 text-lg"
                  aria-label="Introducción"
                >
                  {guideIntro.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>

                <section aria-labelledby={guideContents.timing.id}>
                  <h2
                    id={guideContents.timing.id}
                    tabIndex={-1}
                    className="editorial-heading scroll-mt-[100px] border-t border-light pt-5 text-primary"
                  >
                    {guideContents.timing.title}
                  </h2>
                  <dl className="mt-6 divide-y divide-light bg-mist px-4 sm:px-6">
                    {timingGuide.rows.map((row) => (
                      <div
                        key={row.window}
                        className="grid gap-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4"
                      >
                        <dt className="font-semibold text-primary">
                          {row.window}
                        </dt>
                        <dd>{row.focus}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section aria-labelledby={guideContents.principles.id}>
                  <h2
                    id={guideContents.principles.id}
                    tabIndex={-1}
                    className="editorial-heading scroll-mt-[100px] border-t border-light pt-5 text-primary"
                  >
                    {guideContents.principles.title}
                  </h2>
                  <ul className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
                    {principles.items.map((item) => (
                      <li key={item.title} className="border-t border-light pt-4">
                        <h3 className="text-lg font-semibold leading-snug text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-2">{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby={guideContents.recipes.id}>
                  <h2
                    id={guideContents.recipes.id}
                    tabIndex={-1}
                    className="editorial-heading scroll-mt-[100px] border-t border-light pt-5 text-primary"
                  >
                    {guideContents.recipes.title}
                  </h2>
                  <ol className="mt-6 space-y-10 sm:mt-8 sm:space-y-12">
                    {recipes.map((recipe) => (
                      <li
                        key={recipe.name}
                        className="group grid items-start gap-5 border-t border-light pt-8 first:border-0 first:pt-0 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8 sm:first:grid-cols-1"
                      >
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full bg-mist object-cover sm:aspect-square sm:group-first:aspect-[16/9]"
                        />

                        <div className="min-w-0">
                          <p className="editorial-label text-muted">
                            {recipe.timingLabel.replace(/^Ideal\s*/, "")}
                          </p>
                          <h3 className="mt-2 font-display text-[1.75rem] font-normal leading-tight text-primary sm:text-[2rem]">
                            {recipe.name}
                          </h3>

                          <div className="mt-5">
                            <p className="editorial-label text-accent">
                              Ingredientes
                            </p>
                            <ul
                              className="mt-2 list-disc space-y-1 pl-5 marker:text-muted"
                              aria-label={`Ingredientes: ${recipe.name}`}
                            >
                              {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient}>{ingredient}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-5 border-l-2 border-light pl-4">
                            <p className="editorial-label text-accent">Tip</p>
                            <p className="mt-1">{recipe.tip}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                <section
                  className="bg-primary p-6 text-white sm:p-8"
                  aria-labelledby={guideContents.closing.id}
                >
                  <h2
                    id={guideContents.closing.id}
                    tabIndex={-1}
                    className="editorial-heading scroll-mt-[100px]"
                  >
                    {guideContents.closing.title}
                  </h2>
                  <p className="mt-4 max-w-[55ch]">{closing.body}</p>
                  <a
                    href={closing.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full min-[400px]:w-auto"
                  >
                    <Button
                      variant="white"
                      className="w-full justify-center min-[400px]:w-auto"
                    >
                      {closing.bookingCtaLabel}
                    </Button>
                  </a>
                </section>

                <footer className="space-y-6 border-t border-light pt-6">
                  <p className="border-l-2 border-light bg-mist p-4 text-muted sm:p-5">
                    {disclaimer}
                  </p>
                  <GuidePdfDownload />
                  <p className="text-sm text-muted">
                    © {new Date().getFullYear()} IBSA Nutrición · Mariana Ibarra
                    Santos
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
