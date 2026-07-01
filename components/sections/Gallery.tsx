"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { galleryCategories, galleryImages } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = filter === "All" ? galleryImages : galleryImages.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Gallery" title="Inside the clinic" description="A look at our spaces, equipment and team." />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["All", ...galleryCategories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === c ? "bg-primary text-white" : "bg-primary-50 text-primary/70 hover:bg-primary-100"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((img, i) => (
            <motion.button
              key={img.alt}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              className={cn(
                "group relative mb-5 block w-full overflow-hidden rounded-xl2 shadow-card",
                i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
              )}
            >
              <PlaceholderImage label={img.alt} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-primary-900/0 opacity-0 transition-all duration-300 group-hover:bg-primary-900/30 group-hover:opacity-100">
                <ZoomIn className="h-6 w-6 text-white" />
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary backdrop-blur">
                {img.category}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-xl2"
              onClick={(e) => e.stopPropagation()}
            >
              <PlaceholderImage label={filtered[active].alt} className="h-full w-full" variant="dark" />
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
