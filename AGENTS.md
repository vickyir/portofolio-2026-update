# Vicky — Portfolio

<!--
  This file is loaded on EVERY turn. Treat it like a hot path.
  Target: under 150 lines. If a section grows past ~15 lines, move it to docs/ and
  leave a pointer here. Prose is expensive; tables and commands are cheap.
-->

Personal portfolio for a freelance iOS/visionOS engineer; users are recruiters evaluating
a candidate and prospective clients evaluating a contractor, not consumers.

> "Vicky — Portfolio" is a placeholder title derived from this repo's git identity
> (`vickyir`), not a confirmed brand name — swap in the real name/domain/tagline when
> decided.

## Stack

| Layer | Choice | Version | Notes |
|---|---|---|---|
| Language | TypeScript | 5.x, strict | |
| Framework | Next.js | 15.x, App Router | Server Components by default |
| UI runtime | React | 19.x | |
| Styling | Tailwind CSS | 4.x | Tokens sourced from `docs/DESIGN-SYSTEM.md`, never ad-hoc. Dark theme only. |
| State | — | — | No state library; mostly server-rendered, minimal client `useState` for theme toggle |
| Fonts | Geist Sans / Geist Mono | via the `geist` package (`next/font` local) | See `docs/DESIGN-SYSTEM.md` |
| Motion | GSAP + ScrollTrigger, `@gsap/react` | 3.x | Scroll-triggered/orchestrated motion only, via `components/ui/Reveal.tsx`/`SplitReveal.tsx` — see `docs/ARCHITECTURE.md` |
| Deploy | Vercel | | Zero-config, preview URL per PR |
| Testing | `tsc`, ESLint, Playwright (smoke) | | See `docs/TEST-CASES.md` |

**Not yet scaffolded.** This repo currently has no `package.json` or `app/` directory —
these docs describe the target shape for the first implementation pass, written first so
that pass has something concrete to build against instead of guessing.

## Commands

<!-- Agents will invent commands if you don't list them. Always list them. -->

```bash
npm install            # first-time setup
npm run dev             # local dev server
npm run build            # production build — the main correctness gate for a static site
npm run lint               # ESLint, must pass clean
npm run typecheck            # tsc --noEmit
npx playwright test             # contact-CTA smoke test, see docs/TEST-CASES.md
```

## Repo map

<!-- Only the directories an agent needs to navigate. Not `ls -R`. -->

| Path | Contains |
|---|---|
| `app/` | Routes: `page.tsx` (home, all sections), `work/[slug]/page.tsx` (case study detail). Start here for a new page. |
| `components/shell/` | Persistent chrome + scroll orchestration: sidebar rail, hero nav, `ScrollMorph`. Rendered from `app/layout.tsx`. |
| `components/ui/` | Primitives shared across sections (Button, Container, GlassCard, Tag, Reveal…). Changes here affect everything — be careful. |
| `app/fonts/` | Self-hosted Archivo variable font. Do not switch to `next/font/google` — see `docs/DESIGN-SYSTEM.md` Typography. |
| `components/sections/` | One component per homepage section (Hero, SelectedWork, About, Contact). |
| `components/case-study/` | Components specific to the `/work/[slug]` detail layout. |
| `content/` | Typed site data — `projects.ts` (case studies), `timeline.ts`, `capabilities.ts`, `site.ts` (name/email/stats). The only place this copy lives. All currently placeholder. |
| `public/` | Static assets: images, resume PDF, favicon. |
| `docs/` | Context for humans and agents. |

## Invariants

<!--
  The rules that, if broken, mean the change is wrong regardless of whether it compiles.
  Keep this list SHORT — 5 to 10 items. A list of 40 rules gets ignored wholesale.
  Say *why* for each one. An agent that understands the reason generalizes correctly to
  cases you didn't list; an agent following a bare rule will follow it off a cliff.
-->

1. **Server Components by default.** Add `"use client"` only when a component genuinely
   needs browser state or an event handler (theme toggle, scroll-reveal observer). This
   is what keeps the JS bundle small enough to hit the Lighthouse budget in
   `docs/TEST-CASES.md`.
2. **Design tokens only from `docs/DESIGN-SYSTEM.md`.** No ad-hoc hex codes, one-off px
   values, or a second accent color inside a component. Missing a value there? Add it
   there first, with a reason, then use it.
3. **Project/case-study copy lives only in `content/projects.ts`.** Never hardcode a
   project's title, description, or stack list inside JSX — the case-study route is a
   template over that data, not a bespoke page per project.
4. **No secrets, analytics keys, or tokens in source.** Use env vars, even for a public
   site — an API key for a future analytics or contact integration is still a key.
5. **A structural content change (new section, new scope) needs a matching update to
   `docs/PRODUCT.md`.** The features table there is the source of truth for what the site
   does; code and docs drifting apart is what makes the next session guess wrong.

## Definition of done

A change is not finished until:

- [ ] `npm run lint`, `npm run typecheck`, and `npm run build` pass locally
- [ ] New behavior has a row in `docs/TEST-CASES.md`'s test case catalog
- [ ] New sections/pages are reflected in `docs/PRODUCT.md`'s features table
- [ ] Checked at 375px / 768px / 1440px, with `prefers-reduced-motion` on and off
- [ ] New copy added to `content/`, not hardcoded in a component
- [ ] No new console warnings or errors

## Working agreement

<!-- How you want the agent to behave. This changes output quality more than people expect. -->

- **Read before writing.** Open the neighboring section/component and match its existing
  style over any general convention.
- **Ask when the spec is ambiguous** rather than picking a plausible interpretation.
  A wrong guess costs more than a question.
- **Small diffs.** One concern per change. Don't reformat untouched lines — it buries the
  real change in review.
- **Don't add dependencies** without asking — especially animation/UI kit libraries. Most
  of this site needs only CSS transitions and Tailwind; reach for a package only when
  that genuinely isn't enough.
- **If a test fails, fix the cause, not the test.** If the test is genuinely wrong, say so
  explicitly and explain why before changing it.
- **Say "I don't know"** instead of producing confident-sounding invented API names.

## Where to read next

<!--
  THE most important table in this file. Every row needs a trigger condition, otherwise
  the agent can't tell which one applies.
-->

| Read this | When |
|---|---|
| `docs/PRODUCT.md` | Building or changing user-facing behavior; you need the glossary or case-study facts |
| `docs/ARCHITECTURE.md` | Adding a file and unsure where it goes; touching data flow |
| `docs/DESIGN-SYSTEM.md` | Picking a color, spacing value, font size, or animation |
| `docs/TEST-CASES.md` | Writing tests, or deciding what coverage a change needs |
| `docs/adr/` | You're about to disagree with an existing pattern — check if it's already litigated |
| `.claude/skills/portfolio-section/` | Adding a new project case study or a new homepage section |

## Known rough edges

<!-- Save the agent from rediscovering your papercuts. Concrete, current, dated. -->

- None yet — this repo is pre-implementation. Add real rough edges here as they surface
  during the first build pass; don't guess at them in advance.
