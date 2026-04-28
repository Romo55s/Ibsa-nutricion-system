import { Button } from "../components/Button";

export const CTASection = () => {
  return (
    <section id="agenda" className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
          Agenda tu consulta
        </p>
        <h2 className="mb-4 text-3xl font-semibold text-primary">
          Da el siguiente paso hacia tu mejor versión
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-[15px] leading-relaxed text-primary-2">
          Reserva tu cita a través de cal.com para una consulta presencial u
          online. En la primera sesión revisamos tu historia, tus objetivos y tu
          contexto para diseñar un plan totalmente personalizado.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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
