import type { SocialLink } from "@/types";

export const GITHUB_URL = "https://github.com/sadeedmahamood";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sadeedmahamood/";

/**
 * REPLACE: put your portfolio email here (e.g. "name@example.com").
 * While this is null, the Contact section and Footer show a muted
 * "coming soon" row instead of a link. Nothing else needs changing.
 */
export const EMAIL: string | null = "sadeedmahamood8009@gmail.com";

export const socialLinks: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    handle: EMAIL ?? "Address coming soon",
    href: EMAIL ? `mailto:${EMAIL}` : null,
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "github.com/sadeedmahamood",
    href: GITHUB_URL,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "linkedin.com/in/sadeedmahamood",
    href: LINKEDIN_URL,
    external: true,
  },
];