import { Stethoscope, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { clinic, treatments } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary-900">
                <Stethoscope className="h-4.5 w-4.5" size={18} />
              </span>
              <span className="font-display text-lg font-semibold text-white">Vimalai Dental</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Advanced orthodontic &amp; multispeciality dental care led by {clinic.doctor.name}, in {clinic.location.area}, {clinic.location.city}.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-primary-900">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["About", "Treatments", "Before & After", "Gallery", "Testimonials", "FAQ"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/\s+&\s+|\s+/g, "-")}`} className="hover:text-accent-200">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90">Treatments</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {treatments.slice(0, 6).map((t) => <li key={t.name}>{t.name}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /> {clinic.location.area}, {clinic.location.city}, {clinic.location.state}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-accent-300" /> {clinic.phoneDisplay}</li>
              <li className="text-white/55">{clinic.hours.days}: {clinic.hours.morning} &amp; {clinic.hours.evening}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <span>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</span>
          <span>Powered by <span className="text-accent-200">ClinicOS</span></span>
        </div>
      </div>
    </footer>
  );
}
