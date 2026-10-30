export const SITE = {
  name: "Sadeed Mahamood",
  fullName: "Sadeed Mahamood T.",
  role: "Python & Django Developer",
  tagline:
    "I build practical web applications, backend systems, and APIs with Python, Django, and modern web technologies.",
  description:
    "Portfolio of Sadeed Mahamood T., a Python and Django developer building web applications, backend systems and REST APIs with Django REST Framework, PostgreSQL and React.",
  heroStack: ["Python", "Django", "DRF", "PostgreSQL", "React"],
} as const;

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

/** "top" is the hero; it is tracked but not shown in the nav. */
export const SECTION_IDS: string[] = ["top", ...NAV_LINKS.map((l) => l.id)];