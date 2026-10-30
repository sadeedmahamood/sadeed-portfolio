"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JourneyItem from "@/components/journey/JourneyItem";
import { journey } from "@/data/journey";

export default function Journey() {
  const routeRef = useRef<HTMLDivElement>(null);

  // 0 → 1 as the "head" line (65% down the viewport) travels the route
  const { scrollYProgress } = useScroll({
    target: routeRef,
    offset: ["start 65%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.5 });
  const headTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      data-env="journey"
      aria-labelledby="journey-title"
      className="relative py-28 md:py-40"
    >
      <Container>
        <SectionHeading
          id="journey-title"
          index="04"
          eyebrow="Journey"
          title={
            <>
              The route <em className="text-mist">so far.</em>
            </>
          }
          description="Not a résumé, just the waypoints that shaped how I build."
        />

        <div ref={routeRef} className="relative mt-20 md:mt-28">
          {/* the route */}
          <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-white/[0.1] md:left-1/2" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-signal/10 via-signal/60 to-signal md:left-1/2"
            style={{ scaleY: progress }}
          />
          {/* the travelling light */}
          <motion.div
            aria-hidden
            className="absolute left-[11px] md:left-1/2"
            style={{ top: headTop }}
          >
            <span className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foam shadow-[0_0_14px_3px_rgba(70,183,232,0.55)]" />
          </motion.div>

          <ol className="relative">
            {journey.map((step, i) => (
              <JourneyItem key={step.id} step={step} index={i} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}