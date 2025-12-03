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

export const EventModal = ({ title, description, date, location, details, onClose }: EventModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, delay: 0.1, ease: "back.out(1.2)" }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.2
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose
    });
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="bg-white text-[#0A1626] rounded-2xl max-w-2xl w-full p-8 md:p-10 relative shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2E8BFF] to-[#2AA84A]"></div>
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-[#535B67]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <p className="text-[#2E8BFF] font-bold tracking-widest uppercase text-sm mb-2">{date} • {location}</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{title}</h3>
          <p className="text-[#535B67] text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="bg-[#F5F7FA] rounded-xl p-6 mb-8">
          <h4 className="font-bold text-[#0A1626] mb-4 flex items-center gap-2">
            <svg width="20" height="20" className="text-[#2E8BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <circle cx="12" cy="12" r="10"/>
               <path d="M12 16v-4M12 8h.01"/>
            </svg>
            Detalles del Evento
          </h4>
          <ul className="space-y-3">
            {details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[#535B67] text-sm md:text-base">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2E8BFF] shrink-0"></span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

