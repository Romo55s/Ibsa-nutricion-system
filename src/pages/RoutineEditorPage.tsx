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
    <div className="min-h-screen bg-[#050B14] text-white">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-6 pb-20 pt-28">
        <Link
          to="/rutinas"
          className="text-sm text-slate-400 transition-colors hover:text-white"
        >
          ← Mis rutinas
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Nueva rutina
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Plan de lunes a domingo. Se guarda un borrador automático en este
          navegador si cierras o recargas la página; al terminar, usa
          &quot;Guardar rutina&quot; para dejarla fija en Mis rutinas.
        </p>
        <div className="mt-8">
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
      <div className="min-h-screen bg-[#050B14] text-white">
        <Navbar />
        <main className="container mx-auto px-6 pt-28">
          <p className="text-slate-400">Cargando…</p>
        </main>
      </div>
    );
  }

  if (routine === null) {
    return (
      <div className="min-h-screen bg-[#050B14] text-white">
        <Navbar />
        <main className="container mx-auto px-6 pb-20 pt-28">
          <h1 className="text-2xl font-bold">Rutina no encontrada</h1>
          <p className="mt-2 text-sm text-slate-400">
            Puede que se haya eliminado o que estés en otro navegador.
          </p>
          <Link to="/rutinas" className="mt-6 inline-block text-blue-300">
            Volver a mis rutinas
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B14] text-white">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-6 pb-20 pt-28">
        <Link
          to={`/rutinas/${routine.id}`}
          className="text-sm text-slate-400 transition-colors hover:text-white"
        >
          ← Volver a la rutina
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Editar rutina
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Los cambios se guardan en este navegador al pulsar &quot;Guardar
          cambios&quot;. Mientras editas, también se guarda un borrador
          automático.
        </p>
        <div className="mt-8">
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
