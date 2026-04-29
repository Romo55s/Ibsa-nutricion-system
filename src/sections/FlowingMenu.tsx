import React, { useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import EventoCarrera from "../assets/Evento-Carrera-portada.jpg";
import EventoCarrera1 from "../assets/Evento-Carrera-1.jpg";
import EventoCarrera3 from "../assets/Evento-Carrera-4.jpg";
import ConsultorioPhyn from "../assets/Phyn-1.jpg";
import ConsultorioPhyn2 from "../assets/Phyn-2.jpg";
import CertificadoMujerAtleta from "../assets/Certificado-Mujer-Atleta.jpg";
import CertificadoRecomposicionCorporal from "../assets/Certificado-Recomposicion-Corporal.jpg";
import RhinoGym from "../assets/Rhino-Gym-2.jpg";
import { CertificationsModal } from "../components/CertificationsModal";

interface MenuItemProps {
  link: string;
  text: string;
  images: string[];
  onClick?: () => void;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const MenuItem: React.FC<MenuItemProps> = ({ link, text, images, onClick }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }).to(
      marqueeInnerRef.current,
      { y: edge === "top" ? "101%" : "-101%" },
      "<"
    ); // Run concurrently
  };

  const repeatedMarqueeContent = useMemo(() => {
    return Array.from({ length: 10 }).map((_, idx) => {
      // Ciclar a través de las imágenes disponibles
      const currentImage = images[idx % images.length];
      return (
        <React.Fragment key={idx}>
          <span className="whitespace-nowrap p-[1vh_1vw_0] text-[3vh] font-normal uppercase leading-[1.2] text-[#0A1626] sm:text-[4vh]">
            {text}
          </span>
          <div
            className="mx-[2vw] my-[2em] h-[7vh] w-[200px] shrink-0 rounded-[50px] bg-cover bg-center p-[1em_0]"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
        </React.Fragment>
      );
    });
  }, [text, images]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="relative flex-1 overflow-hidden border-b border-white/10 bg-[#0A1626] text-center"
      ref={itemRef}
    >
      <a
        className="relative z-10 flex h-full cursor-pointer items-center justify-center text-[3vh] font-semibold uppercase text-white no-underline transition-colors duration-300 hover:text-[#0A1626] sm:text-[4vh]"
        href={link}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        className="pointer-events-none absolute left-0 top-0 z-20 h-full w-full translate-y-[101%] overflow-hidden bg-white"
        ref={marqueeRef}
      >
        <div className="flex h-full w-[200%]" ref={marqueeInnerRef}>
          <div className="relative flex h-full w-[200%] animate-marquee items-center will-change-transform">
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
    images: [EventoCarrera, EventoCarrera1, EventoCarrera3],
  },
  {
    text: "Consultorios",
    link: "#ubicaciones",
    images: [ConsultorioPhyn, ConsultorioPhyn2, RhinoGym],
  },
  {
    text: "Guía pre-entreno",
    link: "/guia-desayunos-pre-entreno",
    images: [
      "/guide/overnight-oats.png",
      "/guide/toastadas-fruta.png",
      "/guide/batido-pre-entreno.png",
    ],
  },
  {
    text: "Certificados",
    link: "#certificados",
    images: [CertificadoMujerAtleta, CertificadoRecomposicionCorporal],
  },
];

export const FlowingMenu = () => {
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
      src: CertificadoRecomposicionCorporal,
      alt: "Certificado de Recomposición Corporal",
      title: "Recomposición Corporal",
    },
  ];

  const menuItemsWithHandlers = MENU_ITEMS.map((item) => {
    if (item.text === "Certificados") {
      return {
        ...item,
        onClick: () => setIsCertificationsOpen(true),
      };
    }
    return item;
  });

  return (
    <>
      <section className="bg-[#0A1626] py-0" id="certificados">
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
          <div className="h-full w-full overflow-hidden">
            <nav
              className="m-0 flex h-full flex-col p-0"
              aria-label="Secciones destacadas"
            >
              {menuItemsWithHandlers.map((item, idx) => (
                <MenuItem key={idx} {...item} />
              ))}
            </nav>
          </div>
        </div>
      </section>

      <CertificationsModal
        isOpen={isCertificationsOpen}
        onClose={() => setIsCertificationsOpen(false)}
        certifications={certifications}
        selectedCertification={selectedCertification}
        onSelectCertification={setSelectedCertification}
      />
    </>
  );
};
