import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../components/Button";

export const Locations = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Establecer estado inicial explícito
      gsap.set(".location-card", { opacity: 0, y: 50 });

      // 2. Animar hacia el estado visible
      gsap.to(".location-card", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // Disparar un poco antes
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ubicaciones" className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em]  text-accent mb-4">
            Consultorios
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A1626] mb-6">
            Dónde Encontrarme
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
            Atención presencial en Aguascalientes con instalaciones de primera calidad para tu valoración.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Location 1: PHYN */}
          <div className="location-card group bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div className="h-64 w-full bg-slate-200 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.1540578128697!2d-102.31600402414107!3d21.928628156263454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429efff5f098053%3A0x3dc06dbfdf576df9!2sPhyn%20Clinic%20-%20Terapia%20F%C3%ADsica%2C%20Nutrici%C3%B3n%2C%20Psicolog%C3%ADa!5e0!3m2!1ses!2smx!4v1764278102518!5m2!1ses!2smx" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
              <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full text-xs font-bold shadow-lg text-[#0A1626]">
                📍 Norte
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#0A1626] mb-2">PHYN</h3>
              <p className="text-slate-500 mb-6">Clínica de Fisioterapia y Nutrición Integral</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <p>Av. Independencia 1860, Jardines de la Concepción II, 20120 Aguascalientes, Ags.</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <p>Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a href="https://cal.com/mariana-ibarra-santos" target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto sm:flex-1">
                    <Button variant="primary" className="w-full h-12 justify-center text-sm font-semibold shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20">
                        Agendar Cita
                    </Button>
                </a>
                <a href="https://maps.app.goo.gl/ZEK3HJoQ9CEmrpAc9" target="_blank" rel="noreferrer" className="block w-full sm:w-auto sm:flex-1">
                    <Button variant="outline" className="w-full h-12 justify-center text-sm text-slate-600 border-slate-200 hover:border-[#0A1626] hover:text-[#0A1626] bg-white">
                        <div className="flex items-center justify-center gap-2">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            <span>Ubicación</span>
                        </div>
                    </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Location 2: Rhino Training Complex */}
          <div className="location-card group bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div className="h-64 w-full bg-slate-200 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.2588194476048!2d-102.31308112414114!3d21.924599356407207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ef04e0d08349%3A0xb195acaca5e83e2!2sRhino%20Training%20Complex!5e0!3m2!1ses!2smx!4v1764278122584!5m2!1ses!2smx" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
              <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full text-xs font-bold shadow-lg text-[#0A1626]">
                📍 Sur
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#0A1626] mb-2">Rhino Training Complex</h3>
              <p className="text-slate-500 mb-6">Centro de Alto Rendimiento y Nutrición Deportiva</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <p>Av. Convención de 1914 Sur 1005, Las Américas, 20230 Aguascalientes, Ags.</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <p>Sábados: 9:00 AM - 2:00 PM</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a href="https://cal.com/mariana-ibarra-santos" target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto sm:flex-1">
                    <Button variant="primary" className="w-full h-12 justify-center text-sm font-semibold shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20">
                        Agendar Cita
                    </Button>
                </a>
                <a href="https://maps.app.goo.gl/xaLjnoggPbZvW86z7" target="_blank" rel="noreferrer" className="block w-full sm:w-auto sm:flex-1">
                    <Button variant="outline" className="w-full h-12 justify-center text-sm text-slate-600 border-slate-200 hover:border-[#0A1626] hover:text-[#0A1626] bg-white">
                        <div className="flex items-center justify-center gap-2">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            <span>Ubicación</span>
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

