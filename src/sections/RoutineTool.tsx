import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "../components/Button";

const steps = [
  {
    n: "01",
    title: "Arma tu semana",
    text: "Activa los días que entrenas y pon el enfoque de cada uno (push, pierna, full body…).",
  },
  {
    n: "02",
    title: "Elige ejercicios",
    text: "Catálogo con imagen y video. Series, reps, tiempo, vueltas y peso a tu medida.",
  },
  {
    n: "03",
    title: "Guarda y usa",
    text: "Queda en este navegador y puedes exportarla a PDF para llevarla al gym.",
  },
];

export const RoutineTool = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".routine-tool-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".routine-tool-step", {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".routine-tool-steps",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".routine-tool-panel", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".routine-tool-panel",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="crea-tu-rutina"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050B14] py-20 text-white sm:py-28"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#2E8BFF]/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#2AA84A]/10 blur-[110px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="routine-tool-copy mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7eb8ff]">
            Herramienta gratuita
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-[3.25rem] md:leading-[1.08]">
            Crea tu rutina con nuestra herramienta
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Diseña tu plan de lunes a domingo, con calentamiento, trabajo
            principal y export a PDF. Sin cuentas: se guarda en tu navegador.
          </p>
        </div>

        <ol className="routine-tool-steps mx-auto mb-12 grid max-w-5xl gap-8 sm:mb-14 sm:grid-cols-3 sm:gap-6">
          {steps.map((step) => (
            <li key={step.n} className="routine-tool-step text-left sm:text-center">
              <p className="mb-3 font-mono text-sm font-semibold tracking-wider text-[#2E8BFF]">
                {step.n}
              </p>
              <h3 className="mb-2 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="routine-tool-panel mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-7 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Empieza en menos de 5 minutos
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                Ideal para armar tu semana, ajustar pesos y tenerla lista en el
                celular o impresa.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E8BFF]" />
                  Catálogo con video
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E8BFF]" />
                  Borrador automático
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E8BFF]" />
                  Exportar PDF
                </li>
              </ul>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
              <Link to="/rutinas/nueva" className="w-full sm:w-auto">
                <Button variant="white" className="h-12 w-full px-7 text-sm">
                  Crear mi rutina
                </Button>
              </Link>
              <Link
                to="/rutinas"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm text-slate-200 transition-colors hover:border-white hover:text-white"
              >
                Ver mis rutinas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
