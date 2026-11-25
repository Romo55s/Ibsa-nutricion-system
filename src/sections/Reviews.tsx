const testimonials = [
  {
    name: "Andrea G.",
    type: "Paciente Atleta",
    text: "Me ayudó a subir masa muscular sin sentirme pesada en mis entrenamientos. Ahora rindo más y me siento mucho más segura con mi cuerpo.",
    stars: 5,
  },
  {
    name: "Carlos M.",
    type: "Recomposición Corporal",
    text: "Dejé de hacer dietas extremas y aprendí a comer mejor sin miedo a los carbohidratos. Los cambios se ven, pero sobre todo se sienten en mi energía.",
    stars: 5,
  },
  {
    name: "Sofía R.",
    type: "Consulta Online",
    text: "Aunque nuestras consultas fueron online, sentí un acompañamiento real. Ahora tengo hábitos que sí puedo sostener en mi día a día sin ansiedad.",
    stars: 5,
  },
];

export const Reviews = () => (
  <section id="review" className="editorial-section scroll-mt-20 bg-mist">
    <div className="editorial-container">
      <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-12">
        <h2 className="editorial-heading">Historias que inspiran</h2>
        <p className="max-w-md leading-relaxed text-accent md:justify-self-end">
          Resultados reales de personas que decidieron cambiar su relación con
          la comida y su cuerpo.
        </p>
      </div>
      <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-3">
        {testimonials.map((item) => (
          <figure key={item.name} className="flex flex-col items-start border-t border-light pt-5">
            <span role="img" aria-label={`${item.stars} estrellas`} className="text-sm tracking-[0.12em] text-muted">
              {"★".repeat(item.stars)}
            </span>
            <blockquote className="mb-5 mt-4 max-w-prose flex-1 font-display text-2xl leading-snug">
              “{item.text}”
            </blockquote>
            <figcaption>
              <span className="block font-semibold">{item.name}</span>
              <span className="text-sm text-muted">{item.type}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
