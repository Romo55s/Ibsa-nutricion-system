import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const TESTIMONIALS = [
  {
    name: "Andrea G.",
    type: "Paciente Atleta",
    text: "Me ayudó a subir masa muscular sin sentirme pesada en mis entrenamientos. Ahora rindo más y me siento mucho más segura con mi cuerpo.",
    stars: 5,
    initial: "A"
  },
  {
    name: "Carlos M.",
    type: "Recomposición Corporal",
    text: "Dejé de hacer dietas extremas y aprendí a comer mejor sin miedo a los carbohidratos. Los cambios se ven, pero sobre todo se sienten en mi energía.",
    stars: 5,
    initial: "C"
  },
  {
    name: "Sofía R.",
    type: "Consulta Online",
    text: "Aunque nuestras consultas fueron online, sentí un acompañamiento real. Ahora tengo hábitos que sí puedo sostener en mi día a día sin ansiedad.",
    stars: 5,
    initial: "S"
  }
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
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="review" className="py-24 bg-slate-50" ref={sectionRef}>
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
            Testimonios
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Historias que inspiran
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
            Resultados reales de personas que decidieron cambiar su relación con la comida y su cuerpo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, i) => (
            <div 
              key={i} 
              className="review-card bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              {/* Header: Avatar + Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#0A1626] text-white font-bold flex items-center justify-center text-lg shrink-0">
                  {item.initial}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-primary text-base">{item.name}</p>
                    <div className="flex text-yellow-400" aria-label={`${item.stars} estrellas`}>
                        {[...Array(item.stars)].map((_, i) => (
                        <svg key={i} width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">{item.type}</p>
                </div>
              </div>
              
              {/* Body: Texto */}
              <p className="text-slate-600 leading-relaxed text-[15px] italic">
                "{item.text}"
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


