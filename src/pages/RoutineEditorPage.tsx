import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { RoutineForm } from "../components/routines/RoutineForm";
import { useRoutines } from "../hooks/useRoutines";
import { sanitizeWeekPlan } from "../lib/weekPlan";
import type { Routine, WeekPlan } from "../types/routines";

function normalizeRoutineDays(days: WeekPlan): WeekPlan {
  return sanitizeWeekPlan(days);
}

export const RoutineCreatePage = () => {
  const navigate = useNavigate();
  const { create } = useRoutines();

  useEffect(() => {
    const prev = document.title;
    document.title = "Nueva rutina | IBSA Nutrición";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-primary">
      <a href="#main-content" className="skip-to-content" data-router-link>
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="editorial-container max-w-5xl pb-20 pt-28 lg:pt-36">
        <Link
          to="/rutinas"
          className="editorial-link min-h-11 font-medium text-accent"
        >
          ← Mis rutinas
        </Link>
        <h1 className="mt-6 editorial-heading break-words">
          Nueva rutina
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Plan de lunes a domingo. Se guarda un borrador automático en este
          navegador si cierras o recargas la página; al terminar, usa
          &quot;Guardar rutina&quot; para dejarla fija en Mis rutinas.
        </p>
        <div className="mt-8 border-t border-primary pt-8">
          <RoutineForm
            submitLabel="Guardar rutina"
            onCancelHref="/rutinas"
            onSubmit={(input) => {
              const routine = create(input);
              navigate(`/rutinas/${routine.id}`);
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const RoutineEditPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { find, update, ready } = useRoutines();
  const [routine, setRoutine] = useState<Routine | null | undefined>(undefined);

  useEffect(() => {
    if (!ready) return;
    const found = find(id);
    if (!found) {
      setRoutine(null);
      return;
    }
    setRoutine({
      ...found,
      days: normalizeRoutineDays(found.days),
    });
  }, [find, id, ready]);

  useEffect(() => {
    if (!routine) return;
    const prev = document.title;
    document.title = `Editar ${routine.name} | IBSA Nutrición`;
    return () => {
      document.title = prev;
    };
  }, [routine]);

  if (!ready || routine === undefined) {
    return (
      <div className="min-h-screen bg-white text-primary">
        <a href="#main-content" className="skip-to-content" data-router-link>
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="editorial-container pt-28">
          <p className="text-muted">Cargando…</p>
        </main>
      </div>
    );
  }

  if (routine === null) {
    return (
      <div className="min-h-screen bg-white text-primary">
        <a href="#main-content" className="skip-to-content" data-router-link>
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="editorial-container pb-20 pt-28 lg:pt-36">
          <h1 className="editorial-heading">Rutina no encontrada</h1>
          <p className="mt-2 text-sm text-muted">
            Puede que se haya eliminado o que estés en otro navegador.
          </p>
          <Link to="/rutinas" className="editorial-link mt-6 min-h-11 font-medium text-accent">
            Volver a mis rutinas
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-primary">
      <a href="#main-content" className="skip-to-content" data-router-link>
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="editorial-container max-w-5xl pb-20 pt-28 lg:pt-36">
        <Link
          to={`/rutinas/${routine.id}`}
          className="editorial-link min-h-11 font-medium text-accent"
        >
          ← Volver a la rutina
        </Link>
        <h1 className="mt-6 editorial-heading break-words">
          Editar rutina
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Los cambios se guardan en este navegador al pulsar &quot;Guardar
          cambios&quot;. Mientras editas, también se guarda un borrador
          automático.
        </p>
        <div className="mt-8 border-t border-primary pt-8">
          <RoutineForm
            draftId={routine.id}
            savedUpdatedAt={routine.updatedAt}
            initial={{
              name: routine.name,
              description: routine.description,
              days: routine.days,
            }}
            submitLabel="Guardar cambios"
            onCancelHref={`/rutinas/${routine.id}`}
            onSubmit={(input) => {
              const updated = update(routine.id, input);
              if (!updated) {
                window.alert(
                  "No se pudo guardar. La rutina ya no está en este navegador."
                );
                navigate("/rutinas");
                return;
              }
              navigate(`/rutinas/${routine.id}`);
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};
