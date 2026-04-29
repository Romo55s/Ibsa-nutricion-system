import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const LeadMagnet = () => {
  const navigate = useNavigate();
  return (
    <section id="recetario" className="bg-white py-16">
      <div className="container mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-2xl bg-gradient-to-r from-primary to-primary-2 p-8 px-6 text-white shadow-elev-2 md:flex-row md:p-10">
        <div className="flex-1">
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-light/80">
            Recurso gratuito
          </p>
          <h2 className="mb-3 text-2xl font-semibold md:text-3xl">
            Guía de desayunos pre-entreno
          </h2>
          <p className="mb-4 text-sm text-light md:text-[15px]">
            Ideas para desayunar antes de entrenar: carbohidratos, proteína y
            tiempos digestivos explicados de forma sencilla, con PDF descargable
            con marca IBSA.
          </p>
          <p className="text-[13px] text-light/80">
            Pensada para personas fitness que entrenan por la mañana y buscan
            rendir sin sensación de pesadez.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button
            type="button"
            onClick={() => navigate("/guia-desayunos-pre-entreno")}
          >
            Ver guía y PDF
          </Button>
        </div>
      </div>
    </section>
  );
};
