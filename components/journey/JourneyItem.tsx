"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { JourneyStep } from "@/types";

export default function JourneyItem({ step, index }: { step: JourneyStep; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // lights up as the travelling light (≈65% down the viewport) reaches it
  const lit = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });
  const right = index % 2 === 1;
  const now = step.tone === "now";

  return (
    <li
      ref={ref}
      className={cn(
        "relative pb-16 pl-10 last:pb-0 md:w-1/2 md:pl-0",
        right ? "md:ml-[50%] md:pl-14" : "md:pr-14 md:text-right"
      )}
    >
      {/* waypoint node */}
      <span
        aria-hidden
        className={cn(
          "absolute left-[11px] top-[0.4rem] -ml-1 h-[9px] w-[9px] rounded-full border transition-all duration-1000",
          right ? "md:left-0" : "md:left-auto md:right-0 md:ml-0 md:-mr-1",
          lit
            ? now
              ? "pulse-soft border-gold bg-gold shadow-[0_0_12px_2px_rgba(200,168,90,0.45)]"
              : "border-signal bg-foam shadow-[0_0_10px_2px_rgba(70,183,232,0.4)]"
            : "border-white/25 bg-void"
        )}
      />

      <div className={cn("transition-opacity duration-1000", lit ? "opacity-100" : "opacity-40")}>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
          <span className="text-dim">WP {String(index + 1).padStart(2, "0")}</span>
          <span className={cn("ml-3", now ? "text-gold" : "text-signal")}>{step.marker}</span>
        </p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-foam md:text-[2.4rem]">
          {step.title}
        </h3>
        <p className={cn("mt-3 max-w-md text-[15px] leading-7 text-muted", !right && "md:ml-auto")}>
          {step.description}
        </p>
      </div>
    </li>
  );
}