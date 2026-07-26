import { navLinks } from "@/content/site";

/**
 * The hero's horizontal nav, split left/right around the portrait. Animates out into
 * the sidebar rail on scroll — see components/shell/ScrollMorph.tsx, which matches the
 * items by the `data-hero-nav-item` attribute.
 */
export function HeroNav() {
  const left = navLinks.slice(0, 3);
  const right = navLinks.slice(3);

  return (
    <nav
      aria-label="Sections"
      className="flex items-center justify-between gap-6 text-caption font-semibold uppercase tracking-wide"
    >
      <ul className="flex items-center gap-4 sm:gap-6">
        {left.map((link) => (
          <li key={link.id} data-hero-nav-item>
            <a
              href={link.href}
              className="transition-colors duration-micro ease-standard hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <ul className="hidden items-center gap-4 sm:flex sm:gap-6">
        {right.map((link) => (
          <li key={link.id} data-hero-nav-item>
            <a
              href={link.href}
              className="transition-colors duration-micro ease-standard hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
