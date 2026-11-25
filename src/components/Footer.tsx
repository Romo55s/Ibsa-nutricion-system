import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Logo from "../assets/Logo-IBSA-White.svg";

export const Footer = () => {
  const logoRef = useRef<HTMLImageElement>(null);

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
    <footer className="bg-primary pb-8 pt-[var(--section-space)] text-light">
      <div className="editorial-container">
        <div className="mb-12 grid gap-x-[var(--grid-gap)] gap-y-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]">
          {/* Brand Column */}
          <div>
            <div
              className="group mb-6 flex cursor-pointer items-center gap-3"
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
            >
              <img
                ref={logoRef}
                src={Logo}
                alt="IBSA Logo"
                className="h-8 w-auto opacity-90 transition-opacity group-hover:opacity-100"
              />
              <span className="font-display text-3xl leading-tight text-white">
                IBSA Nutrición
              </span>
            </div>
            <p className="mb-5 max-w-sm text-base leading-relaxed">
              Nutrición clínica y deportiva con enfoque no peso-centrista.
              Transformando hábitos y rendimiento desde la empatía y la ciencia.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ibsa.nutricion/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mariana-ibarra0407"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="mb-3 border-t border-white/30 pt-4 font-semibold text-white">Navegación</h2>
            <ul className="text-sm">
              <li>
                <a
                  href="#beneficios"
                  className="editorial-link min-h-11 transition-colors hover:text-white"
                >
                  Resultados Reales
                </a>
              </li>
              <li>
                <a
                  href="#sobre-mi"
                  className="editorial-link min-h-11 transition-colors hover:text-white"
                >
                  Sobre Mí
                </a>
              </li>
              <li>
                <a
                  href="#credibilidad"
                  className="editorial-link min-h-11 transition-colors hover:text-white"
                >
                  Experiencia
                </a>
              </li>
              <li>
                <a
                  href="#crea-tu-rutina"
                  className="editorial-link min-h-11 transition-colors hover:text-white"
                >
                  Crea tu rutina
                </a>
              </li>
              <li>
                <a
                  href="#review"
                  className="editorial-link min-h-11 transition-colors hover:text-white"
                >
                  Testimonios
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h2 className="mb-3 border-t border-white/30 pt-4 font-semibold text-white">Recursos</h2>
            <ul className="text-sm">
              <li>
                <Link
                  to="/guia-desayunos-pre-entreno"
                  className="editorial-link min-h-11 transition-colors hover:text-white"
                >
                  Guía de desayunos pre-entreno
                </Link>
              </li>
              <li>
                <Link
                  to="/rutinas"
                  className="editorial-link min-h-11 transition-colors hover:text-white"
                >
                  Crear mis rutinas
                </Link>
              </li>
              <li>
                <a href="#" className="editorial-link min-h-11 transition-colors hover:text-white">
                  Aviso de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="editorial-link min-h-11 transition-colors hover:text-white">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-3 border-t border-white/30 pt-4 font-semibold text-white">Contacto</h2>
            <a
              href="https://cal.com/mariana-ibarra-santos"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link mb-3 min-h-11 font-semibold text-white"
            >
              Agendar cita
            </a>
            <ul className="text-sm">
              <li className="flex items-start gap-3">
                <span>
                  Aguascalientes, México
                  <br />
                  PHYN Clinic
                </span>
              </li>
              <li className="flex items-center gap-3">
                <a
                  href="mailto:marianale0407@gmail.com"
                  className="editorial-link min-h-11"
                >
                  marianale0407@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/30 pt-6 text-xs md:flex-row">
          <p>
            © {new Date().getFullYear()} IBSA Nutrición. Todos los derechos
            reservados.
          </p>
          <p>Diseñado para tu bienestar.</p>
        </div>
      </div>
    </footer>
  );
};
