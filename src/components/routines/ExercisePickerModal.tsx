import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { acquireModalScrollLock } from "../../lib/modalScrollLock";
import {
  equipmentLabels,
  getAllExercises,
  getExerciseImageUrl,
  muscleGroupLabels,
} from "../../data/exercises";
import {
  createCustomExercise,
  extractYoutubeVideoId,
  isCustomExercise,
} from "../../lib/customExercisesStorage";
import type { Equipment, Exercise, MuscleGroup } from "../../types/routines";
import { FancyToggle, routineFieldClass } from "./FormControls";

interface ExercisePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exercises: Exercise[]) => void;
  excludeIds?: string[];
  dayLabel?: string;
  mode?: "main" | "warmup";
}

type PickerView = "catalog" | "custom";

const muscleFilters: Array<MuscleGroup | "todos"> = [
  "todos",
  "pecho",
  "espalda",
  "hombros",
  "brazos",
  "piernas",
  "gluteos",
  "core",
  "cardio",
  "cuerpoCompleto",
];

const muscleOptions: MuscleGroup[] = [
  "pecho",
  "espalda",
  "hombros",
  "brazos",
  "piernas",
  "gluteos",
  "core",
  "cardio",
  "cuerpoCompleto",
];

const equipmentOptions: Equipment[] = [
  "pesoCorporal",
  "mancuernas",
  "barra",
  "maquina",
  "cable",
  "banda",
  "kettlebell",
  "otro",
];

function ExerciseThumb({ exercise }: { exercise: Exercise }) {
  const imageUrl = getExerciseImageUrl(exercise.imagePath);
  if (!imageUrl || isCustomExercise(exercise)) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-mist">
        <span className="font-display text-2xl text-muted">
          {exercise.name.trim().charAt(0).toUpperCase() || "?"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
    />
  );
}

export function ExercisePickerModal({
  isOpen,
  onClose,
  onAdd,
  excludeIds = [],
  dayLabel,
  mode = "main",
}: ExercisePickerModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const [view, setView] = useState<PickerView>("catalog");
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState<(typeof muscleFilters)[number]>("todos");
  const [warmupOnly, setWarmupOnly] = useState(mode === "warmup");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [catalogVersion, setCatalogVersion] = useState(0);

  const [customName, setCustomName] = useState("");
  const [customNameEn, setCustomNameEn] = useState("");
  const [customMuscle, setCustomMuscle] =
    useState<MuscleGroup>("cuerpoCompleto");
  const [customEquipment, setCustomEquipment] =
    useState<Equipment>("pesoCorporal");
  const [customYoutube, setCustomYoutube] = useState("");
  const [customIsWarmup, setCustomIsWarmup] = useState(mode === "warmup");
  const [customError, setCustomError] = useState<string | null>(null);
  const [customSubmitting, setCustomSubmitting] = useState(false);

  const resetCustomForm = (nextMode = mode) => {
    setCustomName("");
    setCustomNameEn("");
    setCustomMuscle("cuerpoCompleto");
    setCustomEquipment("pesoCorporal");
    setCustomYoutube("");
    setCustomIsWarmup(nextMode === "warmup");
    setCustomError(null);
    setCustomSubmitting(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    closingRef.current = false;
    setView("catalog");
    setWarmupOnly(mode === "warmup");
    setSelectedIds([]);
    setQuery("");
    setMuscle("todos");
    resetCustomForm(mode);
    setCatalogVersion((v) => v + 1);
  }, [isOpen, mode]);

  const allExercises = useMemo(() => getAllExercises(), [catalogVersion]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allExercises.filter((exercise) => {
      if (excludeIds.includes(exercise.id)) return false;
      if (warmupOnly && !exercise.isWarmup) return false;
      if (muscle !== "todos" && exercise.muscleGroup !== muscle) return false;
      if (!q) return true;
      return (
        exercise.name.toLowerCase().includes(q) ||
        exercise.nameEn.toLowerCase().includes(q)
      );
    });
  }, [allExercises, excludeIds, muscle, query, warmupOnly]);

  const selectedExercises = useMemo(() => {
    const byId = new Map(
      allExercises.map((exercise) => [exercise.id, exercise])
    );
    return selectedIds
      .map((id) => byId.get(id))
      .filter((exercise): exercise is Exercise => Boolean(exercise));
  }, [allExercises, selectedIds]);

  useLayoutEffect(() => {
    const dialog = modalRef.current;
    const sheet = sheetRef.current;
    if (!isOpen || !dialog || !sheet) return;

    dialog.showModal();
    const releaseScrollLock = acquireModalScrollLock();
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        sheet,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" }
      );
    });

    return () => {
      motion.revert();
      gsap.killTweensOf(sheet);
      dialog.close();
      releaseScrollLock();
    };
  }, [isOpen]);

  const dismiss = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    gsap.to(sheetRef.current, {
      autoAlpha: 0,
      y: 12,
      duration: 0.16,
      ease: "power2.in",
      overwrite: true,
      onComplete: onClose,
    });
  };

  const toggleExercise = (exercise: Exercise) => {
    setSelectedIds((prev) =>
      prev.includes(exercise.id)
        ? prev.filter((id) => id !== exercise.id)
        : [...prev, exercise.id]
    );
  };

  const handleConfirm = () => {
    if (selectedExercises.length === 0) return;
    onAdd(selectedExercises);
    dismiss();
  };

  const handleCreateCustom = () => {
    const name = customName.trim();
    if (!name) {
      setCustomError("Escribe un nombre para el ejercicio.");
      return;
    }

    const youtubeRaw = customYoutube.trim();
    if (youtubeRaw && !extractYoutubeVideoId(youtubeRaw)) {
      setCustomError(
        "El video de YouTube no es válido. Pega un enlace o el ID del video."
      );
      return;
    }

    setCustomSubmitting(true);
    setCustomError(null);

    try {
      const exercise = createCustomExercise({
        name,
        nameEn: customNameEn.trim() || name,
        muscleGroup: customMuscle,
        equipment: customEquipment,
        youtubeVideoId: youtubeRaw || undefined,
        isWarmup: customIsWarmup,
      });
      setCatalogVersion((v) => v + 1);
      onAdd([exercise]);
      dismiss();
    } catch (error) {
      setCustomError(
        error instanceof Error
          ? error.message
          : "No se pudo crear el ejercicio personalizado."
      );
      setCustomSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const selectedCount = selectedIds.length;

  return createPortal(
    <dialog
      ref={modalRef}
      aria-labelledby="exercise-picker-title"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-primary backdrop:bg-primary/75 backdrop:backdrop-blur-sm"
    >
      <div
        ref={sheetRef}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[95dvh] w-full max-w-4xl flex-col overflow-y-auto overscroll-contain border-t-2 border-primary bg-white shadow-elev-3 sm:inset-y-0 sm:my-auto sm:h-fit sm:max-h-[90dvh] sm:w-[calc(100%_-_3rem)] sm:border"
      >
        <div className="shrink-0 border-b border-light bg-white px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="editorial-label mb-1 text-muted">
                {view === "custom" ? "Personalizado" : "Catálogo"}
              </p>
              <h2
                id="exercise-picker-title"
                className="font-display text-3xl leading-tight text-primary"
              >
                {view === "custom"
                  ? "Crear ejercicio"
                  : mode === "warmup"
                    ? "Agregar a calentamiento"
                    : "Agregar ejercicios"}
              </h2>
              {view === "custom" ? (
                <p className="mt-1 text-sm text-muted">
                  Define el movimiento y agrégalo a
                  {dayLabel ? (
                    <>
                      {" "}
                      <span className="text-primary-2">{dayLabel}</span>
                    </>
                  ) : (
                    " la rutina"
                  )}
                </p>
              ) : dayLabel ? (
                <p className="mt-1 text-sm text-muted">
                  Para <span className="text-primary-2">{dayLabel}</span>
                  {" · "}selecciona uno o varios
                </p>
              ) : (
                <p className="mt-1 text-sm text-muted">
                  Selecciona uno o varios ejercicios
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-light text-accent transition-colors hover:border-accent hover:bg-mist motion-reduce:transition-none"
              aria-label="Cerrar"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={view === "catalog"}
              onClick={() => setView("catalog")}
              className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                view === "catalog"
                  ? "bg-primary text-white"
                  : "border border-light bg-white text-accent hover:bg-mist"
              }`}
            >
              Catálogo
            </button>
            <button
              type="button"
              aria-pressed={view === "custom"}
              onClick={() => setView("custom")}
              className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                view === "custom"
                  ? "bg-primary text-white"
                  : "border border-light bg-white text-accent hover:bg-mist"
              }`}
            >
              Ejercicio personalizado
            </button>
          </div>

          {view === "catalog" && (
            <>
              <label
                htmlFor="exercise-catalog-search"
                className="mb-1 block text-sm font-medium text-accent"
              >
                Buscar por nombre
              </label>
              <input
                id="exercise-catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre..."
                autoFocus
                className={`mb-3 ${routineFieldClass}`}
              />

              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={warmupOnly}
                  onClick={() => setWarmupOnly(true)}
                  className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    warmupOnly
                      ? "bg-primary text-white"
                      : "border border-light bg-white text-accent hover:bg-mist"
                  }`}
                >
                  Calentamiento
                </button>
                <button
                  type="button"
                  aria-pressed={!warmupOnly}
                  onClick={() => setWarmupOnly(false)}
                  className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    !warmupOnly
                      ? "bg-primary text-white"
                      : "border border-light bg-white text-accent hover:bg-mist"
                  }`}
                >
                  Todo el catálogo
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto p-1">
                {muscleFilters.map((filter) => {
                  const label =
                    filter === "todos" ? "Todos" : muscleGroupLabels[filter];
                  const active = muscle === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setMuscle(filter)}
                      className={`min-h-11 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-primary text-white"
                          : "border border-light bg-white text-accent hover:border-accent hover:bg-mist"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="shrink-0 px-5 py-5 sm:px-6">
          {view === "catalog" ? (
            <>
              <p className="mb-4 text-sm text-muted">
                {filtered.length} ejercicio
                {filtered.length === 1 ? "" : "s"}
                {selectedCount > 0
                  ? ` · ${selectedCount} seleccionado${selectedCount === 1 ? "" : "s"}`
                  : " · toca para seleccionar"}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((exercise) => {
                  const selected = selectedIds.includes(exercise.id);
                  return (
                    <button
                      key={exercise.id}
                      type="button"
                      onClick={() => toggleExercise(exercise)}
                      aria-pressed={selected}
                      className={`group relative flex items-stretch overflow-hidden rounded-sm border text-left transition-colors ${
                        selected
                          ? "border-primary bg-mist ring-1 ring-primary"
                          : "border-light bg-white hover:border-accent"
                      }`}
                    >
                      <div className="relative w-16 shrink-0 self-stretch overflow-hidden sm:w-20">
                        <ExerciseThumb exercise={exercise} />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3">
                        <div className="break-words font-semibold text-primary">
                          {exercise.name}
                        </div>
                        <div className="break-words text-sm text-muted">
                          {exercise.nameEn}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          <span className="rounded-sm bg-mist px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-accent">
                            {muscleGroupLabels[exercise.muscleGroup]}
                          </span>
                          <span className="rounded-sm bg-mist px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-accent">
                            {equipmentLabels[exercise.equipment]}
                          </span>
                          {isCustomExercise(exercise) && (
                            <span className="rounded-full bg-primary-2 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
                              Personalizado
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className={`my-3 mr-2 flex h-6 w-6 shrink-0 items-center justify-center self-start rounded-full transition-all ${
                          selected
                            ? "bg-primary text-white opacity-100"
                            : "border border-light bg-white text-accent"
                        }`}
                      >
                        {selected ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="border-l-2 border-light bg-mist px-6 py-16 text-center">
                  <p className="font-display text-2xl text-primary">
                    Sin resultados
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Prueba otro filtro, o crea un ejercicio personalizado.
                  </p>
                  <button
                    type="button"
                    onClick={() => setView("custom")}
                    className="mt-5 min-h-11 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Crear ejercicio personalizado
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mx-auto w-full max-w-xl space-y-5">
              <div className="py-2">
                <label className="mb-4 block space-y-1.5 text-sm font-medium text-accent">
                  Nombre *
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => {
                      setCustomName(e.target.value);
                      setCustomError(null);
                    }}
                    placeholder="Ej. Press landmine"
                    autoFocus
                    className={routineFieldClass}
                  />
                </label>

                <label className="mb-4 block space-y-1.5 text-sm font-medium text-accent">
                  Nombre en inglés{" "}
                  <span className="text-muted">(opcional)</span>
                  <input
                    type="text"
                    value={customNameEn}
                    onChange={(e) => setCustomNameEn(e.target.value)}
                    placeholder="Se usa el nombre si lo dejas vacío"
                    className={routineFieldClass}
                  />
                </label>

                <div className="mb-4 space-y-2">
                  <p className="text-xs text-muted">Grupo muscular</p>
                  <div className="flex flex-wrap gap-2">
                    {muscleOptions.map((option) => {
                      const active = customMuscle === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCustomMuscle(option)}
                          className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary text-white"
                              : "border border-light bg-white text-accent hover:bg-mist"
                          }`}
                        >
                          {muscleGroupLabels[option]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <p className="text-xs text-muted">Equipamiento</p>
                  <div className="flex flex-wrap gap-2">
                    {equipmentOptions.map((option) => {
                      const active = customEquipment === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCustomEquipment(option)}
                          className={`min-h-11 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary text-white"
                              : "border border-light bg-white text-accent hover:bg-mist"
                          }`}
                        >
                          {equipmentLabels[option]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="mb-4 block space-y-1.5 text-sm font-medium text-accent">
                  Video de YouTube{" "}
                  <span className="text-muted">(opcional)</span>
                  <input
                    type="url"
                    value={customYoutube}
                    onChange={(e) => {
                      setCustomYoutube(e.target.value);
                      setCustomError(null);
                    }}
                    placeholder="https://youtube.com/watch?v=... o ID"
                    className={routineFieldClass}
                  />
                </label>

                <FancyToggle
                  checked={customIsWarmup}
                  onChange={setCustomIsWarmup}
                  label="Incluir en filtro de calentamiento"
                />

                {customError && (
                  <p
                    role="alert"
                    className="mt-4 rounded-sm border-l-2 border-red-700 bg-red-50 px-3 py-2 text-sm text-red-800"
                  >
                    {customError}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bottom-0 z-10 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-light bg-mist px-5 py-4 sm:px-6 [@media(min-height:32rem)]:sticky">
          {view === "catalog" ? (
            <>
              <p role="status" className="text-sm text-muted">
                {selectedCount === 0
                  ? "Ningún ejercicio seleccionado"
                  : `${selectedCount} ejercicio${selectedCount === 1 ? "" : "s"} listo${selectedCount === 1 ? "" : "s"} para agregar`}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedIds([])}
                    className="min-h-11 rounded-full border border-light bg-white px-4 py-2.5 text-sm text-accent hover:border-accent"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  type="button"
                  onClick={dismiss}
                  className="min-h-11 rounded-full border border-light bg-white px-4 py-2.5 text-sm text-accent hover:border-accent"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={selectedCount === 0}
                  className="min-h-11 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {selectedCount === 0 ? "Agregar" : `Agregar ${selectedCount}`}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted">
                Se guardará en este navegador para reutilizarlo
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setView("catalog")}
                  className="min-h-11 rounded-full border border-light bg-white px-4 py-2.5 text-sm text-accent hover:border-accent"
                >
                  Volver al catálogo
                </button>
                <button
                  type="button"
                  onClick={handleCreateCustom}
                  disabled={customSubmitting || !customName.trim()}
                  className="min-h-11 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {customSubmitting ? "Creando..." : "Crear y agregar"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>,
    document.body
  );
}
