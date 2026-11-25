import type { ReactNode } from "react";
import { EditorialDialog } from "./EditorialDialog";

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
  onSelectCertification: (cert: Certification | null) => void;
}

function DialogLayer({
  title,
  eyebrow,
  onDismiss,
  children,
  panelClassName,
  bodyClassName,
}: {
  title: string;
  eyebrow: string;
  onDismiss: () => void;
  children: ReactNode;
  panelClassName?: string;
  bodyClassName?: string;
}) {
  return (
    <EditorialDialog
      title={title}
      eyebrow={eyebrow}
      onClose={onDismiss}
      panelClassName={panelClassName}
      bodyClassName={bodyClassName}
    >
      {children}
    </EditorialDialog>
  );
}

export const CertificationsModal = ({
  isOpen,
  onClose,
  certifications,
  selectedCertification,
  onSelectCertification,
}: CertificationsModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <DialogLayer
        title="Certificaciones y formación"
        eyebrow="Trayectoria profesional"
        onDismiss={onClose}
        panelClassName="max-w-4xl"
      >
        <div className="pt-6">
          <p className="mb-6 max-w-2xl leading-relaxed text-accent">
            Formación continua para acompañarte con una práctica actualizada y
            sensible a las necesidades de cada etapa.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {certifications.map((cert, index) => (
              <button
                key={cert.src}
                type="button"
                onClick={() => onSelectCertification(cert)}
                aria-label={`Ampliar certificado: ${cert.title}`}
                className="group border border-light bg-white text-left transition-colors hover:border-primary motion-reduce:transition-none"
              >
                <span className="flex items-center justify-between border-b border-light px-4 py-3">
                  <span className="editorial-label text-muted">
                    Formación · {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="text-lg text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
                    ↗
                  </span>
                </span>
                <img
                  src={cert.src}
                  alt=""
                  className="aspect-[4/3] w-full bg-mist object-contain p-3"
                />
                <span className="block border-t border-light px-4 py-4 font-semibold text-primary group-hover:underline">
                  {cert.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </DialogLayer>
      {selectedCertification && (
        <DialogLayer
          title={selectedCertification.title}
          eyebrow="Documento · Formación profesional"
          onDismiss={() => onSelectCertification(null)}
          panelClassName="max-w-5xl"
          bodyClassName="bg-mist p-3 sm:p-5"
        >
          <img
            src={selectedCertification.src}
            alt={selectedCertification.alt}
            className="mx-auto max-h-[72dvh] w-full object-contain"
          />
        </DialogLayer>
      )}
    </>
  );
};
