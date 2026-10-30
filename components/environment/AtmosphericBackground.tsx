/**
 * The static, painted layers of the world. Particles (canvas) are passed in
 * as children so they sit between the paint texture and the grain/vignette.
 * Server component: no JS of its own. ParticleField drives three CSS
 * variables (--scroll, --glow, --lift) on .env-root.
 */
export default function AtmosphericBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="env-root" aria-hidden="true">
      <div className="env-blob env-blob-b" />
      <div className="env-blob env-blob-a" />
      <div className="env-band" />
      <div className="env-blob env-blob-c" />
      <div className="env-paint" />
      {children}
      <div className="env-grain" />
      <div className="env-vignette" />
    </div>
  );
}