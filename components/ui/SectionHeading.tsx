import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
  className,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  id?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="flex items-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted">
        <span className="text-signal">{index}</span>
        <span aria-hidden className="h-px w-10 bg-muted/40" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-6 font-display text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.02] tracking-[-0.02em] text-foam"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">{description}</p>
      )}
    </Reveal>
  );
}