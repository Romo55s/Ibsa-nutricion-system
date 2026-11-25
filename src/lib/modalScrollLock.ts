let activeLocks = 0;
let previousBodyOverflow = "";

export function acquireModalScrollLock(): () => void {
  if (activeLocks === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  activeLocks += 1;
  window.dispatchEvent(new Event("ibsa:modal-lock"));

  let released = false;
  return () => {
    if (released) return;
    released = true;
    activeLocks = Math.max(0, activeLocks - 1);
    window.dispatchEvent(new Event("ibsa:modal-unlock"));
    if (activeLocks === 0) {
      document.body.style.overflow = previousBodyOverflow;
    }
  };
}
