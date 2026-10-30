"use client";

import { useEffect, useRef } from "react";
import {
  ENV_MODES,
  envStore,
  isEnvModeName,
  type EnvMode,
  type EnvModeName,
} from "@/lib/environment";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** pale, cyan, blue, gold (gold is very rare) */
const TONES = [
  [168, 216, 234],
  [70, 183, 232],
  [35, 139, 184],
  [200, 168, 90],
] as const;
const TONE_CSS = TONES.map(([r, g, b]) => `rgb(${r},${g},${b})`);

const TAU = Math.PI * 2;
const BASE_SPEED = 9; // px / second at speed 1, depth 0.65
const PARALLAX = 0.07; // how much depth shifts with scroll
const MOUSE_RADIUS = 190;
const FOCUS_RADIUS = 260;
const PARAM_KEYS = ["speed", "flow", "bx", "by", "link", "linkDist", "alpha", "glow", "lift"] as const;

interface Particle {
  x: number;
  y: number;
  z: number; // depth 0.1 (far) … 1 (near)
  speed: number;
  kind: 0 | 1 | 2; // 0 crisp pinpoint · 1 soft · 2 out-of-focus bokeh
  tone: 0 | 1 | 2 | 3;
  alpha: number;
  size: number; // radius for kind 0, sprite diameter otherwise
  phase: number;
  twinkle: number;
  ox: number; // cursor / focus displacement
  oy: number;
  push: number; // +1 repelled by cursor, -1 drawn toward it
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const wrapRange = (v: number, min: number, max: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};
const gauss = () => Math.random() + Math.random() + Math.random() + Math.random() - 2;

/** Smooth, slowly-evolving direction field — gives currents instead of random jitter. */
const flowAngle = (x: number, y: number, t: number) =>
  (Math.sin(x * 0.0021 + t * 0.06) +
    Math.cos(y * 0.0029 - t * 0.045) +
    Math.sin((x + y) * 0.0012 + t * 0.03)) *
  1.15;

function makeSprite([r, g, b]: readonly [number, number, number]) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d");
  if (x) {
    const grad = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(0.18, `rgba(${r},${g},${b},0.75)`);
    grad.addColorStop(0.5, `rgba(${r},${g},${b},0.14)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    x.fillStyle = grad;
    x.fillRect(0, 0, 64, 64);
  }
  return c;
}

function createParticles(W: number, H: number, count: number): Particle[] {
  // Loose atmospheric clusters: part of the field gathers, part is scattered.
  const clusters = Array.from({ length: 5 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
  }));
  const spread = Math.min(W, H) * 0.2;
  const list: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const z = 0.1 + Math.pow(Math.random(), 1.5) * 0.9; // more far than near
    let x = Math.random() * W;
    let y = Math.random() * H;
    if (Math.random() < 0.42) {
      const c = clusters[i % clusters.length];
      x = wrapRange(c.x + gauss() * spread, -30, W + 30);
      y = wrapRange(c.y + gauss() * spread * 0.7, -30, H + 30);
    }

    const roll = Math.random();
    const tone: Particle["tone"] = roll < 0.018 ? 3 : roll < 0.33 ? 2 : roll < 0.62 ? 1 : 0;
    const kind: Particle["kind"] = z < 0.45 ? 0 : z < 0.9 ? 1 : 2;

    let size: number;
    let alpha: number;
    if (kind === 0) {
      size = 0.45 + z * 1.2;
      alpha = 0.35 + Math.random() * 0.45;
    } else if (kind === 1) {
      size = 7 + (z - 0.45) * 18;
      alpha = 0.5 + Math.random() * 0.45;
    } else {
      size = 40 + Math.random() * 30;
      alpha = 0.06 + Math.random() * 0.07;
    }

    list.push({
      x,
      y,
      z,
      speed: 0.6 + Math.random() * 0.8,
      kind,
      tone,
      alpha,
      size,
      phase: Math.random() * TAU,
      twinkle: 0.15 + Math.random() * 0.5,
      ox: 0,
      oy: 0,
      push: Math.random() < 0.7 ? 1 : -1,
    });
  }
  return list;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = canvas.closest<HTMLElement>(".env-root");
    const sprites = TONES.map(makeSprite);
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-env]"));

    let W = 0;
    let H = 0;
    let dpr = 1;
    let maxLines = 260;
    let particles: Particle[] = [];
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pa = new Float32Array(0);

    let raf = 0;
    let resizeRaf = 0;
    let last = performance.now();
    let t = 0;

    // --- environment mode (eases toward the section currently in view) ---
    let modeName: EnvModeName = "hero";
    const cur: EnvMode = { ...ENV_MODES.hero };
    const target: EnvMode = { ...ENV_MODES.hero };

    const pickMode = () => {
      const mid = window.innerHeight * 0.5;
      let name: EnvModeName = modeName;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid && isEnvModeName(s.dataset.env)) {
          name = s.dataset.env;
          break;
        }
      }
      if (window.scrollY < 40) name = "hero";
      modeName = name;
      Object.assign(target, ENV_MODES[name]);
    };

    // --- scroll / pointer state ---
    let scrollTarget = window.scrollY;
    let scrollSm = scrollTarget;
    let needPick = false;
    const mouse = { x: -999, y: -999, tx: -999, ty: -999, on: false, act: 0 };
    let focusAmt = 0;
    const focusRect = { left: 0, right: 0, top: 0, bottom: 0 };

    let lastScrollVar = -1;
    let lastGlowVar = -1;
    let lastLiftVar = -1;

    // ---------------------------------------------------------------- render
    const render = (dt: number) => {
      t += dt;

      // ease parameters toward the target mode
      const k = 1 - Math.exp(-dt * 1.4);
      for (const key of PARAM_KEYS) cur[key] += (target[key] - cur[key]) * k;

      scrollSm += (scrollTarget - scrollSm) * (1 - Math.exp(-dt * 8));
      mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 10));
      mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 10));
      mouse.act += ((mouse.on ? 1 : 0) - mouse.act) * (1 - Math.exp(-dt * 4));

      const focusEl = envStore.focusEl;
      focusAmt += ((focusEl ? 1 : 0) - focusAmt) * (1 - Math.exp(-dt * 3));
      if (focusEl) {
        const r = focusEl.getBoundingClientRect();
        focusRect.left = r.left;
        focusRect.right = r.right;
        focusRect.top = r.top;
        focusRect.bottom = r.bottom;
      }

      if (root) {
        if (Math.abs(scrollSm - lastScrollVar) > 0.3) {
          root.style.setProperty("--scroll", scrollSm.toFixed(1));
          lastScrollVar = scrollSm;
        }
        if (Math.abs(cur.glow - lastGlowVar) > 0.004) {
          root.style.setProperty("--glow", cur.glow.toFixed(3));
          lastGlowVar = cur.glow;
        }
        if (Math.abs(cur.lift - lastLiftVar) > 0.004) {
          root.style.setProperty("--lift", cur.lift.toFixed(3));
          lastLiftVar = cur.lift;
        }
      }

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      // very soft light that follows the cursor
      if (mouse.act > 0.02) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        g.addColorStop(0, `rgba(70,183,232,${(0.07 * mouse.act).toFixed(3)})`);
        g.addColorStop(1, "rgba(70,183,232,0)");
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 200, mouse.y - 200, 400, 400);
      }

      ctx.globalCompositeOperation = "lighter";
      const relax = Math.exp(-dt * 1.6);
      const mouseOn = mouse.act > 0.02;
      const R2 = MOUSE_RADIUS * MOUSE_RADIUS;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // organic drift: flow field + the section's directional bias
        const a = flowAngle(p.x, p.y, t);
        const dx = Math.cos(a) * cur.flow + cur.bx;
        const dy = Math.sin(a) * cur.flow + cur.by;
        const sp = BASE_SPEED * p.speed * (0.35 + p.z) * cur.speed;
        p.x = wrapRange(p.x + dx * sp * dt, -30, W + 30);
        p.y = wrapRange(p.y + dy * sp * dt, -30, H + 30);

        // depth parallax on scroll
        const sx = p.x;
        const sy = wrapRange(p.y - scrollSm * PARALLAX * p.z, -30, H + 30);

        let boost = 0;

        if (mouseOn) {
          const mdx = sx - mouse.x;
          const mdy = sy - mouse.y;
          const d2 = mdx * mdx + mdy * mdy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / MOUSE_RADIUS;
            if (p.push > 0) {
              p.ox += (mdx / d) * f * 90 * dt * mouse.act;
              p.oy += (mdy / d) * f * 90 * dt * mouse.act;
            } else if (d > 46) {
              p.ox -= (mdx / d) * f * 40 * dt * mouse.act;
              p.oy -= (mdy / d) * f * 40 * dt * mouse.act;
            }
            boost += f * 0.5 * mouse.act;
          }
        }

        if (focusAmt > 0.01) {
          const cx = clamp(sx, focusRect.left, focusRect.right);
          const cy = clamp(sy, focusRect.top, focusRect.bottom);
          const fdx = sx - cx;
          const fdy = sy - cy;
          const fd = Math.hypot(fdx, fdy);
          if (fd < FOCUS_RADIUS) {
            const f = 1 - fd / FOCUS_RADIUS;
            boost += f * 0.4 * focusAmt;
            if (fd > 6) {
              p.ox -= (fdx / fd) * f * 22 * dt * focusAmt;
              p.oy -= (fdy / fd) * f * 22 * dt * focusAmt;
            }
          }
        }

        p.ox *= relax;
        p.oy *= relax;

        const x = sx + p.ox;
        const y = sy + p.oy;
        const tw = 0.78 + 0.22 * Math.sin(t * p.twinkle + p.phase);
        const al = Math.min(1, p.alpha * tw * cur.alpha + boost * (p.kind === 2 ? 0.15 : 1));

        px[i] = x;
        py[i] = y;
        pa[i] = p.kind === 2 || x < -40 || x > W + 40 || y < -40 || y > H + 40 ? 0 : al;
        if (al <= 0.004) continue;
        if (x < -80 || x > W + 80 || y < -80 || y > H + 80) continue;

        ctx.globalAlpha = al;
        if (p.kind === 0) {
          ctx.fillStyle = TONE_CSS[p.tone];
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, TAU);
          ctx.fill();
        } else {
          ctx.drawImage(sprites[p.tone], x - p.size / 2, y - p.size / 2, p.size, p.size);
        }
      }

      // fine lines between neighbours — only in "connected / structured" modes
      const linkStrength = cur.link + 0.04 * focusAmt;
      if (linkStrength > 0.012) {
        const LD = cur.linkDist;
        const LD2 = LD * LD;
        let lines = 0;
        ctx.strokeStyle = "rgb(70,183,232)";
        ctx.lineWidth = 0.6;
        for (let i = 0; i < particles.length && lines < maxLines; i++) {
          if (pa[i] <= 0) continue;
          for (let j = i + 1; j < particles.length && lines < maxLines; j++) {
            if (pa[j] <= 0) continue;
            const ddx = px[i] - px[j];
            const ddy = py[i] - py[j];
            const d2 = ddx * ddx + ddy * ddy;
            if (d2 > LD2) continue;
            ctx.globalAlpha = linkStrength * (1 - Math.sqrt(d2) / LD) * Math.min(pa[i], pa[j]);
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.stroke();
            lines++;
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    // ---------------------------------------------------------------- sizing
    const resize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      const mobile = nw < 768;
      const widthChanged = nw !== W;
      W = nw;
      H = nh;
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maxLines = mobile ? 90 : 260;

      // Only re-seed when the width changes (mobile URL-bar resizes only change height).
      if (widthChanged || particles.length === 0) {
        const count = mobile
          ? clamp(Math.round((W * H) / 15000), 30, 56)
          : clamp(Math.round((W * H) / 9500), 70, 165);
        particles = createParticles(W, H, count);
        px = new Float32Array(count);
        py = new Float32Array(count);
        pa = new Float32Array(count);
      }
      if (reduced) render(0);
    };

    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };

    // ---------------------------------------------------------------- events
    const onScroll = () => {
      scrollTarget = window.scrollY;
      needPick = true;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!mouse.on) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };

    // ---------------------------------------------------------------- start
    resize();
    pickMode();
    Object.assign(cur, target); // start in the right mode: no jolt on reload mid-page
    window.addEventListener("resize", onResize);

    if (reduced) {
      // One calm, still frame. No loop, no pointer or scroll reactions.
      render(0);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      if (finePointer) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("blur", onLeave);
        document.documentElement.addEventListener("mouseleave", onLeave);
      }
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (needPick) {
          needPick = false;
          pickMode();
        }
        render(dt);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute left-0 top-0" />;
}