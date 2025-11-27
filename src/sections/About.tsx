export const About = () => {
  return (
    <section id="sobre-mi" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-5xl grid gap-10 md:grid-cols-[1.2fr_minmax(0,1fr)] items-start">
        <div>
          <h2 className="text-3xl font-semibold text-primary mb-3">Sobre mí</h2>
          <p className="text-sm uppercase tracking-wide text-muted mb-4">
            Nutrióloga clínica y deportiva · Enfoque no peso-centrista
          </p>
          <p className="text-[15px] leading-relaxed text-primary-2 mb-4">
            En mi adolescencia era muy delgada y eso me acomplejaba: evitaba usar faldas o shorts porque no me sentía
            cómoda con mi cuerpo. Decidí aprender a comer mejor para ganar peso de forma saludable, y ese proceso me
            despertó una pasión enorme por la nutrición.
          </p>
          <p className="text-[15px] leading-relaxed text-primary-2 mb-4">
            Hoy acompaño a atletas y personas activas a transformar su cuerpo y sus hábitos sin obsesionarnos con la
            báscula. Mi objetivo es que puedas salir de tus propios complejos, disfrutar la comida y sentirte fuerte,
            capaz y en paz con tu cuerpo.
          </p>
        </div>
        <div className="bg-white shadow-elev-1 rounded-lg border border-[rgba(10,22,38,0.03)] p-6 text-sm text-primary-2">
          <h3 className="text-lg font-semibold mb-3">Certificaciones y experiencia</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Certificación en recomposición corporal.</li>
            <li>Formación en nutrición en la mujer atleta.</li>
            <li>Consultorios en Phyn y Rhino Training Complex.</li>
            <li>Ponencias en empresas como WireMasters.</li>
            <li>
              Participación en la primera carrera atlética del Instituto de Beneficencia Pública de Aguascalientes
              "Corriendo con causa".
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};


