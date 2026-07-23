import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo-IBSA-White.svg";
import { Button } from "./Button";
import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
  { label: "Beneficios", ariaLabel: "Beneficios", link: "#beneficios" },
  { label: "Sobre mí", ariaLabel: "Sobre mí", link: "#sobre-mi" },
  {
    label: "Crea tu rutina",
    ariaLabel: "Crea tu rutina",
    link: "#crea-tu-rutina",
  },
  { label: "Reseñas", ariaLabel: "Reseñas", link: "#review" },
  { label: "Certificados", ariaLabel: "Certificados", link: "#certificados" },
  { label: "Rutinas", ariaLabel: "Rutinas", link: "/rutinas" },
  {
    label: "Agendar cita",
    ariaLabel: "Agendar cita",
    link: "https://cal.com/mariana-ibarra-santos",
  },
];

const socialItems = [
  { label: "Instagram", link: "https://www.instagram.com/ibsa.nutricion/" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/mariana-ibarra0407" },
];

const MagneticNavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const item = itemRef.current;
    const text = textRef.current;
    const dot = dotRef.current;

    if (!item || !text || !dot) return;

    const xTo = gsap.quickTo(text, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(text, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const dotXTo = gsap.quickTo(dot, "x", {
      duration: 0.6,
      ease: "power2.out",
    });
    const dotYTo = gsap.quickTo(dot, "y", {
      duration: 0.6,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = item.getBoundingClientRect();

      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Mover texto magnéticamente
      xTo(x * 0.3);
      yTo(y * 0.3);

      // Mover bolita (dot)
      dotXTo(x * 0.5);
      dotYTo(y * 0.5);
    };

    const handleMouseEnter = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      dotXTo(0);
      dotYTo(0);
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    item.addEventListener("mousemove", handleMouseMove);
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      item.removeEventListener("mousemove", handleMouseMove);
      item.removeEventListener("mouseenter", handleMouseEnter);
      item.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si estamos fuera de home y el link es un anchor, navegar a home con el hash
    if (location.pathname !== "/" && href.startsWith("#")) {
      e.preventDefault();
      // Marcar como navegación de router para evitar conflicto con el handleClick global
      e.currentTarget.setAttribute("data-router-link", "true");
      // Navegar a home con el hash en la URL
      navigate(`/${href}`, { replace: false });
      // El ScrollToTop se encargará del scroll cuando la página cambie
    } else if (location.pathname === "/" && href.startsWith("#")) {
      // Si ya estamos en home, prevenir el comportamiento por defecto y usar scroll suave
      e.preventDefault();
      // Marcar como navegación de router
      e.currentTarget.setAttribute("data-router-link", "true");
      const element = document.querySelector(href);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else if (href.startsWith("/") && !href.startsWith("//")) {
      e.preventDefault();
      e.currentTarget.setAttribute("data-router-link", "true");
      navigate(href);
    }
  };

  return (
    <a
      ref={itemRef}
      href={href}
      onClick={handleClick}
      className="group relative flex flex-col items-center justify-center px-4 py-2"
    >
      <span
        ref={textRef}
        className="relative z-10 block text-slate-300 transition-colors group-hover:text-white"
      >
        {children}
      </span>
      <div
        ref={dotRef}
        className="pointer-events-none absolute bottom-0 h-1.5 w-1.5 scale-0 rounded-full bg-white"
      ></div>
    </a>
  );
};

export const Navbar = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onLock = () => setModalOpen(true);
    const onUnlock = () => setModalOpen(false);
    window.addEventListener("ibsa:modal-lock", onLock);
    window.addEventListener("ibsa:modal-unlock", onUnlock);
    return () => {
      window.removeEventListener("ibsa:modal-lock", onLock);
      window.removeEventListener("ibsa:modal-unlock", onUnlock);
    };
  }, []);

  const handleLogoEnter = () => {
    if (!logoRef.current) return;
    gsap.to(logoRef.current, {
      rotation: 360,
      scale: 1.1,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  };

  const handleLogoLeave = () => {
    if (!logoRef.current) return;
    gsap.to(logoRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 transition-all duration-300 ${
        modalOpen
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      aria-hidden={modalOpen}
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(10, 22, 38, 0.85)",
      }}
    >
      <nav className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link
          to="/"
          className="group flex cursor-pointer items-center gap-3"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
        >
          <img
            ref={logoRef}
            src={Logo}
            alt="IBSA Logo"
            className="h-10 w-auto"
          />
          <div className="hidden sm:block">
            <div className="text-lg font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-blue-200">
              IBSA Nutrición
            </div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-300 transition-colors group-hover:text-white">
              Clínica y Deportiva
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-3 text-sm font-medium lg:flex xl:gap-4">
          <MagneticNavItem href="#beneficios">Beneficios</MagneticNavItem>
          <MagneticNavItem href="#sobre-mi">Sobre mí</MagneticNavItem>
          <MagneticNavItem href="#crea-tu-rutina">
            Crea tu rutina
          </MagneticNavItem>
          <MagneticNavItem href="#review">Reseñas</MagneticNavItem>
          <MagneticNavItem href="#certificados">Certificados</MagneticNavItem>
          <MagneticNavItem href="/rutinas">Rutinas</MagneticNavItem>

          <div className="ml-2 xl:ml-4">
            <a
              href="https://cal.com/mariana-ibarra-santos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="white" className="h-10 px-6 text-sm">
                Agendar cita
              </Button>
            </a>
          </div>
        </div>

        <div className="lg:hidden">
          <StaggeredMenu
            isFixed={true}
            items={menuItems}
            socialItems={socialItems}
            logoUrl={Logo}
            colors={["#2E8BFF", "#0A1626"]}
            accentColor="#2E8BFF"
            menuButtonColor="#fff"
            openMenuButtonColor="#000"
          />
        </div>
      </nav>
    </header>
  );
};
