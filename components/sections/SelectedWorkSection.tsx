"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/content/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The only dark section on the page. On desktop it pins and translates the card rail
 * sideways as you scroll down; off-centre cards dim so the focused one reads first.
 *
 * On touch/small screens and under reduced motion it is a plain `overflow-x-auto`
 * swipe rail with no pinning — pinning hijacks the scroll gesture, and on a phone
 * that reads as the page being broken.
 */
export function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const rail = railRef.current;
      if (!section || !rail) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canPin = window.matchMedia(
        "(min-width: 1024px) and (pointer: fine)",
      ).matches;
      if (reduced || !canPin) return;

      const distance = rail.scrollWidth - rail.clientWidth;
      if (distance <= 0) return;

      const tween = gsap.to(rail, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]", rail);
      const dimmers = cards.map((card) =>
        gsap.to(card, {
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left 15%",
            end: "left left",
            scrub: true,
          },
        }),
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        dimmers.forEach((d) => {
          d.scrollTrigger?.kill();
          d.kill();
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="overflow-hidden bg-bg-dark py-24 text-text-on-dark lg:py-32"
    >
      <Container>
        <h2 className="max-w-3xl text-h1 font-black lg:text-display">
          Built to ship,
          <br />
          made to last.
        </h2>
        <p className="mt-6 max-w-lg text-body-lg text-text-secondary-on-dark">
          A selection of iOS, iPadOS, macOS, and visionOS work — the problem, the role,
          and what actually shipped.
        </p>
      </Container>

      <div
        ref={railRef}
        className="no-scrollbar mt-16 flex gap-6 overflow-x-auto px-4 sm:px-8 lg:overflow-x-visible lg:px-[max(2rem,calc((100vw-64rem)/2))]"
      >
        {projects.map((project, index) => (
          <div
            key={project.slug}
            data-work-card
            className="w-[80vw] shrink-0 sm:w-[22rem]"
          >
            <ProjectCard project={project} index={index} tone="dark" />
          </div>
        ))}
      </div>
    </section>
  );
}
