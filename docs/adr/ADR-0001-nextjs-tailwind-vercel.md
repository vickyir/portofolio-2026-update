# ADR-0001: Use Next.js 15 (App Router) + TypeScript + Tailwind CSS, deployed to Vercel

**Status:** Accepted
**Date:** 2026-07-27
**Deciders:** vickyir

## Context

Solo personal portfolio project, one engineer, no fixed deadline but built to also
function as a live work sample — recruiters and clients evaluating an iOS/visionOS
engineer will look at both the deployed site and, potentially, the repo itself. The site
is content-light (one home page, three case studies) but needs to look and perform like a
considered product, not a template. Time budget is whatever the owner spends on it
outside client work, so iteration speed and low operational overhead matter more than
raw performance ceiling.

## Decision

We will build the site with Next.js 15 (App Router), TypeScript, and Tailwind CSS, and
deploy it to Vercel. Server Components are the default rendering mode; client JavaScript
is opted into per-component only where genuinely needed (see `docs/ARCHITECTURE.md`).

## Options considered

### Option A — Next.js + Tailwind + Vercel (chosen)

| Dimension | Assessment |
|---|---|
| Complexity | Low — well-documented, App Router handles routing/data-fetching without extra libraries |
| Cost | $0 at this scale (Vercel free tier) |
| Scalability | Not a constraint at this traffic level; matters more for iteration speed |
| Reversibility | Medium — migrating framework later means rewriting components, but content in `content/projects.ts` is framework-agnostic and portable |
| Team familiarity | High — current-generation React/Next, most transferable skill for future work |

**Pros:** Server Components give strong performance defaults for a mostly-static site;
Vercel gives zero-config deploys and a preview URL per PR/branch, useful for reviewing
changes before they're live; using Next.js/React is itself a signal to recruiters
evaluating for React/Next-adjacent roles, which a niche static-site generator wouldn't
provide as strongly.
**Cons:** Easier to accidentally ship more client JS than a pure static-site generator
would allow — requires the discipline captured in `docs/ARCHITECTURE.md`'s anti-patterns
list.

### Option B — Astro

| Dimension | Assessment |
|---|---|
| Complexity | Low — arguably simpler for a fully static site (zero JS by default) |
| Cost | $0 at this scale |
| Scalability | Not a constraint |
| Reversibility | Medium, similar to Option A |
| Team familiarity | Lower — less current hands-on experience than with Next.js |

**Pros:** Ships zero JS by default unless explicitly opted in — theoretically an even
lower performance ceiling risk than Next.js.
**Cons:** Weaker signal value for recruiters specifically evaluating React/Next skill;
the case-study dynamic routing this site needs is simple in either framework, so Astro's
main advantage (less unused JS) is marginal here since Server Components already keep
Next.js's JS payload close to zero for this kind of content.

### Option C — Plain HTML/CSS + minimal vanilla JS

| Dimension | Assessment |
|---|---|
| Complexity | Low to build, high to maintain as content grows |
| Cost | $0 |
| Scalability | Not a constraint |
| Reversibility | Cheap to start, expensive to extend (no componentization) |
| Team familiarity | High, but not the toolset relevant to the jobs/clients being targeted |

**Pros:** Absolute performance ceiling — nothing to strip away.
**Cons:** No component reuse (three near-identical case-study pages become copy-paste),
slower iteration, and zero framework signal value to the target audience.

### Option D — Do nothing / keep no rebuilt site

Evaluated honestly: keeping an outdated or nonexistent portfolio while relying solely on
LinkedIn/résumé was considered and rejected. Neither channel lets a visitor see actual
shipped work in context, which is the entire point of this project.

## Trade-off analysis

The deciding factor was signal value plus iteration speed, not raw performance — all
three real options (A/B/C) can hit the Lighthouse budget in `docs/TEST-CASES.md` for a
site this small. Next.js was chosen because Server Components close most of the
performance gap with Astro for this specific content shape (three static-ish pages, no
heavy client interactivity), while still demonstrating current-generation React/Next
experience to the audience most likely to be evaluating it. Astro would be the right
answer if raw JS-zero performance were the binding constraint or if the target audience
skewed toward static-site/content-site evaluators specifically — neither is the case
here.

## Consequences

**Easier**
- Component reuse across the three case studies (one template, typed data).
- Built-in image optimization (`next/image`) and font loading (`next/font`) without
  extra configuration.
- Zero-config preview deployments per change via Vercel.

**Harder**
- Requires active discipline to keep client-side JavaScript minimal — Next.js makes it
  easy to reach for `"use client"` by default, which this project explicitly avoids (see
  `docs/ARCHITECTURE.md` anti-patterns).

**We accept**
- Slightly more framework overhead than a pure static-site generator, in exchange for
  the signal value and familiarity described above.

**Revisit when**
- The site needs to ship meaningfully more interactive content than the current scope
  (F-01..F-05 in `docs/PRODUCT.md`), or if repeated Lighthouse Performance scores fall
  below the 95 budget despite following the Server-Components-by-default rule — at that
  point, re-evaluate whether the client JS discipline is actually being maintained versus
  whether the framework itself is the bottleneck.

## Action items

- [ ] Scaffold the actual Next.js project per `docs/ARCHITECTURE.md`'s repo shape
- [ ] Wire up Lighthouse CI once a CI pipeline exists
- [ ] Update `docs/ARCHITECTURE.md`'s "Decision records" table if this is ever superseded
