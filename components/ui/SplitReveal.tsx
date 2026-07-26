"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Word-by-word entrance for the hero headline — the homepage's one signature element
 * per docs/DESIGN-SYSTEM.md's restraint rule. Splits on spaces (not characters) and
 * skips GSAP's paid SplitText plugin entirely — see docs/ARCHITECTURE.md "Using GSAP
 * correctly" for why. Plays once on mount; not scroll-triggered, since the hero is
 * always above the fold.
 */
export function SplitReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      const targets = node.querySelectorAll("[data-word]");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(targets, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.04,
        delay: 0.1,
        ease: "power3.out",
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={index} data-word className="inline-block will-change-transform">
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
