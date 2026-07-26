"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The serpentine connector behind the timeline cards. The path is drawn on as you
 * scroll by scrubbing strokeDashoffset; node dots pop in as the line reaches them.
 *
 * Purely decorative — the timeline reads fine without it, so it's aria-hidden and the
 * reduced-motion path just renders the line already complete.
 */
export function TimelineTrack({ nodes }: { nodes: number }) {
  const ref = useRef<SVGSVGElement>(null);

  // One S-curve segment per gap between nodes, alternating direction.
  const segment = 100 / Math.max(nodes - 1, 1);
  let d = "M 50 0";
  for (let i = 1; i < nodes; i += 1) {
    const y = segment * i;
    const prevY = segment * (i - 1);
    const sway = i % 2 === 1 ? 88 : 12;
    d += ` C ${sway} ${prevY + segment * 0.35}, ${sway} ${y - segment * 0.35}, 50 ${y}`;
  }

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;

      const path = svg.querySelector<SVGPathElement>("[data-track-line]");
      const dots = svg.querySelectorAll("[data-track-dot]");
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(path, { strokeDashoffset: 0 });
        gsap.set(dots, { scale: 1, opacity: 1 });
        return;
      }

      gsap.set(path, { strokeDashoffset: length });
      gsap.set(dots, { scale: 0, opacity: 0, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0).to(
        dots,
        { scale: 1, opacity: 1, stagger: 0.5, duration: 0.2 },
        0,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [nodes] },
  );

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
    >
      <path
        data-track-line
        d={d}
        fill="none"
        stroke="#141414"
        strokeWidth="0.35"
        vectorEffect="non-scaling-stroke"
      />
      {Array.from({ length: nodes }).map((_, i) => (
        <circle
          key={i}
          data-track-dot
          cx="50"
          cy={segment * i}
          r="1.1"
          fill="#f8f820"
          stroke="#141414"
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
