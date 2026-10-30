/**
 * Shared description of the "living world".
 * Each section declares data-env="<mode>"; ParticleField eases toward
 * that mode's parameters as the section crosses the middle of the viewport.
 */
export type EnvModeName =
  | "hero"
  | "projects"
  | "skills"
  | "journey"
  | "about"
  | "contact";

export interface EnvMode {
  /** overall speed multiplier */
  speed: number;
  /** strength of the organic flow field (0 = none) */
  flow: number;
  /** constant directional drift, x / y (y negative = upward) */
  bx: number;
  by: number;
  /** opacity of lines between nearby particles (0 = none) */
  link: number;
  linkDist: number;
  /** particle opacity multiplier */
  alpha: number;
  /** atmospheric blue density (CSS --glow) */
  glow: number;
  /** low light rising from below (CSS --lift) */
  lift: number;
}

export const ENV_MODES: Record<EnvModeName, EnvMode> = {
  // loose, spacious, atmospheric
  hero: { speed: 1, flow: 1, bx: 0, by: 0, link: 0, linkDist: 120, alpha: 1, glow: 1, lift: 0 },
  // more structured, directional
  projects: { speed: 0.85, flow: 0.4, bx: 0.85, by: 0, link: 0.09, linkDist: 130, alpha: 0.9, glow: 0.8, lift: 0 },
  // connected
  skills: { speed: 0.7, flow: 0.8, bx: 0, by: 0, link: 0.17, linkDist: 120, alpha: 0.9, glow: 0.85, lift: 0 },
  // route-like
  journey: { speed: 0.8, flow: 0.35, bx: 0.35, by: 0.7, link: 0.06, linkDist: 120, alpha: 0.85, glow: 0.7, lift: 0 },
  // quieter
  about: { speed: 0.4, flow: 0.6, bx: 0, by: 0, link: 0, linkDist: 120, alpha: 0.55, glow: 0.55, lift: 0 },
  // lighter, more open, rising
  contact: { speed: 0.95, flow: 0.5, bx: 0, by: -0.9, link: 0, linkDist: 120, alpha: 1.05, glow: 1.1, lift: 1 },
};

export function isEnvModeName(v: string | undefined): v is EnvModeName {
  return !!v && v in ENV_MODES;
}

/**
 * Tiny mutable store (deliberately NOT React state — the canvas reads it
 * every frame, and updating it must not re-render anything).
 * A hovered project registers its element here; particles respond to it.
 */
export const envStore: { focusEl: HTMLElement | null } = { focusEl: null };