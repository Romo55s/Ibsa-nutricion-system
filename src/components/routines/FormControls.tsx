import { useEffect, useState } from "react";

export const routineFieldClass =
  "block min-h-11 w-full min-w-0 rounded-sm border border-muted bg-white px-3 py-2 text-base text-primary placeholder:text-muted focus:border-primary";

interface NumberFieldProps {
  label: string;
  value: number | null;
  onCommit: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  allowEmpty?: boolean;
  emptyFallback?: number;
  placeholder?: string;
  className?: string;
}

/**
 * Text-based numeric field so the user can clear and retype freely.
 * Commits a valid number on blur (and Enter).
 */
export function NumberField({
  label,
  value,
  onCommit,
  min,
  max,
  step = 1,
  allowEmpty = false,
  emptyFallback = 0,
  placeholder,
  className = "",
}: NumberFieldProps) {
  const [draft, setDraft] = useState(
    value === null || Number.isNaN(value) ? "" : String(value)
  );
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused) return;
    setDraft(value === null || Number.isNaN(value) ? "" : String(value));
  }, [value, focused]);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed === "" || trimmed === "-" || trimmed === ".") {
      if (allowEmpty) {
        onCommit(null);
        setDraft("");
        return;
      }
      const fallback = emptyFallback;
      onCommit(fallback);
      setDraft(String(fallback));
      return;
    }

    let next = Number(trimmed);
    if (Number.isNaN(next)) {
      const fallback = allowEmpty ? null : emptyFallback;
      onCommit(fallback);
      setDraft(fallback === null ? "" : String(fallback));
      return;
    }

    if (typeof min === "number") next = Math.max(min, next);
    if (typeof max === "number") next = Math.min(max, next);
    onCommit(next);
    setDraft(String(next));
  };

  return (
    <label className={`block min-w-0 space-y-1 text-sm font-medium text-accent ${className}`}>
      {label}
      <input
        type="text"
        inputMode={step < 1 ? "decimal" : "numeric"}
        value={draft}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onChange={(e) => {
          const next = e.target.value;
          if (next === "" || /^-?\d*\.?\d*$/.test(next)) {
            setDraft(next);
          }
        }}
        onBlur={() => {
          setFocused(false);
          commit();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        className={routineFieldClass}
      />
    </label>
  );
}

interface FancyToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function FancyToggle({ checked, onChange, label }: FancyToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group inline-flex min-h-11 items-center gap-3 text-left font-medium text-primary"
    >
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span className="transition-colors group-hover:underline">{label}</span>
    </button>
  );
}
