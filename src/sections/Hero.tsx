import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../components/Button";
import MainMariana from "../assets/main_mariana.jpeg";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Asegurar visibilidad inicial antes de animar
      gsap.set(".hero-content > *", { opacity: 0, y: 50 });
      gsap.set(".hero-img", { opacity: 0, x: 50, scale: 0.95 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-content > *", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1
      })
      .to(".hero-img", {
        x: 0,
        opacity: 1,
        duration: 1.2,
        scale: 1
      }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#0E1217] text-white overflow-hidden pt-20" ref={containerRef}>
      
      {/* Background Gradient Mesh */}
      <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-[#1A2332] to-transparent opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="hero-content max-w-xl pt-10 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-blue-300 mb-8 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Nutrición Clínica y Deportiva
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
            Pon tu cuerpo <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">en forma.</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 font-light max-w-md">
            Planes de nutrición 100% personalizados. Olvídate de las dietas restrictivas y enfócate en tu rendimiento, hábitos y bienestar real.
          </p>
          
              <div className="flex flex-wrap gap-4">
                <a href="https://cal.com/mariana-ibarra-santos" target="_blank" rel="noopener noreferrer">
                  <Button variant="white" className="h-14 px-8 border-none font-semibold">
                    Agendar consulta
                  </Button>
                </a>
                <a href="#recetario">
              <Button variant="ghost" className="h-14 px-8 border-white/20 hover:bg-white/5 text-white font-medium">
                Guía de desayunos gratis
              </Button>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 hidden sm:block">
             <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Especialista en</p>
             <div className="flex gap-6 text-slate-300 text-sm">
                <span>• Recomposición</span>
                <span>• Atletas</span>
                <span>• Hábitos</span>
             </div>
          </div>
        </div>

        {/* Right Image - Full Height / Magazine Style */}
        <div className="hero-img relative h-[500px] lg:h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl group mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1217] via-transparent to-transparent opacity-60 z-10"></div>
            <img 
                src={MainMariana} 
                alt="Mariana - Nutrióloga" 
                className="w-full h-full object-cover  transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            
            {/* Floating Quote */}
            <div className="absolute bottom-8 left-8 z-20 max-w-xs">
                <p className="text-xl font-medium text-white leading-snug mb-2">
                  "No es comer menos, es comer mejor."
                </p>
                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Mariana IBSA</p>
            </div>
        </div>

      </div>
    </section>
  );
};
