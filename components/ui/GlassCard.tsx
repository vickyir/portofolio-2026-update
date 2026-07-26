import type { HTMLAttributes, ReactNode } from "react";

/**
 * Frosted translucent panel — the reference's dominant card treatment. Used by the hero
 * stat cards, trait list, timeline entries, and sidebar blocks.
 *
 * Spreads extra props so callers can attach the `data-*` handles that
 * components/shell/ScrollMorph.tsx animates.
 */
export function GlassCard({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`rounded-2xl border border-white/25 bg-surface shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] backdrop-blur-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
