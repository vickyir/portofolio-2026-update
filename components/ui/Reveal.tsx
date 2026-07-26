"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scroll-reveal per docs/DESIGN-SYSTEM.md Motion: fades/translates in once, on first
 * viewport entry. `delayMs` lets a parent stagger children (≤80ms apart, per the
 * orchestration rule) by passing an increasing value per child.
 *
 * This is the only sanctioned entry point for scroll-triggered GSAP motion — see
 * docs/ARCHITECTURE.md "Using GSAP correctly". Don't scatter one-off ScrollTrigger
 * calls in other components; wrap them in this instead.
 */
export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(node, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(node, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        delay: delayMs / 1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref, dependencies: [delayMs] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
