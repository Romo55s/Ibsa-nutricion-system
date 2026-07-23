import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { ExercisePickerModal } from "./ExercisePickerModal";
import { RoutineExerciseCard } from "./RoutineExerciseCard";
import { FancyToggle } from "./FormControls";
import {
  IconCheck,
  IconClose,
  IconPlus,
  withIcon,
} from "./RoutineIcons";
import {
  clearRoutineDraft,
  hasMeaningfulDraft,
  loadRoutineDraft,
  saveRoutineDraft,
} from "../../lib/routineDraftStorage";
import {
  createDefaultWeekPlan,
  sanitizeWeekPlan,
  weekdayLabels,
  weekdayShortLabels,
} from "../../lib/weekPlan";
import { WEEKDAYS } from "../../types/routines";
import type {
  DayPlan,
  Exercise,
  RoutineExercise,
  RoutineInput,
  Weekday,
  WeekPlan,
} from "../../types/routines";

interface RoutineFormProps {
  initial?: RoutineInput;
  /** When set, drafts are scoped to this routine id (edit). Omit for new. */
  draftId?: string;
  /** ISO timestamp of last saved routine — used to ignore older drafts. */
  savedUpdatedAt?: string;
  submitLabel: string;
  onSubmit: (input: RoutineInput) => void;
  onCancelHref: string;
}

const emptyExercise = (exerciseId: string): RoutineExercise => ({
  exerciseId,
  sets: 3,
  reps: "10",
  restSeconds: 60,
  notes: "",
  useWeight: false,
  weightUnit: "kg",
  weightMode: "fixed",
  weight: null,
  weightFrom: null,
  weightTo: null,
  setWeights: [null, null, null],
  loadType: "reps",
  durationSeconds: 30,
  laps: "4",
});

type PickerTarget = "warmup" | "main" | null;

export function RoutineForm({
  initial,
  draftId,
  savedUpdatedAt,
  submitLabel,
  onSubmit,
  onCancelHref,
}: RoutineFormProps) {
  const restoredDraft = useRef(
    (() => {
      const draft = loadRoutineDraft(draftId);
      if (!hasMeaningfulDraft(draft) || !draft) return null;
      if (
        savedUpdatedAt &&
        new Date(draft.savedAt).getTime() <= new Date(savedUpdatedAt).getTime()
      ) {
        clearRoutineDraft(draftId);
        return null;
      }
      return draft;
    })()
  ).current;

  const [name, setName] = useState(
    () => restoredDraft?.name ?? initial?.name ?? ""
  );
  const [description, setDescription] = useState(
    () => restoredDraft?.description ?? initial?.description ?? ""
  );
  const [days, setDays] = useState<WeekPlan>(
    () => restoredDraft?.days ?? initial?.days ?? createDefaultWeekPlan()
  );
  const [activeDay, setActiveDay] = useState<Weekday>(
    () => restoredDraft?.activeDay ?? "monday"
  );
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
  const [error, setError] = useState<string | null>(null);
  const [draftNotice, setDraftNotice] = useState(
    () => Boolean(restoredDraft)
  );
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(
    () => restoredDraft?.savedAt ?? null
  );
  const skipAutosave = useRef(true);

  useEffect(() => {
    if (skipAutosave.current) {
      skipAutosave.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      const draft = {
        name,
        description,
        days: sanitizeWeekPlan(days),
        activeDay,
      };
      if (!hasMeaningfulDraft({ ...draft, savedAt: "" })) {
        clearRoutineDraft(draftId);
        setDraftSavedAt(null);
        return;
      }
      saveRoutineDraft(draft, draftId);
      setDraftSavedAt(new Date().toISOString());
      setDraftNotice(false);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [name, description, days, activeDay, draftId]);

  useEffect(() => {
    const persistNow = () => {
      if (skipAutosave.current) return;
      const draft = {
        name,
        description,
        days: sanitizeWeekPlan(days),
        activeDay,
      };
      if (hasMeaningfulDraft({ ...draft, savedAt: "" })) {
        saveRoutineDraft(draft, draftId);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") persistNow();
    };

    window.addEventListener("beforeunload", persistNow);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("beforeunload", persistNow);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [name, description, days, activeDay, draftId]);

  const dayPlan = days[activeDay];

  const discardDraft = () => {
    clearRoutineDraft(draftId);
    setDraftNotice(false);
    setDraftSavedAt(null);
    setName(initial?.name ?? "");
    setDescription(initial?.description ?? "");
    setDays(initial?.days ?? createDefaultWeekPlan());
    setActiveDay("monday");
    skipAutosave.current = true;
  };

  const patchDay = (day: Weekday, patch: Partial<DayPlan>) => {
    setDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], ...patch },
    }));
  };

  const handleAdd = (selected: Exercise[]) => {
    if (selected.length === 0) return;
    setDays((prev) => {
      const current = prev[activeDay];
      const nextItems = selected.map((exercise) => emptyExercise(exercise.id));
      if (pickerTarget === "warmup") {
        return {
          ...prev,
          [activeDay]: {
            ...current,
            enabled: true,
            warmupEnabled: true,
            warmupExercises: [...current.warmupExercises, ...nextItems],
          },
        };
      }
      return {
        ...prev,
        [activeDay]: {
          ...current,
          enabled: true,
          exercises: [...current.exercises, ...nextItems],
        },
      };
    });
  };

  const updateListItem = (
    list: "exercises" | "warmupExercises",
    index: number,
    patch: Partial<RoutineExercise>
  ) => {
    patchDay(activeDay, {
      [list]: dayPlan[list].map((item, i) =>
        i === index ? { ...item, ...patch } : item
      ),
    });
  };

  const removeListItem = (
    list: "exercises" | "warmupExercises",
    index: number
  ) => {
    patchDay(activeDay, {
      [list]: dayPlan[list].filter((_, i) => i !== index),
    });
  };

  const moveListItem = (
    list: "exercises" | "warmupExercises",
    index: number,
    direction: -1 | 1
  ) => {
    const next = [...dayPlan[list]];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    patchDay(activeDay, { [list]: next });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Ponle un nombre a tu rutina.");
      return;
    }

    const enabledDays = WEEKDAYS.filter((day) => days[day].enabled);
    if (enabledDays.length === 0) {
      setError("Activa al menos un día de la semana.");
      return;
    }

    const hasExercises = enabledDays.some((day) => {
      const plan = days[day];
      const warmup =
        plan.warmupEnabled && plan.warmupExercises.length > 0;
      return warmup || plan.exercises.length > 0;
    });
    if (!hasExercises) {
      setError("Agrega al menos un ejercicio en un día activo.");
      return;
    }

    setError(null);
    clearRoutineDraft(draftId);
    setDraftSavedAt(null);
    setDraftNotice(false);
    onSubmit({
      name: trimmedName,
      description: description.trim(),
      days: sanitizeWeekPlan(days),
    });
  };

  const excludeIds =
    pickerTarget === "warmup"
      ? dayPlan.warmupExercises.map((item) => item.exerciseId)
      : dayPlan.exercises.map((item) => item.exerciseId);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {(draftNotice || draftSavedAt) && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#2E8BFF]/25 bg-[#2E8BFF]/10 px-4 py-3 text-sm text-slate-200">
          <p>
            {draftNotice
              ? "Se recuperó un borrador guardado en este navegador."
              : "Borrador guardado automáticamente."}
            {draftSavedAt && (
              <span className="ml-1 text-slate-400">
                ({new Date(draftSavedAt).toLocaleString()})
              </span>
            )}
          </p>
          {draftNotice && (
            <button
              type="button"
              onClick={discardDraft}
              className="text-xs font-medium text-blue-200 underline-offset-2 hover:underline"
            >
              Descartar borrador
            </button>
          )}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-300">
            Nombre de la rutina
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Hipertrofia 5 días"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-colors focus:border-[#2E8BFF]/50"
          />
        </label>
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-300">
            Descripción (opcional)
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Notas sobre el objetivo de la semana"
            className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-colors focus:border-[#2E8BFF]/50"
          />
        </label>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Semana (lunes a domingo)
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Activa o desactiva cada día. Puedes añadir un bloque opcional de
            calentamiento.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {WEEKDAYS.map((day) => {
            const plan = days[day];
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
                      : "border-white/10 bg-transparent text-slate-500 hover:border-white/20"
                }`}
              >
                <div className="text-xs font-semibold">
                  {weekdayShortLabels[day]}
                </div>
                <div className="mt-1 truncate text-[10px] tracking-wide">
                  {plan.focus.trim()
                    ? plan.focus.trim()
                    : plan.enabled
                      ? `${count} ej.`
                      : "Off"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0A1626] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2E8BFF]">
                Día seleccionado
              </p>
              <h3 className="text-lg font-semibold text-white">
                {weekdayLabels[activeDay]}
              </h3>
              <div className="mt-3">
                <FancyToggle
                  checked={dayPlan.enabled}
                  label="Día activo (entrenar)"
                  onChange={(checked) =>
                    patchDay(activeDay, { enabled: checked })
                  }
                />
              </div>
            </div>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-xs font-medium text-slate-400">
              Enfoque del día (opcional)
            </span>
            <input
              value={dayPlan.focus}
              onChange={(e) =>
                patchDay(activeDay, { focus: e.target.value })
              }
              placeholder="Ej. Pecho / Empuje / Full body"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-[#2E8BFF]/50"
            />
            <p className="text-[11px] text-slate-500">
              Si lo llenas, se guarda con la rutina en este navegador.
            </p>
          </label>

          {!dayPlan.enabled ? (
            <p className="mt-6 rounded-xl border border-dashed border-white/15 px-4 py-8 text-center text-sm text-slate-400">
              Este día está desactivado. Actívalo para agregar ejercicios, o
              déjalo así para descanso.
            </p>
          ) : (
            <div className="mt-6 space-y-8">
              {/* Warmup */}
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-white">
                      Calentamiento
                      <span className="ml-2 text-xs font-normal text-slate-500">
                        (opcional)
                      </span>
                    </h4>
                    <p className="mt-1 text-xs text-slate-400">
                      Activación: abdomen, cuerda, trote, movilidad…
                    </p>
                  </div>
                  <FancyToggle
                    checked={dayPlan.warmupEnabled}
                    label="Incluir calentamiento"
                    onChange={(checked) =>
                      patchDay(activeDay, { warmupEnabled: checked })
                    }
                  />
                </div>

                {dayPlan.warmupEnabled && (
                  <>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="white"
                        className="h-10 px-5 text-sm"
                        onClick={() => setPickerTarget("warmup")}
                      >
                        {withIcon(<IconPlus />, "Agregar a calentamiento")}
                      </Button>
                    </div>

                    {dayPlan.warmupExercises.length === 0 ? (
                      <p className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-center text-sm text-slate-400">
                        Sin ejercicios de calentamiento todavía.
                      </p>
                    ) : (
                      <ul className="space-y-4">
                        {dayPlan.warmupExercises.map((item, index) => (
                          <RoutineExerciseCard
                            key={`warmup-${item.exerciseId}-${index}`}
                            item={item}
                            index={index}
                            onChange={(patch) =>
                              updateListItem(
                                "warmupExercises",
                                index,
                                patch
                              )
                            }
                            onMove={(dir) =>
                              moveListItem("warmupExercises", index, dir)
                            }
                            onRemove={() =>
                              removeListItem("warmupExercises", index)
                            }
                          />
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </section>

              {/* Main work */}
              <section className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-base font-semibold text-white">
                    Trabajo principal
                  </h4>
                  <Button
                    type="button"
                    variant="white"
                    className="h-10 px-5 text-sm"
                    onClick={() => setPickerTarget("main")}
                  >
                    {withIcon(<IconPlus />, "Agregar ejercicio")}
                  </Button>
                </div>

                {dayPlan.exercises.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-white/15 px-4 py-10 text-center text-sm text-slate-400">
                    Sin ejercicios este día. Abre el catálogo para armar la
                    sesión.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {dayPlan.exercises.map((item, index) => (
                      <RoutineExerciseCard
                        key={`main-${item.exerciseId}-${index}`}
                        item={item}
                        index={index}
                        onChange={(patch) =>
                          updateListItem("exercises", index, patch)
                        }
                        onMove={(dir) =>
                          moveListItem("exercises", index, dir)
                        }
                        onRemove={() => removeListItem("exercises", index)}
                      />
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}
        </div>
      </section>

      <ExercisePickerModal
        isOpen={pickerTarget !== null}
        onClose={() => setPickerTarget(null)}
        onAdd={handleAdd}
        excludeIds={excludeIds}
        dayLabel={weekdayLabels[activeDay]}
        mode={pickerTarget === "warmup" ? "warmup" : "main"}
      />

      {error && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="white" className="h-11 px-6 text-sm">
          {withIcon(<IconCheck />, submitLabel)}
        </Button>
        <Link
          to={onCancelHref}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-6 text-sm text-slate-300 transition-colors hover:border-white hover:text-white"
        >
          <IconClose />
          Cancelar
        </Link>
      </div>
    </form>
  );
}
