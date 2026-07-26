// Single source for identity/contact details, used by the sidebar, hero, contact
// section, and footer. "Vicky" is a placeholder name derived from the repo's git
// identity — swap in the real name, handles, stats, and client list before launch
// (docs/PRODUCT.md Open Questions #3).

export const site = {
  name: "Vicky",
  wordmark: "VICKY",
  role: "iOS & visionOS Engineer",
  email: "vickyir300401@gmail.com",
  blurb:
    "Working closely with your team to deliver iOS and visionOS builds that merge craft, technical depth, and long-term value.",
  tagline: ["The spatial engineer.", "That's Vicky."],
  stats: [
    { value: "40+", label: "Projects shipped" },
    { value: "6+", label: "Years of experience" },
  ],
  // Short trait badges shown beside the hero headline.
  traits: ["Considered", "Reliable", "Systems-minded", "Builder", "Precise"],
  // Placeholder client names — the sidebar renders these as a wordmark strip.
  clients: ["AeroSim", "EduOne", "Atlas", "Northwind", "Harbor", "Orbit"],
} as const;

export const navLinks = [
  { href: "#top", label: "Home", id: "top" },
  { href: "#about", label: "About me", id: "about" },
  { href: "#work", label: "Projects", id: "work" },
  { href: "#capabilities", label: "What you get", id: "capabilities" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export const mailtoHref = `mailto:${site.email}?subject=Project inquiry`;
