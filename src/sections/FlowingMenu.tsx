import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets";

const items = [
  {
    title: "Eventos",
    href: "/evento",
    images: [
      assets.events.carrera.cover,
      assets.events.carrera.photos[0],
      assets.events.carrera.photos[3],
    ],
  },
  {
    title: "Consultorios",
    href: "#ubicaciones",
    images: [assets.clinic.phynRoom01, assets.clinic.phynRoom02],
  },
  { title: "Guía pre-entreno", href: "/guia-desayunos-pre-entreno", images: [
    assets.public.guide.overnightOats,
    assets.public.guide.toastadasFruta,
    assets.public.guide.batidoPreEntreno,
  ] },
  {
    title: "Certificados",
    images: [
      assets.credentials.womenAthlete,
      assets.credentials.bodyRecomposition,
    ],
  },
];

export const FlowingMenu = ({ onOpenCertifications }: { onOpenCertifications: () => void }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const controlStyle = "relative z-10 flex min-h-14 w-full items-center justify-between gap-4 px-3 text-left font-semibold";

  return (
    <nav id="certificados" aria-label="Secciones destacadas" className="mt-10 grid scroll-mt-24 gap-x-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, href, images }) => {
        const label = <>{title}<span aria-hidden="true">↗</span></>;
        return (
          <div
            key={title}
            className="relative border-y border-light"
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
                setHoveredItem(title);
              }
            }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {href?.startsWith("/") ? (
              <Link to={href} className={controlStyle}>{label}</Link>
            ) : href ? (
              <a href={href} className={controlStyle}>{label}</a>
            ) : (
              <button type="button" className={controlStyle} onClick={onOpenCertifications}>{label}</button>
            )}
            {hoveredItem === title && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden bg-mist motion-reduce:hidden">
                <div className="flex h-full w-max animate-marquee items-center">
                  {[...images, ...images].map((src, i) => (
                    <span className="flex items-center gap-3 px-2 font-display text-2xl" key={i}>
                      {title}<img src={src} alt="" width={72} height={40} className="h-10 w-[72px] object-cover" />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
