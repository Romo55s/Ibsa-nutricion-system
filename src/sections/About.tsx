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
                toggleActions: "play none none reverse"
            }
        });

        // Animar Experiencia (+5)
        const expObj = { value: 0 };
        tl.to(expObj, {
            value: 5,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                if (expRef.current) {
                    expRef.current.innerText = `+${expObj.value.toFixed(0)}`;
                }
            }
        }, 0);

        // Animar Personalizado (100%)
        const customObj = { value: 0 };
        tl.to(customObj, {
            value: 100,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
                if (customRef.current) {
                    customRef.current.innerText = `${customObj.value.toFixed(0)}%`;
                }
            }
        }, 0);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre-mi" className="py-24 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Decorative Circle */}
      <div className="absolute right-0 top-20 w-96 h-96 bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>

      <div className="container mx-auto px-6 max-w-6xl">
         <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 md:gap-48 items-center">
            
            {/* Columna Imagen */}
            <div className="relative flex justify-center md:justify-start">
                <div className="relative w-80 h-80 md:w-[480px] md:h-[480px] shrink-0">
                    <div className="absolute inset-0 rounded-full border-2 border-slate-100 scale-110"></div>
                    <div className="absolute inset-0 rounded-full border border-slate-200 scale-125 opacity-50"></div>
                    <img 
                        src={MarianaCasual} 
                        alt="Mariana Casual" 
                        className="w-full h-full object-cover object-top rounded-full shadow-2xl border-4 border-white relative z-10"
                    />
                    {/* Badge flotante */}
                    <div className="absolute bottom-6 right-0 z-20 bg-white shadow-lg rounded-full px-6 py-3 border border-slate-100">
                        <span className="text-sm font-bold text-primary tracking-wider">Mariana Ibarra Santos</span>
                    </div>
                </div>
            </div>

            {/* Columna Texto */}
            <div>
                <div className="inline-block mb-4">
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase border-b border-accent/20 pb-1">
                        Mi Historia
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                    Más que una dieta, <br/> <span className="text-primary-2/70">un estilo de vida.</span>
                </h2>
                
                <div className="space-y-4 text-slate-600 leading-relaxed text-lg font-light">
                    <p>
                        En mi adolescencia, la delgadez me acomplejaba. Evitaba usar cierta ropa y no me sentía cómoda en mi propia piel. Decidí aprender a nutrirme para ganar fuerza y confianza, y ese proceso encendió mi pasión.
                    </p>
                    <p>
                        Hoy, mi misión es acompañarte a ti. Ya seas atleta o simplemente busques mejorar tus hábitos, quiero que dejes de pelear con la báscula y empieces a celebrar lo que tu cuerpo es capaz de hacer.
                    </p>
                </div>

                <div className="counters-container mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 gap-6">
                    <div>
                        <p ref={expRef} className="text-3xl font-bold text-primary mb-1">+0</p>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Años de experiencia</p>
                    </div>
                    <div>
                        <p ref={customRef} className="text-3xl font-bold text-primary mb-1">0%</p>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Personalizado</p>
                    </div>
                </div>
            </div>

         </div>
      </div>
    </section>
  );
};


