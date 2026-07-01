"use client";

import { Phone, CalendarCheck } from "lucide-react";
import { clinic } from "@/lib/data";

export function MobileCTA() {
  return (
    <div className="glass fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-2xl p-2 shadow-soft lg:hidden">
      <a
        href={`tel:+91${clinic.phone}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white"
      >
        <Phone className="h-4 w-4" /> Call Now
      </a>
      <a
        href="#appointment"
        onClick={(e) => { e.preventDefault(); document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth" }); }}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-medium text-primary-900"
      >
        <CalendarCheck className="h-4 w-4" /> Book Now
      </a>
    </div>
  );
}
