import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EventImage {
  src: string;
  alt: string;
  category: "carrera" | "wire-masters";
}

interface EventGridProps {
  images: EventImage[];
}

export const EventGrid = ({ images }: EventGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".event-grid-item");

      if (!items || items.length === 0) return;

      // Animación inicial de entrada
      gsap.set(items, { opacity: 0, y: 60, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          amount: 0.6,
          from: "random",
        },
      });

      // Hover animations
      items.forEach((item) => {
        const img = item.querySelector("img");
        if (!img) return;

        const handleMouseEnter = () => {
          gsap.to(item, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
            zIndex: 10,
          });
          gsap.to(img, {
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            zIndex: 1,
          });
          gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);

        cleanupFunctions.push(() => {
          item.removeEventListener("mouseenter", handleMouseEnter);
          item.removeEventListener("mouseleave", handleMouseLeave);
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [images]);

  // Modal animation
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

  const carreraImages = images.filter((img) => img.category === "carrera");
  const wireMastersImages = images.filter(
    (img) => img.category === "wire-masters"
  );

  return (
    <>
      <div ref={containerRef} className="event-grid-container">
        {/* Carrera Section */}
        {carreraImages.length > 0 && (
          <div className="mb-24">
            <h3 className="mb-10 text-[36px] font-bold text-white md:text-[48px]">
              Corriendo con <span className="text-[#2E8BFF]">Causa</span>
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {carreraImages.map((image, idx) => (
                <div
                  key={`carrera-${idx}`}
                  className="event-grid-item group relative cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedImage(image)}
                  style={{
                    boxShadow: "0 6px 18px rgba(10,22,38,0.08)",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-[#3B4451] bg-[#222D3B] transition-all duration-300 group-hover:border-[#2E8BFF]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626]/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full transform p-5 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-sm font-semibold uppercase tracking-wider text-white">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wire Masters Section */}
        {wireMastersImages.length > 0 && (
          <div>
            <h3 className="mb-10 text-[36px] font-bold text-white md:text-[48px]">
              Wire Masters - <span className="text-[#2E8BFF]">Conferencia</span>
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wireMastersImages.map((image, idx) => (
                <div
                  key={`wire-${idx}`}
                  className="event-grid-item group relative cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedImage(image)}
                  style={{
                    boxShadow: "0 6px 18px rgba(10,22,38,0.08)",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-[#3B4451] bg-[#222D3B] transition-all duration-300 group-hover:border-[#2E8BFF]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626]/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full transform p-5 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-sm font-semibold uppercase tracking-wider text-white">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
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
            <p className="mt-4 text-center text-lg text-white">
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
