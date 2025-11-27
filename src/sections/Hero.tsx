import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../components/Button";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-heading", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out" });
      gsap.from(".hero-ctas", { y: 10, opacity: 0, duration: 0.7, delay: 0.25, ease: "power2.out" });
      gsap.from(".hero-card", { opacity: 0, y: 30, duration: 0.9, delay: 0.2, ease: "power3.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={containerRef} style={{ color: "#FFFFFF" }}>
      <div className="container grid-2">
        <div>
          <span
            style={{
              display: "inline-block",
              borderRadius: 9999,
              padding: "4px 10px",
              fontSize: 12,
              background: "#3B4451",
              color: "#FFFFFF"
            }}
          >
            Nutrición clínica y deportiva
          </span>
          <h1
            className="hero-heading"
            style={{ fontSize: "48px", lineHeight: "56px", marginTop: 24, marginBottom: 16 }}
          >
            Pon tu cuerpo en forma y saca tu mejor versión
          </h1>
          <p className="hero-sub" style={{ fontSize: 18, lineHeight: "28px", color: "var(--color-light)" }}>
            Planes de nutrición personalizados según tus gustos, entrenamientos y estilo de vida,
            con un enfoque no peso-centrista para atletas y personas activas.
          </p>
          <div className="hero-ctas" style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <a href="#agenda">
              <Button>Agenda tu consulta</Button>
            </a>
            <a href="#recetario">
              <Button variant="ghost">Quiero mi guía de desayunos</Button>
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: 14, color: "var(--color-light)" }}>
            Incluye: guía gratuita de desayunos ricos y saludables para empezar a cambiar tus hábitos hoy.
          </p>
        </div>
        <div
          className="hero-card"
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 18px 40px rgba(10,22,38,0.12)",
            color: "#222D3B",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          <h2 style={{ fontSize: 20, margin: 0 }}>Nutrición pensada para tu rendimiento y bienestar</h2>
          <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, display: "grid", rowGap: 4 }}>
            <li>Aumento de masa muscular y rendimiento deportivo.</li>
            <li>Mejora de hábitos alimenticios sin dietas extremas.</li>
            <li>Mejor relación con la comida y tu cuerpo.</li>
            <li>Más seguridad y autoestima en tu día a día.</li>
          </ul>
          <div
            style={{
              marginTop: 8,
              padding: 12,
              borderRadius: 12,
              background: "rgba(10,22,38,0.03)",
              fontSize: 12
            }}
          >
            Consultas presenciales en Phyn y Rhino Training Complex o en formato online, para adaptarnos a tu rutina.
          </div>
        </div>
      </div>
    </section>
  );
};


