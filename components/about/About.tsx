import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const facts = [
  { label: "Focus", value: "Backend systems, APIs and the data models behind them" },
  { label: "Stack", value: "Python · Django · DRF · PostgreSQL · React" },
  { label: "Currently", value: "Building NEXORA CRM" },
];

export default function About() {
  return (
    <section
      id="about"
      data-env="about"
      aria-labelledby="about-title"
      className="relative py-32 md:py-48"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <SectionHeading
              id="about-title"
              index="05"
              eyebrow="About"
              title={
                <>
                  Practical software, <em className="text-mist">built carefully.</em>
                </>
              }
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-6 text-[1.05rem] leading-8 text-ink/85">
              <Reveal>
                <p>
                  I&apos;m Sadeed, a Python and Django developer. I completed my BCA in 2025 and
                  have spent the time since building full-stack web applications, mostly Django
                  and Django REST Framework on the backend and React on the front.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  I&apos;m drawn to the parts of software that have to be right: data models,
                  permissions, scheduling logic, and APIs that other code depends on. NEXORA CRM
                  and the Placement Interview Scheduler are where I&apos;ve spent the most
                  thinking time on exactly that.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p>
                  I like software that solves a real workflow problem, and I learn by building
                  it, then going back to make it clearer and sturdier.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <dl className="mt-14 divide-y divide-white/[0.1] border-y border-white/[0.1]">
                {facts.map((f) => (
                  <div key={f.label} className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-dim">
                      {f.label}
                    </dt>
                    <dd className="text-sm text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}