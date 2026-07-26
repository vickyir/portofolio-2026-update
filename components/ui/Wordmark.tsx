import { site } from "@/content/site";

/**
 * The name lockup with a registered-mark tick. `size="hero"` is the full-bleed version
 * that sits behind the portrait; `size="rail"` is the small sidebar lockup it morphs
 * into (see components/shell/ScrollMorph.tsx).
 */
export function Wordmark({
  size = "rail",
  className = "",
}: {
  size?: "hero" | "rail";
  className?: string;
}) {
  if (size === "hero") {
    return (
      <span
        className={`select-none font-black leading-none tracking-tighter text-accent ${className}`}
        style={{ fontSize: "clamp(5rem, 21vw, 20rem)" }}
      >
        {site.wordmark}
        <span className="align-super text-[0.18em]">®</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex select-none items-start rounded-md bg-accent px-2 py-1 text-body font-black leading-none tracking-tight text-on-accent ${className}`}
    >
      {site.wordmark}
      <span className="text-[0.6em] leading-none">®</span>
    </span>
  );
}
