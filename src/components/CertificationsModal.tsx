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
    })
      .to(
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
          className="relative z-10 bg-[#0A1626] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
        >
          <div className="sticky top-0 bg-[#0A1626] border-b border-white/10 p-6 flex items-center justify-between z-20">
            <h2 className="text-2xl font-bold text-white">Certificaciones</h2>
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors"
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
            <p className="text-slate-400 mb-6 text-sm">
              Haz clic en cualquier certificación para verla en tamaño completo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/3] bg-white/5 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300"
                  onClick={() => onSelectCertification(cert)}
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm">
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm cursor-pointer"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
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
              className="w-full h-full object-contain rounded-xl"
            />
            <div className="text-white text-center mt-4">
              <p className="text-lg font-semibold mb-1">
                {selectedCertification.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

