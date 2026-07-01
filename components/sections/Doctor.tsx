"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Target } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Image from "next/image";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { clinic } from "@/lib/data";

export function Doctor() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-canvas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Meet The Doctor" title="A specialist behind every smile" />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

                     <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl3 shadow-card">

  <Image
    src="/images/doctor-portrait.jpg"
    alt="Dr. Gananjay Patil at the clinic"
    fill
    className="object-cover"
  />
</div>
            <div className="glass absolute -bottom-6 -right-6 rounded-2xl px-6 py-4 shadow-soft">
              <div className="font-display text-2xl font-semibold text-primary">{clinic.doctor.experience}</div>
              <div className="text-xs font-medium uppercase tracking-wide text-ink/50">Clinical Experience</div>
            </div>
          </motion.div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-2xl font-semibold text-ink"
            >
              {clinic.doctor.name}
            </motion.h3>
            <p className="mt-1 text-sm font-medium text-accent-600">{clinic.doctor.qualification}</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/60">{clinic.doctor.bio}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl2 border border-ink/5 bg-white p-4 shadow-card">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-semibold text-ink">Qualifications</div>
                  <div className="mt-0.5 text-sm text-ink/55">BDS, MDS – Orthodontics & Dentofacial Orthopaedics</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl2 border border-ink/5 bg-white p-4 shadow-card">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-semibold text-ink">Memberships</div>
                  <div className="mt-0.5 text-sm text-ink/55">{clinic.doctor.memberships.join(", ")}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl2 border border-ink/5 bg-white p-4 shadow-card sm:col-span-2">
                <Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-semibold text-ink">Mission</div>
                  <div className="mt-0.5 text-sm text-ink/55">
                    To deliver painless, ethical and patient-centred dental care that helps every patient smile with confidence.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-ink/50">Experience Timeline</h4>
              <ol className="mt-5 space-y-5 border-l border-primary-100 pl-6">
                {clinic.doctor.timeline.map((t, i) => (
                  <motion.li
                    key={t.year}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-[1.69rem] top-1 h-3 w-3 rounded-full border-2 border-accent bg-white" />
                    <div className="text-sm font-semibold text-primary">{t.year}</div>
                    <div className="text-sm text-ink/60">{t.label}</div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
