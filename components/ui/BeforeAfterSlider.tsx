"use client";

import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function BeforeAfterSlider({ treatment }: { treatment: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  };
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
}, []);
  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl2"
     onMouseDown={(e) => {
  dragging.current = true;
  updateFromClientX(e.clientX);
}}
      onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      {/* After (base layer) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white">
        <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">After</span>
        <span className="mt-2 text-xs text-primary/50">{treatment}</span>
      </div>

      {/* Before (clipped layer) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-ink/10 to-ink/[0.03]"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <span className="rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Before</span>
        <span className="mt-2 text-xs text-ink/40">{treatment}</span>
      </div>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${pos}%` }}>
        <div className="h-full w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(15,76,129,0.15)]" />
        <div className="pointer-events-auto absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white text-primary shadow-soft active:cursor-grabbing">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
