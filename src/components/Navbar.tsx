import { colors } from "../design-system";

export const Navbar = () => {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(14px)",
        background: "linear-gradient(180deg, rgba(10,22,38,0.96), rgba(10,22,38,0.9))",
        borderBottom: "1px solid rgba(206,208,211,0.12)"
      }}
    >
      <nav
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg,#0A1626,#222D3B)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 16
            }}
          >
            I
          </div>
          <div>
            <div style={{ color: "#FFFFFF", fontWeight: 600, fontSize: 18 }}>IBSA Nutrición</div>
            <div style={{ fontSize: 12, color: colors.light }}>Nutrición clínica y deportiva</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 14, color: "#CED0D3" }}>
          <a href="#beneficios">Beneficios</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#reseñas">Reseñas</a>
          <a href="#agenda" style={{ color: "#FFFFFF", fontWeight: 500 }}>
            Agendar cita
          </a>
        </div>
      </nav>
    </header>
  );
};


