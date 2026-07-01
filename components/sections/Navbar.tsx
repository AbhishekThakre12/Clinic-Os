"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { clinic } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Before & After", href: "#before-after" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6",
            scrolled ? "glass shadow-soft" : "bg-transparent"
          )}
        >
          <a href="#home" onClick={(e) => { e.preventDefault(); handleClick("#home"); }} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-soft">
              <Stethoscope className="h-4.5 w-4.5" size={18} strokeWidth={2} />
            </span>
            <span className="font-display text-lg font-semibold leading-none text-primary">
              Vimalai <span className="text-accent-600">Dental</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-primary-50 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={`tel:+91${clinic.phone}`} className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <Phone className="h-4 w-4" />
              {clinic.phoneDisplay}
            </a>
            <Button size="sm" onClick={() => handleClick("#appointment")}>
              Book Appointment
            </Button>
          </div>

          <button
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-primary lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-4 shadow-soft">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-primary-50 hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex flex-col gap-2 border-t border-ink/5 pt-3">
                  <a href={`tel:+91${clinic.phone}`} className="flex items-center gap-2 px-3 text-sm font-medium text-primary">
                    <Phone className="h-4 w-4" /> {clinic.phoneDisplay}
                  </a>
                  <Button onClick={() => handleClick("#appointment")}>Book Appointment</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
