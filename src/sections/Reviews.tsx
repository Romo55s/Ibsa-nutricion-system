import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const TESTIMONIALS = [
  {
    name: "Andrea G.",
    type: "Paciente Atleta",
    text: "Me ayudó a subir masa muscular sin sentirme pesada en mis entrenamientos. Ahora rindo más y me siento mucho más segura con mi cuerpo.",
    stars: 5,
    initial: "A",
  },
  {
    name: "Carlos M.",
    type: "Recomposición Corporal",
    text: "Dejé de hacer dietas extremas y aprendí a comer mejor sin miedo a los carbohidratos. Los cambios se ven, pero sobre todo se sienten en mi energía.",
    stars: 5,
    initial: "C",
  },
  {
    name: "Sofía R.",
    type: "Consulta Online",
    text: "Aunque nuestras consultas fueron online, sentí un acompañamiento real. Ahora tengo hábitos que sí puedo sostener en mi día a día sin ansiedad.",
    stars: 5,
    initial: "S",
  },
];

export const Reviews = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set inicial explícito
      gsap.set(".review-card", { opacity: 0, y: 50 });

      gsap.to(".review-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="review" className="bg-slate-50 py-16 sm:py-24" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Testimonios
          </p>
          <h2 className="mb-6 text-3xl font-bold text-primary md:text-5xl">
            Historias que inspiran
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-slate-500">
            Resultados reales de personas que decidieron cambiar su relación con
            la comida y su cuerpo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="review-card flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Header: Avatar + Info */}
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0A1626] text-lg font-bold text-white">
                  {item.initial}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-base font-bold text-primary">
                      {item.name}
                    </p>
                    <div
                      className="flex text-yellow-400"
                      aria-label={`${item.stars} estrellas`}
                    >
                      {[...Array(item.stars)].map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {item.type}
                  </p>
                </div>
              </div>

              {/* Body: Texto */}
              <p className="text-[15px] italic leading-relaxed text-slate-600">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
