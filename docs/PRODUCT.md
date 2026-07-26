# Product — Vicky — Portfolio

<!--
  Purpose: give the agent enough product understanding to make correct judgment calls on
  the details you forgot to specify — which is most of them.

  This is not a marketing doc and not a full PRD. Cut anything that doesn't change a code
  decision. Roadmap slides, competitor analysis, and revenue targets belong elsewhere.

  Target: under 400 lines. Loaded when the agent touches user-facing behavior.
-->

**Status:** Draft · **Owner:** vickyir · **Updated:** 2026-07-27

## What this is

A personal portfolio for a freelance iOS/visionOS engineer. It has to do two jobs at
once: read as a fast, credible skill signal to a recruiter skimming for five minutes, and
read as a persuasive case for hiring a contractor to someone evaluating a project fit.
One site, two reading modes — not two separate sites.

## Who uses it

<!--
  Personas matter here for one specific reason: they set the defaults for every
  unspecified decision. "Certified instructors in a training bay" implies dense
  information display and keyboard shortcuts. "First-time consumer on mobile" implies
  the opposite. Give the agent enough to infer correctly.
-->

| User | Context of use | What they need | What breaks their trust |
|---|---|---|---|
| Recruiter / hiring manager | Skimming 20+ candidate links in a sitting, often on a laptop between meetings, 30–60 seconds before deciding to go deeper | A hero that states the role/specialty immediately, scannable project outcomes, a resume/CV they can grab without hunting | Vague buzzword copy ("passionate full-stack ninja"), no evidence of shipped, real work; a resume link that's broken or a download instead of viewable |
| Freelance / startup client | Referred or found via search, evaluating for a specific project, often on mobile first | Evidence of relevant domain experience (iOS/visionOS specifically), a clear sense of how engagements work, a low-friction way to start a conversation | A portfolio that reads like a template with someone else's photos swapped in; no visible way to actually get in touch |

## Scope

**In scope**
- Sticky site nav (anchor links + "Book a call" CTA) and footer, on every page.
- Single-page home: Hero (with stats), About timeline, Selected Work, Capabilities,
  Contact.
- Nine case studies with dedicated detail pages, driven by `content/projects.ts`.
- Warm greige theme with one inverted (dark) Selected Work section. No toggle.
- Persistent left sidebar on desktop that the hero morphs into on scroll.
- Fully responsive (375px–1440px+) and keyboard/screen-reader accessible.
- Downloadable/viewable resume.

**Explicitly out of scope** — and why, because "why" prevents helpful re-addition
- **CMS or admin panel.** One person edits three case studies a few times a year;
  `content/projects.ts` in git is faster to change and has zero moving parts to maintain.
- **Multi-language / i18n.** English only for v1 — the target audience (international
  recruiters and clients) reads English, and i18n infrastructure isn't earned at this
  scale.
- **Authentication.** Nothing here is user-specific or gated.
- **Backend contact form.** A `mailto:` link and a resume link cover the need; a form
  needs a backend, spam handling, and a delivery guarantee this project doesn't warrant.
- **Analytics dashboard.** Whether to add lightweight, privacy-friendly analytics (or
  none) is an open question below — but building a dashboard is out regardless of that
  answer; Vercel/hosted analytics is the ceiling.
- **Testimonials / social proof section.** Considered and cut when the layout was
  restructured (2026-07-27). Placeholder testimonials attributed to invented people
  would be straightforwardly deceptive to a real visitor, and there are no real quotes
  collected yet. Add the section only alongside real, attributable quotes.
- **FAQ section.** Cut in the same pass — nothing to put in it that the Capabilities
  section doesn't already answer.
- **Published pricing / service tiers.** The reference layout has them; deliberately not
  adopted. What to charge and whether to publish it is a business decision, not a layout
  one.
- **Any second theme.** One palette, no toggle, no `prefers-color-scheme` branching.
  The design depends on translucent surfaces over a specific ground colour, so a second
  theme is not a token swap — it's a redesign.

<!--
  This "explicitly out" list is the highest-value section for agents. Without it, a
  well-meaning agent adds offline caching, a retry queue, and a signup screen, and you
  discover it in review.
-->

## Glossary

<!--
  Ubiquitous language. Every term here must appear verbatim in code — types, functions,
  API fields, test names. When product language and code language drift apart, every
  future conversation needs a translation step and the agent guesses wrong at the seam.

  Include the near-misses. "Session vs Exercise" is exactly the distinction an agent will
  get wrong if you don't write it down.
-->

| Term | Means | Does NOT mean | In code |
|---|---|---|---|
| Case study | The full detail page for one project (`/work/[slug]`) — problem, role, stack, outcome | A project card (see below) | `Project` (type), rendered by `app/work/[slug]/page.tsx` |
| Project card | The Selected Work grid preview: image, title, one-line summary, link into the case study | The case study itself | `<ProjectCard>` |
| Feature (in this doc) | A piece of the *site's own* functionality (Hero, Contact, …) — see F-01..F-05 below | A client project like AeroSim (that's a "case study") | Section header `F-0x` below |
| Section | One vertical block of the homepage (`components/sections/*`) | A route/page | `components/sections/<Name>Section.tsx` |
| Engagement | One client project/contract in the "Selected Engagements" case study | A "Feature" of this site | `Project['type'] === 'engagement'` |

## Features

<!--
  One block per feature. Acceptance criteria in Given/When/Then, because that format maps
  1:1 onto test cases and leaves no room for "well, I assumed…".
  Keep only active and near-term features here; archive shipped detail into git history.
-->

### F-01 · Hero

**Status:** Planned
**Why it exists:** A recruiter or client decides in seconds whether to keep reading —
the hero has to state who this is and what they do without scrolling.

**Behavior**
- Full-viewport-height (not more) section: name, one-line role/specialty statement,
  the single `text-display` signature headline treatment (see `docs/DESIGN-SYSTEM.md`),
  and a scroll cue into Selected Work.
- No hero image/illustration — typography is the signature element here, per the
  restraint rule.

**Acceptance criteria**
- **AC-1** — Given a first-time visitor, when the page loads, then the role/specialty
  statement is visible without scrolling on a 375px-wide viewport.
- **AC-2** — Given `prefers-reduced-motion: reduce`, when the page loads, then the hero
  renders in its final state with no entrance animation.

**Edge cases and what we do**
| Case | Behavior |
|---|---|
| JavaScript disabled | Hero still renders fully (Server Component, no client JS required for content) |
| Very narrow viewport (<375px) | Headline wraps, never truncates or overflows horizontally |

**Not doing (yet)**
- Animated/video background.

---

### F-02 · Selected Work

**Status:** Planned
**Why it exists:** This is the actual evidence — recruiters and clients both come here to
judge real work, not claims about it.

**Behavior**
- Grid/list of exactly the three case studies (AeroSim, EduOne, Selected Engagements),
  each a `<ProjectCard>` linking to `/work/[slug]`.
- Card shows: project image, title, one-line summary, stack tags.

**Acceptance criteria**
- **AC-1** — Given the Selected Work section, when it renders, then all three cards from
  `content/projects.ts` appear, in the order defined there.
- **AC-2** — Given a project entry with no image, when the card renders, then a neutral
  placeholder fills the space — the layout never breaks or collapses.

**Edge cases and what we do**
| Case | Behavior |
|---|---|
| Project image fails to load | `next/image` fallback / neutral placeholder, no broken-image icon |
| A 4th project is added later | Grid layout must accommodate N cards without a redesign — don't hardcode a 3-column assumption tied to "exactly 3" |

**Not doing (yet)**
- Filtering/sorting by tech stack.

---

### F-03 · Case Study Detail

**Status:** Planned
**Why it exists:** This is where the persuasion actually happens — role, problem, and
outcome, specific enough to be credible.

**Behavior**
- Route `app/work/[slug]/page.tsx`, one shared layout driven entirely by the matching
  `Project` entry in `content/projects.ts` — no per-project custom page.
- Sections within the page: problem/context, role & stack, what shipped, outcome.

**Acceptance criteria**
- **AC-1** — Given a valid slug (`aerosim`, `eduone`, `selected-engagements`), when
  visited directly (deep link), then the full case study renders — not just via
  client-side navigation from the home page.
- **AC-2** — Given an unknown slug, when visited, then a proper 404 (`notFound()`) is
  shown, not a blank or crashed page.

**Edge cases and what we do**
| Case | Behavior |
|---|---|
| Unknown/mistyped slug | `notFound()` → Next.js 404 page |
| Case study under NDA (no specific client name) | Content is written generically at the data level (`content/projects.ts`), not faked with a placeholder visible to visitors |

**Not doing (yet)**
- Comments, related-projects recommendations.

---

### F-04 · About

**Status:** Planned
**Why it exists:** Recruiters and clients both look for the person behind the work —
background, how they work, why iOS/visionOS.

**Behavior**
- Short bio (a few paragraphs, not a full resume dump — the resume covers that).
- Link/button to view or download the resume PDF.

**Acceptance criteria**
- **AC-1** — Given the About section, when the resume link is activated, then the PDF
  opens/downloads without a broken link.

**Edge cases and what we do**
| Case | Behavior |
|---|---|
| Resume file missing at build/deploy | Build should fail loudly, not ship a dead link — treat this like any other broken asset |

**Not doing (yet)**
- Embedded resume viewer (a plain link/download is enough).

---

### F-05 · Contact

**Status:** Planned
**Why it exists:** The entire point of the site is to generate a conversation — if this
is hard to find or use, everything above it was wasted.

**Behavior**
- `mailto:` link with a pre-filled subject line, plus visible email address as text
  (so it's copyable even where `mailto:` isn't configured).
- Optional: links to LinkedIn/GitHub.

**Acceptance criteria**
- **AC-1** — Given the Contact section, when the primary CTA is activated, then the
  visitor's default mail client opens with the address pre-filled.
- **AC-2** — Given a visitor without a configured mail client, when they view Contact,
  then the email address is still visible as selectable text — the CTA is not the only
  way to get the address.

**Edge cases and what we do**
| Case | Behavior |
|---|---|
| No default mail client configured (common on desktop) | Visible email text is the fallback — never rely on `mailto:` alone |

**Not doing (yet)**
- Contact form, scheduling widget.

## Non-functional requirements

<!--
  Numbers, not adjectives. "Fast" is unactionable; "p95 under 200ms" changes the design.
  Only list constraints that actually bind — a wish list here is noise.
-->

| Dimension | Requirement | Why |
|---|---|---|
| Performance | Lighthouse Performance ≥ 95, LCP < 2.5s, CLS < 0.1 (mobile, throttled 4G) | A slow portfolio is a worse signal than a plain one — this is a site about engineering quality |
| Accessibility | Lighthouse Accessibility ≥ 95, WCAG 2.2 AA, full keyboard operability, visible focus states | Non-negotiable floor per the design brief, not a nice-to-have |
| SEO | Lighthouse SEO ≥ 95, correct meta/OG tags per page, one crawlable sitemap | Recruiters/clients often arrive via search or a shared link preview |
| Motion | `prefers-reduced-motion: reduce` fully respected (no reveal delay, no forced transitions) | Accessibility requirement, see `docs/DESIGN-SYSTEM.md` |
| Availability | Standard Vercel SLA, no custom uptime target | Static site, no backend to fail |
| Privacy | No trainee/client PII collected; no tracking beyond an explicitly chosen privacy-friendly analytics tool (see Open questions) | Nothing here requires collecting visitor data |

## Decisions already made

<!--
  The things you're tired of re-explaining. Point at the ADR for the reasoning; keep the
  one-liner here so the agent doesn't need to open it just to know the rule exists.
-->

| Decision | Rule | Detail |
|---|---|---|
| Framework | Next.js 15 App Router, TypeScript, Tailwind, deployed to Vercel | `adr/ADR-0001-nextjs-tailwind-vercel.md` |
| Case study content | Structured TypeScript data (`content/projects.ts`), not MDX or a CMS | Keeps every case study visually consistent; see `docs/ARCHITECTURE.md` |
| Theme | **Warm greige + yellow accent**, one dark section. Tokens in `docs/DESIGN-SYSTEM.md`, sampled from reference frames | ⚠️ Changed three times on 2026-07-27 (light+dark → dark-only → greige). **Worth freezing** — each change is a full pass over `globals.css` and every section |
| Layout | Fixed left sidebar (desktop) + offset content; hero morphs into the rail on scroll | Layout and interaction patterns follow a reference site; all copy and assets are original |
| Motion | GSAP-driven: hero→sidebar morph, pinned horizontal work rail, timeline draw-on, drag rail | See `docs/DESIGN-SYSTEM.md` → The scroll-driven set |

## Open questions

<!-- Live list. An agent that hits one of these should stop and ask, not decide. -->

| # | Question | Blocking | Owner |
|---|---|---|---|
| 1 | Downloadable resume PDF — do you have one ready, or does content need to be drafted? | F-04 | vickyir |
| 2 | Privacy-friendly analytics (e.g. Vercel Analytics/Plausible) for v1, or none? | Non-functional (Privacy) | vickyir |
| 3 | **All site content is placeholder.** All nine entries in `content/projects.ts`, the whole `content/timeline.ts` career history, `content/capabilities.ts`, and the stats in `content/site.ts` ("40+ projects", "6 years") are invented to fill the layout. Every one needs real facts before launch. | F-02, F-03 | vickyir |
| 4 | No real imagery exists — every image slot renders `components/ui/Placeholder.tsx`. Need portrait, project covers, and timeline images. | F-01, F-02 | vickyir |
