"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy for the sidebar's active highlight. Uses IntersectionObserver rather than
 * a GSAP ScrollTrigger per section — this is a cheap read-only observation, and routing
 * it through the animation library would mean recalculating on every scrub tick.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport that is actually visible,
        // so a tall section doesn't keep the highlight after the next one arrives.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
