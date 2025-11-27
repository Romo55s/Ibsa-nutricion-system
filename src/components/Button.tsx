import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const Button = ({ variant = "primary", children, className = "", ...rest }: ButtonProps) => {
  const base = "btn";
  const variantClass = variant === "primary" ? "btn-primary" : "btn-ghost";

  return (
    <button className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
};


