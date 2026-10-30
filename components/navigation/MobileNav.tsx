"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/data/site";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/social";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
  activeId: string | null;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function MobileNav({ open, onClose, toggleRef, activeId }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // scroll lock, Escape to close, simple focus trap (menu toggle + overlay links)
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const getFocusables = () => {
      const inside = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []
      );
      return toggleRef.current ? [toggleRef.current, ...inside] : inside;
    };

    getFocusables()[1]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusables();
      if (items.length === 0) return;
      const first = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
    };
  }, [open, onClose, toggleRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-void/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={onClose}
                    className="flex items-baseline gap-5 border-b border-white/[0.07] py-4"
                    aria-current={activeId === link.id ? "location" : undefined}
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-[2.6rem] leading-none ${
                        activeId === link.id ? "text-foam italic" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="flex gap-8 font-mono text-xs uppercase tracking-[0.2em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="py-3">
              GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="py-3">
              LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}