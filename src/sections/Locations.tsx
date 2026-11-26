import { Button } from "../components/Button";
import { assets } from "../assets";

const clinicRoom = assets.clinic.phynRoom01;

const clinic = {
  name: "PHYN",
  zone: "Zona norte · Aguascalientes",
  description: "Clínica de Fisioterapia y Nutrición Integral",
  address:
    "Av. Independencia 1860, Jardines de la Concepción II, 20120 Aguascalientes, Ags.",
  hours: "Lunes a viernes · 9:00 a. m. – 7:00 p. m.",
  directions: "https://maps.app.goo.gl/ZEK3HJoQ9CEmrpAc9",
  mapTitle: "Ubicación de Phyn Clinic en Google Maps",
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.1540578128697!2d-102.31600402414107!3d21.928628156263454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429efff5f098053%3A0x3dc06dbfdf576df9!2sPhyn%20Clinic%20-%20Terapia%20F%C3%ADsica%2C%20Nutrici%C3%B3n%2C%20Psicolog%C3%ADa!5e0!3m2!1ses!2smx!4v1764278102518!5m2!1ses!2smx",
};

export const Locations = () => (
  <section
    id="ubicaciones"
    className="editorial-section scroll-mt-20 bg-mist"
    aria-labelledby="locations-heading"
  >
    <div className="editorial-container">
      <header className="mb-9 grid gap-4 border-b border-primary pb-7 md:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] md:items-end md:gap-10 md:pb-9">
        <div>
          <p className="editorial-label mb-3 text-muted">
            Consulta presencial · Aguascalientes
          </p>
          <h2 id="locations-heading" className="editorial-heading max-w-2xl">
            Dónde encontrarme
          </h2>
        </div>
        <p className="max-w-lg text-base leading-relaxed text-accent md:justify-self-end">
          Te recibo en PHYN, en la zona norte de la ciudad. Aquí puedes revisar
          la dirección, el horario y el mapa antes de tu visita.
        </p>
      </header>

      <article aria-labelledby="phyn-heading">
        <div className="grid gap-7 border-b border-light pb-7 md:grid-cols-12 md:gap-10 md:pb-9">
          <div className="md:col-span-5">
            <p className="editorial-label text-muted">{clinic.zone}</p>
            <h3 id="phyn-heading" className="mt-2 font-display text-4xl">
              {clinic.name}
            </h3>
            <p className="mt-2 max-w-sm leading-relaxed text-accent">
              {clinic.description}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:col-span-7 md:gap-8">
            <div className="border-t border-light pt-3">
              <p className="editorial-label text-muted">Dirección</p>
              <address className="mt-2 max-w-sm not-italic leading-relaxed text-primary">
                {clinic.address}
              </address>
            </div>
            <div className="border-t border-light pt-3">
              <p className="editorial-label text-muted">Horario de atención</p>
              <p className="mt-2 leading-relaxed text-primary">{clinic.hours}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-light md:grid-cols-2">
          <figure className="relative min-w-0 bg-white">
            <img
              src={clinicRoom}
              width={2048}
              height={1365}
              alt="Espacio de consulta de PHYN con mesa de atención, sillas y luz natural."
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="editorial-label border-t border-light bg-white px-4 py-3 text-muted sm:px-5">
              PHYN · Consultorio de nutrición
            </figcaption>
          </figure>

          <div className="min-w-0 bg-white p-3 sm:p-4">
            <iframe
              src={clinic.map}
              title={clinic.mapTitle}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full border-0 bg-mist"
            />
          </div>
        </div>

        <footer className="flex flex-col gap-4 border-t border-light pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Agenda tu consulta o abre el mapa para planear cómo llegar.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              href="https://cal.com/mariana-ibarra-santos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Agendar cita en ${clinic.name}`}
              className="px-5 py-3"
            >
              Agendar cita
            </Button>
            <Button
              href={clinic.directions}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ubicación de ${clinic.name} en Google Maps`}
              variant="outline"
              className="px-5 py-3"
            >
              Cómo llegar
            </Button>
          </div>
        </footer>
      </article>
    </div>
  </section>
);
