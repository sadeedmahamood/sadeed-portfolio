"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { SITE } from "@/data/site";
import { GITHUB_URL } from "@/data/social";

const ease = [0.22, 1, 0.36, 1] as const;

/** A line of the name rises out of a mask. Slow, no bounce. */
function NameLine({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="-mb-[0.1em] block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.6, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Fade({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroContent() {
  return (
    <>
      {/* Name block */}
      <Container className="flex flex-1 flex-col justify-center pt-28 md:pt-32">
        <Fade delay={0.2}>
          <p className="flex items-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-muted">
            <span className="text-signal">01</span>
            <span aria-hidden className="h-px w-10 bg-muted/40" />
            Python / Django
          </p>
        </Fade>

        <h1 className="mt-8 font-display text-[clamp(4rem,13.5vw,12.5rem)] leading-[0.88] tracking-[-0.03em] text-foam">
          <NameLine delay={0.35}>Sadeed</NameLine>
          <span className="sr-only"> </span>
          <NameLine delay={0.55} className="ml-[7vw] italic text-mist md:ml-[12vw]">
            Mahamood
          </NameLine>
        </h1>
      </Container>

      {/* Role, copy, actions */}
      <Container className="pb-8 pt-14 md:pb-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-8">
          <Fade delay={1.0} className="md:col-span-5">
            <p className="flex items-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-foam">
              <span aria-hidden className="h-px w-8 bg-gold/70" />
              {SITE.role}
            </p>
          </Fade>

          <Fade delay={1.15} className="md:col-span-6 md:col-start-7">
            <p className="max-w-md text-[1.05rem] leading-8 text-ink/85">{SITE.tagline}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#work" icon="down">
                View my work
              </Button>
              <Button href={GITHUB_URL} variant="ghost" external>
                GitHub
              </Button>
            </div>
          </Fade>
        </div>

        <Fade delay={1.7} className="mt-14 flex items-end justify-between md:mt-20">
          <div className="flex items-center gap-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-dim">
            <span aria-hidden className="scroll-cue-line" />
            Scroll
          </div>
          <p className="hidden font-mono text-[0.66rem] uppercase tracking-[0.2em] text-dim sm:block">
            {SITE.heroStack.join(" · ")}
          </p>
        </Fade>
      </Container>
    </>
  );
}