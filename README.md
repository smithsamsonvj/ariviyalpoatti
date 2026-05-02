# அறிவியல் போட்டி — Ariviyal Poatti

**A bilingual (Tamil + English) guide to 13 school-level science competitions in Tamil Nadu.**

🌐 **Live site → [ariviyalpoatti.in](https://ariviyalpoatti.in)**

---

## The problem

Tamil Nadu has over 37,000 schools and more than 1.4 crore students. Every academic year, 13 major science competitions — from government olympiads to international robotics leagues — open their registrations. The deadlines scatter across October to February. The portals are in English. The process steps are buried in PDFs.

A teacher in a government school in Virudhunagar hears about INSPIRE–MANAK. She visits the official site. She finds a PDF from two years ago. She doesn't know if the deadline has passed. She gives up.

That missed registration is what this site is trying to prevent.

---

## The approach

- **Bilingual by default.** Every piece of text has a Tamil and an English version. The toggle is per-session, stored in `localStorage`. Tamil is the default.
- **Role-first navigation.** Teachers, principals, and parents each see a different entry path — only the steps that matter to them.
- **Source-driven freshness.** Each competition's data is cross-checked against its official portal on a manual / monthly / annual cadence. Every card shows a per-competition `last_verified` date — not a site-wide stamp.
- **No logins, no ads, no trackers.** Static site, zero client-side JS frameworks, Plausible for privacy-respecting analytics.

---

## The data pipeline

```
Official portals (13)
        │
        ▼
  Scheduled agent (manual / monthly / annual)
  reads each portal → compares to markdown frontmatter
        │
        ├── Match     → bumps last_verified, commits direct to main
        ├── Change    → opens a PR with proposed update for human review
        └── Failed    → opens a GitHub issue, nothing is changed
        │
        ▼
  Netlify build (npm run build)
  Zod validates all 13 frontmatter files → static HTML deployed
        │
        ▼
  ariviyalpoatti.in
```

The scheduled agents are Claude Code routines that clone this repo, fetch each official portal, diff against the markdown, and act. The audit trail lives in [`CONTENT_LOG.md`](./CONTENT_LOG.md). The cadence logic lives in [`.claude/skills/competition-source-check/SKILL.md`](./.claude/skills/competition-source-check/SKILL.md).

---

## The outcome

|                      |                                                                            |
| -------------------- | -------------------------------------------------------------------------- |
| Competitions tracked | 13                                                                         |
| Languages            | Tamil · English                                                            |
| Categories           | Govt (5) · Robotics (2) · Olympiad (2) · NGO (2) · State (1) · Private (1) |
| Audiences            | Teachers · Principals · Parents                                            |
| Freshness            | Per-competition `last_verified`, updated by automated routines             |
| Hosting              | Netlify · builds on every push to `main`                                   |

---

## Running locally

**Prerequisites:** Node ≥ 22.12.0, npm

```bash
git clone https://github.com/smithsamsonvj/ariviyalpoatti.git
cd ariviyalpoatti
npm install
npm run dev          # dev server at localhost:4321
```

Other commands:

```bash
npm run build        # type-check + production build → dist/
npm run preview      # serve the production build locally
npm run lint         # ESLint
npm run format       # Prettier
```

The build runs Zod schema validation against all 13 competition markdown files. If any frontmatter field is wrong or missing, the build fails with a clear error.

---

## Project structure

```
src/
  components/        Astro components (CompetitionCard, FreshnessBanner, etc.)
  content/
    competitions/    13 markdown files — one per competition
  data/
    content.ts       UI strings (COPY), helper functions, bilingual editorial data
  layouts/
    Base.astro       HTML shell — head, TopBar, Footer, anti-flash script
  pages/             File-based routing — each .astro is one URL
  styles/
    global.css       Design tokens, reset, bilingual toggle CSS
.claude/
  skills/            Skill definitions for the content cadence routines
CONTENT_LOG.md       Append-only audit trail of every source-check run
RUNBOOK.md           Full operational guide — content cadence, adding competitions, deploying
```

---

## Adding or updating a competition

See [`RUNBOOK.md`](./RUNBOOK.md) for full instructions. The short version:

1. Create or edit `src/content/competitions/<slug>.md`
2. Fill all required frontmatter fields (schema in `src/content.config.ts`)
3. `npm run build` — Zod will tell you exactly what's wrong if anything is
4. Submit a PR; Netlify preview deploys automatically

---

## Data accuracy

Competition deadlines and process descriptions are sourced from official government and organiser portals. Each entry shows the date it was last cross-checked (`last_verified`). Automated routines re-verify these on a monthly and annual schedule, with on-demand manual runs in between.

**This is not an official government site.** Dates may lag behind portal updates. Always confirm deadlines at the official source before submitting — every competition page links directly to it.

If you spot an error, [open an issue](https://github.com/smithsamsonvj/ariviyalpoatti/issues) — it is the fastest way to get it fixed.

---

## Tech stack

| Layer             | Choice                                                             |
| ----------------- | ------------------------------------------------------------------ |
| Framework         | [Astro 6](https://astro.build) — zero client JS by default         |
| Language          | TypeScript 5                                                       |
| Schema validation | Zod (frontmatter)                                                  |
| Styling           | Vanilla CSS — design tokens, no framework                          |
| Fonts             | Noto Sans Tamil · Fraunces · Inter (all via Google Fonts)          |
| Hosting           | [Netlify](https://netlify.com)                                     |
| Analytics         | [Plausible](https://plausible.io) — privacy-respecting, no cookies |
| Content agents    | [Claude Code Routines](https://claude.ai/code/routines)            |

---

## License

Code (`.astro`, `.ts`, `.css`) is MIT licensed — see [`LICENSE`](./LICENSE).

Competition data in `src/content/competitions/` is editorial — paraphrased summaries of publicly available information from official government and organiser portals. It is not a verbatim copy of any protected work.
