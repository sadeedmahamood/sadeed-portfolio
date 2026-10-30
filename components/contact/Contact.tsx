
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { socialLinks } from "@/data/social";
import { cn } from "@/lib/utils";

export default function Contact() {
  return (
    <section
      id="contact"
      data-env="contact"
      aria-labelledby="contact-title"
      className="relative pb-24 pt-28 md:pb-36 md:pt-40"
    >
      <Container>
        <SectionHeading
          id="contact-title"
          index="06"
          eyebrow="Contact"
          className="max-w-4xl"
          title={
            <>
              Let&apos;s build
              <br />
              <em className="text-mist">something useful.</em>
            </>
          }
          description="If you're hiring, collaborating, or have a Python or Django problem worth solving, I'd like to hear about it."
        />

        <Reveal delay={0.1} className="mt-16 max-w-3xl md:mt-24">
          <ul>
            {socialLinks.map((link) => {
              const inner = (
                <>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-dim">
                    {link.label}
                  </span>
                  <span
                    className={cn(
                      "link-value flex items-center gap-2 text-lg text-ink md:text-2xl",
                      !link.href && "text-muted"
                    )}
                  >
                    {link.handle}
                    {link.href && (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                    )}
                  </span>
                </>
              );

              return (
                <li key={link.id}>
                  {link.href ? (
                    <a
                      href={link.href}
                      className="link-row"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {inner}
                      {link.external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  ) : (
                    <div className="link-row">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}