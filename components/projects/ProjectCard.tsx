

// "use client";

// import { useEffect, useId, useRef, useState } from "react";
// import Image from "next/image";
// import {
//   AnimatePresence,
//   motion,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ArrowUpRight, Minus, Plus } from "lucide-react";
// import Reveal from "@/components/ui/Reveal";
// import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
// import { envStore } from "@/lib/environment";
// import { cn } from "@/lib/utils";
// import type { Project } from "@/types";

// const ease = [0.22, 1, 0.36, 1] as const;

// /** Four tiny corner marks that appear when the row is hovered. */
// function CornerTicks() {
//   const base =
//     "pointer-events-none absolute h-3 w-3 border-signal/70 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-within:opacity-100";
//   return (
//     <>
//       <span aria-hidden className={cn(base, "-left-px -top-px border-l border-t")} />
//       <span aria-hidden className={cn(base, "-right-px -top-px border-r border-t")} />
//       <span aria-hidden className={cn(base, "-bottom-px -left-px border-b border-l")} />
//       <span aria-hidden className={cn(base, "-bottom-px -right-px border-b border-r")} />
//     </>
//   );
// }

// function Preview({ project }: { project: Project }) {
//   const mediaRef = useRef<HTMLDivElement>(null);
//   const reduced = usePrefersReducedMotion();
//   const { scrollYProgress } = useScroll({
//     target: mediaRef,
//     offset: ["start end", "end start"],
//   });
//   const driftY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

//   const hasVisual = !!project.video || !!project.image;

//   return (
//     <div className="relative border border-white/[0.12] bg-deep/70 transition-colors duration-700 group-hover:border-mist/40 group-focus-within:border-mist/40">
//       <CornerTicks />

//       {/* slim window bar, drawn in the site's own language */}
//       <div className="flex h-9 items-center gap-3 border-b border-white/[0.08] px-4">
//         <span aria-hidden className="flex gap-1.5">
//           <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
//           <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
//           <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
//         </span>
//         <span className="truncate font-mono text-[0.62rem] uppercase tracking-[0.22em] text-dim">
//           {project.id}
//         </span>
//       </div>

//       <div ref={mediaRef} className="relative aspect-[16/10] overflow-hidden bg-void">
//         {project.video ? (
//           // Not autoplaying: the visitor chooses to play it.
//           <video
//             className="h-full w-full object-contain"
//             controls
//             playsInline
//             preload="metadata"
//             poster={project.video.poster}
//             aria-label={project.video.alt}
//           >
//             <source
//               src={project.video.src}
//               type={project.video.src.endsWith(".webm") ? "video/webm" : "video/mp4"}
//             />
//             Your browser can&apos;t play this video.
//           </video>
//         ) : project.image ? (
//           <>
//             <motion.div
//               className="absolute inset-x-0 -inset-y-[6%]"
//               style={{ y: reduced ? 0 : driftY }}
//             >
//               <Image
//                 src={project.image.src}
//                 alt={project.image.alt}
//                 fill
//                 sizes="(min-width: 1024px) 700px, 100vw"
//                 className="object-cover object-top opacity-80 saturate-[0.8] transition-[opacity,filter,transform] duration-[900ms] ease-out group-hover:opacity-100 group-hover:saturate-100 group-focus-within:opacity-100 group-focus-within:saturate-100 group-hover:scale-[1.02]"
//               />
//             </motion.div>
//             {/* blends the screenshot into the dark environment */}
//             <div
//               aria-hidden
//               className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-void/20"
//             />
//             <div
//               aria-hidden
//               className="pointer-events-none absolute inset-0 bg-tide/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
//             />
//           </>
//         ) : project.highlights.length > 0 ? (
//           /* No screenshot yet: a spec sheet built from real highlights */
//           <div className="flex h-full flex-col justify-center gap-5 p-6 md:p-10">
//             <p className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-signal">
//               Overview
//             </p>
//             <ol className="space-y-3">
//               {project.highlights.map((item, i) => (
//                 <li
//                   key={item}
//                   className="flex gap-4 border-b border-white/[0.07] pb-3 text-[14px] leading-6 text-ink/85 last:border-b-0"
//                 >
//                   <span className="font-mono text-[0.68rem] tracking-widest text-dim">
//                     {String(i + 1).padStart(2, "0")}
//                   </span>
//                   {item}
//                 </li>
//               ))}
//             </ol>
//           </div>
//         ) : (
//           <div className="flex h-full items-center justify-center p-6">
//             <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-dim">
//               Preview not added yet
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function ProjectCard({
//   project,
//   index,
// }: {
//   project: Project;
//   index: number;
// }) {
//   const ref = useRef<HTMLElement>(null);
//   const [open, setOpen] = useState(false);
//   const panelId = useId();

//   const flip = index % 2 === 1; // alternate which side the preview sits on
//   const hasVisual = !!project.video || !!project.image;
//   // Highlights are already shown in the preview panel when there is no visual.
//   const hasDetails = hasVisual && project.highlights.length > 0;

//   const claim = () => {
//     envStore.focusEl = ref.current;
//   };
//   const release = () => {
//     if (envStore.focusEl === ref.current) envStore.focusEl = null;
//   };
//   useEffect(
//     () => () => {
//       if (envStore.focusEl === ref.current) envStore.focusEl = null;
//     },
//     []
//   );

//   return (
//     <Reveal>
//       <article
//         ref={ref}
//         className="project-row group"
//         onPointerEnter={(e) => e.pointerType === "mouse" && claim()}
//         onPointerLeave={release}
//         onFocus={claim}
//         onBlur={release}
//       >
//         <div className="grid items-center gap-x-12 gap-y-10 py-14 md:py-20 lg:grid-cols-12">
//           {/* ---------- text ---------- */}
//           <div className={cn("lg:col-span-5", flip ? "lg:order-2 lg:col-start-8" : "lg:order-1")}>
//             <p
//               aria-hidden
//               className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(145,174,190,0.28)] transition-[-webkit-text-stroke-color] duration-700 group-hover:[-webkit-text-stroke:1px_rgba(70,183,232,0.7)]"
//             >
//               {project.index}
//             </p>

//             <h3 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.015em] text-foam transition-all duration-700 group-hover:translate-x-1.5">
//               {project.title}
//             </h3>
//             <p className="mt-3 text-muted">{project.tagline}</p>
//             <p className="mt-6 text-[15px] leading-7 text-ink/80">{project.description}</p>

//             {project.stack.length > 0 && (
//               <ul
//                 className="mt-6 flex flex-wrap gap-y-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted"
//                 aria-label="Technologies"
//               >
//                 {project.stack.map((tech) => (
//                   <li
//                     key={tech}
//                     className="after:mx-2 after:text-dim after:content-['·'] last:after:content-none"
//                   >
//                     {tech}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/[0.08] pt-6">
//               {project.meta.map((m) => (
//                 <div key={m.label}>
//                   <dt className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-dim">
//                     {m.label}
//                   </dt>
//                   <dd className="mt-1 flex items-center gap-2 text-sm text-ink">
//                     {m.tone && (
//                       <span
//                         aria-hidden
//                         className={cn(
//                           "h-1.5 w-1.5 rounded-full",
//                           m.tone === "building" ? "pulse-soft bg-gold" : "bg-mist"
//                         )}
//                       />
//                     )}
//                     {m.value}
//                   </dd>
//                 </div>
//               ))}
//             </dl>

//             <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
//               {hasDetails && (
//                 <button
//                   type="button"
//                   onClick={() => setOpen((v) => !v)}
//                   aria-expanded={open}
//                   aria-controls={panelId}
//                   className="inline-flex min-h-11 items-center gap-2.5 border border-white/15 px-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:border-mist hover:text-foam"
//                 >
//                   Highlights
//                   {open ? (
//                     <Minus className="h-3.5 w-3.5" aria-hidden />
//                   ) : (
//                     <Plus className="h-3.5 w-3.5" aria-hidden />
//                   )}
//                 </button>
//               )}
//               {project.github && (
//                 <a
//                   href={project.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foam"
//                 >
//                   GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
//                   <span className="sr-only">(opens in a new tab)</span>
//                 </a>
//               )}
//               {project.live && (
//                 <a
//                   href={project.live}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foam"
//                 >
//                   Live <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
//                   <span className="sr-only">(opens in a new tab)</span>
//                 </a>
//               )}
//             </div>

//             <AnimatePresence initial={false}>
//               {open && hasDetails && (
//                 <motion.div
//                   key="details"
//                   id={panelId}
//                   className="overflow-hidden"
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.6, ease }}
//                 >
//                   <ul className="mt-8 space-y-3 border-l border-signal/30 pl-5">
//                     {project.highlights.map((item) => (
//                       <li key={item} className="text-[15px] leading-7 text-ink/80">
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* ---------- preview ---------- */}
//           <div className={cn("lg:col-span-7", flip ? "lg:order-1 lg:col-start-1" : "lg:order-2")}>
//             <Preview project={project} />
//           </div>
//         </div>
//       </article>
//     </Reveal>
//   );
// }


"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { envStore } from "@/lib/environment";
import { cn } from "@/lib/utils";
import type { Project, ProjectMedia } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

/** Four tiny corner marks that appear when the row is hovered. */
function CornerTicks() {
  const base =
    "pointer-events-none absolute h-3 w-3 border-signal/70 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-within:opacity-100";
  return (
    <>
      <span aria-hidden className={cn(base, "-left-px -top-px border-l border-t")} />
      <span aria-hidden className={cn(base, "-right-px -top-px border-r border-t")} />
      <span aria-hidden className={cn(base, "-bottom-px -left-px border-b border-l")} />
      <span aria-hidden className={cn(base, "-bottom-px -right-px border-b border-r")} />
    </>
  );
}

/** One framed video or image. */
function MediaFrame({
  item,
  fallbackLabel,
}: {
  item: ProjectMedia;
  fallbackLabel: string;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  // gentle parallax for images only
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Videos play silently while visible and pause when scrolled away.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced, item.src]);

  return (
    <div className="relative border border-white/[0.12] bg-deep/70 transition-colors duration-700 group-hover:border-mist/40 group-focus-within:border-mist/40">
      <CornerTicks />

      <div className="flex h-9 items-center gap-3 border-b border-white/[0.08] px-4">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </span>
        <span className="truncate font-mono text-[0.62rem] uppercase tracking-[0.22em] text-dim">
          {item.label ?? fallbackLabel}
        </span>
      </div>

      <div ref={mediaRef} className="relative aspect-video overflow-hidden bg-void">
        {item.type === "video" ? (
          <video
            ref={videoRef}
            className="h-full w-full object-contain opacity-90 transition-opacity duration-700 group-hover:opacity-100"
            controls
            muted
            loop
            playsInline
            preload="metadata"
            poster={item.poster}
            aria-label={item.alt}
          >
            <source
              src={item.src}
              type={item.src.endsWith(".webm") ? "video/webm" : "video/mp4"}
            />
            Your browser can&apos;t play this video.
          </video>
        ) : (
          <>
            <motion.div
              className="absolute inset-x-0 -inset-y-[6%]"
              style={{ y: reduced ? 0 : driftY }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover object-top opacity-80 saturate-[0.8] transition-[opacity,filter,transform] duration-[900ms] ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:saturate-100 group-focus-within:opacity-100 group-focus-within:saturate-100"
              />
            </motion.div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-void/20"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-tide/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
            />
          </>
        )}
      </div>
    </div>
  );
}

/** Used only when a project has no media yet: a spec sheet from real highlights. */
function SpecSheet({ project }: { project: Project }) {
  return (
    <div className="relative border border-white/[0.12] bg-deep/70 transition-colors duration-700 group-hover:border-mist/40">
      <CornerTicks />
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.08] px-4">
        <span className="truncate font-mono text-[0.62rem] uppercase tracking-[0.22em] text-dim">
          {project.id}
        </span>
      </div>
      {project.highlights.length > 0 ? (
        <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-signal">
            Overview
          </p>
          <ol className="space-y-3">
            {project.highlights.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 border-b border-white/[0.07] pb-3 text-[14px] leading-6 text-ink/85 last:border-b-0"
              >
                <span className="font-mono text-[0.68rem] tracking-widest text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center p-6">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-dim">
            Preview not added yet
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const flip = index % 2 === 1; // alternate which side the preview sits on
  const media = project.media ?? [];
  const [primary, ...extras] = media;
  // The highlights button only makes sense when media replaces the spec sheet.
  const hasDetails = !!primary && project.highlights.length > 0;

  const claim = () => {
    envStore.focusEl = ref.current;
  };
  const release = () => {
    if (envStore.focusEl === ref.current) envStore.focusEl = null;
  };
  useEffect(
    () => () => {
      if (envStore.focusEl === ref.current) envStore.focusEl = null;
    },
    []
  );

  return (
    <Reveal>
      <article
        ref={ref}
        className="project-row group"
        onPointerEnter={(e) => e.pointerType === "mouse" && claim()}
        onPointerLeave={release}
        onFocus={claim}
        onBlur={release}
      >
        <div className="grid items-start gap-x-12 gap-y-10 py-14 md:py-20 lg:grid-cols-12">
          {/* ---------- text ---------- */}
          <div
            className={cn(
              "lg:col-span-5",
              open ? "lg:self-start" : "lg:self-center",
              flip ? "lg:order-2 lg:col-start-8" : "lg:order-1"
            )}
          >
            <p
              aria-hidden
              className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(145,174,190,0.28)] transition-[-webkit-text-stroke-color] duration-700 group-hover:[-webkit-text-stroke:1px_rgba(70,183,232,0.7)]"
            >
              {project.index}
            </p>

            <h3 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.015em] text-foam transition-all duration-700 group-hover:translate-x-1.5">
              {project.title}
            </h3>
            <p className="mt-3 text-muted">{project.tagline}</p>
            <p className="mt-6 text-[15px] leading-7 text-ink/80">{project.description}</p>

            {project.stack.length > 0 && (
              <ul
                className="mt-6 flex flex-wrap gap-y-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted"
                aria-label="Technologies"
              >
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="after:mx-2 after:text-dim after:content-['·'] last:after:content-none"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/[0.08] pt-6">
              {project.meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-dim">
                    {m.label}
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-sm text-ink">
                    {m.tone && (
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          m.tone === "building" ? "pulse-soft bg-gold" : "bg-mist"
                        )}
                      />
                    )}
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              {hasDetails && (
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="inline-flex min-h-11 items-center gap-2.5 border border-white/15 px-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:border-mist hover:text-foam"
                >
                  Highlights
                  {open ? (
                    <Minus className="h-3.5 w-3.5" aria-hidden />
                  ) : (
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                  )}
                </button>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foam"
                >
                  GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foam"
                >
                  Live <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>

            <AnimatePresence initial={false}>
              {open && hasDetails && (
                <motion.div
                  key="details"
                  id={panelId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <ul className="mt-8 space-y-3 border-l border-signal/30 pl-5">
                    {project.highlights.map((item) => (
                      <li key={item} className="text-[15px] leading-7 text-ink/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---------- media ---------- */}
          <div
            className={cn(
              "lg:col-span-7 lg:flex lg:self-stretch",
              open ? "lg:items-start" : "lg:items-center",
              flip ? "lg:order-1 lg:col-start-1" : "lg:order-2"
            )}
          >
            {/* sticky: stays beside the highlights while you read them */}
            <div className="w-full lg:sticky lg:top-28">
              {primary ? (
                <MediaFrame item={primary} fallbackLabel={project.title} />
              ) : (
                <SpecSheet project={project} />
              )}

              <AnimatePresence initial={false}>
                {open &&
                  extras.map((item, i) => (
                    <motion.div
                      key={item.src}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease }}
                    >
                      <div className="pt-6">
                        <MediaFrame item={item} fallbackLabel={project.title} />
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}