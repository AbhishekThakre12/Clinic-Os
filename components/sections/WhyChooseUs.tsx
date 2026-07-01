"use client";

import { motion } from "framer-motion";
import { GraduationCap, Microscope, HeartHandshake, ShieldCheck, Users, CalendarClock, LucideIcon } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { whyChooseUs } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = { GraduationCap, Microscope, HeartHandshake, ShieldCheck, Users, CalendarClock };

export function WhyChooseUs() {
  return (
    <section className="section-pad relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Why Patients Choose Us"
          title="Care built around precision, comfort and trust"
          description="Every detail of the patient experience is designed to feel calm, modern and genuinely personal."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-xl2 border border-ink/5 bg-canvas p-7 shadow-card transition-shadow hover:shadow-glow"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-50 transition-transform duration-500 group-hover:scale-125" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-soft">
                  <Icon className="h-5.5 w-5.5" size={22} strokeWidth={1.75} />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink/55">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
