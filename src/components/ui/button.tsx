import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function buttonStyles({
  variant = "primary",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]",
    variant === "primary" &&
      "bg-[var(--color-forest)] text-white shadow-[0_10px_30px_rgba(40,72,54,0.22)] hover:-translate-y-0.5 hover:bg-[var(--color-forest-deep)]",
    variant === "secondary" &&
      "border border-[var(--color-line)] bg-white/80 text-[var(--color-forest)] hover:-translate-y-0.5 hover:bg-[var(--color-surface)]",
    variant === "ghost" &&
      "text-[var(--color-forest)] hover:bg-[var(--color-surface)]",
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, className })} {...props}>
      {children}
    </button>
  );
}
