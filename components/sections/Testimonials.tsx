"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const perView = 3;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const visible = Array.from({ length: perView }, (_, k) => testimonials[(index + k) % testimonials.length]);

  return (
    <section id="testimonials" className="section-pad bg-canvas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Patient Testimonials"
          title="Loved by patients across Pune"
          description="Real reviews from real patients, reflecting the experience you can expect."
        />

        <div className="relative mt-14">
          <div className="hidden gap-6 lg:grid lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((t) => (
                <motion.div
                  key={t.initials + index}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-xl2 border border-ink/5 bg-white p-7 shadow-card"
                >
                  <Quote className="h-7 w-7 text-accent-200" />
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">{t.review}</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{t.initials}</div>
                      <div className="text-xs text-ink/45">{t.treatment}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl2 border border-ink/5 bg-white p-7 shadow-card"
              >
                <Quote className="h-7 w-7 text-accent-200" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">{testimonials[index].review}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary">
                    {testimonials[index].initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{testimonials[index].initials}</div>
                    <div className="text-xs text-ink/45">{testimonials[index].treatment}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              aria-label="Previous"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-1.5 bg-ink/15"}`}
                />
              ))}
            </div>
            <button
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
