import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { DragScroller } from "@/components/ui/DragScroller";
import { capabilities } from "@/content/capabilities";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 lg:py-32">
      <Container>
        <span className="inline-block rounded-full border border-text-primary px-3 py-1 font-mono text-caption font-semibold uppercase tracking-wide">
          Capabilities
        </span>
        <h2 className="mt-6 max-w-3xl text-h1 font-black lg:text-display">
          What you get
        </h2>
        <p className="mt-6 max-w-lg text-body-lg text-text-secondary">
          Strategy, precision, and engineering — combined into work you can ship.
        </p>
      </Container>

      <Container className="mt-14">
        <DragScroller label="Drag">
          {capabilities.map((capability) => (
            <GlassCard
              key={capability.title}
              className="flex w-[80vw] shrink-0 snap-start flex-col p-8 sm:w-[22rem]"
            >
              <h3 className="text-h3 font-bold">{capability.title}</h3>
              <p className="mt-3 flex-1 text-body text-text-secondary">
                {capability.body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {capability.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </DragScroller>
      </Container>
    </section>
  );
}
