# Design system — Vicky — Portfolio

<!--
  Purpose: the concrete, code-facing translation of the "Apple-like restraint" direction
  in docs/PRODUCT.md. Kept separate from docs/ARCHITECTURE.md on purpose: this file is
  read by both product decisions (docs/PRODUCT.md links here) and implementation
  (Tailwind config / CSS variables read these exact values), and it will grow on its own
  timeline — a new palette or type step shouldn't bloat ARCHITECTURE.md past its 400-line
  budget, which is about code placement, not visual language.

  Loaded when: choosing a color, spacing value, font size, or animation — anywhere a
  component would otherwise reach for an ad-hoc hex code or magic number.
-->

**Updated:** 2026-07-27 · **Owner:** vickyir

## The one rule

**One signature element per section. Everything else in that section is quiet.** Before
adding a second gradient, a second accent color, a second animated element to the same
section, or a shadow "for depth" — stop. If a section already has its signature move (a
large type statement, one meaningful motion, one accent-colored control), everything else
in it is neutral, static, and disciplined. This is the concrete test for "restraint": if
you can't name the one signature element in a section, it doesn't have one yet — it has
noise.

> **Revised 2026-07-27.** This used to read "one signature element per *page*", alongside
> a whitespace-over-density stance. The site was restructured to a denser, multi-section
> layout (nav → hero → timeline → 9-card work grid → capabilities → contact), so the
> per-page framing no longer matched the build. The discipline is unchanged, just scoped
> per section: the hero's signature is the word-by-word headline, the work grid's is the
> card hover-lift, the timeline's is the accent rail. None of them stack a second effect.

Explicitly avoid defaulting into these without a specific reason (named in this repo's
brief as the tells of unconsidered AI-generated design):
- Warm cream/beige background + serif display font + terracotta accent.
- Pure black background + a single neon/bright-green accent.
- Broadsheet/newspaper styling — thin hairline rules, zero border-radius everywhere.

## Color

**Light (warm greige) with one dark section.** The page runs on a warm greige ground with
a single high-chroma yellow accent; only Selected Work inverts to near-black. There is no
theme toggle and no `prefers-color-scheme` branching.

These values were **sampled from the reference recording's frames** with a dominant-colour
histogram, not picked by eye — greige was 41% of the hero's pixels, yellow 24%.

Defined in `app/globals.css`, mapped into Tailwind via `@theme inline` — components
reference the token (`bg-surface`, `text-text-primary`), never the hex directly.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#C9C9B3` | Page background |
| `--color-bg-dark` | `#0D0D0D` | Selected Work only — the single inverted section |
| `--color-surface` | `rgba(255,255,255,.28)` | Frosted card fill (see `GlassCard`) |
| `--color-surface-raised` | `rgba(255,255,255,.50)` | Frosted fill needing more separation |
| `--color-surface-dark` | `rgba(255,255,255,.06)` | Card fill inside the dark section |
| `--color-border` | `rgba(20,20,20,.14)` | Hairlines on light ground |
| `--color-border-dark` | `rgba(255,255,255,.14)` | Hairlines on dark ground |
| `--color-text-primary` | `#141414` | Headings, body copy |
| `--color-text-secondary` | `#5C5C52` | Captions, metadata, eyebrow labels |
| `--color-text-on-dark` | `#F2F2EA` | Body copy inside the dark section |
| `--color-text-secondary-on-dark` | `#9D9D94` | Secondary copy inside the dark section |
| `--color-accent` | `#F8F820` | CTAs, active nav pill, timeline nodes, card arrow |
| `--color-on-accent` | `#141414` | **Anything sitting on accent.** Never white — see below |

Rules:
- **Never put white on `--color-accent`.** The yellow is ~94% luminance; white text on it
  is roughly 1.1:1 and completely illegible. `--color-on-accent` exists so this can't be
  got wrong by accident.
- **One accent colour, full stop.** Not one per project — one for the whole site.
- **Translucent surfaces are deliberate.** The frosted look depends on the greige ground
  showing through; don't "fix" a `GlassCard` by giving it an opaque fill.
- Never hardcode a hex in a component. If a shade isn't in this table, add it here first,
  with a reason, then use it.
- Must hit **WCAG 2.2 AA** for `text-primary`/`text-secondary` against `bg` and the
  translucent surfaces. **Not yet measured** — `text-secondary` on `surface` over greige
  is the most likely failure. See `docs/TEST-CASES.md` Known gaps.

## Typography

**Archivo** (display and body) and **Geist Mono** (eyebrow labels, tags, metadata).

Archivo is a variable weight 400–900 grotesk that goes heavy and tight enough to match
the reference's display type, which Geist Sans could not. It is **self-hosted** at
`app/fonts/Archivo-Variable.woff2` and loaded with `next/font/local` — deliberately not
`next/font/google`. Two reasons: the build then has no network dependency at all, and
Node on this machine can't complete the TLS handshake to `fonts.googleapis.com`
(`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`), which made the Google-hosted route fail the build
outright. If you ever swap the typeface, keep it self-hosted for the same reasons.

Display headings are set at weight 900 with `letter-spacing: -0.03em` (applied globally
to `h1`–`h3` in `app/globals.css`) and line-heights below 1 — that tight, heavy setting is
most of what makes the reference's type read the way it does.

Modular scale, ratio 1.25, base 16px:

| Token | Size | Line height | Use |
|---|---|---|---|
| `text-display` | 56px (72px ≥ lg) | 1.05 | Hero headline only — the one place we go big |
| `text-h1` | 40px | 1.1 | Page/section titles |
| `text-h2` | 32px | 1.15 | Case study section headings |
| `text-h3` | 24px | 1.25 | Card titles |
| `text-body-lg` | 20px | 1.5 | Hero subhead, intro paragraphs |
| `text-body` | 16px | 1.6 | Default body copy |
| `text-caption` | 14px | 1.4 | Metadata, labels, footnotes |

Only `text-display` is allowed to be the page's signature element. If a card title and a
hero are both fighting for attention at similar visual weight, that's the restraint rule
being broken.

## Spacing

4px base unit. Use the Tailwind default scale (`p-1` = 4px … `p-32` = 128px) directly —
no custom spacing scale on top of it. The discipline is in *how much whitespace*, not in
inventing new units:

| Token | Value | Use |
|---|---|---|
| `space-xs` | 8px | Inside a control (icon-to-label) |
| `space-sm` | 16px | Between related inline elements |
| `space-md` | 32px | Between elements inside a section |
| `space-lg` | 64px | Between sections on mobile |
| `space-xl` | 128px | Between sections on desktop — don't shrink this to fit more above the fold; the whitespace is the design |

## Motion

Two systems, split by what's animating — don't mix them up:

- **CSS transitions** (tokens below) own simple hover/focus/state changes: button hover,
  card border color, theme-toggle-adjacent transitions. These never need JS.
- **GSAP + ScrollTrigger** owns scroll-triggered reveals, scrubbed choreography, and
  pinning — via `components/ui/Reveal.tsx`, `SplitReveal.tsx`, and the four scroll-driven
  components listed below. See `docs/ARCHITECTURE.md` → "Using GSAP correctly" for
  scoping, cleanup, and reduced-motion rules. These use GSAP's own eases (`power2.out`,
  `power3.out`, `none` for scrubs) rather than the `ease-standard` token below, which is
  CSS-only.

### The scroll-driven set

| What | Where | Notes |
|---|---|---|
| Hero → sidebar morph | `components/shell/ScrollMorph.tsx` | The signature move. Scrubbed timeline; hero nav staggers out (0.06s apart) while the fixed rail fades in, wordmark scales to 0.24, portrait blurs to 18px. |
| Timeline draw-on | `components/sections/TimelineTrack.tsx` | Scrubbed `strokeDashoffset` on an SVG path; node dots pop in staggered behind the line. |
| Pinned horizontal work rail | `components/sections/SelectedWorkSection.tsx` | `pin: true` + `x` scrub; off-centre cards dim via `containerAnimation`. |
| Drag rail | `components/ui/DragScroller.tsx` | Not GSAP — hand-rolled pointer events driving native `scrollLeft`. |

**The morph is a cross-animation, not a true FLIP.** The hero nav and the sidebar nav are
two separate DOM trees animated in opposite directions on one scrubbed timeline. A real
position-to-position morph would need GSAP's `Flip` plugin, which is paid and therefore
banned (see `docs/ARCHITECTURE.md`). If you go to change the choreography, change it in
`ScrollMorph.tsx` — it is the single owner, deliberately, so the timing doesn't get
smeared across the sections it animates.

**Pinning and scrubbing must degrade, not just restyle.** Both the morph and the pinned
rail check `prefers-reduced-motion` *and* viewport/pointer capability, and bail to a
static end state. Pinning on a touch device hijacks the scroll gesture and reads as a
broken page — the work rail falls back to a native `overflow-x-auto` swipe below `lg` or
without a fine pointer.

| Token | Value | Use |
|---|---|---|
| `duration-micro` | 150ms | Hover/focus state changes |
| `duration-standard` | 300ms | Theme toggle, in-page CSS transitions |
| `duration-reveal` | 500ms | Reserved — not currently used now that scroll-reveal timing lives in `Reveal.tsx`'s GSAP config (`duration: 0.5`, matching this value) |
| `ease-standard` | `cubic-bezier(0.16, 1, 0.3, 1)` | All CSS transitions above — one curve, everywhere |

Scroll-reveal rule: sections fade/translate in once, on first entry into viewport, staggered
by no more than 80ms per child — orchestrated, not simultaneous confetti.

**One signature element per page still applies to motion, not just typography.** The
homepage's signature is the hero headline's word-by-word entrance (`SplitReveal`) — the
one ambient background glow behind it (`HeroGlow`) is allowed alongside it specifically
*because* it doesn't compete: low opacity, heavily blurred, slow (8s+) drift, no sharp
edges or fast movement. That's the test for any future ambient/background motion — if it
could work as a second focal point on its own, it's competing, not supporting.

**`prefers-reduced-motion: reduce` is not an enhancement to skip** — when set, disable
scroll-reveal, hero entrance, ambient background motion, and theme-toggle transitions
entirely (render in final state immediately). This is an accessibility floor per
`docs/PRODUCT.md`'s non-functional requirements, not a nice-to-have.

**No paid GSAP Club plugins** (`SplitText`, `MorphSVG`, etc.) — see
`docs/ARCHITECTURE.md` for why and what to use instead.

## Breakpoints

Tailwind defaults, used as-is: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Design
and test at 375px (mobile), 768px (tablet), 1440px (desktop) — the three widths in
`docs/TEST-CASES.md`'s visual check.
