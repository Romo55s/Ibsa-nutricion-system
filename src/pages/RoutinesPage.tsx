import { useEffect, useRef, useState } from "react";
import { Link, useLinkClickHandler, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { ConfirmDeleteDialog } from "../components/ConfirmDeleteDialog";
import {
  IconEye,
  IconPencil,
  IconPlus,
  IconTrash,
  withIcon,
} from "../components/routines/RoutineIcons";
import { useRoutines } from "../hooks/useRoutines";
import { getExerciseById, getExerciseImageUrl } from "../data/exercises";
import { isCustomExercise } from "../lib/customExercisesStorage";
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
  const openNewRoutine = useLinkClickHandler<HTMLAnchorElement>("/rutinas/nueva");
  const location = useLocation();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { routines, ready, remove } = useRoutines();
  const [newDraft, setNewDraft] = useState(() => {
    const draft = loadRoutineDraft();
    return hasMeaningfulDraft(draft) ? draft : null;
  });
  const [deleteRoutineId, setDeleteRoutineId] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as { focusRoutineHeading?: boolean } | null;
    if (!state?.focusRoutineHeading) return;
    window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });
  }, [location.key, location.state]);

  useEffect(() => {
    const prev = document.title;
    document.title = "Mis rutinas | IBSA Nutrición";
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
      <main id="main-content" tabIndex={-1} className="editorial-container pb-20 pt-28 lg:pt-36">
        <div className="mb-8 flex flex-col items-start gap-5 border-b border-primary pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-label mb-3 text-muted">
              Entrenamiento
            </p>
            <h1 ref={headingRef} tabIndex={-1} className="editorial-heading break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Mis rutinas
            </h1>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Guardadas en este navegador. Puedes verlas, editarlas o
              eliminarlas cuando quieras; también exportar a PDF.
            </p>
          </div>
          <Button variant="primary" href="/rutinas/nueva" onClick={openNewRoutine}>
            {withIcon(<IconPlus />, "Crear rutina")}
          </Button>
        </div>

        {newDraft && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-l-2 border-accent bg-mist px-5 py-4 text-base text-primary">
            <p>
              Tienes un borrador sin guardar
              {newDraft.name.trim() ? (
                <>
                  :{" "}
                  <span className="font-medium text-primary">
                    {newDraft.name.trim()}
                  </span>
                </>
              ) : null}
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/rutinas/nueva"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-2"
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
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-200 px-4 py-3 text-sm font-medium text-red-800 hover:bg-red-100"
              >
                Descartar
              </button>
            </div>
          </div>
        )}

        {!ready ? (
          <p className="text-sm text-muted">Cargando…</p>
        ) : routines.length === 0 ? (
          <div className="border-y border-light bg-mist px-6 py-16 text-center">
            <h2 className="font-display text-3xl">Aún no tienes rutinas</h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
              Arma tu semana eligiendo ejercicios por día. Cuando la guardes,
              podrás editarla cuando quieras desde aquí.
            </p>
            <div className="mt-6">
              <Button variant="primary" href="/rutinas/nueva" onClick={openNewRoutine}>
                {withIcon(<IconPlus />, "Empezar ahora")}
              </Button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-light border-y border-light">
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
                  className="grid gap-x-6 gap-y-3 py-6 sm:grid-cols-[minmax(0,1fr)_auto]"
                >
                  <div className="flex gap-1.5 empty:hidden sm:col-span-2">
                    {preview.map((exercise, index) =>
                      exercise ? (
                        isCustomExercise(exercise) ||
                        !getExerciseImageUrl(exercise.imagePath) ? (
                          <div
                            key={`${exercise.id}-${index}`}
                            className="flex h-12 w-12 items-center justify-center rounded-sm bg-mist font-display text-2xl text-muted"
                            aria-hidden
                          >
                            {exercise.name.trim().charAt(0).toUpperCase() || "?"}
                          </div>
                        ) : (
                          <img
                            key={`${exercise.id}-${index}`}
                            src={getExerciseImageUrl(exercise.imagePath)}
                            alt=""
                            className="h-12 w-12 rounded-sm object-cover"
                            loading="lazy"
                          />
                        )
                      ) : null
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="break-words font-display text-3xl">{routine.name}</h2>
                    {routine.description && (
                      <p className="mt-2 line-clamp-2 break-words leading-relaxed text-muted">
                        {routine.description}
                      </p>
                    )}
                    <p className="mt-3 text-sm text-muted">
                      {summarizeEnabledDays(routine.days)} · {exerciseCount}{" "}
                      ejercicio
                      {exerciseCount === 1 ? "" : "s"} · actualizada{" "}
                      {new Date(routine.updatedAt).toLocaleDateString("es-MX")}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 self-center">
                    <Link
                      to={`/rutinas/${routine.id}/editar`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-2"
                    >
                      <IconPencil size={14} />
                      Editar
                    </Link>
                    <Link
                      to={`/rutinas/${routine.id}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-light px-4 py-3 text-sm font-medium text-primary-2 transition-colors hover:border-accent"
                    >
                      <IconEye size={14} />
                      Ver
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteRoutineId(routine.id)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-3 text-sm font-medium text-red-800 transition-colors hover:bg-red-100"
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
      {deleteRoutineId && (
        <ConfirmDeleteDialog
          itemName={routines.find((routine) => routine.id === deleteRoutineId)?.name ?? "esta rutina"}
          onCancel={() => setDeleteRoutineId(null)}
          onConfirm={() => {
            remove(deleteRoutineId);
            setDeleteRoutineId(null);
            window.requestAnimationFrame(() => {
              headingRef.current?.focus({ preventScroll: true });
            });
          }}
        />
      )}
    </div>
  );
};
