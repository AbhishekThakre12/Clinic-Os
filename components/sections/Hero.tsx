"use client";

import { motion } from "framer-motion";
import { Phone, CalendarCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { clinic } from "@/lib/data";

export function Hero() {
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-primary-100/60 blur-3xl" />
      <div className="absolute -right-16 top-16 h-80 w-80 rounded-full bg-accent-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-600 shadow-soft backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {clinic.doctor.experience} Experience · Pimple Saudagar, Pune
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-balance text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl md:text-6xl"
          >
            Transforming Smiles with <span className="text-primary">Advanced</span>{" "}
            <span className="relative inline-block text-primary">
              Dental Care
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M1 6.5C40 2 160 2 199 6.5" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink/60"
          >
            Led by <span className="font-medium text-ink">{clinic.doctor.name}</span> ({clinic.doctor.qualification}) —
            painless, ethical and personalised dental care using modern technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button size="lg" variant="gold" onClick={() => scrollTo("#appointment")}>
              <CalendarCheck className="h-4 w-4" /> Book Appointment
            </Button>
            <a href={`tel:+91${clinic.phone}`}>
              <Button size="lg" variant="outline">
                <Phone className="h-4 w-4" /> Call Now
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {clinic.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-semibold text-primary sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/45">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl3 shadow-card">
  <Image
    src="/images/doctor-portrait.jpg"
    alt="Dr. Gananjay Patil"
    fill
    className="object-cover"
    priority
  />
</div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-6 top-10 hidden flex-col rounded-2xl px-5 py-4 shadow-soft sm:flex"
          >
            <span className="font-display text-2xl font-semibold text-primary">16+</span>
            <span className="text-xs font-medium text-ink/50">Years Experience</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass absolute -right-4 bottom-16 hidden flex-col rounded-2xl px-5 py-4 shadow-soft sm:flex"
          >
            <span className="font-display text-2xl font-semibold text-primary">1000+</span>
            <span className="text-xs font-medium text-ink/50">Happy Patients</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass absolute -bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-5 py-2.5 shadow-soft sm:flex"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-ink/70">Modern Equipment · Personalised Care</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("#about")}
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink/40 sm:flex"
      >
        <span className="text-[11px] font-medium uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}
