import "./routine-plan-preview.css";

const sessions = [
  { day: "Lun", focus: "Pierna y glúteo", detail: "Sentadilla · 4 ejercicios" },
  { day: "Mié", focus: "Tren superior", detail: "Espalda · 5 ejercicios" },
  { day: "Vie", focus: "Fuerza general", detail: "Cuerpo completo · 6 ejercicios" },
  { day: "Sáb", focus: "Movilidad", detail: "Activación · 3 ejercicios" },
];

export function RoutinePlanPreview() {
  return (
    <div className="ibsa-routine-preview">
      <div className="ibsa-routine-preview__brand">IBSA Nutrición</div>
      <div className="ibsa-routine-preview__body">
        <header className="ibsa-routine-preview__head">
          <h3 className="font-display text-3xl leading-tight">
            Semana de entrenamiento
          </h3>
          <span className="whitespace-nowrap text-sm text-muted">4 sesiones</span>
        </header>
        <ol>
          {sessions.map((session) => (
            <li key={session.day} className="ibsa-routine-preview__session">
              <span className="editorial-label text-muted">{session.day}</span>
              <div>
                <p className="font-semibold">{session.focus}</p>
                <p className="text-sm text-muted">{session.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
