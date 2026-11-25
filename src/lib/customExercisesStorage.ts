import type { Equipment, Exercise, MuscleGroup } from "../types/routines";

const STORAGE_KEY = "ibsa.customExercises.v1";

export const CUSTOM_EXERCISE_IMAGE = "__custom__";

export interface CustomExerciseInput {
  name: string;
  nameEn?: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  youtubeVideoId?: string;
  isWarmup?: boolean;
  cues?: string[];
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `custom-${crypto.randomUUID()}`;
  }
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readAll(): Exercise[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Exercise[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        item.id.startsWith("custom-") &&
        typeof item.name === "string"
    );
  } catch {
    return [];
  }
}

function writeAll(exercises: Exercise[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  } catch (error) {
    console.error(
      "No se pudieron guardar los ejercicios personalizados en localStorage",
      error
    );
    throw error;
  }
}

/** Extract a YouTube video id from a bare id or common watch/share URLs. */
export function extractYoutubeVideoId(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : undefined;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const fromQuery = url.searchParams.get("v");
      if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) return fromQuery;

      const parts = url.pathname.split("/").filter(Boolean);
      const embedIndex = parts.findIndex(
        (part) => part === "embed" || part === "shorts" || part === "live"
      );
      if (embedIndex >= 0) {
        const id = parts[embedIndex + 1];
        if (id && /^[\w-]{11}$/.test(id)) return id;
      }
    }
  } catch {
    // not a URL — fall through
  }

  return undefined;
}

export function listCustomExercises(): Exercise[] {
  return readAll();
}

export function getCustomExerciseById(id: string): Exercise | undefined {
  if (!id.startsWith("custom-")) return undefined;
  return readAll().find((exercise) => exercise.id === id);
}

export function createCustomExercise(input: CustomExerciseInput): Exercise {
  const name = input.name.trim();
  if (!name) {
    throw new Error("El nombre del ejercicio es obligatorio");
  }

  const nameEn = (input.nameEn ?? name).trim() || name;
  const youtubeVideoId = input.youtubeVideoId
    ? extractYoutubeVideoId(input.youtubeVideoId)
    : undefined;

  const exercise: Exercise = {
    id: createId(),
    name,
    nameEn,
    muscleGroup: input.muscleGroup,
    equipment: input.equipment,
    imagePath: CUSTOM_EXERCISE_IMAGE,
    youtubeVideoId,
    isWarmup: Boolean(input.isWarmup),
    cues: input.cues,
    isCustom: true,
  };

  const exercises = readAll();
  exercises.unshift(exercise);
  writeAll(exercises);
  return exercise;
}

export function deleteCustomExercise(id: string): boolean {
  const exercises = readAll();
  const next = exercises.filter((exercise) => exercise.id !== id);
  if (next.length === exercises.length) return false;
  writeAll(next);
  return true;
}

export function isCustomExercise(exercise: Pick<Exercise, "id" | "imagePath" | "isCustom">): boolean {
  return (
    Boolean(exercise.isCustom) ||
    exercise.id.startsWith("custom-") ||
    exercise.imagePath === CUSTOM_EXERCISE_IMAGE
  );
}
