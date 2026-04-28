import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

interface Certification {
  src: string;
  alt: string;
  title: string;
}

interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  certifications: Certification[];
  selectedCertification: Certification | null;
  onSelectCertification: (cert: Certification) => void;
}

export const CertificationsModal = ({
  isOpen,
  onClose,
  certifications,
  selectedCertification,
  onSelectCertification,
}: CertificationsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageModalRef = useRef<HTMLDivElement>(null);

  // Modal animation
  useLayoutEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!modal || !overlay || !content) return;

    gsap.set(modal, { display: "flex" });
    gsap.set([overlay, content], { opacity: 0, y: 20 });

    const tl = gsap.timeline();
    tl.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    }).to(
      content,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  // Close animation
  const handleClose = () => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (modalRef.current) {
          modalRef.current.style.display = "none";
        }
        onClose();
      },
    });

    tl.to(content, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
    }).to(
      overlay,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.1"
    );
  };

  // Image modal animation
  useLayoutEffect(() => {
    if (!selectedCertification || !imageModalRef.current) return;

    const modal = imageModalRef.current;
    const img = modal.querySelector("img");

    if (!img) return;

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
  }, [selectedCertification]);

  const closeImageModal = () => {
    if (!imageModalRef.current || !selectedCertification) return;

    const modal = imageModalRef.current;
    const img = modal.querySelector("img");

    if (!img) {
      onSelectCertification(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onSelectCertification(null);
      },
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
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ display: "none" }}
      >
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={handleClose}
        />
        <div
          ref={contentRef}
          className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0A1626]"
        >
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0A1626] p-6">
            <h2 className="text-2xl font-bold text-white">Certificaciones</h2>
            <button
              onClick={handleClose}
              className="text-white/60 transition-colors hover:text-white"
              aria-label="Cerrar"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <p className="mb-6 text-sm text-slate-400">
              Haz clic en cualquier certificación para verla en tamaño completo.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-white/5 transition-all duration-300 hover:border-white/20"
                  onClick={() => onSelectCertification(cert)}
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm font-semibold text-white">
                        {cert.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedCertification && (
        <div
          ref={imageModalRef}
          className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={closeImageModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
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
              src={selectedCertification.src}
              alt={selectedCertification.alt}
              className="h-full w-full rounded-xl object-contain"
            />
            <div className="mt-4 text-center text-white">
              <p className="mb-1 text-lg font-semibold">
                {selectedCertification.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
