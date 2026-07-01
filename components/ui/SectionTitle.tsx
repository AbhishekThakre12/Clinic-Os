"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]",
            align === "center" && "justify-center",
            light ? "text-accent-200" : "text-accent-600"
          )}
        >
          {align !== "center" && <span className="h-px w-8 bg-accent" />}
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-display text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.75rem]",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-white/70" : "text-ink/60")}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
