export const Reviews = () => {
  return (
    <section id="reseñas" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
              Lo que dicen mis pacientes
            </p>
            <h2 className="text-3xl font-semibold text-primary mb-3">Resultados que se sienten en la vida diaria</h2>
            <p className="text-[15px] text-primary-2 max-w-xl">
              Aquí puedes mostrar reseñas reales con antes y después, testimonios en texto o capturas de mensajes de
              pacientes (cuidando siempre su privacidad).
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div className="rounded-xl border border-[rgba(10,22,38,0.06)] shadow-elev-1 p-4">
            <p className="text-xs text-muted mb-1">Paciente atleta</p>
            <p className="text-[13px] text-primary-2">
              “Me ayudó a subir masa muscular sin sentirme pesada en mis entrenamientos. Ahora rindo más y me siento
              mucho más segura con mi cuerpo.”
            </p>
          </div>
          <div className="rounded-xl border border-[rgba(10,22,38,0.06)] shadow-elev-1 p-4">
            <p className="text-xs text-muted mb-1">Paciente recomposición corporal</p>
            <p className="text-[13px] text-primary-2">
              “Dejé de hacer dietas extremas y aprendí a comer mejor sin miedo a los carbohidratos. Los cambios se
              ven, pero sobre todo se sienten.”
            </p>
          </div>
          <div className="rounded-xl border border-[rgba(10,22,38,0.06)] shadow-elev-1 p-4">
            <p className="text-xs text-muted mb-1">Paciente online</p>
            <p className="text-[13px] text-primary-2">
              “Aunque nuestras consultas fueron online, sentí acompañamiento real. Ahora tengo hábitos que sí puedo
              sostener en mi día a día.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


