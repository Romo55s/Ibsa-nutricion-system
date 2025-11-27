import { Button } from "../components/Button";

export const CTASection = () => {
  return (
    <section id="agenda" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          Agenda tu consulta
        </p>
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Da el siguiente paso hacia tu mejor versión
        </h2>
        <p className="text-[15px] leading-relaxed text-primary-2 max-w-2xl mx-auto mb-8">
          Reserva tu cita a través de cal.com para una consulta presencial u online. En la primera sesión revisamos tu
          historia, tus objetivos y tu contexto para diseñar un plan totalmente personalizado.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Placeholder para el enlace real de cal.com */}
          <a href="https://cal.com" target="_blank" rel="noreferrer">
            <Button>Agendar mi consulta</Button>
          </a>
          <a
            href="https://wa.me/5210000000000"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted hover:text-primary"
          >
            O escríbeme por WhatsApp si tienes dudas
          </a>
        </div>
      </div>
    </section>
  );
};


