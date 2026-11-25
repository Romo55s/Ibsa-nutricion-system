import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { RoutinePlanPreview } from "./RoutinePlanPreview";

const steps = [
  {
    title: "Arma tu semana",
    text: "Activa los días que entrenas y pon el enfoque de cada uno (push, pierna, full body…).",
  },
  {
    title: "Elige ejercicios",
    text: "Catálogo con imagen y video. Series, reps, tiempo, vueltas y peso a tu medida.",
  },
  {
    title: "Guarda y usa",
    text: "Queda en este navegador y puedes exportarla a PDF para llevarla al gym.",
  },
];

export const RoutineTool = () => (
  <section id="crea-tu-rutina" className="editorial-section scroll-mt-20 bg-primary text-white">
    <div className="editorial-container">
      <div className="grid items-center gap-8 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <div>
          <p className="editorial-label mb-4 text-light">Planifica tu semana</p>
          <h2 className="editorial-heading max-w-lg">Crea tu rutina con nuestra herramienta</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-light">
            Diseña tu plan de lunes a domingo, con calentamiento, trabajo
            principal y export a PDF. Sin cuentas: se guarda en tu navegador.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Button to="/rutinas/nueva" variant="white" className="px-6 py-3">
              Crear mi rutina
            </Button>
            <Link to="/rutinas" className="editorial-link inline-flex min-h-11 items-center text-white">
              Ver mis rutinas
            </Link>
          </div>
        </div>
        <figure className="min-w-0">
          <RoutinePlanPreview />
          <figcaption className="mt-3 max-w-xl text-sm leading-relaxed text-light">
            Elige los días y ejercicios. Guarda tu rutina en este navegador y
            consúltala o expórtala cuando la necesites.
          </figcaption>
        </figure>
      </div>
      <ol className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-7 lg:mt-16">
        {steps.map((step, index) => (
          <li className="border-t border-white/30 pt-4" key={step.title}>
            <h3 className="flex items-baseline gap-3 text-lg font-semibold">
              <span className="font-mono text-sm text-light">{String(index + 1).padStart(2, "0")}</span>
              {step.title}
            </h3>
            <p className="mt-2 leading-relaxed text-light">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
