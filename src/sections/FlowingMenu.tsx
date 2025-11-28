import React, { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import EventoCarrera from "../assets/Evento-Carrera-portada.jpg";
import EventoCarrera1 from "../assets/Evento-Carrera-1.jpg";
import EventoCarrera3 from "../assets/Evento-Carrera-4.jpg";
import ConsultorioPhyn from "../assets/Phyn-1.jpg";
import ConsultorioPhyn2 from "../assets/Phyn-2.jpg";
import RhinoGym from "../assets/Rhino-Gym-2.jpg";

interface MenuItemProps {
  link: string;
  text: string;
  images: string[];
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const MenuItem: React.FC<MenuItemProps> = ({ link, text, images }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, "<"); // Run concurrently
  };

  const repeatedMarqueeContent = useMemo(() => {
    return Array.from({ length: 10 }).map((_, idx) => {
      // Ciclar a través de las imágenes disponibles
      const currentImage = images[idx % images.length];
      return (
        <React.Fragment key={idx}>
          <span className="text-[#0A1626] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0] whitespace-nowrap">{text}</span>
          <div
            className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
        </React.Fragment>
      );
    });
  }, [text, images]);

  return (
    <div className="flex-1 relative overflow-hidden text-center border-b border-white/10 bg-[#0A1626]" ref={itemRef}>
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] z-10 hover:text-[#0A1626] transition-colors duration-300"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%] z-20"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

// Datos del Menú
const MENU_ITEMS = [
  { 
    text: "Eventos", 
    link: "/evento", 
    images: [EventoCarrera, EventoCarrera1, EventoCarrera3]
  },
  { 
    text: "Consultorios", 
    link: "#ubicaciones", 
    images: [ConsultorioPhyn, ConsultorioPhyn2, RhinoGym]
  },
  { 
    text: "Recetario", 
    link: "#recetario", 
    images: ["https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=600&auto=format&fit=crop&fm=webp"]
  },
  { 
    text: "Comunidad", 
    link: "#comunidad", 
    images: ["https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop&fm=webp"] // Imagen de grupo de personas/comunidad
  }
];

export const FlowingMenu = () => {
  return (
    <section className="bg-[#0A1626] py-0"> 
        <div style={{ height: '600px', position: 'relative' }}>
            <div className="w-full h-full overflow-hidden">
                <nav className="flex flex-col h-full m-0 p-0">
                    {MENU_ITEMS.map((item, idx) => (
                        <MenuItem key={idx} {...item} />
                    ))}
                </nav>
            </div>
        </div>
    </section>
  );
};
