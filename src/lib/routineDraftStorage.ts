import type { RoutineInput, Weekday, WeekPlan } from "../types/routines";
import { WEEKDAYS } from "../types/routines";
import { createDefaultWeekPlan, sanitizeWeekPlan } from "./weekPlan";

const DRAFT_PREFIX = "ibsa.routine-draft.v1";

export interface RoutineDraft extends RoutineInput {
  activeDay: Weekday;
  savedAt: string;
}

function draftKey(draftId?: string): string {
  return draftId ? `${DRAFT_PREFIX}:${draftId}` : `${DRAFT_PREFIX}:new`;
}

function isWeekday(value: unknown): value is Weekday {
  return typeof value === "string" && (WEEKDAYS as readonly string[]).includes(value);
}

function normalizeDraft(raw: Partial<RoutineDraft> | null): RoutineDraft | null {
  if (!raw || typeof raw !== "object") return null;

  const days: WeekPlan =
    raw.days && typeof raw.days === "object"
      ? sanitizeWeekPlan(raw.days as WeekPlan)
      : createDefaultWeekPlan();

  return {
    name: typeof raw.name === "string" ? raw.name : "",
    description: typeof raw.description === "string" ? raw.description : "",
    days,
    activeDay: isWeekday(raw.activeDay) ? raw.activeDay : "monday",
    savedAt:
      typeof raw.savedAt === "string" ? raw.savedAt : new Date().toISOString(),
  };
}

export function loadRoutineDraft(draftId?: string): RoutineDraft | null {
  try {
    const raw = localStorage.getItem(draftKey(draftId));
    if (!raw) return null;
    return normalizeDraft(JSON.parse(raw) as Partial<RoutineDraft>);
  } catch {
    return null;
  }
}

export function saveRoutineDraft(
  draft: Omit<RoutineDraft, "savedAt">,
  draftId?: string
): void {
  try {
    const payload: RoutineDraft = {
      name: draft.name,
      description: draft.description,
      days: sanitizeWeekPlan(draft.days),
      activeDay: draft.activeDay,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(draftKey(draftId), JSON.stringify(payload));
  } catch (error) {
    console.error("No se pudo guardar el borrador de la rutina", error);
  }
}

export function clearRoutineDraft(draftId?: string): void {
  try {
    localStorage.removeItem(draftKey(draftId));
  } catch {
    // ignore
  }
}

export function hasMeaningfulDraft(draft: RoutineDraft | null): boolean {
  if (!draft) return false;
  if (draft.name.trim()) return true;
  if (draft.description.trim()) return true;
  return WEEKDAYS.some((day) => {
    const plan = draft.days[day];
    return (
      plan.exercises.length > 0 ||
      plan.warmupExercises.length > 0 ||
      Boolean(plan.focus.trim())
    );
  });
}
