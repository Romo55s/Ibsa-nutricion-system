import { Button } from "../components/Button";

export const LeadMagnet = () => {
  return (
    <section id="recetario" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-4xl rounded-2xl bg-gradient-to-r from-primary to-primary-2 text-white shadow-elev-2 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.18em] text-light/80 mb-2">
            Recurso gratuito
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Guía de desayunos ricos y saludables
          </h2>
          <p className="text-sm md:text-[15px] text-light mb-4">
            Descarga una guía práctica con ideas de desayunos balanceados para empezar tu día con energía, sin
            complicaciones y sin dejar de disfrutar la comida.
          </p>
          <p className="text-[13px] text-light/80">
            Ideal para atletas y personas activas que quieren mejorar sus hábitos sin perder tiempo pensando &quot;qué
            voy a desayunar hoy&quot;.
          </p>
        </div>
        <div className="flex-shrink-0">
          {/* En el futuro aquí podemos conectar un formulario real o un link directo al recurso */}
          <Button>
            Quiero mi guía gratis
          </Button>
        </div>
      </div>
    </section>
  );
};


