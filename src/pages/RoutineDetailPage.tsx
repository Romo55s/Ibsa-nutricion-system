import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ConfirmDeleteDialog } from "../components/ConfirmDeleteDialog";
import { ExerciseMedia } from "../components/routines/ExerciseMedia";
import {
  IconPencil,
  IconPdf,
  IconTrash,
} from "../components/routines/RoutineIcons";
import { useRoutines } from "../hooks/useRoutines";
import { getExerciseById } from "../data/exercises";
import { exportRoutinePdf } from "../lib/buildRoutinePdfHtml";
import {
  formatExerciseLoad,
  formatExerciseLoadLabel,
  formatExerciseWeight,
  summarizeEnabledDays,
  weekdayLabels,
  weekdayShortLabels,
} from "../lib/weekPlan";
import { WEEKDAYS } from "../types/routines";
import type { Routine, RoutineExercise, Weekday } from "../types/routines";

function ExerciseDetailCard({
  item,
  index,
  label,
}: {
  item: RoutineExercise;
  index: number;
  label: string;
}) {
  const exercise = getExerciseById(item.exerciseId);
  if (!exercise) return null;
  const weightLabel = formatExerciseWeight(item);
  const loadLabel = formatExerciseLoad(item);
  const loadTitle = formatExerciseLoadLabel(item.loadType);

  return (
    <li className="border-t border-light py-6">
      <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8">
        <ExerciseMedia exercise={exercise} />
        <div>
          <p className="editorial-label text-muted">
            {label} {index + 1}
          </p>
          <h3 className="mt-2 break-words font-display text-3xl">{exercise.name}</h3>
          <p className="text-sm text-muted">{exercise.nameEn}</p>

          <dl
            className={`mt-5 grid gap-2 text-center ${
              weightLabel ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
            }`}
          >
            <div className="min-w-0 break-words border-t border-light bg-mist px-1 py-3">
              <dt className="text-xs uppercase tracking-wide text-muted">
                Series
              </dt>
              <dd className="mt-1 text-lg font-semibold">{item.sets}</dd>
            </div>
            <div className="min-w-0 break-words border-t border-light bg-mist px-1 py-3">
              <dt className="text-xs uppercase tracking-wide text-muted">
                {loadTitle}
              </dt>
              <dd className="mt-1 text-lg font-semibold">{loadLabel}</dd>
            </div>
            <div className="min-w-0 break-words border-t border-light bg-mist px-1 py-3">
              <dt className="text-xs uppercase tracking-wide text-muted">
                Descanso
              </dt>
              <dd className="mt-1 text-lg font-semibold">
                {item.restSeconds}s
              </dd>
            </div>
            {weightLabel && (
              <div
                className={`min-w-0 break-words border-t border-light bg-mist px-1 py-3 ${
                  (item.weightMode ?? "fixed") === "perSet"
                    ? "col-span-2 sm:col-span-4"
                    : ""
                }`}
              >
                <dt className="text-xs uppercase tracking-wide text-muted">
                  {(item.weightMode ?? "fixed") === "range"
                    ? "Rango"
                    : (item.weightMode ?? "fixed") === "perSet"
                      ? "Peso por serie"
                      : "Peso"}
                </dt>
                <dd
                  className={`mt-1 font-semibold ${
                    (item.weightMode ?? "fixed") === "perSet"
                      ? "text-base sm:text-lg"
                      : "text-lg"
                  }`}
                >
                  {weightLabel}
                </dd>
              </div>
            )}
          </dl>

          {item.notes && (
            <p className="mt-4 break-words text-base text-accent">
              <span className="font-medium text-primary">Notas: </span>
              {item.notes}
            </p>
          )}

          {exercise.cues && exercise.cues.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
              {exercise.cues.map((cue) => (
                <li key={cue}>{cue}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

export const RoutineDetailPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { find, remove, ready } = useRoutines();
  const [routine, setRoutine] = useState<Routine | null | undefined>(undefined);
  const [activeDay, setActiveDay] = useState<Weekday>("monday");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const found = find(id) ?? null;
    setRoutine(found);
    if (found) {
      const firstEnabled =
        WEEKDAYS.find((day) => found.days[day].enabled) ?? "monday";
      setActiveDay(firstEnabled);
    }
  }, [find, id, ready]);

  useEffect(() => {
    if (!routine) return;
    const prev = document.title;
    document.title = `${routine.name} | IBSA Nutrición`;
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
          <p className="mt-2 text-muted">
            Puede que la hayas eliminado o que estés en otro dispositivo.
          </p>
          <Link to="/rutinas" className="editorial-link mt-6 min-h-11 font-medium text-accent">
            Volver a mis rutinas
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const dayPlan = routine.days[activeDay];
  const dayExerciseCount =
    (dayPlan.warmupEnabled ? dayPlan.warmupExercises.length : 0) +
    dayPlan.exercises.length;

  const handleExportPdf = async () => {
    setPdfError(null);
    setPdfBusy(true);
    try {
      await exportRoutinePdf(routine);
    } catch (err) {
      setPdfError(
        err instanceof Error ? err.message : "No se pudo exportar el PDF."
      );
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-primary">
      <a href="#main-content" className="skip-to-content" data-router-link>
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="editorial-container pb-20 pt-28 lg:pt-36">
        <Link
          to="/rutinas"
          className="editorial-link min-h-11 font-medium text-accent"
        >
          ← Mis rutinas
        </Link>

        <div className="mt-4 flex flex-col gap-5 border-b border-primary pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="editorial-heading break-words">
              {routine.name}
            </h1>
            {routine.description && (
              <p className="mt-3 max-w-2xl break-words text-muted">
                {routine.description}
              </p>
            )}
            <p className="mt-3 text-sm font-medium text-accent">
              {summarizeEnabledDays(routine.days)}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              to={`/rutinas/${routine.id}/editar`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-2"
            >
              <IconPencil />
              Editar
            </Link>
            <button
              type="button"
              disabled={pdfBusy}
              onClick={handleExportPdf}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-light px-5 py-3 text-sm font-semibold text-primary-2 transition-colors hover:border-accent hover:bg-mist disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IconPdf />
              {pdfBusy ? "Preparando PDF…" : "Exportar PDF"}
            </button>
            <button
              type="button"
              onClick={() => setDeleteDialogOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-800 transition-colors hover:bg-red-100"
            >
              <IconTrash />
              Eliminar
            </button>
          </div>
        </div>

        {pdfError && (
          <p role="alert" className="mt-4 rounded-sm border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">
            {pdfError}
          </p>
        )}

        <p className="mt-3 text-xs text-muted">
          Se abre el diálogo de impresión: elige{" "}
          <span className="text-accent">Guardar como PDF</span>.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {WEEKDAYS.map((day) => {
            const plan = routine.days[day];
            const selected = activeDay === day;
            const count =
              (plan.warmupEnabled ? plan.warmupExercises.length : 0) +
              plan.exercises.length;
            return (
              <button
                key={day}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveDay(day)}
                className={`min-h-14 min-w-0 rounded-sm border px-1.5 py-2 text-center transition-colors ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : plan.enabled
                      ? "border-accent bg-mist text-primary hover:border-primary"
                      : "border-light bg-white text-muted hover:border-accent"
                }`}
              >
                <div className="text-xs font-semibold">
                  {weekdayShortLabels[day]}
                </div>
                <div className="mt-1 break-words text-xs">
                  {plan.enabled ? `${count} ej.` : "Descanso"}
                </div>
              </button>
            );
          })}
        </div>

        <section className="mt-6">
          <div className="mb-6">
            <h2 className="break-words font-display text-3xl">
              {weekdayLabels[activeDay]}
              {dayPlan.focus.trim() ? ` — ${dayPlan.focus}` : ""}
            </h2>
          </div>

          {!dayPlan.enabled ? (
            <div className="border-y border-light bg-mist px-6 py-14 text-center">
              <p className="font-display text-2xl">Día de descanso</p>
              <p className="mt-2 text-sm text-muted">
                Este día está desactivado en tu plan semanal.
              </p>
            </div>
          ) : dayExerciseCount === 0 ? (
            <div className="border-y border-light bg-mist px-6 py-14 text-center">
              <p className="font-display text-2xl">Sin ejercicios</p>
              <p className="mt-2 text-sm text-muted">
                Edita la rutina para agregar ejercicios a este día.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {dayPlan.warmupEnabled &&
                dayPlan.warmupExercises.length > 0 && (
                  <div>
                    <h3 className="editorial-label mb-3 text-accent">
                      Calentamiento
                    </h3>
                    <ol className="space-y-0">
                      {dayPlan.warmupExercises.map((item, index) => (
                        <ExerciseDetailCard
                          key={`warmup-${item.exerciseId}-${index}`}
                          item={item}
                          index={index}
                          label="Activación"
                        />
                      ))}
                    </ol>
                  </div>
                )}

              {dayPlan.exercises.length > 0 && (
                <div>
                  {dayPlan.warmupEnabled &&
                    dayPlan.warmupExercises.length > 0 && (
                      <h3 className="editorial-label mb-3 text-accent">
                        Trabajo principal
                      </h3>
                    )}
                  <ol className="space-y-0">
                    {dayPlan.exercises.map((item, index) => (
                      <ExerciseDetailCard
                        key={`main-${item.exerciseId}-${index}`}
                        item={item}
                        index={index}
                        label="Ejercicio"
                      />
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
      {deleteDialogOpen && (
        <ConfirmDeleteDialog
          itemName={routine.name}
          onCancel={() => setDeleteDialogOpen(false)}
          onConfirm={() => {
            remove(routine.id);
            setDeleteDialogOpen(false);
            navigate("/rutinas", { state: { focusRoutineHeading: true } });
          }}
        />
      )}
    </div>
  );
};
