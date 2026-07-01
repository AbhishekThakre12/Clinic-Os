"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          variant === "primary" &&
            "bg-primary text-white shadow-soft hover:bg-primary-600 hover:shadow-glow hover:-translate-y-0.5",
          variant === "gold" &&
            "bg-accent text-primary-900 shadow-soft hover:bg-accent-300 hover:-translate-y-0.5",
          variant === "outline" &&
            "border border-primary/20 text-primary bg-white/60 backdrop-blur hover:border-primary hover:bg-white",
          variant === "ghost" && "text-primary hover:bg-primary-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
