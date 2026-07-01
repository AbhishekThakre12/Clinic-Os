"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { clinic } from "@/lib/data";

export function ContactMap() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(clinic.location.mapsEmbedQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Visit Us" title="Find us in Pimple Saudagar, Pune" />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-4 rounded-xl2 border border-ink/5 bg-canvas p-6 shadow-card">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">Address</div>
                <div className="mt-1 text-sm leading-relaxed text-ink/55">
                  {clinic.location.area}, {clinic.location.city}, {clinic.location.state}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl2 border border-ink/5 bg-canvas p-6 shadow-card">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">Phone</div>
                <a href={`tel:+91${clinic.phone}`} className="mt-1 block text-sm text-ink/55 hover:text-primary">{clinic.phoneDisplay}</a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl2 border border-ink/5 bg-canvas p-6 shadow-card">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">Working Hours</div>
                <div className="mt-1 text-sm leading-relaxed text-ink/55">
                  {clinic.hours.days}<br />
                  {clinic.hours.morning} &amp; {clinic.hours.evening}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a href={`tel:+91${clinic.phone}`} className="flex-1">
                <Button className="w-full"><Phone className="h-4 w-4" /> Call Now</Button>
              </a>
              <a href={clinic.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full"><Navigation className="h-4 w-4" /> Get Directions</Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-xl2 shadow-card"
          >
            <iframe
              title="Clinic location map"
              src={mapSrc}
              loading="lazy"
              className="h-full min-h-[360px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
