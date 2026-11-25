import { useEffect } from "react";
import { gsap } from "gsap";

interface MagneticLinkMotion {
  xTo: (value: number) => void;
  yTo: (value: number) => void;
}

const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

export function EditorialLinkMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionByLink = new WeakMap<HTMLElement, MagneticLinkMotion>();
    let activeLink: HTMLElement | null = null;

    const getMotion = (link: HTMLElement) => {
      const existing = motionByLink.get(link);
      if (existing) return existing;

      const motion = {
        xTo: gsap.quickTo(link, "x", {
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        }),
        yTo: gsap.quickTo(link, "y", {
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        }),
      };
      motionByLink.set(link, motion);
      return motion;
    };

    const resetActiveLink = (immediate = false) => {
      if (!activeLink) return;
      const link = activeLink;
      activeLink = null;

      if (immediate) {
        gsap.killTweensOf(link);
        gsap.set(link, { x: 0, y: 0 });
        return;
      }

      const motion = motionByLink.get(link);
      motion?.xTo(0);
      motion?.yTo(0);
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

      if (activeLink && activeLink !== target) resetActiveLink();
      activeLink = target;

      const bounds = target.getBoundingClientRect();
      const offsetX = event.clientX - (bounds.left + bounds.width / 2);
      const offsetY = event.clientY - (bounds.top + bounds.height / 2);
      const motion = getMotion(target);

      motion.xTo(clamp(offsetX * 0.22, 8));
      motion.yTo(clamp(offsetY * 0.22, 6));
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

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerout", handlePointerOut);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      resetActiveLink(true);
    };
  }, []);

  return null;
}
