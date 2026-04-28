import { Button } from "../components/Button";

export const LeadMagnet = () => {
  return (
    <section id="recetario" className="bg-white py-16">
      <div className="container mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-2xl bg-gradient-to-r from-primary to-primary-2 p-8 px-6 text-white shadow-elev-2 md:flex-row md:p-10">
        <div className="flex-1">
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-light/80">
            Recurso gratuito
          </p>
          <h2 className="mb-3 text-2xl font-semibold md:text-3xl">
            Guía de desayunos ricos y saludables
          </h2>
          <p className="mb-4 text-sm text-light md:text-[15px]">
            Descarga una guía práctica con ideas de desayunos balanceados para
            empezar tu día con energía, sin complicaciones y sin dejar de
            disfrutar la comida.
          </p>
          <p className="text-[13px] text-light/80">
            Ideal para atletas y personas activas que quieren mejorar sus
            hábitos sin perder tiempo pensando &quot;qué voy a desayunar
            hoy&quot;.
          </p>
        </div>
        <div className="flex-shrink-0">
          {/* En el futuro aquí podemos conectar un formulario real o un link directo al recurso */}
          <Button>Quiero mi guía gratis</Button>
        </div>
      </div>
    </section>
  );
};
