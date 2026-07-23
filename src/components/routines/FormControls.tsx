import { useEffect, useState } from "react";

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
    <label className={`space-y-1 text-xs text-slate-400 ${className}`}>
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
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#2E8BFF]/50"
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
      className="group inline-flex items-center gap-3 text-left text-sm text-slate-200"
    >
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#2E8BFF]" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span className="transition-colors group-hover:text-white">{label}</span>
    </button>
  );
}
