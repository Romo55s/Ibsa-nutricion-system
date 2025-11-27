export const Credibility = () => {
  return (
    <section id="credibilidad" className="py-16 bg-[color:var(--color-primary-2)] text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-light/80 mb-3">
              Confianza y respaldo
            </p>
            <h2 className="text-3xl font-semibold mb-3">Experiencia en campo real</h2>
            <p className="text-sm md:text-[15px] text-light max-w-xl">
              He trabajado con atletas y personas activas en consultorios especializados y eventos oficiales, lo que me
              permite entender tanto el día a día de entrenamiento como las exigencias de competencia.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-[rgba(10,22,38,0.6)] rounded-lg p-4 border border-[rgba(206,208,211,0.12)]">
              <p className="font-semibold mb-1">Consultorios</p>
              <p className="text-light text-xs leading-relaxed">
                Atención presencial en <span className="font-medium">Phyn</span> y{" "}
                <span className="font-medium">Rhino Training Complex</span> en Aguascalientes.
              </p>
            </div>
            <div className="bg-[rgba(10,22,38,0.6)] rounded-lg p-4 border border-[rgba(206,208,211,0.12)]">
              <p className="font-semibold mb-1">Charlas y eventos</p>
              <p className="text-light text-xs leading-relaxed">
                Pláticas en empresas como <span className="font-medium">WireMasters</span> y participación en la carrera
                atlética &quot;Corriendo con causa&quot; del Instituto de Beneficencia Pública de Aguascalientes.
              </p>
            </div>
            <div className="bg-[rgba(10,22,38,0.6)] rounded-lg p-4 border border-[rgba(206,208,211,0.12)]">
              <p className="font-semibold mb-1">Formación</p>
              <p className="text-light text-xs leading-relaxed">
                3er seminario virtual de recomposición corporal y 1er congreso virtual de nutrición en la mujer atleta.
              </p>
            </div>
            <div className="bg-[rgba(10,22,38,0.6)] rounded-lg p-4 border border-[rgba(206,208,211,0.12)]">
              <p className="font-semibold mb-1">Enfoque</p>
              <p className="text-light text-xs leading-relaxed">
                Trabajo desde un enfoque humano y no peso-centrista, respetando tu historia y tu contexto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


