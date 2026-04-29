import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".final-cta-container", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(".cta-left", { x: -30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".cta-right", { x: 30, opacity: 0, duration: 0.8 }, "-=0.8");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24" id="recetario" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="final-cta-container relative overflow-hidden rounded-[3rem] bg-[#0A1626] text-white shadow-2xl">
          {/* Background Gradients */}
          <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-600/20 blur-[120px]"></div>
          <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-purple-600/10 blur-[100px]"></div>

          <div className="relative z-10 grid divide-y divide-white/10 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {/* Left: Lead Magnet */}
            <div className="cta-left flex flex-col items-start justify-center p-8 sm:p-12 lg:p-20">
              <div className="mb-6 inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-300">
                Recurso Gratuito
              </div>
              <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                Guía de desayunos <br />{" "}
                <span className="text-blue-400">pre-entreno</span>
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                Ideas prácticas para desayunar antes de entrenar: energía
                digestible y enfoque fitness, en PDF con la marca IBSA para que
                lo uses o lo compartas.
              </p>
              <Link
                to="/guia-desayunos-pre-entreno"
                className="relative inline-flex min-h-[44px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-white hover:text-[#0A1626]"
              >
                Ver guía y descargar PDF
              </Link>
            </div>

            {/* Right: Main CTA */}
            <div className="cta-right flex flex-col items-start justify-center bg-white/5 p-8 sm:p-12 lg:bg-transparent lg:p-20 lg:pl-24">
              <div className="mb-6 inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-300">
                Agenda Abierta
              </div>
              <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                Tu transformación <br /> empieza{" "}
                <span className="text-green-400">hoy.</span>
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                Reserva tu cita presencial u online. Analizaremos tu caso y
                diseñaremos el plan perfecto para ti.
              </p>
              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                <a
                  href="https://cal.com/mariana-ibarra-santos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="white"
                    className="h-14 w-full justify-center border-none px-8"
                  >
                    Agendar ahora
                  </Button>
                </a>
                {/* Enlace directo a WhatsApp */}
                <a
                  href="https://wa.me/524499409918"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="whatsapp"
                    className="h-14 w-full justify-center px-8"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      <span>WhatsApp</span>
                    </div>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
