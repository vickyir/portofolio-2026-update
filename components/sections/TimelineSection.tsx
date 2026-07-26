import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Placeholder } from "@/components/ui/Placeholder";
import { TimelineTrack } from "@/components/sections/TimelineTrack";
import { timeline } from "@/content/timeline";

export function TimelineSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <Container>
        <span className="inline-block rounded-full border border-text-primary px-3 py-1 font-mono text-caption font-semibold uppercase tracking-wide">
          Start small, grow big
        </span>
        <h2 className="mt-6 max-w-3xl text-h1 font-black lg:text-display">
          About me (&amp;)
          <br />
          my journey
        </h2>
        <p className="mt-6 max-w-md text-body-lg text-text-secondary">
          Six years ago I opened Xcode for the first time. What happened after that is
          easier to show than explain.
        </p>

        <div className="relative mt-20">
          <TimelineTrack nodes={timeline.length} />

          <ol className="flex flex-col gap-12 lg:gap-20">
            {timeline.map((milestone, index) => {
              const isRight = index % 2 === 1;
              return (
                <li
                  key={milestone.year}
                  className={`lg:flex ${isRight ? "lg:justify-end" : "lg:justify-start"}`}
                >
                  <Reveal delayMs={Math.min(index, 4) * 60} className="lg:w-[46%]">
                    <GlassCard className="p-6">
                      <span className="block text-h1 font-black leading-none text-accent [-webkit-text-stroke:1.5px_#141414]">
                        &apos;{milestone.year.slice(2)}
                      </span>
                      <h3 className="mt-4 text-h3 font-bold">{milestone.title}</h3>
                      <p className="mt-3 text-body text-text-secondary">
                        {milestone.body}
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <Placeholder
                          aspect="square"
                          label=""
                          className="h-10 w-10 shrink-0 rounded-full"
                        />
                        <span className="font-mono text-caption text-text-secondary">
                          {milestone.year}
                        </span>
                      </div>
                    </GlassCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
