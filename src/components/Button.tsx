import { useRef, useEffect } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { gsap } from "gsap";

type Variant = "primary" | "ghost" | "outline" | "white" | "whatsapp";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const Button = ({ variant = "primary", children, className = "", ...rest }: ButtonProps) => {
  // ... (refs and useEffect logic remains same) ...
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    const fill = fillRef.current;
    
    if (!button || !text || !fill) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.3);
      yTo(y * 0.3);
      gsap.to(text, { x: x * 0.1, y: y * 0.1, duration: 1, ease: "power2.out" });
      gsap.to(fill, { x: x * 0.5, y: y * 0.5, duration: 0.6, ease: "power2.out" });
    };

    const handleMouseEnter = () => {
        gsap.to(fill, { scale: 2.5, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      gsap.to(fill, { scale: 0, duration: 0.5, ease: "power2.in" });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Estilos base minimalistas
  const baseStyles = "relative overflow-hidden rounded-full px-8 py-4 font-medium transition-colors duration-300 z-10 inline-flex items-center justify-center group/btn";
  
  const variantStyles = {
    primary: "bg-[#0A1626] text-white border border-[#0A1626]",
    ghost: "bg-transparent text-white border border-white/30 hover:border-white",
    outline: "bg-transparent text-[#0A1626] border border-[#0A1626]/30",
    white: "bg-white text-[#0A1626] border border-white hover:border-slate-200",
    whatsapp: "bg-transparent text-[#4ade80] border border-[#4ade80]/40 hover:border-[#4ade80]"
  };

  // Color del círculo de relleno (inverso al fondo)
  const fillColors = {
    primary: "bg-[#1e293b]", // Slate-800, elegante y oscuro
    ghost: "bg-white",
    outline: "bg-[#0A1626]",
    white: "bg-[#0A1626]",
    whatsapp: "bg-[#25D366]"
  };

  const textColors = {
    primary: "text-white group-hover/btn:text-white",
    ghost: "text-white group-hover/btn:text-[#0A1626]",
    outline: "text-[#0A1626] group-hover/btn:text-white",
    white: "text-[#0A1626] group-hover/btn:text-white",
    whatsapp: "text-[#4ade80] group-hover/btn:text-white"
  };

  return (
    <button 
        ref={buttonRef}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`} 
        {...rest}
    >
      <div 
        ref={fillRef} 
        className={`absolute w-[150%] h-[150%] rounded-full top-[-25%] left-[-25%] scale-0 pointer-events-none -z-10 ${fillColors[variant]}`}
      ></div>
      
      <span ref={textRef} className={`relative z-10 block ${textColors[variant]} transition-colors duration-300`}>
        {children}
      </span>
    </button>
  );
};
