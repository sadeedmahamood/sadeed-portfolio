// export interface SocialLink {
//   id: "email" | "github" | "linkedin";
//   label: string;
//   /** What is shown to the visitor. */
//   handle: string;
//   /** null = not available yet (renders as a muted, non-clickable row). */
//   href: string | null;
//   external: boolean;
// }

// export interface ProjectMeta {
//   label: string;
//   value: string;
//   tone?: "building" | "done";
// }

// export interface Project {
//   id: string;
//   index: string;
//   title: string;
//   tagline: string;
//   description: string;
//   stack: string[];
//   meta: ProjectMeta[];
//   highlights: string[];
//   /** Fill in only when the real URL exists. null hides the link. */
//   github: string | null;
//   live: string | null;
//   /** Optional screenshot, e.g. { src: "/projects/nexora.png", alt: "..." } */
//   image?: { src: string; alt: string };
// }

// export type SkillGroup = "backend" | "data" | "frontend" | "tools";

// export interface Skill {
//   id: string;
//   label: string;
//   group: SkillGroup;
//   tier: "core" | "ecosystem";
//   weight: 1 | 2 | 3;
//   /** Position inside the 1000 × 540 network viewBox. */
//   x: number;
//   y: number;
//   side: "r" | "l" | "t" | "b";
//   note: string;
// }

// export interface JourneyStep {
//   id: string;
//   marker: string;
//   title: string;
//   description: string;
//   tone?: "default" | "now";
// }



export interface SocialLink {
  id: "email" | "github" | "linkedin";
  label: string;
  /** What is shown to the visitor. */
  handle: string;
  /** null = not available yet (renders as a muted, non-clickable row). */
  href: string | null;
  external: boolean;
}

export interface ProjectMeta {
  label: string;
  value: string;
  tone?: "building" | "done";
}

export interface ProjectMedia {
  type: "video" | "image";
  /** File in /public/projects, e.g. "/projects/nexora-dashboard.mp4" */
  src: string;
  /** Videos only: still frame shown before playback. */
  poster?: string;
  alt: string;
  /** Short caption shown in the frame's top bar, e.g. "Dashboard". */
  label?: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  meta: ProjectMeta[];
  highlights: string[];
  /** Fill in only when the real URL exists. null hides the link. */
  github: string | null;
  live: string | null;
  /** First item shows by default. The rest appear when Highlights is opened. */
  media?: ProjectMedia[];
}

export type SkillGroup = "backend" | "data" | "frontend" | "tools";

export interface Skill {
  id: string;
  label: string;
  group: SkillGroup;
  tier: "core" | "ecosystem";
  weight: 1 | 2 | 3;
  /** Position inside the 1000 × 540 network viewBox. */
  x: number;
  y: number;
  side: "r" | "l" | "t" | "b";
  note: string;
}

export interface JourneyStep {
  id: string;
  marker: string;
  title: string;
  description: string;
  tone?: "default" | "now";
}