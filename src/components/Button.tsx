import { useRef, useEffect } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link, type LinkProps } from "react-router-dom";
import { gsap } from "gsap";

type Variant = "primary" | "ghost" | "outline" | "white" | "whatsapp";

interface SharedButtonProps {
  variant?: Variant;
  children: ReactNode;
}

type ButtonProps = SharedButtonProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never; to?: never })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: never })
    | (Omit<LinkProps, "children"> & { to: string; href?: never })
  );

export const Button = ({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) => {
  const isLink = rest.href !== undefined || rest.to !== undefined;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const control: HTMLElement | null = isLink
      ? linkRef.current
      : buttonRef.current;
    const text = textRef.current;
    const fill = fillRef.current;

    if (!control || !text || !fill) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let removePointerEffects = () => {};
    let controlBounds: DOMRect | null = null;

    const clearPointerEffects = () => {
      removePointerEffects();
      removePointerEffects = () => {};
      controlBounds = null;
      gsap.killTweensOf([control, text, fill]);
      gsap.set(control, { x: 0, y: 0 });
      gsap.set(text, { x: 0, y: 0 });
      gsap.set(fill, { x: 0, y: 0, scale: 0 });
    };

    const enablePointerEffects = () => {
      const xTo = gsap.quickTo(control, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      const yTo = gsap.quickTo(control, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!controlBounds) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = controlBounds;
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        xTo(x * 0.3);
        yTo(y * 0.3);
        gsap.to(text, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(fill, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      const handleMouseEnter = () => {
        controlBounds = control.getBoundingClientRect();
        gsap.to(fill, { scale: 2.5, duration: 0.5, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        controlBounds = null;
        xTo(0);
        yTo(0);
        gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        gsap.to(fill, { scale: 0, duration: 0.5, ease: "power2.in" });
      };

      control.addEventListener("mousemove", handleMouseMove);
      control.addEventListener("mouseenter", handleMouseEnter);
      control.addEventListener("mouseleave", handleMouseLeave);
      removePointerEffects = () => {
        control.removeEventListener("mousemove", handleMouseMove);
        control.removeEventListener("mouseenter", handleMouseEnter);
        control.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    const syncMotionPreference = () => {
      clearPointerEffects();
      if (!motionPreference.matches) enablePointerEffects();
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      clearPointerEffects();
    };
  }, [isLink]);

  // Estilos base minimalistas
  const baseStyles =
    "relative min-h-11 overflow-hidden rounded-full px-8 py-4 font-medium transition-colors duration-300 motion-reduce:transition-none z-10 inline-flex items-center justify-center group/btn";

  const variantStyles = {
    primary: "bg-primary text-white border border-primary",
    ghost:
      "bg-transparent text-white border border-white/30 hover:border-white",
    outline: "bg-transparent text-primary border border-primary/30",
    white: "bg-white text-primary border border-white hover:border-light",
    whatsapp:
      "bg-transparent text-[#4ade80] border border-[#4ade80]/40 hover:border-[#4ade80]",
  };

  // Color del círculo de relleno (inverso al fondo)
  const fillColors = {
    primary: "bg-primary-2",
    ghost: "bg-white",
    outline: "bg-primary",
    white: "bg-primary",
    whatsapp: "bg-[#25D366]",
  };

  const textColors = {
    primary: "text-white motion-safe:group-hover/btn:text-white",
    ghost: "text-white motion-safe:group-hover/btn:text-primary",
    outline: "text-primary motion-safe:group-hover/btn:text-white",
    white: "text-primary motion-safe:group-hover/btn:text-white",
    whatsapp: "text-[#4ade80] motion-safe:group-hover/btn:text-white",
  };

  const controlClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  const content = (
    <>
      <div
        ref={fillRef}
        className={`pointer-events-none absolute left-[-25%] top-[-25%] -z-10 h-[150%] w-[150%] scale-0 rounded-full ${fillColors[variant]}`}
      ></div>

      <span
        ref={textRef}
        className={`relative z-10 block ${textColors[variant]} transition-colors duration-300 motion-reduce:transition-none`}
      >
        {children}
      </span>
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a ref={linkRef} className={controlClassName} {...rest}>
        {content}
      </a>
    );
  }

  if (rest.to !== undefined) {
    return (
      <Link ref={linkRef} className={controlClassName} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={buttonRef} className={controlClassName} {...rest}>
      {content}
    </button>
  );
};
