import type { EventImage } from "./EventImageCard";
import { EditorialDialog } from "./EditorialDialog";

export interface EventDetails {
  title: string;
  description: string;
  date: string;
  location: string;
  details: string[];
}

interface EventModalProps extends EventDetails {
  onClose: () => void;
}

export const EventModal = ({
  title,
  description,
  date,
  location,
  details,
  onClose,
}: EventModalProps) => (
  <EditorialDialog
    eyebrow={`${date} · ${location}`}
    title={title}
    onClose={onClose}
    panelClassName="max-w-2xl"
  >
    <div className="pt-6">
      <p className="max-w-prose text-base leading-relaxed text-accent sm:text-lg">
        {description}
      </p>
      <section aria-labelledby="event-modal-details" className="mt-7 border-t border-light pt-5">
        <p className="editorial-label mb-2 text-muted">En esta experiencia</p>
        <h3 id="event-modal-details" className="font-display text-2xl">
          Detalles del evento
        </h3>
        <ul className="mt-4 space-y-3">
          {details.map((detail, index) => (
            <li key={detail} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-t border-light pt-3 leading-relaxed text-accent">
              <span className="font-display text-lg text-muted" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </EditorialDialog>
);

export const EventImageModal = ({
  image,
  onClose,
}: {
  image: EventImage;
  onClose: () => void;
}) => (
  <EditorialDialog
    eyebrow="Archivo visual · Comunidad IBSA"
    title={image.caption ?? image.alt}
    onClose={onClose}
    panelClassName="max-w-6xl"
    bodyClassName="bg-mist p-3 sm:p-5"
  >
    <figure>
      <div className="flex min-h-[40vh] items-center justify-center bg-primary/5 p-2 sm:min-h-[55vh] sm:p-4">
        <img
          src={image.src}
          alt={image.alt}
          className="mx-auto block max-h-[67dvh] max-w-full object-contain"
        />
      </div>
      {image.description && (
        <figcaption className="mx-auto mt-3 max-w-prose text-center text-sm leading-relaxed text-accent">
          {image.description}
        </figcaption>
      )}
    </figure>
  </EditorialDialog>
);
