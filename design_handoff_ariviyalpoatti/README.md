# Handoff: ariviyalpoatti.in

A bilingual (Tamil-primary, English-toggle) reference site that consolidates India's twelve major school-level science competitions and surfaces Tamil Nadu participation data for each.

---

## About the Design Files

The files in `design_reference/` are **design references created in HTML/JSX**. They are a working prototype that demonstrates the intended look, copy, interactions, and information architecture — **not production code to ship as-is**.

Your task is to recreate these designs in the target codebase's existing environment (React + a real router, Next.js, Remix, etc.) using its established patterns, component library, and typography stack. If no codebase exists yet, pick the best-fit framework (Next.js App Router is a strong default here because most views are primarily read-only content pages with light client state).

**Do not ship this HTML directly** — it uses a single-file design canvas wrapper and Babel-in-browser for rapid iteration. Both must be replaced.

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, and copy. The layouts are pixel-considered at mobile 420px and desktop 1280px. Recreate pixel-close while swapping in the codebase's real type system, icon library, and state management.

See `screenshots/` for reference captures of every major screen (home, three role dashboards, competitions list, competition detail, annual calendar, about). The index is in `screenshots/README.md`.

## Source data

Twelve competitions + Tamil Nadu participation + phase-by-phase timelines live in `design_reference/src/content.jsx`. That file is the **source of truth for the copy** — both Tamil and English strings, deadlines, phase arrays, TN participation maps, etc. Lift strings directly.

---

## Product overview

### Audience

Three roles, selected explicitly on the home page:

1. **Teachers** — looking for a competition to enter students in, or building a year calendar.
2. **Principals / admins** — comparing competitions across fees, pathways, eligibility.
3. **Parents** — understanding what's worth pursuing, what the commitment looks like.

### Navigation model: role-first

The home page is the entry point. Its primary affordance is **three big role cards**. Picking one pushes the user to a **role dashboard** (`dash:<role>`) — a long-scroll, sectioned page that answers that role's top questions in order with recommended competitions, calendar, and an escape hatch into the full listing.

A small "or jump to" row under the cards provides direct links for people who know what they want (All 12, Annual calendar, Why this exists).

### Languages

- **Default: Tamil.** Body type is `Noto Sans Tamil` (or comparable), display is a Tamil-supporting serif pair.
- **Toggle, not mix.** A single language is shown at a time; a language pill in the top bar flips the whole tree. No inline Tamil + English.
- All copy lives in `content.jsx` as `{ ta: '...', en: '...' }` objects, resolved via a `t(obj, lang)` helper.

### Freshness signal

Because this is informational, every page carries a visible "last verified" date (constant `LAST_VERIFIED` in `content.jsx`, currently **2026-04-15**). Appears:

- As a small inline pill in the **hero** on home (on the teal background — muted ivory text).
- As a pill next to the title + status pill on the **competition detail** page.
- As a banner card under the **competitions list** intro and under the **key dates** intro.

The component is `FreshnessBadge` (inline pill variant) and `FreshnessBanner` (full-width card) in `shared.jsx`. It uses the bronze accent tone.

### Confidence signal: Tamil Nadu participation

On every competition detail page, a **TN participation block** sits directly below the phase timeline and above the process steps. Shows: schools participating, students, districts covered, a short explanatory note, and **real example schools grouped by district** — a mix of government and private, across at least 4 districts including Chennai, Coimbatore, and at least one rural/non-metro district. Component: `TNParticipationBlock` in `shared.jsx`. Data: `TN_PARTICIPATION` map keyed by competition id in `content.jsx`.

> Numbers in `TN_PARTICIPATION` are placeholder-but-realistic. Replace with verified SCERT / DST / AIM sources as the real numbers come in. The UI already cites a `sourceLabel` per-competition.

### Phase timeline

On every competition detail page, directly under the hero, a horizontal **12-month academic-year grid (Jun → May)** with colored bars per phase:

- `registration` — teal
- `district` — sage
- `state` — bronze
- `national` — ink (darker)
- `international` — gold accent

A vertical "today" marker pins to the current month. Component: `CompetitionTimeline` in `shared.jsx`. Data: `PHASES` map in `content.jsx`, keyed by competition id; each phase is `{ level, title, note, months: number[] }` where months are 0-indexed calendar months.

---

## Pages (routes)

All routes are client-side state transitions in the prototype (`src/app.jsx`). In production, use real URLs.

| Route | Page | File |
|---|---|---|
| `home` | Hero + 3 role cards + escape row | `home.jsx` |
| `competitions` | Full list of 12 with category filters | `competitions.jsx` |
| `comp:<id>` | Competition detail (hero + timeline + TN + process + sidebar) | `competitions.jsx` |
| `dates` | Annual calendar — vertical timeline grouped by month | `dates.jsx` |
| `about` | Why this exists + TN facts + sources | `about.jsx` |
| `start` | Start-here (optional tabbed guide) | `start.jsx` |
| `dash:<role>` | Role dashboard — long-scroll, the primary flow | `flow.jsx` |

Competition IDs (12): `inspire-manak`, `rbvp`, `ncsc`, `atl-marathon`, `cbse-expo`, `teri-green`, `nse-ino`, `sof-nso`, `ico`, `iris`, `wro`, `fll`.

---

## Design tokens

Defined in `src/shared.jsx` as `TOKENS`:

```
teal       #1A4D4A   primary, nav accent, focus ring
tealSoft   #E6EEEC   hover, chip bg, soft fills
sage       #708B7A   secondary text, category labels, small accents
bronze     #B87333   warm accent — deadlines, freshness, CTA
gold       #D4A54A   international-phase accent only
ink        #1A1A2E   primary text
muted      #5A5A6E   secondary text, body at reduced weight
line       #D9D4C9   hairlines, dividers
ivory      #F5F1E8   page background (warm, not white)
cream      #FAF7F0   card / elevated surface
```

Do not invent new colors. If a new surface is needed, derive from these.

### Typography

Prototype uses `FONT`:

- **Tamil**: `Noto Sans Tamil, sans-serif` (or `Mukta Malar` as fallback)
- **Display** (English): a warm serif — prototype uses `Fraunces, Georgia, serif` — *if the target codebase has an editorial serif already, use that instead*
- **UI** (English body/buttons): `Inter, system-ui, sans-serif`

Scale (mobile → desktop):

- Hero: 28 → 56 (Tamil is 4-6px smaller than English at each step)
- Page H1: 24 → 48
- Section H2: 20 → 24
- Body: 15 → 16
- UI small: 13
- Uppercase labels: 10, letter-spacing ~1.4

Never smaller than 13 for UI, 15 for body. Tamil at Latin-equivalent size always feels small; bump it down **in the opposite direction** — Tamil body is 15-16, Tamil headings are **smaller** than their English counterparts (visual mass parity).

### Spacing

Mobile gutter 22 · Desktop gutter 64. Section vertical padding 24 mobile / 40-48 desktop. Card internal padding 16 mobile / 20 desktop.

### Radius & borders

Radius 4 everywhere (not rounded-pill). Hairlines use `TOKENS.line` at 1px. Cards sit on `TOKENS.cream` with a 1px line border — no shadows unless hovering.

### Motion

Minimal. Nav transitions 120ms. Card hover: 120ms translate-y 0 → -2, border-color ivory → teal. No parallax, no scroll-triggered reveal, no bounce.

---

## Components to build

Component names from the prototype. Keep these names so the source-of-truth files stay easy to diff against.

### Chrome

- **`TopBar`** — logo + language toggle. Sticky on scroll. Shrinks height after 40px scroll.
- **`Nav`** (inside TopBar) — 4 text links on desktop · overflow sheet on mobile.
- **`Footer`** — minimal — Annual calendar · All 12 competitions · Why this exists · contact line. Shared across all pages except home (home has its own inline mini-footer).

### Shared

- **`LanguagePill`** — 2-state toggle, த / EN. Live rerenders all copy.
- **`StatusPill`** — green `open` · amber `upcoming` · blue `soon` · slate `closed`.
- **`FreshnessBadge` / `FreshnessBanner`** — as described above.
- **`CompetitionCard`** — name, category, status pill, deadline, days-left, freshness subtly in the footer.
- **`CompetitionTimeline`** — 12-month academic-year grid with colored phase bars + today marker.
- **`TNParticipationBlock`** — 3-number stat row + note + district-grouped example schools list + source line.
- **`Fact`** — label-above-value row, used in detail sidebar.
- **`SectionHead`** — h2 with a short bronze rule to the left of the text.
- **`Motif`** — a small decorative kolam/line mark used sparingly at page section starts.

### Pages

Each page component is in its own file; read the file for exact layout. All pages accept `{ lang, setRoute, device, route }`.

---

## Interactions / behavior

- **Language toggle** — instant, no animation. Persists to localStorage.
- **Role card click (home)** — routes to `dash:<role>`. Dashboard scrolls to top.
- **Competition card click (list)** — routes to `comp:<id>`. Detail scrolls to top.
- **Category filter (list)** — in-page filter, no URL change needed in prototype (real app should support `?category=govt`).
- **Footer link when already on target page** — scrolls to top rather than no-op. (See `shared.jsx` Footer implementation — `setRoute` + scroll reset.)
- **Freshness banner** — static informational. Not dismissible.
- **Phase timeline** — non-interactive in v1. Hover could show the phase's `note` in a tooltip in v2.

---

## State management

Prototype uses plain React `useState` in a single `App` root. For production:

- **URL state**: route, selected competition id, filter category, language (via locale prefix like `/ta/` and `/en/`).
- **Local state**: mobile nav open/closed, toggle micro-states.
- **No server state** in v1 — all content is static.

When the CMS question comes up: the `content.jsx` shape is already close to a Notion/Airtable/Sanity schema. The migration is one-for-one.

---

## Responsive behavior

Two breakpoints in the prototype:
- **Mobile**: device width ≤ 480. Single-column everything.
- **Desktop**: device width > 480. Two-column on detail pages; stacked filters; wider gutters.

The prototype passes `device` explicitly as a prop because it runs two fixed-size artboards side-by-side on a design canvas. In production, use CSS `@media (min-width: 768px)` — don't thread `device` through props.

---

## Accessibility

- Focus ring is a 1.5px `TOKENS.teal` outline. Do not remove.
- Minimum tap target is 44px (hero CTAs, nav buttons, language pill).
- All `<button>` elements in the prototype are real `<button>` — preserve that when porting (don't turn nav items into `<div onClick>`).
- Color contrast: ink-on-ivory and teal-on-ivory both pass AA at body sizes.
- Tamil needs `lang="ta"` on any element containing Tamil text — the prototype sets `<html lang="ta">` globally; production should set locale per route.

---

## Content structure — match this shape when moving to a CMS

From `content.jsx`:

```js
Competition {
  id: string,
  category: 'govt' | 'ngo' | 'olympiad' | 'private' | 'robotics',
  status:   'open' | 'upcoming' | 'soon' | 'closed',
  name:     { ta, en },
  shortName:{ ta, en },
  eligibility: { ta, en },
  fee:      { ta, en },
  deadline: 'YYYY-MM-DD',
  deadlineLabel: { ta, en },
  summary:  { ta, en },           // 2-3 sentences
  process:  Array<{ ta, en }>,    // 4-5 steps
  official: string,               // domain only, no protocol
  organiser:{ ta, en },
  since:    string,               // year or range
  reach:    { ta, en },           // "~N schools (~X%)"
  intlPath: { ta, en },
  schoolType: { ta, en },
}

Phase {
  level: 'registration'|'district'|'state'|'national'|'international',
  title: { ta, en },
  note:  { ta, en } | undefined,
  months: number[],               // 0..11
}

TNParticipation {
  schools: string,
  students: string,
  districts: number,
  sourceLabel: { ta, en },
  note: { ta, en },
  examples: Array<{
    district: { ta, en },
    schools: string[],
  }>,
}
```

---

## Assets

**There are no external image assets in this design.** The brand mark is drawn in code.

- **Wordmark** — rendered as type. Tamil: `அறிவியல் போட்டி` (Tiro Tamil, display). English: `Ariviyal Poatti` (DM Serif Display). A small uppercase `ARIVIYALPOATTI.IN` line sits beneath the wordmark.
- **Icon mark** — the `Motif` component in `src/shared.jsx` (~line 91) is a geometric inline-SVG glyph. It appears next to the wordmark in the nav, as a subtle rule at section starts, and in the footer. Takes `size`, `color`, `opacity` props. A designer may later replace it with a finalized mark, but the current version is production-ready.
- **Icons** — none. The prototype intentionally avoids iconography. If the target codebase has an established icon set (Phosphor, Lucide, etc.), it may be used sparingly in v2.
- **Photography** — none. If imagery is added post-launch, restrict to documentary photos of actual students / competitions; avoid stock.

## Files in this bundle

```
design_reference/
  Ariviyal Poatti.html          # entry — mounts design canvas + Babel + 2 artboards
  design-canvas.jsx             # IGNORE for production; design presentation only
  src/
    app.jsx                     # route state + page switch
    content.jsx                 # ALL copy + competitions + phases + TN participation
    shared.jsx                  # tokens, fonts, Footer, CompetitionCard, FreshnessBadge,
                                # FreshnessBanner, CompetitionTimeline, TNParticipationBlock,
                                # StatusPill, Motif, helpers
    nav.jsx                     # TopBar + Nav + LanguagePill
    home.jsx                    # role-first landing
    competitions.jsx            # list + detail
    dates.jsx                   # annual calendar
    about.jsx                   # why this exists
    start.jsx                   # start-here (optional tabbed guide)
    flow.jsx                    # role dashboards
    tweaks.jsx                  # IGNORE for production; design-mode only
```

---

## Open threads / v2 candidates

- Phase-timeline hover tooltip with the phase `note`.
- Collision advisory (two overlapping deadlines in Sep-Oct) — copy exists in `COPY.datesCollision`.
- Per-competition "nearest district example" using geolocation.
- Downloadable per-school one-pager (PDF) — not built, asked about.

## Questions for the product team, not the engineer

- Replace placeholder TN participation numbers with verified SCERT / DST figures.
- Confirm phase months for NSE/INO, ICO, and WRO — these were derived from prose and should be verified against the 2026-27 cycle calendars before launch.
