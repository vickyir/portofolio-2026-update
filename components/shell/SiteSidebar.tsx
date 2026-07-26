"use client";

import { useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { GlassCard } from "@/components/ui/GlassCard";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { site, navLinks, mailtoHref } from "@/content/site";
import { useActiveSection } from "@/components/shell/useActiveSection";

const sectionIds = navLinks.map((link) => link.id);

export function SiteSidebar() {
  const active = useActiveSection(sectionIds);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the address is still visible as text.
      setCopied(false);
    }
  }

  return (
    <aside
      // Hidden below lg: the rail is a desktop affordance. Small screens keep the
      // in-flow hero nav instead (components/shell/HeroNav.tsx).
      data-sidebar
      className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col gap-3 overflow-y-auto p-4 lg:flex"
    >
      <GlassCard className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Wordmark size="rail" />
          <SocialLinks compact />
        </div>
        <p className="mt-3 text-caption leading-relaxed text-text-secondary">
          {site.blurb}
        </p>
      </GlassCard>

      <GlassCard className="flex gap-4 p-4">
        {site.stats.map((stat) => (
          <div key={stat.label} className="flex-1">
            <span className="block text-h3 font-black leading-none text-accent [-webkit-text-stroke:0.5px_#141414]">
              {stat.value}
            </span>
            <span className="mt-1 block text-[0.6875rem] font-medium leading-tight text-text-primary">
              {stat.label}
            </span>
          </div>
        ))}
      </GlassCard>

      <GlassCard className="p-3">
        <nav aria-label="Sections">
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`inline-flex rounded-md px-2.5 py-1.5 font-mono text-caption font-semibold uppercase tracking-wide transition-colors duration-micro ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary ${
                      isActive
                        ? "bg-accent text-on-accent"
                        : "bg-white/35 text-text-primary hover:bg-white/60"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </GlassCard>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1 opacity-70">
        {site.clients.map((client) => (
          <span
            key={client}
            className="font-mono text-[0.625rem] font-semibold uppercase tracking-wide text-text-primary"
          >
            {client}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <GlassCard className="flex items-center justify-between gap-2 px-3 py-2">
          <span className="truncate text-caption text-text-secondary">
            {site.email}
          </span>
          <button
            type="button"
            onClick={copyEmail}
            className="shrink-0 rounded p-1 text-text-primary transition-colors duration-micro ease-standard hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          >
            <span className="sr-only">Copy email address</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z" />
            </svg>
          </button>
        </GlassCard>
        <span aria-live="polite" className="sr-only">
          {copied ? "Email address copied" : ""}
        </span>

        <a
          href={mailtoHref}
          className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-3 font-semibold text-on-accent transition-transform duration-micro ease-standard hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
        >
          Book a call
        </a>
      </div>
    </aside>
  );
}
