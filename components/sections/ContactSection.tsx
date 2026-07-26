import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Placeholder } from "@/components/ui/Placeholder";
import { site, mailtoHref } from "@/content/site";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <GlassCard className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <span className="inline-block rounded-full border border-text-primary px-3 py-1 font-mono text-caption font-semibold uppercase tracking-wide">
                Contact
              </span>
              <h2 className="mt-6 max-w-xl text-h1 font-black">
                Let&apos;s build something worth shipping.
              </h2>
              <p className="mt-4 max-w-lg text-body-lg text-text-secondary">
                Open to freelance engagements and full-time roles in iOS and visionOS.
                Tell me what you&apos;re building and where it&apos;s stuck.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href={mailtoHref}>Book a call</Button>
                <Button
                  href="/resume.pdf"
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View résumé
                </Button>
              </div>

              {/* Visible, selectable fallback — mailto: alone isn't enough (F-05 AC-2) */}
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-block text-body text-text-secondary underline decoration-text-secondary/40 underline-offset-4 transition-colors duration-micro ease-standard hover:text-text-primary"
              >
                {site.email}
              </a>
            </div>

            <Placeholder
              aspect="square"
              label="portrait"
              className="rounded-2xl lg:w-56"
            />
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}
