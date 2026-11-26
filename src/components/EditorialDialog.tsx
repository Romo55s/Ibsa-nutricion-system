import {
  useId,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { acquireModalScrollLock } from "../lib/modalScrollLock";

interface EditorialDialogProps {
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
  bodyClassName?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
}

export function EditorialDialog({
  title,
  eyebrow = "IBSA Nutrición",
  onClose,
  children,
  panelClassName = "max-w-2xl",
  bodyClassName = "px-5 pb-7 sm:px-8 sm:pb-8",
  initialFocusRef,
}: EditorialDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const titleId = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !panel) return;

    const previousFocus = document.activeElement;
    dialog.showModal();
    initialFocusRef?.current?.focus({ preventScroll: true });
    const releaseScrollLock = acquireModalScrollLock();

    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" }
      );
    });

    return () => {
      motion.revert();
      gsap.killTweensOf(panel);
      dialog.close();
      releaseScrollLock();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [initialFocusRef]);

  const dismiss = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    gsap.to(panelRef.current, {
      autoAlpha: 0,
      y: 8,
      duration: 0.16,
      ease: "power2.in",
      overwrite: true,
      onComplete: onClose,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="fixed inset-0 m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-transparent p-3 backdrop:bg-primary/75 backdrop:backdrop-blur-sm sm:p-6"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div
        ref={panelRef}
        className={`flex max-h-[92dvh] w-full flex-col overflow-hidden border border-light bg-white text-primary shadow-elev-3 ${panelClassName}`}
      >
        <header className="flex shrink-0 items-start justify-between gap-5 border-b border-light bg-white px-5 py-4 sm:px-8 sm:py-5">
          <div className="min-w-0">
            <p className="editorial-label mb-1 text-muted">{eyebrow}</p>
            <h2
              id={titleId}
              className="break-words font-display text-2xl leading-tight sm:text-3xl"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Cerrar ventana"
            className="grid h-11 w-11 shrink-0 place-items-center border border-light text-primary transition-colors hover:border-primary hover:bg-mist motion-reduce:transition-none"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div
          className={`min-h-0 overflow-y-auto overscroll-contain ${bodyClassName}`}
        >
          {children}
        </div>
      </div>
    </dialog>
  );
}
