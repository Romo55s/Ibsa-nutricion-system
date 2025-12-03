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

export const EventImageGallery = ({ images, columns = 3, onImageClick }: EventImageGalleryProps) => {
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
        ease: "power2.out"
      })
      .to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.2)"
      }, "-=0.2");
    }
  }, [selectedImage]);

  const closeModal = () => {
    if (modalRef.current && selectedImage) {
      const modal = modalRef.current;
      const img = modal.querySelector("img");
      
      const tl = gsap.timeline({
        onComplete: () => setSelectedImage(null)
      });
      
      tl.to(img, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      })
      .to(modal, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.1");
    } else {
      setSelectedImage(null);
    }
  };

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4"
  };

  return (
    <>
      <div ref={containerRef} className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, idx) => (
          <div
            key={idx}
            className="event-image-card relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => {
              if (onImageClick) {
                onImageClick(image);
              } else {
                setSelectedImage(image);
              }
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ boxShadow: '0 6px 18px rgba(10,22,38,0.08)' }}
          >
            <div className="absolute inset-0 bg-[#222D3B]  transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-500">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay with text on hover - scales with image */}
                {hoveredIndex === idx && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626]/95 via-[#0A1626]/70 to-transparent flex items-end p-6">
                    <div>
                      <p className="text-white text-sm font-semibold uppercase tracking-wider mb-2">
                        {image.alt}
                      </p>
                      {image.description && (
                        <p className="text-[#CED0D3] text-xs leading-relaxed">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-pointer"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Cerrar"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-xl"
            />
            <div className="text-white text-center mt-4">
              <p className="text-lg font-semibold mb-1">{selectedImage.alt}</p>
              {selectedImage.description && (
                <p className="text-sm text-gray-300">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

