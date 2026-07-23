import { ExerciseMedia } from "./ExerciseMedia";
import { FancyToggle, NumberField } from "./FormControls";
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
    <li className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4">
      <div className="flex flex-row flex-wrap items-start gap-3 sm:gap-4">
        <ExerciseMedia exercise={exercise} compact />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-semibold text-white">
                {index + 1}. {exercise.name}
              </h4>
              <p className="text-xs text-slate-400">{exercise.nameEn}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => onMove(-1)}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300 transition-colors hover:bg-white/10"
                aria-label="Subir"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => onMove(1)}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300 transition-colors hover:bg-white/10"
                aria-label="Bajar"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-400/30 text-red-300 transition-colors hover:bg-red-500/10"
                aria-label="Quitar ejercicio"
                title="Quitar"
              >
                <IconTrash size={16} />
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="mb-2 text-xs font-medium text-slate-400">
              Medición
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onChange({ loadType: "reps" })}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  item.loadType === "reps" || !item.loadType
                    ? "bg-white text-[#0A1626]"
                    : "border border-white/15 text-slate-300 hover:bg-white/10"
                }`}
              >
                Por repeticiones
              </button>
              <button
                type="button"
                onClick={() => onChange({ loadType: "time" })}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  item.loadType === "time"
                    ? "bg-white text-[#0A1626]"
                    : "border border-white/15 text-slate-300 hover:bg-white/10"
                }`}
              >
                Por tiempo (seg)
              </button>
              <button
                type="button"
                onClick={() => onChange({ loadType: "laps" })}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  item.loadType === "laps"
                    ? "bg-white text-[#0A1626]"
                    : "border border-white/15 text-slate-300 hover:bg-white/10"
                }`}
              >
                Por vueltas
              </button>
            </div>
            {item.loadType === "laps" && (
              <p className="mt-2 text-[11px] text-slate-500">
                Ida y vuelta / de un lado a otro (ej. shuttle, cancha, conos).
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
              <label className="space-y-1 text-xs text-slate-400">
                Vueltas
                <input
                  type="text"
                  value={item.laps ?? ""}
                  onChange={(e) => onChange({ laps: e.target.value })}
                  placeholder="4"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#2E8BFF]/50"
                />
              </label>
            ) : (
              <label className="space-y-1 text-xs text-slate-400">
                Reps
                <input
                  type="text"
                  value={item.reps}
                  onChange={(e) => onChange({ reps: e.target.value })}
                  placeholder="8-12"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#2E8BFF]/50"
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
            <label className="col-span-2 space-y-1 text-xs text-slate-400 sm:col-span-1">
              Notas
              <input
                type="text"
                value={item.notes ?? ""}
                onChange={(e) => onChange({ notes: e.target.value })}
                placeholder="Tempo, RPE..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#2E8BFF]/50"
              />
            </label>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
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
                  <p className="mb-2 text-xs font-medium text-slate-400">
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
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                            active
                              ? "bg-white text-[#0A1626]"
                              : "border border-white/15 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    {
                      WEIGHT_MODE_OPTIONS.find(
                        (o) => o.value === (item.weightMode ?? "fixed")
                      )?.hint
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:max-w-md">
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

                  <label className="space-y-1 text-xs text-slate-400">
                    Unidad
                    <select
                      value={item.weightUnit}
                      onChange={(e) =>
                        onChange({
                          weightUnit: e.target.value as WeightUnit,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#0d1726] px-3 py-2 text-sm text-white outline-none focus:border-[#2E8BFF]/50"
                    >
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                    </select>
                  </label>
                </div>

                {(item.weightMode ?? "fixed") === "perSet" && (
                  <div>
                    <p className="mb-2 text-xs font-medium text-slate-400">
                      Peso por serie
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
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
