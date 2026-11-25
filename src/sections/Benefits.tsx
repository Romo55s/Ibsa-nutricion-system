const benefits = [
  {
    title: "Masa muscular",
    text: "Estrategias de hipertrofia y fuerza adaptadas a tu entrenamiento. Optimiza tu composición corporal con ciencia, no con mitos.",
  },
  {
    title: "Hábitos reales",
    text: "Construye un estilo de vida flexible. Aprende a comer en cualquier situación sin ansiedad y sin efecto rebote.",
  },
  {
    title: "Relación sana",
    text: "Deja atrás la culpa y el miedo a la comida. Un enfoque no peso-centrista que prioriza tu salud mental y física por igual.",
  },
  {
    title: "Autoestima",
    text: "Sentirte fuerte y capaz transforma tu confianza. Celebra lo que tu cuerpo puede hacer y recupera tu seguridad.",
  },
];

export const Benefits = () => (
  <section id="beneficios" className="editorial-section scroll-mt-20 border-y border-light bg-mist">
    <div className="editorial-container">
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-20">
        <div>
          <p className="editorial-label mb-4 text-muted">Nutrición clínica y deportiva</p>
          <blockquote className="max-w-2xl font-display text-[clamp(2.25rem,4.8vw,4.5rem)] leading-[1.06] tracking-tight">
            “No es comer menos, es comer mejor.”
          </blockquote>
          <p className="mt-4 text-sm text-muted">Mariana IBSA</p>
        </div>
        <p className="max-w-lg text-lg leading-relaxed text-accent">
          Te acompaño a conseguir tu físico anhelado y a construir hábitos
          sostenibles, sin dejar de disfrutar tu vida social.
        </p>
      </div>
      <h2 className="editorial-heading mb-6 mt-12 sm:mt-16">Resultados reales</h2>
      <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="border-t border-muted/50 py-5">
            <h3 className="mb-3 font-display text-[1.65rem] leading-tight">{benefit.title}</h3>
            <p className="leading-relaxed text-accent">{benefit.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
