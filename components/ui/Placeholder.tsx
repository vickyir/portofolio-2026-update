const aspects = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  card: "aspect-[4/3]",
  wide: "aspect-[16/9]",
} as const;

/**
 * Geometric stand-in for imagery we don't have yet. Deliberately reads as a placeholder
 * rather than imitating a real screenshot — see docs/PRODUCT.md F-02 edge cases and the
 * `portfolio-section` skill's rule against inventing content-shaped filler.
 */
export function Placeholder({
  aspect = "card",
  label,
  className = "",
}: {
  aspect?: keyof typeof aspects;
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden bg-surface-raised ${aspects[aspect]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-caption uppercase tracking-widest text-text-secondary/50">
          {label ?? "placeholder"}
        </span>
      </div>
    </div>
  );
}
