import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
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
    <li className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <ExerciseMedia exercise={exercise} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
            {label} {index + 1}
          </p>
          <h3 className="mt-1 text-2xl font-semibold">{exercise.name}</h3>
          <p className="text-sm text-slate-400">{exercise.nameEn}</p>

          <dl
            className={`mt-5 grid gap-3 text-center ${
              weightLabel ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
            }`}
          >
            <div className="rounded-md bg-white/5 px-3 py-3">
              <dt className="text-[11px] uppercase tracking-wide text-slate-500">
                Series
              </dt>
              <dd className="mt-1 text-lg font-semibold">{item.sets}</dd>
            </div>
            <div className="rounded-md bg-white/5 px-3 py-3">
              <dt className="text-[11px] uppercase tracking-wide text-slate-500">
                {loadTitle}
              </dt>
              <dd className="mt-1 text-lg font-semibold">{loadLabel}</dd>
            </div>
            <div className="rounded-md bg-white/5 px-3 py-3">
              <dt className="text-[11px] uppercase tracking-wide text-slate-500">
                Descanso
              </dt>
              <dd className="mt-1 text-lg font-semibold">
                {item.restSeconds}s
              </dd>
            </div>
            {weightLabel && (
              <div
                className={`rounded-md bg-white/5 px-3 py-3 ${
                  (item.weightMode ?? "fixed") === "perSet"
                    ? "col-span-2 sm:col-span-4"
                    : ""
                }`}
              >
                <dt className="text-[11px] uppercase tracking-wide text-slate-500">
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
            <p className="mt-4 text-sm text-slate-300">
              <span className="font-medium text-white">Notas: </span>
              {item.notes}
            </p>
          )}

          {exercise.cues && exercise.cues.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-400">
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
          <p className="mt-2 text-slate-400">
            Puede que la hayas eliminado o que estés en otro dispositivo.
          </p>
          <Link to="/rutinas" className="mt-6 inline-block text-blue-300">
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
    <div className="min-h-screen bg-[#050B14] text-white">
      <Navbar />
      <main className="container mx-auto px-6 pb-20 pt-28">
        <Link
          to="/rutinas"
          className="text-sm text-slate-400 transition-colors hover:text-white"
        >
          ← Mis rutinas
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {routine.name}
            </h1>
            {routine.description && (
              <p className="mt-3 max-w-2xl text-slate-400">
                {routine.description}
              </p>
            )}
            <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
              {summarizeEnabledDays(routine.days)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/rutinas/${routine.id}/editar`}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#0A1626] transition-opacity hover:opacity-90"
            >
              <IconPencil />
              Editar
            </Link>
            <button
              type="button"
              disabled={pdfBusy}
              onClick={handleExportPdf}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-5 text-sm text-slate-200 transition-colors hover:border-white hover:text-white disabled:opacity-50"
            >
              <IconPdf />
              {pdfBusy ? "Preparando PDF…" : "Exportar PDF"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(`¿Eliminar la rutina "${routine.name}"?`)
                ) {
                  remove(routine.id);
                  navigate("/rutinas");
                }
              }}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-red-400/30 px-5 text-sm text-red-300 hover:bg-red-500/10"
            >
              <IconTrash />
              Eliminar
            </button>
          </div>
        </div>

        {pdfError && (
          <p className="mt-4 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {pdfError}
          </p>
        )}

        <p className="mt-3 text-xs text-slate-500">
          Se abre el diálogo de impresión: elige{" "}
          <span className="text-slate-300">Guardar como PDF</span>.
        </p>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
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
                onClick={() => setActiveDay(day)}
                className={`min-w-[4.5rem] rounded-lg border px-3 py-2 text-center transition-colors ${
                  selected
                    ? "border-blue-400 bg-blue-500/15 text-white"
                    : plan.enabled
                      ? "border-white/15 bg-white/5 text-slate-200 hover:border-white/30"
                      : "border-white/10 text-slate-500 hover:border-white/20"
                }`}
              >
                <div className="text-xs font-semibold">
                  {weekdayShortLabels[day]}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wide">
                  {plan.enabled ? `${count} ej.` : "Descanso"}
                </div>
              </button>
            );
          })}
        </div>

        <section className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              {weekdayLabels[activeDay]}
              {dayPlan.focus.trim() ? ` — ${dayPlan.focus}` : ""}
            </h2>
          </div>

          {!dayPlan.enabled ? (
            <div className="rounded-lg border border-dashed border-white/15 px-6 py-14 text-center">
              <p className="text-lg font-medium">Día de descanso</p>
              <p className="mt-2 text-sm text-slate-400">
                Este día está desactivado en tu plan semanal.
              </p>
            </div>
          ) : dayExerciseCount === 0 ? (
            <div className="rounded-lg border border-dashed border-white/15 px-6 py-14 text-center">
              <p className="text-lg font-medium">Sin ejercicios</p>
              <p className="mt-2 text-sm text-slate-400">
                Edita la rutina para agregar ejercicios a este día.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {dayPlan.warmupEnabled &&
                dayPlan.warmupExercises.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#7eb8ff]">
                      Calentamiento
                    </h3>
                    <ol className="space-y-6">
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
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#7eb8ff]">
                        Trabajo principal
                      </h3>
                    )}
                  <ol className="space-y-6">
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
    </div>
  );
};
