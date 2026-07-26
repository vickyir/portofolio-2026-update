# Testing — Vicky — Portfolio

<!--
  Purpose: tell the agent what kind of test to write, where to put it, what to name it,
  and what "enough" means — so it stops writing 40 assertions on a getter and starts
  covering the branch that actually breaks in production.

  The test case table is the part that keeps paying off: it's a coverage map you can read
  in 30 seconds without opening a single test file, and it's the natural place for an
  agent to check its work against.
-->

**Updated:** 2026-07-27

## Shape of the suite

This is a mostly-static marketing/portfolio site, not a logic-heavy application — the
unit/integration/E2E pyramid from a typical product doesn't map cleanly here. The real
gates are: does it typecheck and build, does it hit the performance/accessibility budget,
and does the one critical journey (contact) work.

```
        ╱ Playwright ╲       1     smoke-tests the contact CTA only
      ╱  Lighthouse CI  ╲    per page   perf/a11y/SEO budget, the main quality gate
    ╱ tsc + ESLint + build ╲ every commit   the correctness floor
```

| Level | Runs in | Deps | Budget | Where |
|---|---|---|---|---|
| Typecheck/lint/build | seconds | none | every commit, < 2 min total | `npm run typecheck`, `npm run lint`, `npm run build` |
| Lighthouse CI | ~30s/page | headless Chrome | every PR, < 5 min | CI config (added when CI is set up) |
| Playwright smoke | seconds | none (static build) | every PR, < 1 min | `tests/contact.spec.ts` |
| Unit (rare) | < 5ms | none | as needed | co-located `*.test.ts` next to a pure function |

## Which test to write

| The change is… | Write | Why |
|---|---|---|
| A pure data-lookup function (`getProjectBySlug`) | Unit | Pure input→output; no reason for it to be slow or skipped |
| A new homepage section or case-study layout | Lighthouse + manual check at 375/768/1440px | Assert layout and budget, not logic — there shouldn't be branching logic in a section |
| The contact CTA / resume link | Playwright, one smoke test | The one journey where a silent break (dead `mailto:`, 404 resume) actually costs a lead |
| A new project added to `content/projects.ts` | Manual: visit `/work/<slug>` once, check it renders | Data change, not logic — no automated test needed per entry |
| A bug fix | A failing check first (test, or a reproduced Lighthouse/console failure) | Otherwise you don't know you fixed it, and it comes back |

## Cover / skip

**Cover:** the contact journey end to end, every route resolving without a console error,
the 404 behavior for an unknown project slug, keyboard operability of every interactive
element, all three breakpoints, `prefers-reduced-motion` on and off. (The site is
single-palette — there is no second theme to sweep, but do check the inverted Selected
Work section, which has its own on-dark text tokens.)

**Skip:** Next.js/Tailwind framework behavior, `next/image`/`next/font` internals,
one-off build/image scripts. Testing these inflates the number without moving the risk.

**A test that has never failed and never could is worse than no test** — it costs
maintenance and buys false confidence. If you can't describe the bug a test would catch,
delete it.

## Conventions

```ts
test('contact CTA opens mail client with prefilled address')
// Playwright: describe the user-visible behavior, not the implementation
```

- **One behavior per test.** A failure name should tell you what broke without opening it.
- **Arrange / Act / Assert**, visually separated.
- **No conditionals or loops in tests.** Branching test logic means you now need tests for
  your tests. Use parameterized cases (e.g. one per breakpoint) instead.
- **Deterministic.** No reliance on real network/analytics; static build only.

## Coverage targets

Reframed as a quality budget rather than a % coverage number — % coverage doesn't mean
much on a site with almost no branching logic.

| Area | Target | Enforced |
|---|---|---|
| Lighthouse Performance | ≥ 95 (mobile, throttled) | CI gate once CI exists; manual before each deploy until then |
| Lighthouse Accessibility | ≥ 95, WCAG 2.2 AA | Same |
| Lighthouse Best Practices | ≥ 95 | Same |
| Lighthouse SEO | ≥ 95 | Same |
| `tsc --noEmit` | 0 errors | CI gate |
| ESLint | 0 errors | CI gate |
| Contact journey (Playwright) | Passing | CI gate |

Budget is a smoke detector, not a goal. A 95 Performance score with a broken contact link
is worse than an 88 that actually converts. Don't chase the number past the point it
stops correlating with the two personas in `docs/PRODUCT.md` actually succeeding.

## Test case catalog

<!--
  Every acceptance criterion in docs/PRODUCT.md gets at least one row. Add rows here in
  the same change that adds the test — a stale catalog is worse than none, because it
  claims coverage that doesn't exist.

  P0 = ship-blocking · P1 = important · P2 = nice to have
-->

### F-01 · Hero

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-01-01 | a 375px viewport | the page loads | role/specialty statement visible without scrolling | Manual/Lighthouse | P0 | ⬜ |
| TC-01-02 | `prefers-reduced-motion: reduce` | the page loads | hero renders in final state, no entrance animation | Manual | P1 | ⬜ |

### F-02 · Selected Work

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-02-01 | the nine entries in `content/projects.ts` | Selected Work renders | all nine cards appear, in data order, numbered 01–09 | Manual | P0 | ⬜ |
| TC-02-02 | a project entry with no image | its card renders | `Placeholder` shown, card height matches its row | Manual | P1 | ⬜ |

### F-03 · Case Study Detail

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-03-01 | any slug in `content/projects.ts` | visited via direct URL | full case study renders server-side, with nav and footer | Manual | P0 | ⬜ |
| TC-03-02 | an unknown slug | visited | proper 404, not a blank/crashed page | Manual | P0 | ⬜ |

### F-04 · About / Timeline

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-04-01 | the Contact section | resume link activated | PDF opens/downloads, no broken link | Playwright | P0 | ⬜ |
| TC-04-02 | the entries in `content/timeline.ts` | the About section renders | every milestone appears in order with its year marker | Manual | P1 | ⬜ |

### F-06 · Shell: sidebar, hero nav, morph

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-06-01 | a ≥1024px viewport at the top of the page | the page loads | hero nav visible, sidebar rail hidden | Manual | P0 | ⬜ |
| TC-06-02 | a ≥1024px viewport | scrolling past the hero | hero nav staggers out, sidebar rail fades in, wordmark shrinks, portrait blurs — no flicker or double-nav | Manual | P0 | ⬜ |
| TC-06-03 | scrolling back up to the top | the morph reverses | hero returns to its initial state cleanly | Manual | P1 | ⬜ |
| TC-06-04 | a 375px viewport | the page loads and scrolls | sidebar never appears; hero nav stays; **no morph runs at all** | Manual | P0 | ⬜ |
| TC-06-05 | `prefers-reduced-motion: reduce` | the page loads | sidebar present immediately at full opacity, no scrub | Manual | P0 | ⬜ |
| TC-06-06 | scrolling through the page | each section enters | the matching sidebar item highlights yellow, exactly one at a time | Manual | P1 | ⬜ |
| TC-06-07 | the sidebar copy-email button | activated | address copied; `aria-live` announces it; visible address unchanged | Manual | P1 | ⬜ |
| TC-06-08 | clipboard permission denied | copy activated | no crash, no false "copied" message | Manual | P2 | ⬜ |

### F-08 · Pinned horizontal work rail

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-08-01 | a ≥1024px viewport with a fine pointer | scrolling into Selected Work | section pins, cards translate sideways, off-centre cards dim | Manual | P0 | ⬜ |
| TC-08-02 | the pinned section | scrolling past its end | pin releases and the page continues normally — **scroll is never trapped** | Manual | P0 | ⬜ |
| TC-08-03 | a touch device or <1024px | scrolling into Selected Work | **no pin**; rail is a native horizontal swipe | Manual | P0 | ⬜ |
| TC-08-04 | `prefers-reduced-motion: reduce` | scrolling into Selected Work | no pin, no scrub; rail scrollable | Manual | P0 | ⬜ |
| TC-08-05 | the window resized while pinned | resize | pin distance recalculates (`invalidateOnRefresh`), layout not stuck | Manual | P1 | ⬜ |

### F-09 · Drag rail (Capabilities)

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-09-01 | a mouse over the capabilities rail | dragging horizontally | rail scrolls with the pointer; yellow DRAG cursor follows | Manual | P1 | ⬜ |
| TC-09-02 | a drag that ends over a card | pointer released | the card does **not** navigate (click suppressed after drag) | Manual | P0 | ⬜ |
| TC-09-03 | a touch device | swiping the rail | native momentum scroll; custom drag does not interfere | Manual | P0 | ⬜ |
| TC-09-04 | keyboard only | tabbing through capability cards | focus moves and the rail scrolls to keep focus visible | Manual | P1 | ⬜ |

### F-07 · Capabilities

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-07-01 | the entries in `content/capabilities.ts` | the section renders | all six cards appear, equal height within a row | Manual | P1 | ⬜ |

### F-05 · Contact

| ID | Given | When | Then | Level | Pri | Automated |
|---|---|---|---|---|---|---|
| TC-05-01 | the Contact section | primary CTA activated | default mail client opens with prefilled address | Playwright | P0 | ⬜ |
| TC-05-02 | the Contact section | rendered | email address visible as selectable text, independent of `mailto:` | Manual | P1 | ⬜ |

## Known gaps

<!-- Honesty here is what keeps the catalog trustworthy. -->

| Area | Gap | Risk | Plan |
|---|---|---|---|
| Everything above | No automated tests run yet — `tests/contact.spec.ts` is written but Playwright browsers were never installed (`npx playwright install`) | Medium | Install browsers and run before first deploy |
| Lighthouse budget | Never actually measured. The site grew from 4 to 6 sections and carries GSAP; the ≥95 targets above are aspirational until run | Medium | Run Lighthouse against a production build before deploy |
| Color contrast | Palette values were sampled from the reference, but contrast ratios were never computed | **High** | Check `text-secondary` (`#5C5C52`) on the translucent `surface` over greige — most likely AA failure. Also confirm nothing anywhere puts white on `--color-accent` (~1.1:1, illegible) |
| Scroll interactions | Morph, pin, and drag were verified only by checking the DOM handles render — **the actual motion has never been watched in a browser** by me | **High** | Scroll the page at 1440px, 768px, and 375px, and with reduced-motion on. TC-06-* / TC-08-* / TC-09-* are all still ⬜ |
| `public/resume.pdf` | Referenced by the Contact CTA but the file doesn't exist — TC-04-01 fails today | High | Add the file, or remove the link until there is one |

## Flaky test policy

A flaky test is a broken test. On the second flake: quarantine it, open an issue, and fix
or delete it within a week. This matters even more here — the suite is intentionally
small, so tolerating one flaky test degrades trust in a disproportionate share of it.

## Running

```bash
npm run typecheck          # tsc --noEmit
npm run lint                 # ESLint
npm run build                  # production build — catches most static-site issues
npx playwright test              # contact-CTA smoke test
npx lighthouse <url> --view        # manual budget check until Lighthouse CI is wired up
```
