import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import MainMariana from "../assets/main_mariana.jpeg";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-content > *", { opacity: 0, y: 40 });
      gsap.set(".hero-img-desktop", { opacity: 0, x: 60, scale: 0.92 });
      gsap.set(".hero-mobile-bg", { opacity: 0, scale: 1.1 });
      gsap.set(".hero-glow", { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-mobile-bg", {
        opacity: 1, scale: 1, duration: 1.8, ease: "power2.out",
      }, 0)
      .to(".hero-glow", {
        opacity: 1, duration: 2, ease: "power1.out",
      }, 0)
      .to(".hero-content > *", {
        y: 0, opacity: 1, duration: 1, stagger: 0.12,
      }, 0.3)
      .to(".hero-img-desktop", {
        x: 0, opacity: 1, duration: 1.4, scale: 1, ease: "power4.out",
      }, 0.5)
;

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative flex min-h-[100svh] items-end lg:items-center overflow-hidden bg-[#0A0E14] text-white"
      ref={containerRef}
    >
      {/* Mobile: Full-screen background image */}
      <div className="hero-mobile-bg absolute inset-0 lg:hidden">
        <img
          src={MainMariana}
          alt="Mariana Ibarra Santos - Nutrióloga clínica y deportiva en Aguascalientes"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-[#0A0E14]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E14]/60 via-transparent to-transparent h-32"></div>
      </div>

      {/* Desktop: Atmospheric background layers */}
      <div className="hero-glow pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.07] blur-[120px]"></div>
        <div className="absolute right-[15%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-slate-500/[0.05] blur-[100px]"></div>
        <div className="absolute right-0 top-0 h-full w-[60%] bg-gradient-to-l from-[#131820] to-transparent opacity-80"></div>
      </div>

      {/* Subtle noise texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }}></div>

      <div className="container relative z-10 mx-auto px-6 pt-24 pb-12 lg:grid lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12 xl:gap-20 lg:pt-28 lg:pb-16">
        {/* Content */}
        <div className="hero-content max-w-xl lg:pt-0 lg:py-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 backdrop-blur-sm lg:mb-8 lg:bg-white/[0.04] lg:border-white/[0.08] lg:px-4 lg:py-2 lg:text-[11px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
            Nutrición Clínica y Deportiva
          </div>

          <h1 className="mb-5 text-[2.6rem] font-bold leading-[0.92] tracking-tighter sm:mb-8 sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
            Pon tu cuerpo <br />
            <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
              en forma.
            </span>
          </h1>

          <p className="mb-7 max-w-sm text-[15px] font-light leading-relaxed text-slate-300 sm:mb-10 sm:max-w-md sm:text-lg lg:text-[17px] lg:leading-[1.7] lg:text-slate-400/90">
            Planes de nutrición 100% personalizados. Olvídate de las dietas
            restrictivas y enfócate en tu rendimiento, hábitos y bienestar real.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="https://cal.com/mariana-ibarra-santos"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="white"
                className="h-14 w-full border-none px-8 font-semibold sm:w-auto lg:h-[3.75rem] lg:px-10 lg:text-[15px]"
              >
                Agendar consulta
              </Button>
            </a>
            <Link
              to="/guia-desayunos-pre-entreno"
              className="relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-8 font-medium text-white transition-colors duration-300 hover:bg-white/5 sm:w-auto lg:h-[3.75rem] lg:px-10 lg:text-[15px]"
            >
              Guía de desayunos pre-entreno
            </Link>
          </div>

          {/* Specialties */}
          <div className="mt-8 flex flex-wrap gap-2 sm:mt-12 sm:gap-3 lg:mt-14 lg:gap-3 lg:border-t lg:border-white/[0.06] lg:pt-8">
            {["Recomposición", "Atletas", "Hábitos"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm lg:border-white/[0.08] lg:bg-white/[0.03] lg:px-4 lg:py-1.5 lg:text-[13px] lg:tracking-wide"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Mobile quote */}
          <div className="mt-6 border-l-2 border-blue-400/40 pl-4 lg:hidden">
            <p className="text-sm font-medium italic leading-snug text-white/80">
              "No es comer menos, es comer mejor."
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Mariana IBSA
            </p>
          </div>
        </div>

        {/* Desktop Image - Editorial Style */}
        <div className="hero-img-desktop group relative mt-10 hidden h-[80vh] max-h-[700px] w-full overflow-hidden rounded-[1.25rem] lg:mt-0 lg:block">
          {/* Subtle border glow */}
          <div className="absolute -inset-px rounded-[1.25rem] bg-gradient-to-b from-white/[0.08] via-transparent to-white/[0.04] z-20 pointer-events-none"></div>

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent opacity-50"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A0E14]/30 to-transparent opacity-60"></div>
          <img
            src={MainMariana}
            alt="Mariana Ibarra Santos - Nutrióloga clínica y deportiva en Aguascalientes"
            className="h-full w-full object-cover object-[center_30%] transition-transform duration-[1.5s] ease-out group-hover:scale-[1.01]"
          />

          {/* Floating Quote - desktop */}
          <div className="absolute bottom-10 left-10 z-20 max-w-[280px]">
            <div className="mb-3 h-px w-10 bg-gradient-to-r from-white/40 to-transparent"></div>
            <p className="mb-2 text-lg font-medium leading-snug text-white/90">
              "No es comer menos, es comer mejor."
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Mariana IBSA
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
