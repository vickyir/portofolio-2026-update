# Architecture — Vicky — Portfolio

<!--
  Purpose: let an agent place new code correctly and refuse to place it incorrectly.

  The single most useful section here is "Where new code goes". Diagrams help humans;
  the decision table is what actually changes agent output. Write that section first
  and pad the rest later.

  Target: under 400 lines. Loaded when the agent adds a file or crosses a boundary.
-->

**Updated:** 2026-07-27 · **Owner:** vickyir

## Shape

Static-first Next.js App Router site, single deploy, no backend. We optimized for
Lighthouse performance and edit simplicity for a single maintainer — not for a CMS
workflow or multi-author collaboration. Server Components are the default; client-side
JavaScript is the exception, opted into per-component, not per-page.

```
┌─────────────────────────────────────────────┐
│  app/            routes — thin, mostly RSC   │
├─────────────────────────────────────────────┤
│  components/     sections │ ui │ case-study  │   ← sections never import each other
├─────────────────────────────────────────────┤
│  content/        typed project data          │
├─────────────────────────────────────────────┤
│  public/         static assets               │
└─────────────────────────────────────────────┘
```

## Dependency rules

<!--
  State these as directed rules, not "layers should be loosely coupled". An agent can
  check a directed rule; it cannot check an adjective.
-->

| From | May depend on | May NOT depend on |
|---|---|---|
| `app/*` | `components/*`, `content/*` | Another route directly (no cross-route imports) |
| `components/shell/*` | `components/ui/*`, `content/*` | `components/sections/*` — the shell wraps sections, it never reaches into one |
| `components/sections/*` | `components/ui/*`, `content/*`, `components/shell/*` | Another `components/sections/*` |
| `components/case-study/*` | `components/ui/*`, `content/*` | `components/sections/*` |
| `components/ui/*` | Nothing project-specific | `content/*`, any section/case-study component |
| `content/*` | Nothing | Any component (data has no knowledge of rendering) |

Two rules do the real work here:

- **Sections never import sections.** Each homepage section is composed independently in
  `app/page.tsx`. The moment `AboutSection` reaches into `HeroSection`, reordering
  sections becomes a refactor instead of a one-line change.
- **`content/` imports nothing and is imported everywhere it's needed.** It's pure data —
  types and values, no JSX, no rendering logic. This is what makes `content/projects.ts`
  editable by someone who isn't touching components at all.

If a change seems to require breaking one of these, that's a design signal, not a
paperwork obstacle. Stop and raise it.

## Where new code goes

<!--
  THE table. Enumerate the actual cases that come up in this repo, not abstractions.
  When an agent puts a file in the wrong place, add the row that would have prevented it.
-->

| I'm adding… | It goes in | Notes |
|---|---|---|
| A new homepage section | `components/sections/<Name>Section.tsx` | Server Component unless it needs client state; wire into `app/page.tsx`. Use the `portfolio-section` skill. Add its `id` to `navLinks` in `content/site.ts` so the sidebar scroll-spy picks it up. |
| Persistent chrome (nav, rail, scroll orchestration) | `components/shell/` | Rendered from `app/layout.tsx`, not from a section |
| A new project/case study | `content/projects.ts` (data) + `public/images/<slug>/` (assets) | No new route file — `app/work/[slug]/page.tsx` already handles any slug in the data. Use the `portfolio-section` skill. |
| Any user-facing copy (bio, milestone, capability, stat) | `content/` — `timeline.ts`, `capabilities.ts`, `site.ts` | Never inline it in a component; sections read from `content/` so copy can change without touching JSX |
| A shared UI primitive (Button, Container, …) | `components/ui/` | Only if used by 2+ sections — resist premature promotion |
| Interactive behavior (theme toggle, scroll-reveal) | The specific component, marked `"use client"` | Keep the client boundary as small/deep as possible — wrap only the interactive part, not the whole section |
| A design token (color, spacing, motion value) | `docs/DESIGN-SYSTEM.md` first, then Tailwind config / CSS variables | Never introduce a value directly in a component |
| A one-off script (e.g. image optimization) | `scripts/` | Not in the build graph |

**When it's genuinely unclear:** put it in the section that uses it. Promoting a
component to `components/ui/` later is a cheap mechanical refactor. Un-sharing a
premature abstraction that three sections now depend on is not.

## Conventions

### Naming
| Thing | Pattern | Example |
|---|---|---|
| Component file | PascalCase, suffixed by role | `HeroSection.tsx`, `ProjectCard.tsx` |
| Route segment | kebab-case | `app/work/[slug]/page.tsx` |
| Non-component function/util | camelCase | `getProjectBySlug` |
| Design token | kebab-case CSS var, camelCase Tailwind key | `--color-accent` → `colors.accent` |

### Data
`content/projects.ts` exports a `Project[]` and a typed `Project` interface (slug, title,
summary, role, stack, problem, outcome, image, type: `'case-study' | 'engagement'`).
`app/work/[slug]/page.tsx` looks up by slug and calls `notFound()` on a miss — see
`docs/PRODUCT.md` F-03. Adding a project is a data change, never a new route file.

### Configuration
No literals for anything environment-dependent (analytics IDs, base URL for OG tags).
Config comes from env vars read at the edge/build, not hardcoded — even though today
nothing is secret, this avoids a silent hardcoded value surviving into a future feature
that does need one.

## Data flow

```
Visitor requests /work/aerosim
  → app/work/[slug]/page.tsx (Server Component)
  → getProjectBySlug('aerosim') reads content/projects.ts
  → not found?  → notFound() → Next.js 404
  → found       → renders shared case-study layout (components/case-study/*)
                  with that Project's typed data
  → next/image handles the project's images; no client JS required to see content
```

## Cross-cutting

| Concern | How | Where |
|---|---|---|
| Theme | Single warm-greige palette per `docs/DESIGN-SYSTEM.md`, defined once on `:root`. One section (Selected Work) inverts to dark via its own tokens. No `prefers-color-scheme` branching, no toggle. | `app/globals.css` |
| Fonts | `geist` package + `next/font` local loading (Geist Sans/Mono), self-hosted at build, no runtime font request | `app/layout.tsx` |
| Images | `next/image` everywhere — automatic optimization, required for the LCP budget in `docs/TEST-CASES.md` | Any component rendering a project image |
| Motion | CSS transition tokens for hover/focus; GSAP + ScrollTrigger for reveals, scrubs, and pinning — see "Using GSAP correctly" below and `docs/DESIGN-SYSTEM.md` → The scroll-driven set. All of it respects `prefers-reduced-motion`. | `components/ui/`, `components/shell/` |
| Scroll-spy | `IntersectionObserver`, not a ScrollTrigger per section — it's a read-only observation and shouldn't recompute on every scrub tick | `components/shell/useActiveSection.ts` |

## Anti-patterns

<!--
  Name the specific wrong things you've actually seen in this codebase, with the reason.
  Generic advice ("avoid god objects") doesn't survive contact with a real diff.
-->

- **`"use client"` at the top of a whole page or section by default.** Defeats the
  Server Components performance benefit this whole architecture is optimized for — push
  the boundary down to the smallest interactive leaf.
- **Inline hex/px values instead of tokens.** The moment one component has its own
  one-off blue, the "one accent color" rule in `docs/DESIGN-SYSTEM.md` is already broken
  and every future change has to grep for it.
- **Using GSAP correctly.** GSAP + ScrollTrigger is the sanctioned way to do
  scroll-triggered or orchestrated entrance motion (added deliberately, after CSS-only
  `IntersectionObserver` reveal was judged too plain — see `docs/DESIGN-SYSTEM.md`
  Motion). Generic entrance reveals go through `components/ui/Reveal.tsx` /
  `SplitReveal.tsx` — don't hand-roll another one. Bespoke scroll choreography lives in
  its own named component (`shell/ScrollMorph.tsx`, `sections/TimelineTrack.tsx`,
  `sections/SelectedWorkSection.tsx`), never inline in a section that also renders
  content — that's how timing drifts out of sync with the rest.

  Every use must: scope with `useGSAP(() => {...}, { scope: ref })` from `@gsap/react` so
  it auto-cleans on unmount; register `ScrollTrigger` once per module, not per instance;
  and check `prefers-reduced-motion`, skipping straight to the end state via
  `gsap.set(...)` — never animating to it.

  **Never add a paid GSAP Club plugin.** Each one that has come up has a free
  replacement already in the repo: `Flip` → the two-tree cross-animation in
  `shell/ScrollMorph.tsx`; `Draggable` → hand-rolled pointer events in
  `ui/DragScroller.tsx`; `SplitText` → plain `<span>` word splitting in
  `ui/SplitReveal.tsx`.

  **Pinning has extra rules.** `pin: true` takes over the scroll gesture, so gate it on
  `(min-width: 1024px) and (pointer: fine)` *and* `prefers-reduced-motion`, with a real
  fallback (native `overflow-x-auto`) rather than just different styling — see
  `sections/SelectedWorkSection.tsx`. Pass `invalidateOnRefresh: true` on any pin whose
  distance is measured from the DOM, or it breaks on resize.

  Simple hover/focus changes still don't need GSAP — CSS `transition` is enough, and is
  what `sections/ProjectCard.tsx` uses.
- **Hardcoding project copy inside JSX.** Breaks the "one template, N case studies"
  design — see `content/projects.ts` in the data-flow section above.
- **A `Utils`/`Helpers` module.** Becomes a dependency magnet nothing owns. Put the
  function next to its use, or in `content/` if it's data-shaped.

## Known debt

<!-- Honest list. Prevents an agent from "fixing" something that's a known tradeoff, and
     tells it which areas are already fragile. -->

| Area | Issue | Impact | Do we care |
|---|---|---|---|
| — | None yet — this repo is pre-implementation | — | Revisit once the first build pass lands |

## Decision records

| ADR | Decision | Status |
|---|---|---|
| [0001](adr/ADR-0001-nextjs-tailwind-vercel.md) | Next.js + Tailwind + Vercel over Astro/plain HTML | Accepted |

Add an ADR when a decision is expensive to reverse, when you're overruling something in
this file, or when you've explained the same choice twice.
