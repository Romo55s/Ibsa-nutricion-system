export const Footer = () => {
  return (
    <footer
      style={{
        background: "#0A1626",
        color: "#CED0D3",
        padding: "32px 0",
        marginTop: 48
      }}
    >
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <span>© {new Date().getFullYear()} IBSA Nutrición. Todos los derechos reservados.</span>
          <span>Consulta presencial y online · Aguascalientes, México</span>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#agenda">Agenda tu consulta</a>
          <a href="#recetario">Guía de desayunos gratis</a>
        </div>
      </div>
    </footer>
  );
};


