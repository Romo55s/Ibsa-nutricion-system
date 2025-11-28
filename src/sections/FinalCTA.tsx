import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../components/Button";

export const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".final-cta-container", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(".cta-left", { x: -30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".cta-right", { x: 30, opacity: 0, duration: 0.8 }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        
        <div className="final-cta-container relative rounded-[3rem] overflow-hidden bg-[#0A1626] text-white shadow-2xl">
          
          {/* Background Gradients */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Left: Lead Magnet */}
            <div className="cta-left p-12 lg:p-20 flex flex-col justify-center items-start">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-widest uppercase mb-6">
                Recurso Gratuito
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Guía de Desayunos <br/> <span className="text-blue-400">Energéticos</span>
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Olvídate de empezar el día sin energía. Descarga mi guía con 5 recetas rápidas, deliciosas y perfectas para tu rendimiento.
              </p>
              <Button variant="ghost" className="border border-white/20 hover:bg-white hover:text-[#0A1626] transition-all duration-300">
                Descargar guía gratis
              </Button>
            </div>

            {/* Right: Main CTA */}
            <div className="cta-right p-12 lg:p-20 flex flex-col justify-center items-start lg:pl-24 bg-white/5 lg:bg-transparent">
               <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold tracking-widest uppercase mb-6">
                Agenda Abierta
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Tu transformación <br/> empieza <span className="text-green-400">hoy.</span>
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Reserva tu cita presencial u online. Analizaremos tu caso y diseñaremos el plan perfecto para ti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="https://cal.com/mariana-ibarra-santos" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="white" className="w-full justify-center border-none h-14 px-8">
                        Agendar ahora
                    </Button>
                </a>
                {/* Enlace directo a WhatsApp */}
                <a href="https://wa.me/524499409918" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="whatsapp" className="w-full justify-center h-14 px-8">
                        <div className="flex items-center gap-2">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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

