import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import type React from "react";

export const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".benefit-card");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out"
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="beneficios" ref={sectionRef}>
      <div className="container">
        <h2 style={{ fontSize: 32, marginBottom: 8 }}>Resultados que van más allá del físico</h2>
        <p style={{ maxWidth: 520, fontSize: 15, color: "var(--color-muted)", marginBottom: 32 }}>
          Te acompaño a conseguir tu físico anhelado y a construir hábitos que puedas sostener en el tiempo,
          sin dejar de disfrutar la comida ni tu vida social.
        </p>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
          }}
        >
          <div className="benefit-card" style={cardStyle}>
            <h3 style={cardTitle}>Aumento de masa muscular</h3>
            <p style={cardText}>
              Planes hechos para mejorar fuerza, rendimiento y composición corporal, ajustados a tu deporte y objetivos.
            </p>
          </div>
          <div className="benefit-card" style={cardStyle}>
            <h3 style={cardTitle}>Hábitos sostenibles</h3>
            <p style={cardText}>
              Cambios realistas en tu alimentación diaria, sin dietas extremas ni rebotes constantes.
            </p>
          </div>
          <div className="benefit-card" style={cardStyle}>
            <h3 style={cardTitle}>Relación sana con la comida</h3>
            <p style={cardText}>
              Enfoque no peso-centrista para dejar atrás la culpa, la restricción excesiva y el miedo a ciertos
              alimentos.
            </p>
          </div>
          <div className="benefit-card" style={cardStyle}>
            <h3 style={cardTitle}>Confianza y autoestima</h3>
            <p style={cardText}>
              Trabajamos para que te sientas cómoda con tu cuerpo y orgullosa de lo que eres capaz de lograr.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 1px 4px rgba(10,22,38,0.06)",
  border: "1px solid rgba(10,22,38,0.03)"
};

const cardTitle: React.CSSProperties = {
  fontSize: 18,
  marginTop: 0
};

const cardText: React.CSSProperties = {
  fontSize: 14,
  margin: 0
};


