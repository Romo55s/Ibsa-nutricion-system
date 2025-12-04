import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CertificationsModal } from "../components/CertificationsModal";

// Importar certificaciones
import CertificadoMujerAtleta from "../assets/Certificado-Mujer-Atleta.jpg";
import CertificadoRecomposicion from "../assets/Certificado-Recomposicion-Corporal.jpg";

export const Credibility = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const certifications = [
    {
      src: CertificadoMujerAtleta,
      alt: "Certificado de Nutrición en la Mujer Atleta",
      title: "Nutrición en la Mujer Atleta",
    },
    {
      src: CertificadoRecomposicion,
      alt: "Certificado de Recomposición Corporal",
      title: "Recomposición Corporal",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de texto (Izquierda)
      gsap.from(".cred-text-reveal", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Animación de Cards (Derecha) con Stagger
      gsap.from(".cred-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cred-grid", // Dispara cuando el grid entra
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-[#0A1626] text-white overflow-hidden relative" ref={sectionRef}>
      {/* Background sutil estilo "noise" o textura si se desea, por ahora limpio */}
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          
          {/* Columna Izquierda (Sticky o Parallax suave) */}
          <div className="lg:sticky lg:top-32">
            <div className="overflow-hidden mb-4">
                <p className="cred-text-reveal text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-2 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-blue-300"></span>
                  Confianza y Respaldo
                </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <div className="overflow-hidden"><div className="cred-text-reveal">Experiencia en</div></div>
              <div className="overflow-hidden"><div className="cred-text-reveal text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">campo real.</div></div>
            </h2>
            
            <div className="overflow-hidden">
                <p className="cred-text-reveal text-base md:text-lg text-slate-400 leading-relaxed max-w-md font-light">
                No solo es teoría. He trabajado mano a mano con atletas y personas activas en consultorios especializados y eventos oficiales. Entiendo el sudor, la exigencia y la realidad de tu día a día.
                </p>
            </div>
          </div>

          {/* Columna Derecha (Grid de Cards) */}
          <div className="cred-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="cred-card group bg-white/5 hover:bg-white/10 transition-colors duration-500 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="mb-6 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h8v4"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-200 transition-colors">Consultorios</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Atención presencial de alto nivel en <strong className="text-white">Phyn</strong> y <strong className="text-white">Rhino Training Complex</strong>, espacios diseñados para el rendimiento.
              </p>
            </div>

            <div className="cred-card group bg-white/5 hover:bg-white/10 transition-colors duration-500 p-8 rounded-2xl border border-white/5 backdrop-blur-sm sm:translate-y-8">
              <div className="mb-6 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-200 transition-colors">Charlas y Eventos</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ponencias en <strong className="text-white">WireMasters</strong> y colaboración oficial en la carrera <strong className="text-white">"Corriendo con causa"</strong>.
              </p>
            </div>

            <button
              onClick={() => setIsCertificationsOpen(true)}
              className="cred-card group bg-white/5 hover:bg-white/10 transition-colors duration-500 p-8 rounded-2xl border border-white/5 backdrop-blur-sm text-left cursor-pointer"
            >
              <div className="mb-6 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-200 transition-colors">Formación</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Actualización constante: 3er seminario de recomposición corporal y congreso de nutrición en la mujer atleta.
              </p>
              <p className="text-xs text-green-400 mt-3 font-medium group-hover:underline">
                Ver certificaciones →
              </p>
            </button>

            <div className="cred-card group bg-white/5 hover:bg-white/10 transition-colors duration-500 p-8 rounded-2xl border border-white/5 backdrop-blur-sm sm:translate-y-8">
              <div className="mb-6 w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform duration-300">
                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-200 transition-colors">Enfoque Humano</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Más allá de los macros. Trabajo desde la empatía, respetando tu historia, tus gustos y tu contexto personal.
              </p>
            </div>

          </div>
        </div>
      </div>

      <CertificationsModal
        isOpen={isCertificationsOpen}
        onClose={() => setIsCertificationsOpen(false)}
        certifications={certifications}
        selectedCertification={selectedCertification}
        onSelectCertification={setSelectedCertification}
      />
    </section>
  );
};


