import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import DomeGallery from "../components/DomeGallery";

// Importar imágenes locales
import Evento1 from "../assets/Evento-Carrera-1.jpg";
import Evento2 from "../assets/Eveneto-Carrera-2.jpg";
import Evento3 from "../assets/Evento Carrera-3.jpg";
import Evento4 from "../assets/Evento-Carrera-4.jpg";
import EventoPortada from "../assets/Evento-Carrera-portada.jpg";

// Imágenes para la galería
const galleryImages = [
  { src: Evento1, alt: "Corredores en acción" },
  { src: Evento2, alt: "Momentos de esfuerzo" },
  { src: Evento3, alt: "Comunidad IBSA" },
  { src: Evento4, alt: "Meta alcanzada" },
  { src: EventoPortada, alt: "Inicio de la carrera" },
  { src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop", alt: "Corriendo juntos" }, // Extra para llenar
  { src: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1000&auto=format&fit=crop", alt: "Maratón" },
];

export const EventPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".event-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(".event-desc", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .from(".gallery-container", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="page min-h-screen flex flex-col relative overflow-hidden bg-[#0A1626]" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6">
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            Regresar al inicio
          </Link>

          {/* Header Section */}
          <div className="max-w-5xl mx-auto text-center mb-20">
            <div className="inline-block mb-6">
               <span className="px-5 py-2 rounded-full border border-blue-400/20 bg-blue-500/5 text-blue-300 text-xs font-bold tracking-[0.25em] uppercase backdrop-blur-sm">
                  Evento Anual
               </span>
            </div>
            <h1 className="event-title text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
              Corriendo con <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">Causa y Pasión</span>
            </h1>
            <p className="event-desc text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-light">
              Más que una carrera, es una celebración de lo que somos capaces de lograr juntos. 
              Cada kilómetro es una historia de superación, salud y comunidad.
            </p>
          </div>

          {/* 3D Gallery Section */}
          <div className="gallery-container relative h-[70vh] md:h-[85vh] w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#050B14]/80 backdrop-blur-sm shadow-2xl mb-32 group">
            <div className="absolute top-8 left-8 z-20 flex items-center gap-3 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md border border-white/10">
                    <span className="text-2xl">🖐️</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-white/90 border border-white/5">
                  Arrastra para explorar
                </div>
            </div>
            <DomeGallery 
                images={galleryImages} 
                overlayBlurColor="#050B14"
                imageBorderRadius="12px"
                openedImageBorderRadius="20px"
            />
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A1626] via-transparent to-transparent opacity-60" />
          </div>

          {/* Info & CTA */}
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 max-w-6xl mx-auto items-center mb-12  relative z-20">
            <div className="md:col-span-7 space-y-8 text-left bg-[#0A1626] rounded-[2.5rem] p-8">
                <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    ¿Por qué <br /> <span className="text-blue-400">participamos</span>?
                </h3>
                <div className="space-y-8 text-slate-300 text-lg leading-relaxed font-light">
                    <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mt-1">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <p className="text-slate-300">
                            Participar en carreras como "Corriendo con Causa" nos conecta con nuestra ciudad y con personas que comparten la misma visión: una vida activa y plena.
                        </p>
                    </div>
                    <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mt-1">
                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <p className="text-slate-300">
                            No se trata solo de nutrición en el plato, sino de nutrir el espíritu a través del deporte, la constancia y la convivencia sana.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="md:col-span-5 relative">
                {/* Decorative Blur behind card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 transform translate-y-4 pointer-events-none" />
                
                <div className="relative bg-[#0F1F32] border border-white/10 rounded-[2.5rem] p-8 md:p-10 text-center overflow-hidden group hover:border-white/20 transition-colors duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
                    
                    <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white">¿Listo para tu próximo reto?</h4>
                    <p className="text-slate-400 mb-10 leading-relaxed text-sm md:text-base">
                        Prepárate con un plan nutricional diseñado científicamente para maximizar tu rendimiento en la próxima carrera.
                    </p>
                    <a href="https://cal.com/mariana-ibarra-santos" target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Button variant="outline" className="w-full justify-center h-14 text-base bg-white !text-[#0A1626] hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-900/20 border-none font-bold">
                            Agendar Preparación
                        </Button>
                    </a>
                    
                    {/* Subtle pattern or glow inside card */}
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

