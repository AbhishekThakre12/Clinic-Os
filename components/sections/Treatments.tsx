"use client";

import { motion } from "framer-motion";
import {
  Smile, Sparkles, Wand2, Bolt, Activity, Layers, Grid3x3, Sun, Baby, Droplets, Hammer, Siren, ArrowUpRight, LucideIcon
} from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { treatments } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  Smile, Sparkles, Wand2, Bolt, Activity, Layers, Grid3x3, Sun, Baby, Droplets, Hammer, Siren
};

export function Treatments() {
  return (
    <section id="treatments" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Our Treatments"
          title="Comprehensive dental care, all in one place"
          description="From routine cleaning to complex orthodontic and implant cases — handled with precision."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {treatments.map((t, i) => {
            const Icon = ICONS[t.icon];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                whileHover={{ y: -5 }}
                className="group relative cursor-default overflow-hidden rounded-xl2 border border-ink/5 bg-canvas p-6 shadow-card transition-colors hover:border-primary-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-ink/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-600" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">{t.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{t.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
