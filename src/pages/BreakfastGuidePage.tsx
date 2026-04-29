import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
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
import Logo from "../assets/Logo-IBSA-White.svg";

gsap.registerPlugin(ScrollTrigger);

/** PDF estático en `public/` (generar con `npm run generate:pdf`). */
const pdfPublicPath = `/${guideMeta.pdfFileName}`;

export const BreakfastGuidePage = () => {
  const pageRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = guideMeta.documentTitle;
    return () => {
      document.title = prev;
    };
  }, []);

  useLayoutEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline();
      introTl
        .from(".guide-breadcrumb", {
          opacity: 0,
          y: -10,
          duration: 0.55,
          ease: "power2.out",
        })
        .from(
          ".guide-toolbar",
          {
            opacity: 0,
            y: -18,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2"
        );

      gsap.from(".guide-doc-header .guide-header-reveal", {
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.11,
        ease: "power3.out",
        delay: 0.08,
      });

      gsap.utils
        .toArray<HTMLElement>(".guide-scroll-section")
        .forEach((section) => {
          const items = section.querySelectorAll(":scope > .guide-reveal-item");
          if (!items.length) return;
          gsap.from(items, {
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 36,
            duration: 0.78,
            stagger: 0.07,
            ease: "power3.out",
          });
        });

      gsap.utils.toArray<HTMLElement>(".guide-timing-row").forEach((row, i) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: i % 2 === 0 ? -20 : 20,
          duration: 0.65,
          ease: "power2.out",
        });
      });

      gsap.utils
        .toArray<HTMLElement>(".guide-principle-card")
        .forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: i * 0.04,
            ease: "power3.out",
          });
        });

      gsap.utils.toArray<HTMLElement>(".guide-recipe-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 48,
          duration: 0.88,
          ease: "power3.out",
        });
      });

      gsap.from(".guide-closing-block", {
        scrollTrigger: {
          trigger: ".guide-closing-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 32,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(".guide-footer-block .guide-footer-line", {
        scrollTrigger: {
          trigger: ".guide-footer-block",
          start: "top 94%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 12,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido
      </a>
      <Navbar />

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#2E8BFF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#0A1626]/5 blur-3xl" />
      </div>

      <main id="main-content" className="relative z-10 pb-16 pt-20">
        <div ref={pageRootRef} className="relative z-10">
          <nav
            aria-label="Migas de pan"
            className="guide-breadcrumb border-b border-[rgba(10,22,38,0.07)] bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(248,249,251,0.88)_50%,rgba(255,255,255,0.9)_100%)] shadow-[inset_0_-1px_0_rgba(46,139,255,0.06)] backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-3xl items-center px-4 py-3.5 sm:px-6">
              <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[13px] sm:text-sm">
                <li>
                  <Link
                    to="/"
                    className="group inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 font-medium text-primary transition-colors hover:text-[#2E8BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E8BFF]/30"
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
                      className="text-muted transition-transform group-hover:-translate-x-0.5 group-hover:text-[#2E8BFF]"
                      aria-hidden
                    >
                      <path d="M19 12H5" />
                      <path d="M12 19l-7-7 7-7" />
                    </svg>
                    Atrás
                  </Link>
                </li>
                <li className="flex items-center px-1 text-muted" aria-hidden>
                  <span className="mx-0.5 h-1 w-1 shrink-0 rotate-45 bg-[#2E8BFF]/75" />
                </li>
                <li>
                  <span
                    className="rounded-md px-1.5 py-0.5 font-semibold tracking-tight text-primary-2"
                    aria-current="page"
                  >
                    Guía · Desayunos pre-entreno
                  </span>
                </li>
              </ol>
            </div>
          </nav>

          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="guide-toolbar mb-8 mt-6 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Misma guía en pantalla y en el archivo{" "}
                <span className="whitespace-nowrap font-medium text-primary-2">
                  {guideMeta.pdfFileName.replace(".pdf", "")}
                </span>
                .
              </p>
              <a
                href={pdfPublicPath}
                download={guideMeta.pdfFileName}
                className="guide-download-btn group relative inline-flex min-h-[52px] shrink-0 items-center justify-center gap-3 overflow-hidden rounded-full border border-[#0A1626] bg-[#0A1626] px-6 py-3.5 pl-5 text-left shadow-[0_10px_40px_-10px_rgba(10,22,38,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#2E8BFF]/55 hover:shadow-[0_16px_48px_-12px_rgba(46,139,255,0.35),0_0_0_1px_rgba(126,184,255,0.2)_inset]"
              >
                <span
                  className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-[opacity,transform] duration-500 disabled:opacity-0 group-hover:translate-x-[220%] group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-[#2E8BFF]/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 disabled:opacity-0 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-[background-color,box-shadow] duration-300 group-hover:bg-[#2E8BFF]/25 group-hover:ring-[#7EB8FF]/40">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#E8F1FF]"
                    aria-hidden
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
                  </svg>
                </span>
                <span className="relative flex min-w-0 flex-col items-start gap-0.5">
                  <span className="text-[15px] font-semibold tracking-tight text-white">
                    Descargar guía en PDF
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#7EB8FF]/90">
                    Gratis · listo para imprimir
                  </span>
                </span>
              </a>
            </div>

            <article
              data-guide-pdf-root
              className="overflow-hidden rounded-2xl border border-[rgba(10,22,38,0.06)] bg-white shadow-elev-3"
            >
              <header className="guide-doc-header relative bg-gradient-to-br from-[#0A1626] via-[#0A1626] to-[#222D3B] px-6 py-10 text-white sm:px-10 sm:py-12">
                <div
                  className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-[#2E8BFF]/20 blur-3xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/20 to-transparent"
                  aria-hidden
                />
                <div className="guide-header-reveal relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                      <img src={Logo} alt="" className="h-9 w-auto" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7EB8FF]">
                        {guideHero.kicker}
                      </p>
                      <p className="text-sm font-medium text-slate-300">
                        {guideMeta.brandLine}
                      </p>
                    </div>
                  </div>
                  <p className="max-w-xs text-right text-xs leading-relaxed text-slate-400 sm:text-sm">
                    Nutrición clínica y deportiva · Material para personas
                    activas
                  </p>
                </div>
                <h1 className="guide-header-reveal relative mt-8 max-w-2xl font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl sm:leading-tight">
                  {guideHero.title}
                </h1>
                <p className="guide-header-reveal relative mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {guideHero.subtitle}
                </p>
              </header>

              <div className="guide-pdf-body space-y-12 px-8 py-11 sm:px-12 sm:py-14">
                <section
                  className="guide-scroll-section guide-block-intro space-y-4"
                  aria-label="Introducción"
                >
                  {guideIntro.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="guide-reveal-item text-base leading-relaxed text-primary-2"
                    >
                      {p}
                    </p>
                  ))}
                </section>

                <section
                  className="guide-scroll-section"
                  aria-labelledby="timing-heading"
                >
                  <div className="guide-reveal-item mb-4 flex items-center gap-3">
                    <span
                      className="h-8 w-1 rounded-full bg-[#2E8BFF]"
                      aria-hidden
                    />
                    <h2
                      id="timing-heading"
                      className="text-xl font-semibold text-primary"
                    >
                      {timingGuide.title}
                    </h2>
                  </div>
                  <ul className="divide-y divide-[rgba(10,22,38,0.08)] overflow-hidden rounded-xl border border-[rgba(10,22,38,0.06)] bg-[#fafbfc]">
                    {timingGuide.rows.map((row) => (
                      <li
                        key={row.window}
                        className="guide-timing-row flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-6 sm:py-4"
                      >
                        <span className="shrink-0 text-sm font-semibold text-[#2E8BFF] sm:w-36">
                          {row.window}
                        </span>
                        <span className="text-sm leading-relaxed text-muted">
                          {row.focus}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="guide-scroll-section"
                  aria-labelledby="principles-heading"
                >
                  <div className="guide-reveal-item mb-6 flex items-center gap-3">
                    <span
                      className="h-8 w-1 rounded-full bg-[#2E8BFF]"
                      aria-hidden
                    />
                    <h2
                      id="principles-heading"
                      className="text-xl font-semibold text-primary"
                    >
                      {principles.title}
                    </h2>
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {principles.items.map((item) => (
                      <li
                        key={item.title}
                        className="guide-principle-card rounded-xl border border-[rgba(10,22,38,0.06)] bg-white p-4 shadow-elev-1"
                      >
                        <h3 className="font-semibold text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="guide-scroll-section"
                  aria-labelledby="recipes-heading"
                >
                  <div className="guide-reveal-item mb-6 flex items-center gap-3">
                    <span
                      className="h-8 w-1 rounded-full bg-[#2E8BFF]"
                      aria-hidden
                    />
                    <h2
                      id="recipes-heading"
                      className="text-xl font-semibold text-primary"
                    >
                      Ideas de desayuno
                    </h2>
                  </div>
                  <ol className="space-y-10">
                    {recipes.map((recipe, index) => {
                      const reversed = index % 2 === 1;
                      return (
                        <li
                          key={recipe.name}
                          className="guide-recipe-card group relative overflow-hidden rounded-2xl border border-[rgba(10,22,38,0.09)] bg-white shadow-[0_1px_0_rgba(10,22,38,0.04),0_12px_32px_-20px_rgba(10,22,38,0.14)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:border-[#2E8BFF]/30 hover:shadow-[0_14px_36px_-18px_rgba(46,139,255,0.2)]"
                        >
                          <div
                            className={`grid sm:grid-cols-[5fr_6fr] ${
                              reversed ? "sm:[&>*:first-child]:order-2" : ""
                            }`}
                          >
                            <div className="guide-recipe-media relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-[#222D3B] via-[#0A1626] to-[#0A1626] sm:aspect-auto sm:min-h-[280px]">
                              <img
                                src={recipe.imageUrl}
                                alt={recipe.imageAlt}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                              />
                              <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0A1626]/55 via-transparent to-transparent"
                                aria-hidden
                              />
                              <div
                                className={`pointer-events-none absolute top-4 z-10 flex items-center gap-2 ${
                                  reversed ? "right-4" : "left-4"
                                }`}
                              >
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A1626] shadow-[0_4px_18px_-4px_rgba(10,22,38,0.45)] backdrop-blur">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E8BFF]" />
                                  {recipe.timingLabel.replace(/^Ideal\s*/, "")}
                                </span>
                              </div>
                            </div>

                            <div className="guide-recipe-body relative flex flex-col gap-4 p-6 sm:p-7">
                              <span
                                className={`absolute top-0 hidden h-12 w-[3px] rounded-full bg-gradient-to-b from-[#2E8BFF] to-[#2E8BFF]/0 sm:block ${
                                  reversed ? "right-0" : "left-0"
                                }`}
                                aria-hidden
                              />
                              <div>
                                <h3 className="font-sans text-xl font-bold leading-tight tracking-tight text-primary sm:text-[1.35rem]">
                                  {recipe.name}
                                </h3>
                              </div>

                              <div className="guide-recipe-ingredients">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted">
                                  Ingredientes
                                </p>
                                <ul
                                  className="mt-3 border-t border-[rgba(10,22,38,0.1)]"
                                  aria-label={`Ingredientes: ${recipe.name}`}
                                >
                                  {recipe.ingredients.map((ing) => (
                                    <li
                                      key={ing}
                                      className="flex gap-3.5 border-b border-[rgba(10,22,38,0.06)] py-2.5 last:border-b-0"
                                    >
                                      <span
                                        className="mt-[0.65em] h-px w-5 shrink-0 bg-[#2E8BFF]"
                                        aria-hidden
                                      />
                                      <span className="min-w-0 text-[14px] font-normal leading-[1.72] text-primary-2 antialiased">
                                        {ing}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <blockquote className="mt-auto border-l-[3px] border-[#2E8BFF] py-0.5 pl-4">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2E8BFF]">
                                  Tip
                                </p>
                                <p className="mt-2 text-[14px] leading-relaxed text-primary-2">
                                  {recipe.tip}
                                </p>
                              </blockquote>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </section>

                <section
                  className="guide-closing-block rounded-xl bg-gradient-to-br from-[#0A1626] to-[#222D3B] px-6 py-8 text-white"
                  aria-labelledby="closing-heading"
                >
                  <h2
                    id="closing-heading"
                    className="text-lg font-semibold text-white"
                  >
                    {closing.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {closing.body}
                  </p>
                  <div className="mt-5">
                    <a
                      href={closing.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full min-[400px]:w-auto"
                    >
                      <Button
                        variant="white"
                        className="h-12 w-full justify-center border-none px-8 min-[400px]:w-auto"
                      >
                        {closing.bookingCtaLabel}
                      </Button>
                    </a>
                  </div>
                </section>

                <footer className="guide-footer-block border-t border-[rgba(10,22,38,0.08)] pt-6">
                  <p className="guide-footer-line text-center text-[11px] leading-relaxed text-muted">
                    {disclaimer}
                  </p>
                  <p className="guide-footer-line mt-4 text-center text-xs text-muted">
                    © {new Date().getFullYear()} IBSA Nutrición · Mariana Ibarra
                    Santos
                  </p>
                </footer>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
