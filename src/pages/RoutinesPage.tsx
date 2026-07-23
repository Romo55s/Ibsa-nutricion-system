import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import {
  IconEye,
  IconPencil,
  IconPlus,
  IconTrash,
  withIcon,
} from "../components/routines/RoutineIcons";
import { useRoutines } from "../hooks/useRoutines";
import { getExerciseById, getExerciseImageUrl } from "../data/exercises";
import {
  clearRoutineDraft,
  hasMeaningfulDraft,
  loadRoutineDraft,
} from "../lib/routineDraftStorage";
import {
  countRoutineExercises,
  summarizeEnabledDays,
} from "../lib/weekPlan";
import { WEEKDAYS } from "../types/routines";

export const RoutinesPage = () => {
  const { routines, ready, remove } = useRoutines();
  const [newDraft, setNewDraft] = useState(() => {
    const draft = loadRoutineDraft();
    return hasMeaningfulDraft(draft) ? draft : null;
  });

  useEffect(() => {
    const prev = document.title;
    document.title = "Mis rutinas | IBSA Nutrición";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050B14] text-white">
      <Navbar />
      <main className="container mx-auto px-6 pb-20 pt-28">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              Entrenamiento
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Mis rutinas
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
              Guardadas en este navegador. Puedes verlas, editarlas o
              eliminarlas cuando quieras; también exportar a PDF.
            </p>
          </div>
          <Link to="/rutinas/nueva">
            <Button variant="white" className="h-11 px-6 text-sm">
              {withIcon(<IconPlus />, "Crear rutina")}
            </Button>
          </Link>
        </div>

        {newDraft && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#2E8BFF]/25 bg-[#2E8BFF]/10 px-4 py-3 text-sm text-slate-200">
            <p>
              Tienes un borrador sin guardar
              {newDraft.name.trim() ? (
                <>
                  :{" "}
                  <span className="font-medium text-white">
                    {newDraft.name.trim()}
                  </span>
                </>
              ) : null}
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/rutinas/nueva"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0A1626]"
              >
                <IconPencil size={14} />
                Continuar editando
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearRoutineDraft();
                  setNewDraft(null);
                }}
                className="rounded-full border border-white/15 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
              >
                Descartar
              </button>
            </div>
          </div>
        )}

        {!ready ? (
          <p className="text-sm text-slate-400">Cargando…</p>
        ) : routines.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/15 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">Aún no tienes rutinas</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Arma tu semana eligiendo ejercicios por día. Cuando la guardes,
              podrás editarla cuando quieras desde aquí.
            </p>
            <div className="mt-6">
              <Link to="/rutinas/nueva">
                <Button variant="white" className="h-11 px-6 text-sm">
                  {withIcon(<IconPlus />, "Empezar ahora")}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {routines.map((routine) => {
              const preview = WEEKDAYS.flatMap((day) =>
                routine.days[day].enabled
                  ? [
                      ...(routine.days[day].warmupEnabled
                        ? routine.days[day].warmupExercises
                        : []),
                      ...routine.days[day].exercises,
                    ]
                  : []
              )
                .map((item) => getExerciseById(item.exerciseId))
                .filter(Boolean)
                .slice(0, 3);

              const exerciseCount = countRoutineExercises(routine.days);

              return (
                <li
                  key={routine.id}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20"
                >
                  <div className="mb-4 flex gap-2">
                    {preview.map((exercise) =>
                      exercise ? (
                        <img
                          key={exercise.id}
                          src={getExerciseImageUrl(exercise.imagePath)}
                          alt=""
                          className="h-14 w-14 rounded-md object-cover"
                          loading="lazy"
                        />
                      ) : null
                    )}
                  </div>
                  <h2 className="text-lg font-semibold">{routine.name}</h2>
                  {routine.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                      {routine.description}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-slate-500">
                    {summarizeEnabledDays(routine.days)} · {exerciseCount}{" "}
                    ejercicio
                    {exerciseCount === 1 ? "" : "s"} · actualizada{" "}
                    {new Date(routine.updatedAt).toLocaleDateString("es-MX")}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      to={`/rutinas/${routine.id}/editar`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0A1626]"
                    >
                      <IconPencil size={14} />
                      Editar
                    </Link>
                    <Link
                      to={`/rutinas/${routine.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs text-slate-200 hover:border-white"
                    >
                      <IconEye size={14} />
                      Ver
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            `¿Eliminar la rutina "${routine.name}"?`
                          )
                        ) {
                          remove(routine.id);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-400/30 px-4 py-2 text-xs text-red-300 hover:bg-red-500/10"
                    >
                      <IconTrash size={14} />
                      Eliminar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};
