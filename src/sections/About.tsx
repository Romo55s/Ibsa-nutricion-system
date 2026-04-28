import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import MarianaCasual from "../assets/mariana-casual.jpg";

export const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const expRef = useRef<HTMLParagraphElement>(null);
  const customRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".counters-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animar Experiencia (+5)
      const expObj = { value: 0 };
      tl.to(
        expObj,
        {
          value: 5,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (expRef.current) {
              expRef.current.innerText = `+${expObj.value.toFixed(0)}`;
            }
          },
        },
        0
      );

      // Animar Personalizado (100%)
      const customObj = { value: 0 };
      tl.to(
        customObj,
        {
          value: 100,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            if (customRef.current) {
              customRef.current.innerText = `${customObj.value.toFixed(0)}%`;
            }
          },
        },
        0
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre-mi"
      className="relative overflow-hidden bg-white py-16 sm:py-24"
      ref={sectionRef}
    >
      {/* Decorative Circle */}
      <div className="absolute right-0 top-20 -z-10 h-96 w-96 rounded-full bg-slate-50 opacity-70 mix-blend-multiply blur-3xl filter"></div>

      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20 lg:gap-28">
          {/* Columna Imagen */}
          <div className="relative flex justify-center md:justify-start">
            <div className="relative h-80 w-80 shrink-0 md:h-[480px] md:w-[480px]">
              <div className="absolute inset-0 scale-110 rounded-full border-2 border-slate-100"></div>
              <div className="absolute inset-0 scale-125 rounded-full border border-slate-200 opacity-50"></div>
              <img
                src={MarianaCasual}
                        alt="Mariana Ibarra Santos, nutrióloga clínica y deportiva especializada en recomposición corporal" 
                className="relative z-10 h-full w-full rounded-full border-4 border-white object-cover object-top shadow-2xl"
              />
              {/* Badge flotante */}
              <div className="absolute bottom-6 right-0 z-20 rounded-full border border-slate-100 bg-white px-6 py-3 shadow-lg">
                <span className="text-sm font-bold tracking-wider text-primary">
                  Mariana Ibarra Santos
                </span>
              </div>
            </div>
          </div>

          {/* Columna Texto */}
          <div>
            <div className="mb-4 inline-block">
              <span className="border-b border-accent/20 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Mi Historia
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-primary md:text-4xl">
              Más que una dieta, <br />{" "}
              <span className="text-primary-2/70">un estilo de vida.</span>
            </h2>

            <div className="space-y-4 text-lg font-light leading-relaxed text-slate-600">
              <p>
                En mi adolescencia, la delgadez me acomplejaba. Evitaba usar
                cierta ropa y no me sentía cómoda en mi propia piel. Decidí
                aprender a nutrirme para ganar fuerza y confianza, y ese proceso
                encendió mi pasión.
              </p>
              <p>
                Hoy, mi misión es acompañarte a ti. Ya seas atleta o simplemente
                busques mejorar tus hábitos, quiero que dejes de pelear con la
                báscula y empieces a celebrar lo que tu cuerpo es capaz de
                hacer.
              </p>
            </div>

            <div className="counters-container mt-10 grid grid-cols-2 gap-6 border-t border-slate-100 pt-8">
              <div>
                <p
                  ref={expRef}
                  className="mb-1 text-3xl font-bold text-primary"
                >
                  +0
                </p>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Años de experiencia
                </p>
              </div>
              <div>
                <p
                  ref={customRef}
                  className="mb-1 text-3xl font-bold text-primary"
                >
                  0%
                </p>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Personalizado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
