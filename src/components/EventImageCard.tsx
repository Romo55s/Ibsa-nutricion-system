export interface EventImage {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
}

interface EventImageCardProps {
  image: EventImage;
  onImageClick?: (image: EventImage) => void;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export const EventImageCard = ({
  image,
  onImageClick,
  className = "",
  aspectRatio = "aspect-[4/3]",
  priority = false,
}: EventImageCardProps) => {
  const caption = image.caption ?? image.alt;
  const photo = (
    <img
      src={image.src}
      alt={image.alt}
      className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.025]"
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "auto" : "async"}
    />
  );

  return (
    <figure className={`min-w-0 ${className}`}>
      {onImageClick ? (
        <button
          type="button"
          aria-label={`Ver foto — ${caption}`}
          aria-haspopup="dialog"
          className={`group relative block w-full overflow-hidden bg-light ${aspectRatio}`}
          onClick={() => onImageClick(image)}
        >
          {photo}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-3 grid h-11 w-11 place-items-center border border-white/80 bg-white/95 text-primary shadow-sm backdrop-blur-sm motion-safe:transition-[transform,background-color,color,border-color] motion-safe:duration-200 group-hover:scale-105 group-hover:border-primary group-hover:bg-primary group-hover:text-white group-focus-visible:border-primary group-focus-visible:bg-primary group-focus-visible:text-white group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-primary"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="10.5" cy="10.5" r="6.25" />
              <path d="m15.1 15.1 4.4 4.4M10.5 8v5m-2.5-2.5h5" />
            </svg>
          </span>
        </button>
      ) : (
        <div className={`relative overflow-hidden bg-light ${aspectRatio}`}>
          {photo}
        </div>
      )}
      <figcaption className="mt-2 border-t border-light pt-3 text-sm leading-relaxed">
        <span className="font-semibold">{caption}</span>
        {image.description && (
          <p className="mt-0.5 text-muted">{image.description}</p>
        )}
      </figcaption>
    </figure>
  );
};
