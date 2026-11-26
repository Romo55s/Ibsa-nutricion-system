import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { EventImageGallery } from "../components/EventImageGallery";
import { assets } from "../assets";
import {
  EventImageModal,
  EventModal,
  type EventDetails,
} from "../components/EventModal";
import { EventImageCard, type EventImage } from "../components/EventImageCard";

const [Evento1, Evento2, Evento3, Evento4] = assets.events.carrera.photos;
const EventoPortada = assets.events.carrera.featuredCover;
const [
  WireMasters3,
  WireMasters4,
  WireMasters5,
  WireMasters6,
  WireMasters7,
  WireMasters8,
  WireMasters9,
  WireMasters10,
] = assets.events.wiremasters;
const ComunidadMariana = assets.people.communityPortrait;

// Imágenes de Wire Masters
const wireMastersImages = [
  {
    src: WireMasters3,
    alt: "Equipo de Phyn Clinic",
    description: "Mariana Ibarra y el equipo de Phyn Clinic",
  },
  {
    src: WireMasters4,
    alt: "Mariana Ibarra entregando regalos al publico",
    description:
      "Compartiendo conocimientos sobre nutrición deportiva y su aplicación práctica en el rendimiento",
  },
  {
    src: WireMasters5,
    alt: "Audiencia tomando notas",
    description: "Audiencia tomando notas de la conferencia",
  },
  {
    src: WireMasters6,
    alt: "Finalizacion de la conferencia",
    description:
      "Compartiendo conocimientos especializados sobre cómo la nutrición impacta el rendimiento y la recuperación deportiva",
  },
  {
    src: WireMasters7,
    alt: "Mariana Ibarra conectando con la audiencia en Wire Masters",
    description:
      "Interacción con profesionales y atletas durante la conferencia, respondiendo preguntas y compartiendo experiencias",
  },
  {
    src: WireMasters8,
    alt: "Momento de la conferencia Wire Masters",
    description:
      "Experiencias y aprendizajes compartidos sobre nutrición deportiva y bienestar integral",
  },
  {
    src: WireMasters9,
    alt: "Entrega de certificados",
    description: "Reconociendo a la audencia",
  },
  {
    src: WireMasters10,
    alt: "Evento Wire Masters sobre nutrición y los demas servicios de Phyn Clinic",
    description:
      "Conferencia completa sobre nutrición deportiva, conectando teoría con práctica para profesionales y atletas",
  },
];

const carreraImages = [
  {
    src: EventoPortada,
    alt: "Inicio de la carrera",
    description: "El momento de inicio donde todos comienzan juntos",
  },
  {
    src: Evento1,
    alt: "Corredores en acción",
    description: "Participantes dando lo mejor de sí en cada kilómetro",
  },
  {
    src: Evento2,
    alt: "Haciendo fila para ser atendidos",
    description: "Estiramiento post carrera",
  },
  {
    src: Evento3,
    alt: "Pacientes comiendo su fruta post carrera",
    description: "Participando en este evento especial",
  },
  {
    src: Evento4,
    alt: "Pacientes disfrutando de la fruta",
    description: "Celebrando cada logro y meta cumplida",
  },
];

const eventOverview: EventDetails = {
  title: "Los Mejores Eventos",
  date: "Todo el año",
  location: "Diversas Sedes",
  description:
    "Desde carreras locales hasta conferencias internacionales. Cada experiencia suma a nuestra comunidad y nos permite crecer profesional y personalmente.",
  details: [
    "Networking con profesionales de la salud",
    "Actualización constante en nutrición deportiva",
    "Participación activa en la comunidad runner",
    "Talleres y workshops especializados",
  ],
};

const carreraDetails: EventDetails = {
  title: "Corriendo con Causa",
  date: "23-25 Enero",
  location: "Aguascalientes",
  description:
    "Más que una carrera, es una celebración de lo que podemos lograr juntos. Cada kilómetro es una historia de superación, salud y comunidad.",
  details: [
    "Distancias: 5k, 10k y 21k",
    "Categorías varonil y femenil",
    "Puntos de hidratación cada 2.5km",
    "Kit de recuperación al finalizar",
    "Parte de lo recaudado se dona a fundaciones locales",
  ],
};

const highlights = [
  { src: WireMasters6, alt: "Finalizacion de la conferencia" },
  { src: Evento3, alt: "Momentos de esfuerzo" },
  { src: WireMasters4, alt: "Entrega de regalos de parte de Phyn Clinic" },
  { src: EventoPortada, alt: "Meta alcanzada" },
];

const wireMastersLeadImages: EventImage[] = [
  {
    src: WireMasters4,
    alt: "Mariana Ibarra presentando sobre carbohidratos en Wire Masters",
    caption:
      "Mariana Ibarra presentando sobre carbohidratos simples y complejos en Wire Masters",
  },
  {
    src: WireMasters6,
    alt: "Mariana Ibarra presentando frente a la audiencia en Wire Masters",
    caption:
      "Mariana Ibarra y co-presentadora frente a la audiencia en Wire Masters",
  },
];

export const EventPage = () => {
  const [showMoreCarrera, setShowMoreCarrera] = useState(false);
  const [showMoreWire, setShowMoreWire] = useState(false);
  const [activeEvent, setActiveEvent] = useState<EventDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const eventsSectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const motion = gsap.matchMedia();

    motion.add("(prefers-reduced-motion: no-preference)", () => {
      if (heroPhotoRef.current) {
        gsap.from(heroPhotoRef.current, {
          opacity: 0.75,
          y: 8,
          duration: 0.45,
          ease: "power2.out",
        });
      }
    });

    return () => motion.revert();
  }, []);

  const scrollToEvents = () => {
    const section = eventsSectionRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="page">
      <a href="#main-content" className="skip-to-content" data-router-link>
        Saltar al contenido
      </a>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-20">
        <section
          aria-labelledby="event-page-title"
          className="editorial-container pb-12 pt-5 md:pb-20 md:pt-8"
        >
          <Link
            to="/"
            className="editorial-link min-h-11 text-sm font-semibold text-muted hover:text-primary"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            Regresar al inicio
          </Link>

          <div className="mt-6 grid items-center gap-7 border-t border-light pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-8">
            <div className="min-w-0 lg:col-span-5">
              <p className="editorial-label mb-4 text-muted">2025</p>
              <h1
                id="event-page-title"
                className="font-display text-[clamp(2.75rem,5.2vw,5.25rem)] leading-[0.98] tracking-tight"
              >
                Eventos &amp; <span className="block">conferencias</span>
              </h1>
              <p className="mt-5 max-w-[35ch] text-base leading-relaxed text-muted sm:text-lg">
                Calendario de actividades, carreras y conferencias donde
                comparto mi pasión por la nutrición y el deporte.
              </p>
            </div>
            <div ref={heroPhotoRef} className="min-w-0 lg:col-span-7">
              <EventImageCard
                image={{
                  src: EventoPortada,
                  alt: "Evento Principal",
                  caption: "Inicio de la carrera",
                }}
                aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
                onImageClick={setSelectedImage}
                priority
              />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="event-intro-title"
          className="border-y border-light bg-mist"
        >
          <div className="editorial-container py-10 sm:py-14">
            <div className="grid items-start gap-5 lg:grid-cols-12 lg:gap-8">
              <h2
                id="event-intro-title"
                className="editorial-heading lg:col-span-6"
              >
                Encuentra tu Evento Perfecto
              </h2>
              <div className="lg:col-span-6">
                <p className="max-w-prose text-base leading-relaxed text-muted sm:text-lg">
                  Descubre los mejores eventos deportivos y conferencias. He
                  seleccionado los mejores eventos en los que he participado
                  para que puedas conocer más sobre mi trabajo.
                </p>
                <Button type="button" onClick={scrollToEvents} className="mt-5">
                  Explorar Todo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="event-overview-title"
          ref={eventsSectionRef}
          tabIndex={-1}
          className="editorial-container editorial-section scroll-mt-20"
        >
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <h2 id="event-overview-title" className="editorial-heading">
                Los mejores eventos
              </h2>
              <p className="mt-4 max-w-prose leading-relaxed text-muted sm:text-lg">
                Desde carreras locales hasta conferencias internacionales. Cada
                experiencia suma a nuestra comunidad.
              </p>
              <Button
                type="button"
                variant="outline"
                aria-haspopup="dialog"
                className="mt-5"
                onClick={() => setActiveEvent(eventOverview)}
              >
                Leer más
              </Button>
              <figure className="mt-8 max-w-md border-t border-light pt-6">
                <blockquote className="font-display text-2xl italic leading-snug sm:text-[1.75rem]">
                  “Participar en estos eventos me permite conectar con personas
                  increíbles y compartir el mensaje de salud real y sostenible.”
                </blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-muted">
                  — Mariana Ibarra
                </figcaption>
              </figure>
            </div>
            <EventImageCard
              image={{ src: Evento1, alt: "Silueta Evento" }}
              className="lg:col-span-7"
              onImageClick={setSelectedImage}
            />
          </div>

          <div className="mt-8 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((image) => (
              <EventImageCard
                key={image.src}
                image={image}
                onImageClick={setSelectedImage}
              />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="carrera-title"
          className="border-t border-light"
        >
          <div className="editorial-container editorial-section">
            <div className="grid items-start gap-7 lg:grid-cols-12 lg:gap-8">
              <div className="min-w-0 lg:col-span-4">
                <p className="editorial-label mb-4 text-muted">
                  23-25 Enero, Aguascalientes
                </p>
                <h2 id="carrera-title" className="editorial-heading">
                  Corriendo con Causa
                </h2>
                <p className="mt-4 max-w-prose leading-relaxed text-muted sm:text-lg">
                  {carreraDetails.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setActiveEvent(carreraDetails)}
                  >
                    Ver Detalles
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    aria-expanded={showMoreCarrera}
                    aria-controls="carrera-gallery"
                    onClick={() => setShowMoreCarrera((visible) => !visible)}
                  >
                    {showMoreCarrera ? "Ocultar Fotos" : "Ver Galería"}
                  </Button>
                </div>
              </div>
              <EventImageCard
                image={{
                  ...carreraImages[0],
                  alt: "Carrera",
                  caption: carreraImages[0].alt,
                }}
                className="lg:col-span-8"
                aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
                onImageClick={setSelectedImage}
              />
            </div>
            <div
              id="carrera-gallery"
              hidden={!showMoreCarrera}
              className="mt-10 border-t border-light pt-8"
            >
              {showMoreCarrera && (
                <EventImageGallery
                  images={carreraImages}
                  onImageClick={setSelectedImage}
                />
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="wire-masters-title"
          className="border-y border-light bg-mist"
        >
          <div className="editorial-container editorial-section">
            <div className="grid items-start gap-5 lg:grid-cols-12 lg:gap-8">
              <div className="min-w-0 lg:col-span-5">
                <p className="editorial-label mb-4 text-muted">15-16 Mayo</p>
                <h2 id="wire-masters-title" className="editorial-heading">
                  Wire Masters
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-prose leading-relaxed text-muted sm:text-lg">
                  Una conferencia vibrante sobre nutrición y rendimiento
                  deportivo. Un espacio donde se reúnen profesionales de la
                  salud, atletas y entusiastas para compartir conocimientos.
                </p>
                <Button
                  type="button"
                  className="mt-5"
                  aria-expanded={showMoreWire}
                  aria-controls="wire-gallery"
                  onClick={() => setShowMoreWire((visible) => !visible)}
                >
                  {showMoreWire ? "Ver Menos" : "Ver Todas las Fotos"}
                </Button>
              </div>
            </div>
            <div className="mt-8 grid items-start gap-x-6 gap-y-7 sm:grid-cols-2 lg:mt-12 lg:grid-cols-12">
              <EventImageCard
                image={wireMastersLeadImages[0]}
                className="lg:col-span-7"
                aspectRatio="aspect-[4/3] lg:aspect-[7/4]"
                onImageClick={setSelectedImage}
              />
              <EventImageCard
                image={wireMastersLeadImages[1]}
                className="lg:col-span-5"
                aspectRatio="aspect-[4/3] lg:aspect-[5/4]"
                onImageClick={setSelectedImage}
              />
            </div>
            <div
              id="wire-gallery"
              hidden={!showMoreWire}
              className="mt-10 border-t border-light pt-8"
            >
              {showMoreWire && (
                <EventImageGallery
                  images={wireMastersImages}
                  onImageClick={setSelectedImage}
                />
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="community-title"
          className="editorial-container editorial-section"
        >
          <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-8">
            <div className="min-w-0 lg:col-span-5">
              <h2 id="community-title" className="editorial-heading">
                ¿Por qué participo?
              </h2>
              <div className="mt-4 max-w-prose space-y-4 leading-relaxed text-muted sm:text-lg">
                <p>
                  Participar en eventos me conecta con mi ciudad y con personas
                  que comparten la misma visión.
                </p>
                <p>
                  No se trata solo de nutrición en el plato, sino de nutrir el
                  espíritu.
                </p>
              </div>
              <Button
                href="https://cal.com/mariana-ibarra-santos"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6"
              >
                Agendar Consulta
              </Button>
            </div>
            <EventImageCard
              image={{ src: ComunidadMariana, alt: "Únete a la comunidad" }}
              className="lg:col-span-7"
              aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
              onImageClick={setSelectedImage}
            />
          </div>

          <div className="mt-9 flex flex-wrap items-start justify-between gap-x-8 gap-y-3 border-t border-light pt-6">
            <div>
              <h3 className="text-lg font-semibold">Sígueme en Redes</h3>
              <p className="text-muted">@ibsa.nutricion</p>
            </div>
            <div className="flex flex-wrap gap-x-6">
              <a
                href="https://www.instagram.com/ibsa.nutricion/"
                target="_blank"
                rel="noopener noreferrer"
              className="editorial-link min-h-11 font-semibold hover:text-muted"
              >
                Instagram <span className="editorial-link-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mariana-ibarra0407"
                target="_blank"
                rel="noopener noreferrer"
              className="editorial-link min-h-11 font-semibold hover:text-muted"
              >
                LinkedIn <span className="editorial-link-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {activeEvent && (
        <EventModal {...activeEvent} onClose={() => setActiveEvent(null)} />
      )}
      {selectedImage && (
        <EventImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <Footer />
    </div>
  );
};
