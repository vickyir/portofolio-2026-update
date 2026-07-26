import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <Wordmark size="rail" />
          <p className="mt-3 font-mono text-caption uppercase tracking-widest text-text-secondary">
            {site.role}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 inline-block text-body text-text-primary underline decoration-text-secondary/40 underline-offset-4 transition-colors duration-micro ease-standard hover:decoration-text-primary"
          >
            {site.email}
          </a>
        </div>
        <SocialLinks />
      </Container>
    </footer>
  );
}
