import HeroContent from "@/components/hero/HeroContent";

export default function Hero() {
  return (
    <section
      id="top"
      data-env="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col"
    >
      <HeroContent />
    </section>
  );
}