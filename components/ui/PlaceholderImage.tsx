import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

/**
 * PlaceholderImage — a premium-looking stand-in for real photography.
 * Swap with next/image + a real asset when clinic photos are available.
 */
export function PlaceholderImage({
  label,
  className,
  variant = "light"
}: {
  label: string;
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        variant === "light"
          ? "bg-gradient-to-br from-primary-50 via-white to-accent-50"
          : "bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900",
        className
      )}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#0F4C81_1px,transparent_0)] [background-size:18px_18px]" />
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          variant === "light" ? "bg-white text-primary shadow-soft" : "bg-white/10 text-white"
        )}
      >
        <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <span
        className={cn(
          "mt-3 px-6 text-center text-xs font-medium tracking-wide",
          variant === "light" ? "text-primary/60" : "text-white/70"
        )}
      >
        {label}
      </span>
    </div>
  );
}
