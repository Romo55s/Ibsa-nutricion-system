import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  exercises,
  getExerciseImageUrl,
  muscleGroupLabels,
  equipmentLabels,
} from "../../data/exercises";
import type { Exercise, MuscleGroup } from "../../types/routines";

interface ExercisePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exercises: Exercise[]) => void;
  excludeIds?: string[];
  dayLabel?: string;
  mode?: "main" | "warmup";
}

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

export function ExercisePickerModal({
  isOpen,
  onClose,
  onAdd,
  excludeIds = [],
  dayLabel,
  mode = "main",
}: ExercisePickerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState<(typeof muscleFilters)[number]>("todos");
  const [warmupOnly, setWarmupOnly] = useState(mode === "warmup");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    setWarmupOnly(mode === "warmup");
    setSelectedIds([]);
    setQuery("");
    setMuscle("todos");
  }, [isOpen, mode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exercises.filter((exercise) => {
      if (excludeIds.includes(exercise.id)) return false;
      if (warmupOnly && !exercise.isWarmup) return false;
      if (muscle !== "todos" && exercise.muscleGroup !== muscle) return false;
      if (!q) return true;
      return (
        exercise.name.toLowerCase().includes(q) ||
        exercise.nameEn.toLowerCase().includes(q)
      );
    });
  }, [excludeIds, muscle, query, warmupOnly]);

  const selectedExercises = useMemo(() => {
    const byId = new Map(exercises.map((exercise) => [exercise.id, exercise]));
    return selectedIds
      .map((id) => byId.get(id))
      .filter((exercise): exercise is Exercise => Boolean(exercise));
  }, [selectedIds]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!modal || !overlay || !content) return;

    gsap.set(modal, { display: "flex" });
    gsap.set([overlay, content], { opacity: 0 });
    gsap.set(content, { y: 24, scale: 0.98 });

    const tl = gsap.timeline();
    tl.to(overlay, {
      opacity: 1,
      duration: 0.28,
      ease: "power2.out",
    }).to(
      content,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      },
      "-=0.15"
    );

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("ibsa:modal-lock"));

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.dispatchEvent(new Event("ibsa:modal-unlock"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (modalRef.current) modalRef.current.style.display = "none";
        onClose();
      },
    });

    tl.to(content, {
      opacity: 0,
      y: 16,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.in",
    }).to(
      overlay,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.1"
    );
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
    handleClose();
  };

  if (!isOpen) return null;

  const selectedCount = selectedIds.length;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{ display: "none" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exercise-picker-title"
      data-lenis-prevent
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-[#0A1626] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:h-auto sm:max-h-[92vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#2E8BFF] to-[#2AA84A]" />

        <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0A1626]/95 px-5 pb-4 pt-5 backdrop-blur-md sm:px-6 sm:pt-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2E8BFF]">
                Catálogo
              </p>
              <h2
                id="exercise-picker-title"
                className="text-2xl font-bold tracking-tight text-white"
              >
                {mode === "warmup"
                  ? "Agregar a calentamiento"
                  : "Agregar ejercicios"}
              </h2>
              {dayLabel ? (
                <p className="mt-1 text-sm text-slate-400">
                  Para <span className="text-slate-200">{dayLabel}</span>
                  {" · "}selecciona uno o varios
                </p>
              ) : (
                <p className="mt-1 text-sm text-slate-400">
                  Selecciona uno o varios ejercicios
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
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

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre..."
            autoFocus
            className="mb-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-[#2E8BFF]/50 focus:bg-white/[0.07]"
          />

          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setWarmupOnly(true)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                warmupOnly
                  ? "bg-[#2E8BFF] text-white"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              Calentamiento
            </button>
            <button
              type="button"
              onClick={() => setWarmupOnly(false)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                !warmupOnly
                  ? "bg-white text-[#0A1626]"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              Todo el catálogo
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {muscleFilters.map((filter) => {
              const label =
                filter === "todos" ? "Todos" : muscleGroupLabels[filter];
              const active = muscle === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setMuscle(filter)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-white text-[#0A1626]"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6"
          data-lenis-prevent
        >
          <p className="mb-4 text-sm text-slate-400">
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
                  className={`group relative flex items-stretch overflow-hidden rounded-xl border text-left transition-all duration-300 ${
                    selected
                      ? "border-[#2E8BFF]/60 bg-[#2E8BFF]/15 ring-1 ring-[#2E8BFF]/40"
                      : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="relative w-24 shrink-0 self-stretch overflow-hidden sm:w-28">
                    <img
                      src={getExerciseImageUrl(exercise.imagePath)}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-[#0A1626]/40" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3.5 sm:p-4">
                    <div className="truncate text-sm font-semibold text-white sm:text-[15px]">
                      {exercise.name}
                    </div>
                    <div className="truncate text-xs text-slate-400">
                      {exercise.nameEn}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-[#2E8BFF]/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#7eb8ff]">
                        {muscleGroupLabels[exercise.muscleGroup]}
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-300">
                        {equipmentLabels[exercise.equipment]}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                      selected
                        ? "bg-[#2E8BFF] text-white opacity-100"
                        : "bg-white/0 text-white opacity-0 group-hover:bg-white/10 group-hover:opacity-100"
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
            <div className="rounded-xl border border-dashed border-white/15 px-6 py-16 text-center">
              <p className="text-base font-medium text-white">
                Sin resultados
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Prueba otro filtro o búsqueda.
              </p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0A1626]/95 px-5 py-4 backdrop-blur-md sm:px-6">
          <p className="text-sm text-slate-400">
            {selectedCount === 0
              ? "Ningún ejercicio seleccionado"
              : `${selectedCount} ejercicio${selectedCount === 1 ? "" : "s"} listo${selectedCount === 1 ? "" : "s"} para agregar`}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="rounded-full border border-white/15 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Limpiar
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-white/15 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={selectedCount === 0}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0A1626] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {selectedCount === 0
                ? "Agregar"
                : `Agregar ${selectedCount}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
