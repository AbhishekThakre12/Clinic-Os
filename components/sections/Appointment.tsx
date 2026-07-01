"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Phone, User, Mail, Stethoscope, Calendar, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { treatments, clinic } from "@/lib/data";

const fieldClass =
  "w-full rounded-xl border border-ink/10 bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink/35 transition-colors focus:border-primary focus:outline-none";

export function Appointment() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      treatment: String(form.get("treatment") || ""),
      preferredDate: String(form.get("date") || ""),
      preferredTime: String(form.get("time") || ""),
      message: String(form.get("message") || "")
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please call us instead.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSubmitted(true);
    } catch {
      setError("Network error — please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <section id="appointment" className="section-pad relative overflow-hidden bg-primary-900">
      <div className="absolute inset-0 bg-hero-mesh opacity-30" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Book Appointment" title="Reserve your visit in a minute" light />

        <div className="mt-12 overflow-hidden rounded-xl3 bg-white shadow-card">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-primary p-8 text-white sm:p-10">
              <h3 className="font-display text-xl font-semibold">Why book with us?</h3>
              <ul className="mt-6 space-y-4 text-sm text-white/75">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> Confirmed slot within hours, six days a week</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> Free initial consultation with Dr. Patil</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> Transparent treatment plan, no hidden costs</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> Reminders sent ahead of your visit</li>
              </ul>
              <div className="mt-10 rounded-xl2 bg-white/10 p-5">
                <div className="text-xs font-medium uppercase tracking-wide text-white/50">Prefer to call?</div>
                <a href={`tel:+91${clinic.phone}`} className="mt-1 flex items-center gap-2 font-display text-lg font-semibold">
                  <Phone className="h-4 w-4" /> {clinic.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={onSubmit}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                        <input required name="name" placeholder="Patient Name" className={fieldClass} />
                      </div>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                        <input required name="phone" type="tel" placeholder="Phone Number" className={fieldClass} />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                      <input name="email" type="email" placeholder="Email Address" className={fieldClass} />
                    </div>

                    <div className="relative">
                      <Stethoscope className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                      <select required name="treatment" defaultValue="" className={`${fieldClass} appearance-none`}>
                        <option value="" disabled>Select Treatment</option>
                        {treatments.map((t) => (
                          <option key={t.name} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                        <input required name="date" type="date" className={fieldClass} />
                      </div>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                        <input required name="time" type="time" className={fieldClass} />
                      </div>
                    </div>

                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-ink/35" />
                      <textarea name="message" rows={3} placeholder="Tell us about your concern (optional)" className={`${fieldClass} resize-none pt-3`} />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 overflow-hidden rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button type="submit" variant="gold" className="w-full" size="lg" disabled={loading}>
                      {loading ? "Booking..." : "Confirm Appointment"}
                    </Button>
                    <p className="text-center text-xs text-ink/40">We'll call to confirm your slot shortly after booking.</p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="flex h-full flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink">Request received!</h3>
                    <p className="mt-2 max-w-xs text-sm text-ink/55">
                      Our team will call you shortly to confirm your slot. For urgent queries, call us directly.
                    </p>
                    <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Book another</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
