"use client";

import { useState } from "react";
import { skillEdges, skillGroupLabels, skillPulses, skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import type { Skill, SkillGroup } from "@/types";

/* ---------- derived once, at module level ---------- */
const byId = new Map(skills.map((s) => [s.id, s]));

const neighbors = new Map<string, Set<string>>();
function connect(a: string, b: string) {
  if (!neighbors.has(a)) neighbors.set(a, new Set());
  neighbors.get(a)!.add(b);
}
for (const [a, b] of skillEdges) {
  connect(a, b);
  connect(b, a);
}

/** Gently curved edges so the map feels drawn rather than plotted. */
const edgePaths = skillEdges.map(([a, b], i) => {
  const A = byId.get(a)!;
  const B = byId.get(b)!;
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = len * 0.09 * (i % 2 === 0 ? 1 : -1);
  const cx = (A.x + B.x) / 2 + (-dy / len) * bend;
  const cy = (A.y + B.y) / 2 + (dx / len) * bend;
  return { a, b, d: `M${A.x} ${A.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${B.x} ${B.y}` };
});
const pathFor = (a: string, b: string) =>
  edgePaths.find((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a));

const LABEL = {
  r: { dx: 16, dy: 5, anchor: "start" },
  l: { dx: -16, dy: 5, anchor: "end" },
  t: { dx: 0, dy: -16, anchor: "middle" },
  b: { dx: 0, dy: 28, anchor: "middle" },
} as const;
const NODE_R = { 1: 3, 2: 4, 3: 5.5 } as const;
const GROUPS: SkillGroup[] = ["backend", "data", "frontend", "tools"];

const usedIn = (skill: Skill) =>
  projects.filter((p) => p.stack.includes(skill.label)).map((p) => p.title);

export default function SkillNetwork() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  const related = (id: string) =>
    active !== null && (active === id || neighbors.get(active)?.has(id) === true);
  const edgeActive = (a: string, b: string) => active !== null && (a === active || b === active);

  const activeSkill = active ? byId.get(active) : undefined;
  const activeUsage = activeSkill ? usedIn(activeSkill) : [];

  return (
    <div>
      {/* ---------------- Desktop / tablet: network ---------------- */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 1000 540"
          className="h-auto w-full"
          role="group"
          aria-label="Technology network. Each node is focusable and highlights its connections."
        >
          <g fill="none">
            {edgePaths.map((e) => {
              const on = edgeActive(e.a, e.b);
              return (
                <path
                  key={`${e.a}-${e.b}`}
                  d={e.d}
                  stroke="#46B7E8"
                  strokeWidth={on ? 1.4 : 1}
                  strokeOpacity={active === null ? 0.2 : on ? 0.8 : 0.04}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke-opacity .6s ease, stroke-width .4s ease" }}
                />
              );
            })}
          </g>

          {/* slow travelling light on a few connections */}
          {!reduced &&
            skillPulses.map(([a, b, dur, begin]) => {
              const edge = pathFor(a, b);
              if (!edge) return null;
              // travel from `a` to `b` regardless of how the edge was stored
              const reversed = edge.a !== a;
              const path = reversed ? reverseQuad(edge.d) : edge.d;
              return (
                <circle key={`pulse-${a}-${b}`} r="2" fill="#D9F3FF" opacity={active ? 0.15 : 0.7}>
                  <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
                </circle>
              );
            })}

          {skills.map((s) => {
            const on = related(s.id);
            const isActive = active === s.id;
            const lab = LABEL[s.side];
            const r = NODE_R[s.weight];
            const dimmed = active !== null && !on;
            const base = s.tier === "core" ? 0.92 : 0.6;
            return (
              <g
                key={s.id}
                transform={`translate(${s.x} ${s.y})`}
                tabIndex={0}
                role="img"
                aria-label={`${s.label}. ${s.note} Connected to ${
                  [...(neighbors.get(s.id) ?? [])].map((n) => byId.get(n)?.label).join(", ") ||
                  "nothing else"
                }.`}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
                style={{
                  cursor: "default",
                  outline: "none",
                  opacity: dimmed ? 0.22 : base,
                  transition: "opacity .5s ease",
                }}
              >
                <circle r="24" fill="transparent" />
                <circle
                  r={r + 6}
                  fill="none"
                  stroke={isActive ? "#D9F3FF" : "#A8D8EA"}
                  strokeOpacity={isActive ? 0.9 : on ? 0.5 : 0.22}
                  strokeDasharray={s.tier === "ecosystem" ? "2 3" : undefined}
                  style={{ transition: "stroke-opacity .4s ease" }}
                />
                <circle r={r} fill={on ? "#D9F3FF" : "#A8D8EA"} style={{ transition: "fill .4s ease" }} />
                <text
                  x={lab.dx}
                  y={lab.dy}
                  textAnchor={lab.anchor}
                  fontSize="15"
                  fill={on ? "#D9F3FF" : "#E8F2F6"}
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    transition: "fill .4s ease",
                  }}
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ---------------- Mobile: simplified grouped map ---------------- */}
      <div className="md:hidden">
        <div className="space-y-9">
          {GROUPS.map((group) => (
            <div key={group} className="border-l border-signal/25 pl-5">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-dim">
                {skillGroupLabels[group]}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {skills
                  .filter((s) => s.group === group)
                  .map((s) => {
                    const on = related(s.id);
                    const dimmed = active !== null && !on;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          aria-pressed={active === s.id}
                          onClick={() => setActive(active === s.id ? null : s.id)}
                          className={cn(
                            "min-h-11 border px-3.5 text-sm transition-all duration-300",
                            s.tier === "ecosystem" && "border-dashed",
                            on
                              ? "border-mist/70 text-foam"
                              : "border-white/15 text-ink/90",
                            dimmed && "opacity-35"
                          )}
                        >
                          {s.label}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Shared info line ---------------- */}
      <div className="mt-10 min-h-[4.5rem] border-t border-white/[0.1] pt-5" aria-live="polite">
        {activeSkill ? (
          <>
            <p className="text-[15px] text-foam">
              {activeSkill.label}
              <span className="text-muted"> — {activeSkill.note}</span>
            </p>
            {activeUsage.length > 0 && (
              <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                Used in: {activeUsage.join(" · ")}
              </p>
            )}
          </>
        ) : (
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
            <span className="hidden md:inline">Hover or focus a node</span>
            <span className="md:hidden">Tap a technology</span>
            <span className="mx-3 text-dim/60">·</span>
            Dashed outline = part of the NEXORA CRM stack
          </p>
        )}
      </div>
    </div>
  );
}

/** Reverse a "M x y Q cx cy x2 y2" path so a pulse can travel the other way. */
function reverseQuad(d: string): string {
  const m = d.match(/M([\d.]+) ([\d.]+) Q([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)/);
  if (!m) return d;
  const [, x1, y1, cx, cy, x2, y2] = m;
  return `M${x2} ${y2} Q${cx} ${cy} ${x1} ${y1}`;
}