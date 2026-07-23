import type { DayPlan, Weekday, WeekPlan } from "../types/routines";
import { WEEKDAYS } from "../types/routines";

export const weekdayLabels: Record<Weekday, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

export const weekdayShortLabels: Record<Weekday, string> = {
  monday: "Lun",
  tuesday: "Mar",
  wednesday: "Mié",
  thursday: "Jue",
  friday: "Vie",
  saturday: "Sáb",
  sunday: "Dom",
};

export function emptyDay(enabled = false): DayPlan {
  return {
    enabled,
    focus: "",
    warmupEnabled: false,
    warmupExercises: [],
    exercises: [],
  };
}

/** Default week: Mon–Fri on, weekend off (user can toggle any day). */
export function createDefaultWeekPlan(): WeekPlan {
  return {
    monday: emptyDay(true),
    tuesday: emptyDay(true),
    wednesday: emptyDay(true),
    thursday: emptyDay(true),
    friday: emptyDay(true),
    saturday: emptyDay(false),
    sunday: emptyDay(false),
  };
}

export function normalizeDayPlan(day: Partial<DayPlan> | undefined): DayPlan {
  const base = emptyDay(false);
  if (!day) return base;
  return {
    enabled: Boolean(day.enabled),
    focus: typeof day.focus === "string" ? day.focus : "",
    warmupEnabled: Boolean(day.warmupEnabled),
    warmupExercises: Array.isArray(day.warmupExercises)
      ? day.warmupExercises.map(normalizeRoutineExercise)
      : [],
    exercises: Array.isArray(day.exercises)
      ? day.exercises.map(normalizeRoutineExercise)
      : [],
  };
}

/** Normalize the full week before writing to localStorage. */
export function sanitizeWeekPlan(days: WeekPlan): WeekPlan {
  const next = {} as WeekPlan;
  for (const day of WEEKDAYS) {
    const plan = normalizeDayPlan(days[day]);
    next[day] = {
      ...plan,
      focus: plan.focus.trim(),
    };
  }
  return next;
}

export function normalizeRoutineExercise(item: Record<string, unknown> | {
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
  useWeight?: boolean;
  weight?: number | null;
  weightUnit?: "kg" | "lb";
  weightMode?: "fixed" | "range" | "perSet";
  weightFrom?: number | null;
  weightTo?: number | null;
  setWeights?: Array<number | null>;
  loadType?: "reps" | "time" | "laps";
  durationSeconds?: number;
  laps?: string;
}) {
  const loadType =
    item.loadType === "time"
      ? ("time" as const)
      : item.loadType === "laps"
        ? ("laps" as const)
        : ("reps" as const);
  const sets = Math.max(1, Number(item.sets) || 1);
  const weightMode: "fixed" | "range" | "perSet" =
    item.weightMode === "range" || item.weightMode === "perSet"
      ? item.weightMode
      : "fixed";

  const rawSetWeights = Array.isArray(item.setWeights) ? item.setWeights : [];
  const setWeights = Array.from({ length: sets }, (_, i) => {
    const v = rawSetWeights[i];
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  });

  const toNumOrNull = (v: unknown): number | null => {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  };

  return {
    exerciseId: String(item.exerciseId),
    sets,
    reps: String(item.reps ?? "10"),
    restSeconds: Number(item.restSeconds) || 0,
    notes: typeof item.notes === "string" ? item.notes : "",
    useWeight: Boolean(item.useWeight),
    weightUnit: item.weightUnit === "lb" ? ("lb" as const) : ("kg" as const),
    weightMode,
    weight: toNumOrNull(item.weight),
    weightFrom: toNumOrNull(item.weightFrom),
    weightTo: toNumOrNull(item.weightTo),
    setWeights,
    loadType,
    durationSeconds:
      Number(item.durationSeconds) > 0 ? Number(item.durationSeconds) : 30,
    laps: String(item.laps ?? "4"),
  };
}

export function syncSetWeights(
  setWeights: Array<number | null>,
  sets: number
): Array<number | null> {
  const next = setWeights.slice(0, sets);
  while (next.length < sets) {
    next.push(next.length > 0 ? next[next.length - 1] : null);
  }
  return next;
}

export function formatExerciseLoad(item: {
  loadType: "reps" | "time" | "laps";
  reps: string;
  durationSeconds: number;
  laps?: string;
}): string {
  if (item.loadType === "time") {
    return `${item.durationSeconds}s`;
  }
  if (item.loadType === "laps") {
    const laps = (item.laps ?? "").trim() || "—";
    return `${laps} vueltas`;
  }
  return item.reps;
}

export function formatExerciseLoadLabel(
  loadType: "reps" | "time" | "laps"
): string {
  if (loadType === "time") return "Tiempo";
  if (loadType === "laps") return "Vueltas";
  return "Reps";
}

export function getEnabledDays(days: WeekPlan): Weekday[] {
  return WEEKDAYS.filter((day) => days[day].enabled);
}

export function countRoutineExercises(days: WeekPlan): number {
  return WEEKDAYS.reduce((total, day) => {
    const plan = days[day];
    if (!plan.enabled) return total;
    const warmup = plan.warmupEnabled ? plan.warmupExercises.length : 0;
    return total + warmup + plan.exercises.length;
  }, 0);
}

export function summarizeEnabledDays(days: WeekPlan): string {
  const enabled = getEnabledDays(days);
  if (enabled.length === 0) return "Sin días activos";
  if (enabled.length === 7) return "Lun–Dom";
  return enabled.map((day) => weekdayShortLabels[day]).join(" · ");
}

export function formatExerciseWeight(item: {
  useWeight: boolean;
  weightUnit: "kg" | "lb";
  weightMode?: "fixed" | "range" | "perSet";
  weight: number | null;
  weightFrom?: number | null;
  weightTo?: number | null;
  setWeights?: Array<number | null>;
}): string | null {
  if (!item.useWeight) return null;
  const unit = item.weightUnit;
  const mode = item.weightMode ?? "fixed";

  if (mode === "range") {
    const from = item.weightFrom;
    const to = item.weightTo;
    if (from === null || from === undefined || Number.isNaN(from)) return null;
    if (to === null || to === undefined || Number.isNaN(to)) {
      return `${from}+ ${unit}`;
    }
    return `${from}–${to} ${unit}`;
  }

  if (mode === "perSet") {
    const weights = (item.setWeights ?? []).filter(
      (w): w is number => w !== null && !Number.isNaN(w)
    );
    if (weights.length === 0) return null;
    return weights.map((w) => `${w}`).join(" → ") + ` ${unit}`;
  }

  if (item.weight === null || Number.isNaN(item.weight)) return null;
  return `${item.weight} ${unit}`;
}
