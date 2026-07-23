import { WEEKDAYS } from "../types/routines";
import type { Routine, RoutineInput, WeekPlan, Weekday } from "../types/routines";
import {
  createDefaultWeekPlan,
  normalizeDayPlan,
  normalizeRoutineExercise,
  sanitizeWeekPlan,
} from "./weekPlan";

const STORAGE_KEY = "ibsa.routines.v2";
const LEGACY_STORAGE_KEY = "ibsa.routines.v1";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `routine-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type LegacyRoutine = {
  id: string;
  name: string;
  description: string;
  exercises?: Array<Record<string, unknown>>;
  days?: Partial<Record<Weekday, Record<string, unknown>>>;
  createdAt: string;
  updatedAt: string;
};

function normalizeWeek(days: LegacyRoutine["days"]): WeekPlan {
  const base = createDefaultWeekPlan();
  if (!days) return base;
  for (const day of WEEKDAYS) {
    base[day] = normalizeDayPlan(days[day] as never);
  }
  return base;
}

function migrateLegacy(raw: LegacyRoutine): Routine {
  if (raw.days) {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description ?? "",
      days: normalizeWeek(raw.days),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  const days = createDefaultWeekPlan();
  days.monday = normalizeDayPlan({
    enabled: true,
    focus: "",
    warmupEnabled: false,
    warmupExercises: [],
    exercises: (raw.exercises ?? []).map((item) =>
      normalizeRoutineExercise(item)
    ),
  });

  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? "",
    days,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function readAll(): Routine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LegacyRoutine[];
      if (!Array.isArray(parsed)) return [];
      return parsed.map(migrateLegacy);
    }

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacy) return [];
    const parsed = JSON.parse(legacy) as LegacyRoutine[];
    if (!Array.isArray(parsed)) return [];
    const migrated = parsed.map(migrateLegacy);
    writeAll(migrated);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return migrated;
  } catch {
    return [];
  }
}

function writeAll(routines: Routine[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
  } catch (error) {
    console.error("No se pudieron guardar las rutinas en localStorage", error);
    throw error;
  }
}

export function listRoutines(): Routine[] {
  return readAll().sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getRoutine(id: string): Routine | undefined {
  return readAll().find((routine) => routine.id === id);
}

export function createRoutine(input: RoutineInput): Routine {
  const now = new Date().toISOString();
  const routine: Routine = {
    name: input.name.trim(),
    description: input.description.trim(),
    days: sanitizeWeekPlan(input.days),
    id: createId(),
    createdAt: now,
    updatedAt: now,
  };
  const routines = readAll();
  routines.push(routine);
  writeAll(routines);
  return routine;
}

export function updateRoutine(
  id: string,
  input: RoutineInput
): Routine | undefined {
  const routines = readAll();
  const index = routines.findIndex((routine) => routine.id === id);
  if (index === -1) return undefined;

  const updated: Routine = {
    ...routines[index],
    name: input.name.trim(),
    description: input.description.trim(),
    days: sanitizeWeekPlan(input.days),
    id,
    updatedAt: new Date().toISOString(),
  };
  routines[index] = updated;
  writeAll(routines);
  return updated;
}

export function deleteRoutine(id: string): boolean {
  const routines = readAll();
  const next = routines.filter((routine) => routine.id !== id);
  if (next.length === routines.length) return false;
  writeAll(next);
  return true;
}
