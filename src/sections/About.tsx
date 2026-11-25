import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import portrait from "../assets/mariana-casual.jpg"

export const About = () => {
  const metricsRef = useRef<HTMLDListElement>(null);

  useLayoutEffect(() => {
    const metrics = metricsRef.current;
    if (!metrics) return;

    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const experience = metrics.querySelector<HTMLElement>("[data-experience]");
      const personalized = metrics.querySelector<HTMLElement>("[data-personalized]");
      if (!experience || !personalized) return;
      const count = { progress: 0 };
      gsap.to(count, {
        progress: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: metrics, start: "top 90%", once: true },
        onUpdate: () => {
          experience.textContent = `+${Math.round(count.progress * 5)}`;
          personalized.textContent = `${Math.round(count.progress * 100)}%`;
        },
      });
      return () => {
        experience.textContent = "+5";
        personalized.textContent = "100%";
      };
    });
    return () => motion.revert();
  }, []);

  return (
    <section id="sobre-mi" className="editorial-section scroll-mt-20 bg-white">
      <div className="editorial-container grid items-center gap-8 md:grid-cols-[5fr_6fr] md:gap-12 lg:gap-24">
        <img
          src={portrait}
          width={960}
          height={1200}
          loading="lazy"
          decoding="async"
          alt="Mariana Ibarra Santos de brazos cruzados con el uniforme de IBSA."
          className="mx-auto aspect-[4/5] w-full max-w-md bg-mist object-cover"
        />
        <div>
          <p className="editorial-label mb-4 text-muted">Mariana Ibarra Santos</p>
          <h2 className="editorial-heading max-w-lg">Más que una dieta, un estilo de vida.</h2>
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-accent lg:text-lg">
            <p>
              En mi adolescencia, la delgadez me acomplejaba. Evitaba usar
              cierta ropa y no me sentía cómoda en mi propia piel. Decidí
              aprender a nutrirme para ganar fuerza y confianza, y ese proceso
              encendió mi pasión.
            </p>
            <p>
              Hoy, mi misión es acompañarte a ti. Ya seas atleta o simplemente
              busques mejorar tus hábitos, quiero que dejes de pelear con la
              báscula y empieces a celebrar lo que tu cuerpo es capaz de hacer.
            </p>
          </div>
          <dl ref={metricsRef} className="mt-8 grid grid-cols-2 gap-6 border-t border-light pt-5">
            <div className="flex flex-col-reverse items-start gap-1">
              <dt className="text-sm text-muted">Años de experiencia</dt>
              <dd className="font-display text-4xl"><span aria-hidden="true" data-experience>+5</span><span className="sr-only">+5</span></dd>
            </div>
            <div className="flex flex-col-reverse items-start gap-1">
              <dt className="text-sm text-muted">Personalizado</dt>
              <dd className="font-display text-4xl"><span aria-hidden="true" data-personalized>100%</span><span className="sr-only">100%</span></dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
