import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { publicAssets } from "../assets";

const formalPortrait = publicAssets.people.formalHero;
const formalPortraitSizes =
  "(max-width: 767px) 100vw, (max-width: 1163px) 55vw, 640px";

export const Hero = () => (
  <section className="bg-white pt-20">
    <div className="editorial-container md:grid md:grid-cols-[45fr_55fr] md:items-center md:py-12 lg:py-16">
      <div className="py-10 sm:py-12 md:py-0 md:pr-8 xl:pr-16">
        <p className="editorial-label text-muted">Mariana Ibarra Santos</p>
        <h1 className="mt-5 font-display text-[clamp(3.25rem,6.7vw,6rem)] leading-[0.99] tracking-[-0.045em]">
          Nutrición clínica{" "}
          <em className="block font-normal">y deportiva en Aguascalientes.</em>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-accent lg:text-lg">
          Planes personalizados de nutrición clínica y deportiva para mejorar tu
          rendimiento, composición corporal y hábitos, sin dietas restrictivas.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Button
            href="https://cal.com/mariana-ibarra-santos"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar consulta
          </Button>
          <Link
            to="/guia-desayunos-pre-entreno"
            className="editorial-link min-h-11 text-sm font-semibold"
          >
            Guía de desayunos pre-entreno{" "}
            <span className="editorial-link-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
      <div className="-mx-[var(--page-gutter)] flex items-end justify-center md:mx-0 md:justify-end">
        <picture className="block w-full md:max-w-[640px]">
          <source
            type="image/avif"
            srcSet={`${formalPortrait.avif640} 640w, ${formalPortrait.avif768} 768w, ${formalPortrait.avif960} 960w`}
            sizes={formalPortraitSizes}
          />
          <source
            type="image/webp"
            srcSet={`${formalPortrait.webp640} 640w, ${formalPortrait.webp768} 768w, ${formalPortrait.webp960} 960w`}
            sizes={formalPortraitSizes}
          />
          <img
            src={formalPortrait.webp640}
            srcSet={`${formalPortrait.webp640} 640w, ${formalPortrait.webp768} 768w, ${formalPortrait.webp960} 960w`}
            sizes={formalPortraitSizes}
            width={1064}
            height={1478}
            alt="Mariana Ibarra Santos con uniforme clínico azul marino y cinta métrica."
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="block max-h-[62vh] w-full object-contain object-bottom sm:max-h-[72vh]"
          />
        </picture>
      </div>
    </div>
  </section>
);
