import { useEffect } from "react";

const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

export function EditorialLinkMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeLink: HTMLElement | null = null;
    let activeBounds: DOMRect | null = null;

    const resetActiveLink = (immediate = false) => {
      if (!activeLink) return;
      const link = activeLink;
      activeLink = null;
      activeBounds = null;
      link.style.setProperty("--editorial-link-x", "0px");
      link.style.setProperty("--editorial-link-y", "0px");
      if (immediate) link.style.transition = "none";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") {
        resetActiveLink(true);
        return;
      }

      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(".editorial-link")
          : null;

      if (!target) {
        resetActiveLink();
        return;
      }

      if (activeLink !== target) {
        resetActiveLink();
        activeLink = target;
        activeBounds = target.getBoundingClientRect();
        target.style.removeProperty("transition");
      }

      if (!activeBounds) return;
      const offsetX =
        event.clientX - (activeBounds.left + activeBounds.width / 2);
      const offsetY =
        event.clientY - (activeBounds.top + activeBounds.height / 2);
      target.style.setProperty(
        "--editorial-link-x",
        `${clamp(offsetX * 0.22, 8)}px`
      );
      target.style.setProperty(
        "--editorial-link-y",
        `${clamp(offsetY * 0.22, 6)}px`
      );
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!activeLink || !(event.target instanceof Node)) return;
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && activeLink.contains(nextTarget)) return;
      if (activeLink.contains(event.target)) resetActiveLink();
    };

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) resetActiveLink(true);
    };
    const resetForViewportChange = () => resetActiveLink();

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerout", handlePointerOut);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    window.addEventListener("scroll", resetForViewportChange, {
      passive: true,
    });
    window.addEventListener("resize", resetForViewportChange, {
      passive: true,
    });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      window.removeEventListener("scroll", resetForViewportChange);
      window.removeEventListener("resize", resetForViewportChange);
      resetActiveLink(true);
    };
  }, []);

  return null;
}
