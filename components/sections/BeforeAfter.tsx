"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { beforeAfterCases } from "@/lib/data";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Braces", "Smile Design", "Implants", "Whitening", "Root Canal"];

export function BeforeAfter() {
  const [filter, setFilter] = useState("All");
  const cases = filter === "All" ? beforeAfterCases : beforeAfterCases.filter((c) => c.category === filter);

  return (
    <section id="before-after" className="section-pad relative overflow-hidden bg-primary-900">
      <div className="absolute inset-0 bg-hero-mesh opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Real Results"
          title="Before & after transformations"
          description="Drag the slider on each case to see the difference our treatments make."
          light
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === f ? "bg-accent text-primary-900" : "bg-white/10 text-white/70 hover:bg-white/15"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {cases.map((c) => (
              <motion.div
                key={c.treatment}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-xl2 bg-white/[0.06] p-3 shadow-soft ring-1 ring-white/10"
              >
                <BeforeAfterSlider treatment={c.treatment} />
                <div className="px-2 pb-2 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold text-white">{c.treatment}</h3>
                    <span className="flex items-center gap-1 text-xs text-accent-200">
                      <Clock className="h-3.5 w-3.5" /> {c.duration}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
