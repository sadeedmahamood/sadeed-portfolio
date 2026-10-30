import type { JourneyStep } from "@/types";

/** Only milestones that are actually known. Add more here as they happen. */
export const journey: JourneyStep[] = [
  {
    id: "bca-start",
    marker: "2022",
    title: "BCA begins",
    description: "Started a Bachelor of Computer Applications.",
  },
  {
    id: "bca-end",
    marker: "2025",
    title: "BCA completed",
    description: "Finished the degree and moved fully into building software.",
  },
  {
    id: "fullstack",
    marker: "2025 – 2026",
    title: "Python, Django & full-stack development",
    description:
      "Focused on Django and DRF on the backend, React on the frontend, and the structure that holds them together.",
  },
  {
    id: "scheduler",
    marker: "2026",
    title: "Placement Interview Scheduler",
    description:
      "A scheduling system with a real domain model, large generated datasets and replanning logic.",
  },
  {
    id: "nexora",
    marker: "2026",
    title: "NEXORA CRM",
    description:
      "A multi-tenant CRM designed as a modular monolith with organization-level data isolation.",
  },
  {
    id: "now",
    marker: "NOW",
    title: "Building forward",
    description: "Continuing to build, learn and refine.",
    tone: "now",
  },
];