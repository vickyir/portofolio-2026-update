import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Wordmark } from "@/components/ui/Wordmark";
import { Placeholder } from "@/components/ui/Placeholder";
import { HeroNav } from "@/components/shell/HeroNav";
import { site, mailtoHref } from "@/content/site";

/**
 * Layered composition: giant wordmark on the back plane, portrait cut in front of it,
 * headline and frosted cards on top. The `data-hero-*` attributes are the handles
 * ScrollMorph animates — don't rename them without updating that file.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      data-hero
      className="relative min-h-svh overflow-hidden px-4 pb-16 pt-6 sm:px-8"
    >
      {/* Back plane — oversized wordmark, bleeds off both edges. */}
      <div
        data-hero-wordmark
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-4 flex justify-center overflow-hidden"
      >
        <Wordmark size="hero" />
      </div>

      {/* Mid plane — portrait, sits in front of the wordmark. */}
      <div
        data-hero-portrait
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <Placeholder
          aspect="portrait"
          label="portrait"
          className="h-[70svh] w-auto max-w-none rounded-none bg-transparent"
        />
      </div>

      {/* Front plane */}
      <div className="relative z-10 flex min-h-[calc(100svh-5.5rem)] flex-col">
        <div className="mt-auto">
          <HeroNav />
        </div>

        <div className="mt-8 grid flex-1 items-end gap-8 lg:grid-cols-[auto_1fr_auto]">
          <div className="flex flex-col gap-4">
            {site.stats.map((stat) => (
              <GlassCard key={stat.label} data-hero-float className="w-40 p-4">
                <span className="block text-h1 font-black leading-none text-accent [-webkit-text-stroke:1px_#141414]">
                  {stat.value}
                </span>
                <span className="mt-1 block text-caption font-semibold leading-tight text-text-primary">
                  {stat.label}
                </span>
              </GlassCard>
            ))}
          </div>

          <div className="max-w-2xl">
            <h1 className="text-display font-black text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] lg:text-display-lg">
              Spatial software,
              <br />
              built deliberately.
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={mailtoHref}>Book a call</Button>
              <Button href="#about" variant="outline">
                About me
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <GlassCard data-hero-float className="p-4">
              <ul className="flex flex-col gap-2">
                {site.traits.map((trait) => (
                  <li
                    key={trait}
                    className="flex items-center gap-2 text-caption font-semibold text-text-primary"
                  >
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 shrink-0 rounded-sm bg-accent"
                    />
                    {trait}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <p className="max-w-xs text-caption leading-relaxed text-text-secondary">
              {site.blurb}
            </p>
          </div>
        </div>

        <p className="mt-10 font-mono text-caption uppercase tracking-widest text-text-primary">
          {site.tagline[0]} {site.tagline[1]}
        </p>
      </div>
    </section>
  );
}
