import { useState } from "react";
import { CertificationsModal } from "../components/CertificationsModal";
import athleteCertificate from "../assets/Certificado-Mujer-Atleta.jpg";
import recompositionCertificate from "../assets/Certificado-Recomposicion-Corporal.jpg";
import { FlowingMenu } from "./FlowingMenu";

const certifications = [
  {
    src: athleteCertificate,
    alt: "Certificado de Nutrición en la Mujer Atleta",
    title: "Nutrición en la Mujer Atleta",
  },
  {
    src: recompositionCertificate,
    alt: "Certificado de Recomposición Corporal",
    title: "Recomposición Corporal",
  },
];

export const Credibility = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof certifications)[number] | null>(null);

  return (
    <section id="credibilidad" className="scroll-mt-20 bg-white pb-[var(--section-space)]">
      <div className="editorial-container border-t border-light pt-8 sm:pt-12">
        <div className="grid gap-8 lg:grid-cols-[4fr_6fr] lg:gap-20">
          <div>
            <h2 className="editorial-heading max-w-md">Experiencia en campo real.</h2>
            <p className="mt-5 max-w-prose leading-relaxed text-accent">
              No solo es teoría. He trabajado mano a mano con atletas y personas activas en
              consultorios especializados y eventos oficiales. Entiendo el sudor, la exigencia
              y la realidad de tu día a día.
            </p>
          </div>
          <div className="grid content-start gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xl font-semibold">Atención presencial</h3>
              <p className="leading-relaxed text-accent">Atención presencial en Phyn Clinic, un espacio especializado para tu valoración nutricional.</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">Charlas y eventos</h3>
              <p className="leading-relaxed text-accent">
                Ponencias en <strong>WireMasters</strong> y colaboración oficial en la carrera
                <strong> “Corriendo con causa”</strong>.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">Formación</h3>
              <p className="leading-relaxed text-accent">
                Actualización constante: 3er seminario de recomposición corporal y congreso
                de nutrición en la mujer atleta.
              </p>
              <button type="button" onClick={() => setIsOpen(true)} className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-light underline-offset-4 hover:decoration-primary">
                Ver certificaciones <span aria-hidden="true">→</span>
              </button>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">Enfoque humano</h3>
              <p className="leading-relaxed text-accent">
                Más allá de los macros. Trabajo desde la empatía, respetando tu historia,
                tus gustos y tu contexto personal.
              </p>
            </div>
          </div>
        </div>
        <FlowingMenu onOpenCertifications={() => setIsOpen(true)} />
      </div>
      <CertificationsModal
        isOpen={isOpen}
        onClose={() => {
          setSelected(null);
          setIsOpen(false);
        }}
        certifications={certifications}
        selectedCertification={selected}
        onSelectCertification={setSelected}
      />
    </section>
  );
};
