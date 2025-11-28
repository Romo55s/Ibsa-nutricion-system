import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MENU_ITEMS = [
  {
    text: "Consultorios",
    link: "#ubicaciones",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // Imagen de consultorio/espacio
  },
  {
    text: "Eventos",
    link: "#", // Podría ir a una sección futura
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // Gente reunida/charla
  },
  {
    text: "Retos Online", // Tercera opción sugerida
    link: "#",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // Gym/Fitness motivation
  }
];

export const FlowingMenu = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const list = listRef.current;

    if (!container || !image || !list) return;

    // Ocultar imagen inicialmente
    gsap.set(image, { opacity: 0, scale: 0.8 });

    const items = list.querySelectorAll(".menu-item");

    items.forEach((item, index) => {
      const itemImage = MENU_ITEMS[index].image;

      item.addEventListener("mouseenter", () => {
        // Cambiar imagen
        image.style.backgroundImage = `url(${itemImage})`;
        
        // Animar aparición
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Mover texto un poco
        gsap.to(item, { x: 20, duration: 0.4, ease: "power2.out", color: "#fff" });
        
        // Opacar otros items
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            gsap.to(otherItem, { opacity: 0.4, duration: 0.4 });
          }
        });
      });

      item.addEventListener("mouseleave", () => {
        // Animar desaparición
        gsap.to(image, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.out"
        });

        // Reset texto
        gsap.to(item, { x: 0, duration: 0.4, ease: "power2.out", color: "rgba(255,255,255,0.8)" });

        // Restaurar opacidad
        items.forEach((otherItem) => {
          gsap.to(otherItem, { opacity: 1, duration: 0.4 });
        });
      });
    });

    // Efecto de seguir el mouse (opcional para la imagen, aquí la dejaremos fija de fondo para estilo "Reveal")
    // Pero para hacerlo "Flowing" estilo reactbits, a veces la imagen flota.
    // Vamos a hacer que la imagen flote suavemente siguiendo el mouse dentro del contenedor
    const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(image, {
            x: x * 50, // Movimiento sutil
            y: y * 50,
            rotation: x * 5,
            duration: 1,
            ease: "power2.out"
        });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);

  }, []);

  return (
    <section ref={containerRef} className="relative py-24 bg-[#0A1626] overflow-hidden border-t border-white/5">
      
      {/* Fondo imagen reveal */}
      <div 
        ref={imageRef}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-0 pointer-events-none z-0 transition-transform duration-700"
        style={{ filter: "brightness(0.6) blur(2px)" }}
      ></div>

      {/* Overlay gradiente para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1626] via-[#0A1626]/80 to-transparent z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-12 ml-2">
            Explora Más
        </p>

        <ul ref={listRef} className="space-y-6">
          {MENU_ITEMS.map((item, i) => (
            <li key={i}>
              <a 
                href={item.link} 
                className="menu-item block text-5xl md:text-7xl lg:text-8xl font-bold text-white/80 cursor-pointer transition-colors"
                style={{ fontFamily: '"Albert Sans", sans-serif' }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

