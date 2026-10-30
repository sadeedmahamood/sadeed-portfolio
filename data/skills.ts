import type { Skill, SkillGroup } from "@/types";

export const skillGroupLabels: Record<SkillGroup, string> = {
  backend: "Backend",
  data: "Data",
  frontend: "Frontend",
  tools: "Tooling",
};

/**
 * `ecosystem` tier = technologies that appear in the NEXORA CRM stack but
 * are not part of the core list. They are drawn dimmer on purpose.
 * Positions are for the 1000 × 540 desktop network.
 */
export const skills: Skill[] = [
  { id: "python", label: "Python", group: "backend", tier: "core", weight: 3, x: 110, y: 215, side: "b", note: "Primary language." },
  { id: "django", label: "Django", group: "backend", tier: "core", weight: 3, x: 300, y: 215, side: "b", note: "Backend framework: models, ORM, auth and admin." },
  { id: "drf", label: "DRF", group: "backend", tier: "core", weight: 2, x: 470, y: 120, side: "t", note: "Django REST Framework: serializers, viewsets and permissions for APIs." },
  { id: "rest-apis", label: "REST APIs", group: "backend", tier: "core", weight: 2, x: 640, y: 215, side: "b", note: "Designing and consuming JSON APIs." },
  { id: "jwt", label: "JWT", group: "backend", tier: "core", weight: 1, x: 480, y: 330, side: "r", note: "Token-based authentication for APIs." },
  { id: "celery", label: "Celery", group: "backend", tier: "ecosystem", weight: 1, x: 300, y: 70, side: "r", note: "Background task queue." },
  { id: "redis", label: "Redis", group: "backend", tier: "ecosystem", weight: 1, x: 130, y: 85, side: "t", note: "In-memory data store." },

  { id: "postgresql", label: "PostgreSQL", group: "data", tier: "core", weight: 2, x: 300, y: 385, side: "b", note: "Relational database." },
  { id: "mysql", label: "MySQL", group: "data", tier: "core", weight: 1, x: 95, y: 395, side: "b", note: "Relational database." },
  { id: "sql", label: "SQL", group: "data", tier: "core", weight: 1, x: 195, y: 470, side: "r", note: "Querying and modelling relational data." },

  { id: "react", label: "React", group: "frontend", tier: "core", weight: 3, x: 800, y: 215, side: "b", note: "Component-based UI library." },
  { id: "javascript", label: "JavaScript", group: "frontend", tier: "core", weight: 2, x: 925, y: 330, side: "l", note: "Language of the browser." },
  { id: "typescript", label: "TypeScript", group: "frontend", tier: "core", weight: 1, x: 780, y: 385, side: "b", note: "Typed JavaScript." },
  { id: "tailwind", label: "Tailwind CSS", group: "frontend", tier: "core", weight: 1, x: 810, y: 70, side: "t", note: "Utility-first CSS framework." },
  { id: "vite", label: "Vite", group: "frontend", tier: "ecosystem", weight: 1, x: 945, y: 150, side: "t", note: "Frontend build tooling." },

  { id: "git", label: "Git", group: "tools", tier: "core", weight: 1, x: 520, y: 470, side: "b", note: "Version control." },
  { id: "github", label: "GitHub", group: "tools", tier: "core", weight: 1, x: 690, y: 470, side: "b", note: "Code hosting and collaboration." },
];

export const skillEdges: [string, string][] = [
  ["python", "django"],
  ["django", "drf"],
  ["drf", "rest-apis"],
  ["drf", "jwt"],
  ["django", "postgresql"],
  ["django", "mysql"],
  ["postgresql", "sql"],
  ["mysql", "sql"],
  ["django", "celery"],
  ["celery", "redis"],
  ["rest-apis", "react"],
  ["react", "javascript"],
  ["javascript", "typescript"],
  ["react", "typescript"],
  ["react", "tailwind"],
  ["react", "vite"],
  ["git", "github"],
];

/** Edges that carry a slow travelling light on desktop: [from, to, duration, delay] */
export const skillPulses: [string, string, string, string][] = [
  ["python", "django", "7s", "0s"],
  ["django", "drf", "8s", "2s"],
  ["react", "javascript", "9s", "1s"],
  ["django", "postgresql", "10s", "3.5s"],
];