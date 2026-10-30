"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import MobileNav from "@/components/navigation/MobileNav";
import { NAV_LINKS, SECTION_IDS } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolled(24);
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-white/[0.06] bg-void/65 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <Container className="flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-mono text-[0.78rem] tracking-[0.3em] text-foam"
          >
            <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
            SADEED
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9 lg:gap-11">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="nav-link"
                    aria-current={active === link.id ? "location" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center text-foam md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </Container>
      </header>

      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        toggleRef={toggleRef}
        activeId={active}
      />
    </>
  );
}