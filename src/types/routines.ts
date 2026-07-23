export type MuscleGroup =
  | "pecho"
  | "espalda"
  | "hombros"
  | "brazos"
  | "piernas"
  | "gluteos"
  | "core"
  | "cardio"
  | "cuerpoCompleto";

export type Equipment =
  | "pesoCorporal"
  | "mancuernas"
  | "barra"
  | "maquina"
  | "cable"
  | "banda"
  | "kettlebell"
  | "otro";

export type WeightUnit = "kg" | "lb";

export type WeightMode = "fixed" | "range" | "perSet";

export const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  /** Path relative to free-exercise-db `/exercises/` (e.g. `Dumbbell_Bench_Press/0.jpg`) */
  imagePath: string;
  /** Optional YouTube video id for form demo */
  youtubeVideoId?: string;
  cues?: string[];
  /** Suggested for warmup / activation blocks */
  isWarmup?: boolean;
}

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  /** Used when loadType is "reps" */
  reps: string;
  restSeconds: number;
  notes?: string;
  useWeight: boolean;
  weightUnit: WeightUnit;
  /**
   * fixed = un peso
   * range = rango progresivo (ej. 20–40)
   * perSet = peso distinto por serie
   */
  weightMode: WeightMode;
  /** Used when weightMode is "fixed" */
  weight: number | null;
  /** Used when weightMode is "range" */
  weightFrom: number | null;
  weightTo: number | null;
  /** Used when weightMode is "perSet" — one value per set */
  setWeights: Array<number | null>;
  /** Track by repetitions, time (e.g. plank), or laps (side-to-side) */
  loadType: "reps" | "time" | "laps";
  /** Duration in seconds when loadType is "time" */
  durationSeconds: number;
  /** Used when loadType is "laps" — e.g. "4" or "2-3" */
  laps: string;
}

export interface DayPlan {
  /** When false, day is rest / skipped in the week */
  enabled: boolean;
  /** Optional focus label, e.g. "Pecho" or "Full body" */
  focus: string;
  /** Optional warmup / activation block */
  warmupEnabled: boolean;
  warmupExercises: RoutineExercise[];
  exercises: RoutineExercise[];
}

export type WeekPlan = Record<Weekday, DayPlan>;

export interface Routine {
  id: string;
  name: string;
  description: string;
  days: WeekPlan;
  createdAt: string;
  updatedAt: string;
}

export type RoutineInput = Omit<Routine, "id" | "createdAt" | "updatedAt">;
