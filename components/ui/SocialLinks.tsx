// Inline SVGs rather than an icon package — three icons don't justify a dependency
// (see AGENTS.md working agreement). Each link carries an accessible name.

const links = [
  {
    href: "https://github.com/vickyir",
    label: "GitHub profile",
    path: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z",
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn profile",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.06c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.09V21h-4v-5.44c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.42-2.09 2.88V21h-4V9Z",
  },
  {
    href: "https://x.com/",
    label: "X profile",
    path: "M18.9 2H22l-7.1 8.1L23.2 22h-6.5l-5.1-6.7L5.8 22H2.7l7.6-8.7L2 2h6.7l4.6 6.1L18.9 2Zm-1.1 18h1.7L7.4 3.7H5.6L17.8 20Z",
  },
];

export function SocialLinks({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const size = compact ? "h-7 w-7" : "h-11 w-11";
  const icon = compact ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <ul className={`flex items-center gap-1.5 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={`inline-flex items-center justify-center rounded-md bg-text-primary text-bg transition-colors duration-micro ease-standard hover:bg-accent hover:text-on-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary ${size}`}
          >
            <svg viewBox="0 0 24 24" className={icon} fill="currentColor" aria-hidden>
              <path d={link.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
