import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

interface EventImage {
  src: string;
  alt: string;
  description?: string;
}

interface EventImageGalleryProps {
  images: EventImage[];
  columns?: 2 | 3 | 4;
  onImageClick?: (image: EventImage) => void;
}

export const EventImageGallery = ({
  images,
  columns = 3,
  onImageClick,
}: EventImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (selectedImage && modalRef.current) {
      const modal = modalRef.current;
      const img = modal.querySelector("img");

      gsap.set(modal, { opacity: 0 });
      gsap.set(img, { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(modal, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }).to(
        img,
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );
    }
  }, [selectedImage]);

  const closeModal = () => {
    if (modalRef.current && selectedImage) {
      const modal = modalRef.current;
      const img = modal.querySelector("img");

      const tl = gsap.timeline({
        onComplete: () => setSelectedImage(null),
      });

      tl.to(img, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      }).to(
        modal,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1"
      );
    } else {
      setSelectedImage(null);
    }
  };

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <>
      <div ref={containerRef} className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, idx) => (
          <div
            key={idx}
            className="event-image-card group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
            onClick={() => {
              if (onImageClick) {
                onImageClick(image);
              } else {
                setSelectedImage(image);
              }
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ boxShadow: "0 6px 18px rgba(10,22,38,0.08)" }}
          >
            <div className="absolute inset-0 overflow-hidden bg-[#222D3B] transition-all duration-300">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Overlay with text on hover - scales with image */}
                {hoveredIndex === idx && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0A1626]/95 via-[#0A1626]/70 to-transparent p-6">
                    <div>
                      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
                        {image.alt}
                      </p>
                      {image.description && (
                        <p className="text-xs leading-relaxed text-[#CED0D3]">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - only render if onImageClick is not provided */}
      {!onImageClick && selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 text-white transition-colors hover:text-gray-300"
              aria-label="Cerrar"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="h-full w-full rounded-xl object-contain"
            />
            <div className="mt-4 text-center text-white">
              <p className="mb-1 text-lg font-semibold">{selectedImage.alt}</p>
              {selectedImage.description && (
                <p className="text-sm text-gray-300">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
