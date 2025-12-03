import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { EventImageGallery } from "../components/EventImageGallery";
import { EventModal } from "../components/EventModal";
import { EventImageCard } from "../components/EventImageCard";

// Importar imágenes locales de carrera
import Evento1 from "../assets/Evento-Carrera-1.jpg";
import Evento2 from "../assets/Eveneto-Carrera-2.jpg";
import Evento3 from "../assets/Evento Carrera-3.jpg";
import Evento4 from "../assets/Evento-Carrera-4.jpg";
import EventoPortada from "../assets/Evento-Carrera-portada-2.jpg";

// Importar imágenes de Wire Masters
import WireMasters1 from "../assets/mariana-empresa-1.jpg";
import WireMasters2 from "../assets/mariana-empresa-2.jpg";
import WireMasters3 from "../assets/mariana-empresa-3.jpg";
import WireMasters4 from "../assets/mariana-empresa-4.jpg";

// Importar imagen de comunidad
import ComunidadMariana from "../assets/comunidad-mariana.jpeg";
// @ts-ignore - JPG files
import WireMasters5 from "../assets/mariana-empresa-5.JPG";
// @ts-ignore - JPG files
import WireMasters6 from "../assets/mariana-empresa-6.JPG";
// @ts-ignore - JPG files
import WireMasters7 from "../assets/mariana-empresa-7.JPG";
// @ts-ignore - JPG files
import WireMasters8 from "../assets/mariana-empresa-8.JPG";
// @ts-ignore - JPG files
import WireMasters9 from "../assets/mariana-empresa-9.JPG";
// @ts-ignore - JPG files
import WireMasters10 from "../assets/mariana-empresa-10.JPG.JPG";

// Imágenes de Wire Masters
const wireMastersImages = [
  { src: WireMasters3, alt: "Equipo de Phyn Clinic", description: "Mariana Ibarra y el equipo de Phyn Clinic" },
  { src: WireMasters4, alt: "Mariana Ibarra entregando regalos al publico", description: "Compartiendo conocimientos sobre nutrición deportiva y su aplicación práctica en el rendimiento" },
  { src: WireMasters5, alt: "Audiencia tomando notas", description: "Audiencia tomando notas de la conferencia" },
  { src: WireMasters6, alt: "Finalizacion de la conferencia", description: "Compartiendo conocimientos especializados sobre cómo la nutrición impacta el rendimiento y la recuperación deportiva" },
  { src: WireMasters7, alt: "Mariana Ibarra conectando con la audiencia en Wire Masters", description: "Interacción con profesionales y atletas durante la conferencia, respondiendo preguntas y compartiendo experiencias" },
  { src: WireMasters8, alt: "Momento de la conferencia Wire Masters", description: "Experiencias y aprendizajes compartidos sobre nutrición deportiva y bienestar integral" },
  { src: WireMasters9, alt: "Entrega de certificados", description: "Reconociendo a la audencia" },
  { src: WireMasters10, alt: "Evento Wire Masters sobre nutrición y los demas servicios de Phyn Clinic", description: "Conferencia completa sobre nutrición deportiva, conectando teoría con práctica para profesionales y atletas" },
];

const carreraImages = [
  { src: EventoPortada, alt: "Inicio de la carrera", description: "El momento de inicio donde todos comienzan juntos" },
  { src: Evento1, alt: "Corredores en acción", description: "Participantes dando lo mejor de sí en cada kilómetro" },
  { src: Evento2, alt: "Haciendo fila para ser atendidos", description: "Estiramiento post carrera" },
  { src: Evento3, alt: "Pacientes comiendo su fruta post carrera", description: "Participando en este evento especial" },
  { src: Evento4, alt: "Pacientes disfrutando de la fruta", description: "Celebrando cada logro y meta cumplida" },
];

export const EventPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMoreCarrera, setShowMoreCarrera] = useState(false);
  const [showMoreWire, setShowMoreWire] = useState(false);
  const [renderCarreraGallery, setRenderCarreraGallery] = useState(false);
  const [renderWireGallery, setRenderWireGallery] = useState(false);
  
  // Modal state
  const [activeEvent, setActiveEvent] = useState<{
    title: string;
    description: string;
    date: string;
    location: string;
    details: string[];
  } | null>(null);

  // Image modal state
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const imageModalRef = useRef<HTMLDivElement>(null);
  
  // Refs for gallery animations
  const carreraGalleryRef = useRef<HTMLDivElement>(null);
  const wireGalleryRef = useRef<HTMLDivElement>(null);

  // Refs for scroll
  const eventsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToEvents = () => {
    if (eventsSectionRef.current) {
      eventsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .from(".hero-desc", {
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6");

      // Animar secciones al hacer scroll
      const sections = gsap.utils.toArray<HTMLElement>(".fade-in-section");
      sections.forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle gallery render state for Carrera
  useEffect(() => {
    if (showMoreCarrera) {
      setRenderCarreraGallery(true);
    }
  }, [showMoreCarrera]);

  // Gallery animations - Carrera
  useLayoutEffect(() => {
    if (!carreraGalleryRef.current) return;
    
    const items = carreraGalleryRef.current.querySelectorAll('.event-image-card');
    
    if (items.length === 0) return;
    
    if (showMoreCarrera) {
      // Animation in - slide down
      gsap.fromTo(items, 
        { 
          opacity: 0, 
          y: 30, 
          scale: 0.95 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1
        }
      );
    } else {
      // Animation out - slide up
      gsap.to(items, {
        opacity: 0,
        y: -30,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          setRenderCarreraGallery(false);
          // Reset styles after animation
          gsap.set(items, { clearProps: "all" });
        }
      });
    }
  }, [showMoreCarrera, renderCarreraGallery]);

  // Handle gallery render state for Wire Masters
  useEffect(() => {
    if (showMoreWire) {
      setRenderWireGallery(true);
    }
  }, [showMoreWire]);

  // Gallery animations - Wire Masters
  useLayoutEffect(() => {
    if (!wireGalleryRef.current) return;
    
    const items = wireGalleryRef.current.querySelectorAll('.event-image-card');
    
    if (items.length === 0) return;
    
    if (showMoreWire) {
      // Animation in - slide down
      gsap.fromTo(items,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1
        }
      );
    } else {
      // Animation out - slide up
      gsap.to(items, {
        opacity: 0,
        y: -30,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          setRenderWireGallery(false);
          // Reset styles after animation
          gsap.set(items, { clearProps: "all" });
        }
      });
    }
  }, [showMoreWire, renderWireGallery]);

  // Image modal animation
  useLayoutEffect(() => {
    if (selectedImage && imageModalRef.current) {
      const modal = imageModalRef.current;
      const img = modal.querySelector("img");
      
      gsap.set(modal, { opacity: 0 });
      gsap.set(img, { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(modal, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.2)"
      }, "-=0.2");
    }
  }, [selectedImage]);

  const closeImageModal = () => {
    if (imageModalRef.current && selectedImage) {
      const modal = imageModalRef.current;
      const img = modal.querySelector("img");
      
      const tl = gsap.timeline({
        onComplete: () => setSelectedImage(null)
      });
      
      tl.to(img, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      })
      .to(modal, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.1");
    } else {
      setSelectedImage(null);
    }
  };

  const openEventModal = (eventTitle: string) => {
    if (eventTitle === "Los mejores eventos") {
      setActiveEvent({
        title: "Los Mejores Eventos",
        date: "Todo el año",
        location: "Diversas Sedes",
        description: "Desde carreras locales hasta conferencias internacionales. Cada experiencia suma a nuestra comunidad y nos permite crecer profesional y personalmente.",
        details: [
          "Networking con profesionales de la salud",
          "Actualización constante en nutrición deportiva",
          "Participación activa en la comunidad runner",
          "Talleres y workshops especializados"
        ]
      });
    } else if (eventTitle === "Corriendo con Causa") {
      setActiveEvent({
        title: "Corriendo con Causa",
        date: "23-25 Enero",
        location: "Aguascalientes",
        description: "Más que una carrera, es una celebración de lo que podemos lograr juntos. Cada kilómetro es una historia de superación, salud y comunidad.",
        details: [
          "Distancias: 5k, 10k y 21k",
          "Categorías varonil y femenil",
          "Puntos de hidratación cada 2.5km",
          "Kit de recuperación al finalizar",
          "Parte de lo recaudado se dona a fundaciones locales"
        ]
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#0A1626] text-white" ref={containerRef}>
      <Navbar />
      
      <main className="flex-grow pt-20 relative z-10">
        
        {/* Hero Section / Header - Dark Background */}
        <section className="container mx-auto px-6 mb-20 pt-12">
          <Link to="/" className="inline-flex items-center gap-2 text-[#CED0D3] hover:text-white transition-colors mb-12 group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            Regresar al inicio
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-5">
              <h1 className="hero-title text-[120px] md:text-[180px] font-bold leading-[0.8] tracking-tighter text-[#2E8BFF] opacity-90 mb-4">
                2025
              </h1>
              <h2 className="hero-subtitle text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-6">
                Eventos & <br/> Conferencias
              </h2>
              <p className="hero-desc text-lg text-[#CED0D3] leading-relaxed max-w-md mb-8">
                Calendario de actividades, carreras y conferencias donde comparto mi pasión por la nutrición y el deporte.
              </p>
              {/* Removed "Ver Próximos" button as requested */}
            </div>
            <div className="lg:col-span-7 relative">
              <div 
                className="relative aspect-[16/9] overflow-hidden rounded-none md:rounded-lg filter grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                onClick={() => setSelectedImage({ src: EventoPortada, alt: "Evento Principal" })}
              >
                <img 
                  src={EventoPortada} 
                  alt="Evento Principal" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Text Section - Centered */}
        <section className=" mb-20 text-center fade-in-section bg-white p-24 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
              Encuentra tu <span className="text-[#2E8BFF]">Evento Perfecto</span>
            </h2>
            <p className="text-lg text-[#707274] max-w-3xl mx-auto leading-relaxed">
              Descubre los mejores eventos deportivos y conferencias. He seleccionado los mejores eventos en los que he participado para que puedas conocer más sobre mi trabajo.
            </p>
            <div className="mt-8">
              <Button 
                variant="primary" 
                onClick={scrollToEvents}
                className="bg-[#2E8BFF] hover:bg-[#0A1626] text-white transition-all shadow-lg hover:shadow-xl border-none"
              >
                  Explorar Todo
              </Button>
            </div>
        </section>

        {/* Mosaic / Collage Section - Dark Background */}
        <section className="container mx-auto px-6 mb-32 fade-in-section" ref={eventsSectionRef}>
          <div className="grid md:grid-cols-12 gap-4 md:gap-6">
            
            {/* Left: Silhouette / Image */}
            <div 
                className="md:col-span-4 relative h-[400px] md:h-auto overflow-hidden bg-[#111] cursor-pointer group"
                onClick={() => setSelectedImage({ src: Evento1, alt: "Silueta Evento" })}
            >
                <img 
                    src={Evento1} 
                    alt="Silueta Evento" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Middle: Blue Box with Text */}
            <div className="md:col-span-4 bg-[#2E8BFF] p-8 flex flex-col justify-center items-start text-white relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-3xl font-bold mb-4 relative z-10">Los mejores eventos</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6 relative z-10">
                    Desde carreras locales hasta conferencias internacionales. Cada experiencia suma a nuestra comunidad.
                </p>
                <div className="relative z-10 mt-auto">
                   <button 
                     onClick={() => openEventModal("Los mejores eventos")}
                     className="text-xs font-bold tracking-[0.2em] uppercase border-b border-white/40 pb-1 hover:border-white transition-colors"
                   >
                     Leer más
                   </button>
                </div>
            </div>

            {/* Right: Image or Text Block */}
            <div className="md:col-span-4 bg-[#222D3B] p-8 flex flex-col justify-center">
                 <p className="text-[#CED0D3] text-sm leading-7 font-light">
                    "Participar en estos eventos me permite conectar con personas increíbles y compartir el mensaje de salud real y sostenible."
                 </p>
                 <p className="text-white font-bold mt-4 text-sm uppercase tracking-widest">— Mariana Ibarra</p>
            </div>

            {/* Bottom Row Images Strip */}
            <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {[
                  { src: WireMasters6, alt: "Finalizacion de la conferencia" },
                  { src: Evento3, alt: "Momentos de esfuerzo" },
                  { src: WireMasters4, alt: "Entrega de regalos de parte de Phyn Clinic" },
                  { src: EventoPortada, alt: "Meta alcanzada" }
                ].map((imgData, idx) => (
                    <div 
                      key={idx} 
                      className="aspect-square relative overflow-hidden group cursor-pointer bg-[#111]"
                      onClick={() => setSelectedImage(imgData)}
                    >
                        <div className="absolute inset-0">
                            <img 
                                src={imgData.src} 
                                alt={imgData.alt} 
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        {/* Small legend overlay that scales with image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 transform group-hover:scale-110 origin-center">
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Ver Foto</span>
                            <span className="w-8 h-[1px] bg-[#2E8BFF] mt-1"></span>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Blue Banner / Follow Us */}
        <section className="bg-[#2E8BFF] py-16 mb-32 fade-in-section">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-4xl font-bold text-white mb-2">Sígueme en Redes</h3>
                <p className="text-white/80 text-lg mb-6">@ibsa.nutricion</p>
                <div className="flex justify-center gap-6">
                    {/* Instagram */}
                    <a href="https://www.instagram.com/ibsa.nutricion/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#0A1626] transition-colors">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/mariana-ibarra0407" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#0A1626] transition-colors">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        {/* Featured Event 1 (Carrera) - Dark Background */}
        <section className="container mx-auto px-6 mb-32 fade-in-section">
            <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5">
                     <p className="text-[#2E8BFF] text-sm font-bold tracking-widest uppercase mb-3">23-25 Enero, Aguascalientes</p>
                     <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">Corriendo con Causa</h3>
                     <p className="text-[#CED0D3] text-lg leading-relaxed mb-8 font-light">
                        Más que una carrera, es una celebración de lo que podemos lograr juntos. Cada kilómetro es una historia de superación, salud y comunidad.
                     </p>
                     <div className="flex flex-wrap gap-4">
                       <Button 
                         variant="white" 
                         className="px-8 shadow-lg hover:shadow-xl transition-all"
                         onClick={() => openEventModal("Corriendo con Causa")}
                       >
                          Ver Detalles
                       </Button>
                       <button
                         onClick={() => setShowMoreCarrera(!showMoreCarrera)}
                         className="px-8 py-4 rounded-full border-2 border-[#13253a] text-[#ffffff] bg-transparent hover:bg-[#2E8BFF] hover:text-white transition-all duration-300 font-medium"
                       >
                          {showMoreCarrera ? "Ocultar Fotos" : "Ver Galería"}
                       </button>
                     </div>
                </div>
                <div className="md:col-span-7">
                    <div 
                        className="aspect-[16/10] bg-[#111] relative overflow-hidden group rounded-2xl cursor-pointer"
                        onClick={() => setSelectedImage({ src: EventoPortada, alt: "Inicio de la carrera" })}
                    >
                        <img src={EventoPortada} alt="Carrera" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    </div>
                    {/* Dynamic Gallery for Carrera */}
                    {(showMoreCarrera || renderCarreraGallery) && (
                        <div ref={carreraGalleryRef} className="mt-6">
                           <EventImageGallery 
                             images={carreraImages} 
                             columns={3}
                             onImageClick={(image) => setSelectedImage({ src: image.src, alt: image.alt })}
                           />
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Featured Event 2 (Wire Masters) - WHITE CONTAINER as per reference layout "Boomtown" section */}
        <section className="w-full bg-white text-[#0A1626] py-12 md:py-20 lg:py-32 mb-0 fade-in-section">
             <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-7 order-2 md:order-1">
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div 
                                className="aspect-[3/4] overflow-hidden rounded-lg md:rounded-xl cursor-pointer group"
                                onClick={() => setSelectedImage({ src: WireMasters4, alt: "Mariana Ibarra presentando sobre carbohidratos simples y complejos en Wire Masters" })}
                            >
                                <img src={WireMasters4} alt="Mariana Ibarra presentando sobre carbohidratos en Wire Masters" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                            </div>
                            <div 
                                className="aspect-[3/4] overflow-hidden mt-6 md:mt-12 rounded-lg md:rounded-xl cursor-pointer group"
                                onClick={() => setSelectedImage({ src: WireMasters6, alt: "Mariana Ibarra y co-presentadora frente a la audiencia en Wire Masters" })}
                            >
                                <img src={WireMasters6} alt="Mariana Ibarra presentando frente a la audiencia en Wire Masters" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-5 order-1 md:order-2 text-left mb-8 md:mb-0">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#0A1626] mb-3 md:mb-4">Wire Masters</h3>
                        <p className="text-[#2E8BFF] font-bold tracking-widest uppercase text-sm md:text-base mb-4 md:mb-8">15-16 Mayo</p>
                        <p className="text-[#535B67] text-base md:text-lg leading-relaxed mb-6 md:mb-10 font-normal">
                            Una conferencia vibrante sobre nutrición y rendimiento deportivo. Un espacio donde se reúnen profesionales de la salud, atletas y entusiastas para compartir conocimientos.
                        </p>
                        <div className="flex flex-wrap gap-4 items-start">
                            <Button 
                                variant="primary"
                                onClick={() => setShowMoreWire(!showMoreWire)}
                                className="bg-[#153255] hover:bg-[#0A1626] text-white border-transparent hover:border-[#153255] px-6 md:px-8 text-sm md:text-base"
                            >
                                {showMoreWire ? "Ver Menos" : "Ver Todas las Fotos"}
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Dynamic Gallery for Wire */}
                {(showMoreWire || renderWireGallery) && (
                    <div ref={wireGalleryRef} className="mt-12">
                       <EventImageGallery 
                         images={wireMastersImages} 
                         columns={4}
                         onImageClick={(image) => setSelectedImage({ src: image.src, alt: image.alt })}
                       />
                    </div>
                )}
             </div>
        </section>

        {/* Join Us / Contact Section - Dark Bottom */}
        <section className="bg-[#050a12] py-24 fade-in-section">
            <div className="container mx-auto px-6">
                 <div className="grid md:grid-cols-2 gap-16">
                     <div>
                         <div 
                             className="aspect-video bg-[#111] overflow-hidden relative group cursor-pointer"
                             onClick={() => setSelectedImage({ src: ComunidadMariana, alt: "Únete a la comunidad" })}
                         >
                             <img src={ComunidadMariana} alt="Únete a la comunidad" className="w-full h-full object-cover object-[center_17%] opacity-60 group-hover:opacity-80 transition-opacity" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <span className="text-white text-2xl font-bold">Únete a la comunidad</span>
                             </div>
                         </div>
                     </div>
                     <div className="flex flex-col justify-center">
                         <h3 className="text-4xl font-bold text-white mb-6">¿Por qué participo?</h3>
                         <p className="text-[#CED0D3] mb-8 leading-relaxed">
                             Participar en eventos me conecta con mi ciudad y con personas que comparten la misma visión. No se trata solo de nutrición en el plato, sino de nutrir el espíritu.
                         </p>
                         <a href="https://cal.com/mariana-ibarra-santos" target="_blank" rel="noopener noreferrer">
                             <Button variant="primary" className="bg-[#153255] hover:bg-white hover:text-[#0A1626] text-white border-transparent">
                                 Agendar Consulta
                             </Button>
                         </a>
                     </div>
                 </div>
            </div>
        </section>
      </main>

      {activeEvent && (
        <EventModal 
          title={activeEvent.title}
          description={activeEvent.description}
          date={activeEvent.date}
          location={activeEvent.location}
          details={activeEvent.details}
          onClose={() => setActiveEvent(null)}
        />
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          ref={imageModalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-pointer"
          onClick={closeImageModal}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Cerrar"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-xl"
            />
            <p className="text-white text-center mt-4 text-lg font-semibold">{selectedImage.alt}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
