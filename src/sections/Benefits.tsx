import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Estado inicial: invisible y desplazado
      gsap.set(".benefit-card", { opacity: 0, y: 50 });

      // Animación de entrada
      gsap.to(".benefit-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Inicia un poco antes para asegurar que se vea al scrollear
          toggleActions: "play none none reverse",
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="bg-white py-16 text-[#0A1626]"
      id="beneficios"
      ref={sectionRef}
    >
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-20 max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Resultados Reales
          </h2>
          <p className="max-w-2xl text-xl font-light leading-relaxed text-slate-500">
            Te acompaño a conseguir tu físico anhelado y a construir hábitos
            sostenibles, sin dejar de disfrutar tu vida social.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1 - Large */}
          <div className="benefit-card group rounded-3xl bg-slate-50 p-10 transition-all hover:bg-[#0A1626] hover:text-white">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-white/10 group-hover:text-white">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <h3 className="mb-4 text-3xl font-bold">Masa Muscular</h3>
            <p className="text-lg font-light leading-relaxed opacity-80">
              Estrategias de hipertrofia y fuerza adaptadas a tu entrenamiento.
              Optimiza tu composición corporal con ciencia, no con mitos.
            </p>
          </div>

          {/* Card 2 */}
          <div className="benefit-card group rounded-3xl bg-slate-50 p-10 transition-all hover:bg-[#0A1626] hover:text-white">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-white/10 group-hover:text-white">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-8s-3 4-6 4c-1 0-2.5-2-4-2s-3 2-4 2c-3 0-6-4-6-4s3 8 6 8c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M10 2c1 .5 2 2 2 5" />
              </svg>
            </div>
            <h3 className="mb-4 text-3xl font-bold">Hábitos Reales</h3>
            <p className="text-lg font-light leading-relaxed opacity-80">
              Construye un estilo de vida flexible. Aprende a comer en cualquier
              situación sin ansiedad y sin efecto rebote.
            </p>
          </div>

          {/* Card 3 */}
          <div className="benefit-card group rounded-3xl bg-slate-50 p-10 transition-all hover:bg-[#0A1626] hover:text-white">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-white/10 group-hover:text-white">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
              </svg>
            </div>
            <h3 className="mb-4 text-3xl font-bold">Relación Sana</h3>
            <p className="text-lg font-light leading-relaxed opacity-80">
              Deja atrás la culpa y el miedo a la comida. Un enfoque no
              peso-centrista que prioriza tu salud mental y física por igual.
            </p>
          </div>

          {/* Card 4 */}
          <div className="benefit-card group rounded-3xl bg-slate-50 p-10 transition-all hover:bg-[#0A1626] hover:text-white">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:bg-white/10 group-hover:text-white">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3 className="mb-4 text-3xl font-bold">Autoestima</h3>
            <p className="text-lg font-light leading-relaxed opacity-80">
              Sentirte fuerte y capaz transforma tu confianza. Celebra lo que tu
              cuerpo puede hacer y recupera tu seguridad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
