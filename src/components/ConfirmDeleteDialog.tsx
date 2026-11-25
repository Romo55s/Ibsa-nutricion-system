import { useRef } from "react";
import { EditorialDialog } from "./EditorialDialog";

interface ConfirmDeleteDialogProps {
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteDialog({
  itemName,
  onCancel,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <EditorialDialog
      eyebrow="Confirmar acción"
      title="Eliminar rutina"
      onClose={onCancel}
      panelClassName="max-w-xl"
      initialFocusRef={cancelButtonRef}
    >
      <div className="pt-6">
        <p className="leading-relaxed text-accent">
          ¿Quieres eliminar <span className="font-semibold text-primary">“{itemName}”</span>?
          Esta acción no se puede deshacer.
        </p>
        <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-light pt-5">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-11 items-center justify-center border border-light px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-mist motion-reduce:transition-none"
          >
            Conservar rutina
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex min-h-11 items-center justify-center border border-red-800 bg-red-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-900 motion-reduce:transition-none"
          >
            Eliminar rutina
          </button>
        </div>
      </div>
    </EditorialDialog>
  );
}
