import Container from "@/components/ui/Container";
import { SITE } from "@/data/site";
import { socialLinks } from "@/data/social";

// Update this once a year. Computing it with new Date() breaks prerendering
// when Cache Components is enabled.
const COPYRIGHT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] py-10">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-foam">{SITE.name}</p>
          <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">
            {SITE.role}
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-7 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
          {socialLinks.map((link) => (
            <li key={link.id}>
              {link.href ? (
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-foam"
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                  <span aria-hidden> ↗</span>
                  {link.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center text-dim">
                  {link.label} · soon
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-dim">
          © {COPYRIGHT_YEAR} {SITE.name}
        </p>
      </Container>
    </footer>
  );
}