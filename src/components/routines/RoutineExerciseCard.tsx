import { ExerciseMedia } from "./ExerciseMedia";
import { FancyToggle, NumberField, routineFieldClass } from "./FormControls";
import { IconTrash } from "./RoutineIcons";
import { getExerciseById } from "../../data/exercises";
import { syncSetWeights } from "../../lib/weekPlan";
import type { RoutineExercise, WeightMode, WeightUnit } from "../../types/routines";

const WEIGHT_MODE_OPTIONS: { value: WeightMode; label: string; hint: string }[] =
  [
    { value: "fixed", label: "Fijo", hint: "Mismo peso en todas las series" },
    {
      value: "range",
      label: "Rango",
      hint: "Progresivo: define mínimo y máximo",
    },
    {
      value: "perSet",
      label: "Por serie",
      hint: "Peso distinto en cada serie",
    },
  ];

interface RoutineExerciseCardProps {
  item: RoutineExercise;
  index: number;
  onChange: (patch: Partial<RoutineExercise>) => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}

export function RoutineExerciseCard({
  item,
  index,
  onChange,
  onMove,
  onRemove,
}: RoutineExerciseCardProps) {
  const exercise = getExerciseById(item.exerciseId);
  if (!exercise) return null;

  return (
    <li className="min-w-0 border-t border-light bg-white py-5">
      <div className="grid items-start gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
        <ExerciseMedia exercise={exercise} compact />
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="break-words text-lg font-semibold text-primary">
                {index + 1}. {exercise.name}
              </h4>
              <p className="text-xs text-muted">{exercise.nameEn}</p>
              {exercise.isCustom || exercise.id.startsWith("custom-") ? (
                <span className="mt-1 inline-flex rounded-full bg-primary-2 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
                  Personalizado
                </span>
              ) : null}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => onMove(-1)}
                className="h-11 w-11 rounded-full border border-light text-lg text-accent hover:border-accent"
                aria-label="Subir"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => onMove(1)}
                className="h-11 w-11 rounded-full border border-light text-lg text-accent hover:border-accent"
                aria-label="Bajar"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-200 text-red-800 transition-colors hover:bg-red-100"
                aria-label="Quitar ejercicio"
                title="Quitar"
              >
                <IconTrash size={16} />
              </button>
            </div>
          </div>

          <div className="border-l-2 border-light bg-mist p-4">
            <p className="mb-2 text-xs font-medium text-muted">
              Medición
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={item.loadType === "reps" || !item.loadType}
                onClick={() => onChange({ loadType: "reps" })}
                className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  item.loadType === "reps" || !item.loadType
                    ? "bg-primary text-white"
                    : "border border-light bg-white text-accent hover:bg-mist"
                }`}
              >
                Por repeticiones
              </button>
              <button
                type="button"
                aria-pressed={item.loadType === "time"}
                onClick={() => onChange({ loadType: "time" })}
                className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  item.loadType === "time"
                    ? "bg-primary text-white"
                    : "border border-light bg-white text-accent hover:bg-mist"
                }`}
              >
                Por tiempo (seg)
              </button>
              <button
                type="button"
                aria-pressed={item.loadType === "laps"}
                onClick={() => onChange({ loadType: "laps" })}
                className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  item.loadType === "laps"
                    ? "bg-primary text-white"
                    : "border border-light bg-white text-accent hover:bg-mist"
                }`}
              >
                Por vueltas
              </button>
            </div>
            {item.loadType === "laps" && (
              <p className="mt-2 text-xs text-muted">
                Ida y vuelta / de un lado a otro (ej. shuttle, cancha, conos).
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <NumberField
              label="Series"
              value={item.sets}
              min={1}
              max={20}
              emptyFallback={1}
              onCommit={(value) => {
                const sets = value ?? 1;
                onChange({
                  sets,
                  setWeights: syncSetWeights(item.setWeights ?? [], sets),
                });
              }}
            />
            {item.loadType === "time" ? (
              <NumberField
                label="Tiempo (seg)"
                value={item.durationSeconds}
                min={1}
                max={3600}
                step={1}
                emptyFallback={30}
                onCommit={(value) =>
                  onChange({ durationSeconds: value ?? 30 })
                }
              />
            ) : item.loadType === "laps" ? (
              <label className="min-w-0 space-y-1 text-sm font-medium text-accent">
                Vueltas
                <input
                  type="text"
                  value={item.laps ?? ""}
                  onChange={(e) => onChange({ laps: e.target.value })}
                  placeholder="4"
                  className={routineFieldClass}
                />
              </label>
            ) : (
              <label className="min-w-0 space-y-1 text-sm font-medium text-accent">
                Reps
                <input
                  type="text"
                  value={item.reps}
                  onChange={(e) => onChange({ reps: e.target.value })}
                  placeholder="8-12"
                  className={routineFieldClass}
                />
              </label>
            )}
            <NumberField
              label="Descanso (seg)"
              value={item.restSeconds}
              min={0}
              max={600}
              emptyFallback={0}
              onCommit={(value) => onChange({ restSeconds: value ?? 0 })}
            />
            <label className="min-w-0 space-y-1 text-sm font-medium text-accent">
              Notas
              <input
                type="text"
                value={item.notes ?? ""}
                onChange={(e) => onChange({ notes: e.target.value })}
                placeholder="Tempo, RPE..."
                className={routineFieldClass}
              />
            </label>
          </div>

          <div className="border-l-2 border-light bg-mist p-4">
            <FancyToggle
              checked={item.useWeight}
              label="Agregar peso"
              onChange={(checked) =>
                onChange({
                  useWeight: checked,
                  weightMode: item.weightMode ?? "fixed",
                  weight: checked ? item.weight : null,
                  weightFrom: checked ? item.weightFrom : null,
                  weightTo: checked ? item.weightTo : null,
                  setWeights: syncSetWeights(
                    item.setWeights ?? [],
                    item.sets
                  ),
                })
              }
            />

            {item.useWeight && (
              <div className="mt-3 space-y-3">
                <div>
                  <p className="mb-2 text-xs font-medium text-muted">
                    Tipo de peso
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {WEIGHT_MODE_OPTIONS.map((opt) => {
                      const active = (item.weightMode ?? "fixed") === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          title={opt.hint}
                          aria-pressed={active}
                          onClick={() =>
                            onChange({
                              weightMode: opt.value,
                              setWeights:
                                opt.value === "perSet"
                                  ? syncSetWeights(
                                      item.setWeights ?? [],
                                      item.sets
                                    )
                                  : item.setWeights,
                            })
                          }
                          className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary text-white"
                              : "border border-light bg-white text-accent hover:bg-mist"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1.5 text-xs text-muted">
                    {
                      WEIGHT_MODE_OPTIONS.find(
                        (o) => o.value === (item.weightMode ?? "fixed")
                      )?.hint
                    }
                  </p>
                </div>

                <div className="grid gap-3 sm:max-w-lg sm:grid-cols-2">
                  {(item.weightMode ?? "fixed") === "fixed" && (
                    <NumberField
                      label="Peso"
                      value={item.weight}
                      min={0}
                      step={0.5}
                      allowEmpty
                      placeholder="0"
                      onCommit={(value) => onChange({ weight: value })}
                    />
                  )}

                  {(item.weightMode ?? "fixed") === "range" && (
                    <>
                      <NumberField
                        label="Desde"
                        value={item.weightFrom}
                        min={0}
                        step={0.5}
                        allowEmpty
                        placeholder="20"
                        onCommit={(value) => onChange({ weightFrom: value })}
                      />
                      <NumberField
                        label="Hasta"
                        value={item.weightTo}
                        min={0}
                        step={0.5}
                        allowEmpty
                        placeholder="40"
                        onCommit={(value) => onChange({ weightTo: value })}
                      />
                    </>
                  )}

                  <label className="min-w-0 space-y-1 text-sm font-medium text-accent">
                    Unidad
                    <select
                      value={item.weightUnit}
                      onChange={(e) =>
                        onChange({
                          weightUnit: e.target.value as WeightUnit,
                        })
                      }
                      className={routineFieldClass}
                    >
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                    </select>
                  </label>
                </div>

                {(item.weightMode ?? "fixed") === "perSet" && (
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted">
                      Peso por serie
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {Array.from({ length: item.sets }, (_, i) => (
                        <NumberField
                          key={i}
                          label={`Serie ${i + 1}`}
                          value={item.setWeights?.[i] ?? null}
                          min={0}
                          step={0.5}
                          allowEmpty
                          placeholder="—"
                          onCommit={(value) => {
                            const next = syncSetWeights(
                              item.setWeights ?? [],
                              item.sets
                            );
                            next[i] = value;
                            onChange({ setWeights: next });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
