import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface EventModalProps {
  title: string;
  description: string;
  date: string;
  location: string;
  details: string[];
  onClose: () => void;
}

export const EventModal = ({
  title,
  description,
  date,
  location,
  details,
  onClose,
}: EventModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "back.out(1.2)",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-8 text-[#0A1626] shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Header */}
        <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-[#2E8BFF] to-[#2AA84A]"></div>

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#535B67] transition-colors hover:bg-gray-100"
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

        <div className="mb-6">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#2E8BFF]">
            {date} • {location}
          </p>
          <h3 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h3>
          <p className="text-lg leading-relaxed text-[#535B67]">
            {description}
          </p>
        </div>

        <div className="mb-8 rounded-xl bg-[#F5F7FA] p-6">
          <h4 className="mb-4 flex items-center gap-2 font-bold text-[#0A1626]">
            <svg
              width="20"
              height="20"
              className="text-[#2E8BFF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Detalles del Evento
          </h4>
          <ul className="space-y-3">
            {details.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-[#535B67] md:text-base"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2E8BFF]"></span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
