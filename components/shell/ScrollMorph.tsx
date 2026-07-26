"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The signature interaction: as the hero scrolls away, its horizontal nav row breaks
 * into a staggered diagonal cascade while the fixed left rail fades in, the wordmark
 * scales down, and the portrait blurs out.
 *
 * This is a cross-animation, NOT a true FLIP — GSAP's Flip plugin is a paid Club plugin
 * (docs/ARCHITECTURE.md "Using GSAP correctly"). The hero nav and the sidebar nav are
 * two separate DOM trees; we animate one out and the other in on a shared scrubbed
 * timeline so mid-scroll it reads as one continuous movement.
 *
 * Renders nothing — it only orchestrates elements the sections already render, matched
 * by data attribute. Mounted once from app/page.tsx.
 */
export function ScrollMorph() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const hero = document.querySelector("[data-hero]");
    const sidebar = document.querySelector("[data-sidebar]");
    if (!hero || !sidebar) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The rail only exists at lg+ (it's display:none below), so the morph would be
    // animating an invisible element on mobile.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (reduced || !isDesktop) {
      gsap.set(sidebar, { opacity: 1, x: 0 });
      return;
    }

    const heroNavItems = hero.querySelectorAll("[data-hero-nav-item]");
    const heroFloat = hero.querySelectorAll("[data-hero-float]");
    const wordmark = hero.querySelector("[data-hero-wordmark]");
    const portrait = hero.querySelector("[data-hero-portrait]");

    gsap.set(sidebar, { opacity: 0, x: -24 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom 30%",
        scrub: 0.6,
      },
    });

    // Nav items leave one at a time — this stagger is what produces the diagonal
    // cascade in the reference, rather than the row moving as a block.
    tl.to(
      heroNavItems,
      { x: -80, y: 40, opacity: 0, stagger: 0.06, ease: "power2.in" },
      0,
    )
      .to(heroFloat, { x: -60, scale: 0.7, opacity: 0, stagger: 0.05 }, 0.05)
      .to(wordmark, { scale: 0.24, xPercent: -18, yPercent: -34, opacity: 0 }, 0)
      .to(portrait, { filter: "blur(18px)", opacity: 0.35, scale: 1.06 }, 0)
      .to(sidebar, { opacity: 1, x: 0, ease: "power2.out" }, 0.35);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope });

  return <div ref={scope} aria-hidden className="hidden" />;
}
