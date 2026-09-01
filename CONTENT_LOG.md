# Content log — ariviyalpoatti.in

Append-only audit trail of every cadence run (weekly / monthly / annual) and any
manual content change. Cadence routines write to this file on each execution;
humans append entries when editing content directly.

**Format:** Reverse-chronological. Most recent entry at the top. Each entry:

- **Date** — `YYYY-MM-DD`
- **Cadence** — `weekly` / `monthly` / `annual` / `foundation` / `manual`
- **Competitions checked** — slugs, comma-separated, or `all`
- **Summary** — one paragraph: what was found, what changed
- **Outcome** — link to the PR / issue / commit produced

See `RUNBOOK.md` → "Content Cadence" for the workflow this log supports.

---

## 2026-09-01 · monthly · atl-marathon, cbse-expo, fll, ico, inspire-manak, iris, ncsc, nse-ino, rbvp, vaanavil-mandram, wro

Checked 11 in-scope competitions (mode: monthly). 5 matched — `last_verified` bumped. 2 proposed change(s) — see https://github.com/smithsamsonvj/ariviyalpoatti/pull/29. 4 fetch failure(s) — issues opened.

**Outcome:**

- Direct commits: 0b4cfb7
- PR opened: https://github.com/smithsamsonvj/ariviyalpoatti/pull/29
- Issues opened: https://github.com/smithsamsonvj/ariviyalpoatti/issues/30, https://github.com/smithsamsonvj/ariviyalpoatti/issues/31, https://github.com/smithsamsonvj/ariviyalpoatti/issues/32, https://github.com/smithsamsonvj/ariviyalpoatti/issues/33

## 2026-08-01 · monthly · atl-marathon, cbse-expo, fll, ico, inspire-manak, iris, ncsc, nse-ino, rbvp, teri-green, vaanavil-mandram, wro

Checked 12 in-scope competitions (mode: monthly). 6 matched — `last_verified` bumped. 1 proposed change(s) — see https://github.com/smithsamsonvj/ariviyalpoatti/pull/23. 5 fetch failure(s) — issues opened.

**Outcome:**

- Direct commits: 7c28bee
- PR opened: https://github.com/smithsamsonvj/ariviyalpoatti/pull/23
- Issues opened: https://github.com/smithsamsonvj/ariviyalpoatti/issues/24, https://github.com/smithsamsonvj/ariviyalpoatti/issues/25, https://github.com/smithsamsonvj/ariviyalpoatti/issues/26, https://github.com/smithsamsonvj/ariviyalpoatti/issues/27, https://github.com/smithsamsonvj/ariviyalpoatti/issues/28

## 2026-07-01 · monthly · atl-marathon, cbse-expo, fll, ico, inspire-manak, iris, ncsc, nse-ino, rbvp, teri-green, vaanavil-mandram, wro

Checked 12 in-scope competitions (mode: monthly). 5 matched — `last_verified` bumped. 3 proposed change(s) — see https://github.com/smithsamsonvj/ariviyalpoatti/pull/18. 4 fetch failure(s) — issues opened.

**Outcome:**

- Direct commits: b6e8e41
- PR opened: https://github.com/smithsamsonvj/ariviyalpoatti/pull/18
- Issues opened: https://github.com/smithsamsonvj/ariviyalpoatti/issues/19, https://github.com/smithsamsonvj/ariviyalpoatti/issues/20, https://github.com/smithsamsonvj/ariviyalpoatti/issues/21, https://github.com/smithsamsonvj/ariviyalpoatti/issues/22

## 2026-06-01 · monthly · atl-marathon, cbse-expo, fll, ico, inspire-manak, iris, ncsc, nse-ino, rbvp, teri-green, vaanavil-mandram, wro

Checked 12 in-scope competitions (mode: monthly). 5 matched — `last_verified` bumped. 2 proposed change(s) — see https://github.com/smithsamsonvj/ariviyalpoatti/pull/10. 5 fetch failure(s) — issues opened.

**Outcome:**

- Direct commits: a48aa0c
- PR opened: https://github.com/smithsamsonvj/ariviyalpoatti/pull/10
- Issues opened: https://github.com/smithsamsonvj/ariviyalpoatti/issues/11, https://github.com/smithsamsonvj/ariviyalpoatti/issues/12, https://github.com/smithsamsonvj/ariviyalpoatti/issues/13, https://github.com/smithsamsonvj/ariviyalpoatti/issues/14, https://github.com/smithsamsonvj/ariviyalpoatti/issues/15

## 2026-05-01 · weekly · all

Checked 13 in-scope competitions (mode: weekly). 11 matched — `last_verified` bumped. 0 proposed change(s). 2 fetch failure(s) — issues opened.

**Outcome:**

- Direct commits: 9f57c2b
- PR opened: none
- Issues opened: https://github.com/smithsamsonvj/ariviyalpoatti/issues/7, https://github.com/smithsamsonvj/ariviyalpoatti/issues/8

## 2026-05-01 · weekly · all

Checked 13 in-scope competitions (mode: weekly). 7 matched — `last_verified` bumped. 0 proposed change(s). 6 fetch failure(s) — issues opened.

**Outcome:**

- Direct commits: 7cc66ab
- PR opened: none
- Issues opened: https://github.com/smithsamsonvj/ariviyalpoatti/issues/1, https://github.com/smithsamsonvj/ariviyalpoatti/issues/2, https://github.com/smithsamsonvj/ariviyalpoatti/issues/3, https://github.com/smithsamsonvj/ariviyalpoatti/issues/4, https://github.com/smithsamsonvj/ariviyalpoatti/issues/5, https://github.com/smithsamsonvj/ariviyalpoatti/issues/6

## 2026-05-01 · foundation · all

Initialised cadence infrastructure. Replaced the global `LAST_VERIFIED` constant
in `src/data/content.ts` with a per-competition `last_verified` field in each
markdown file's frontmatter (Zod-enforced). All 13 competitions back-filled with
`last_verified: '2026-04-15'` to match the previous global value — no entry
should suddenly look fresher than truth. Added `oldestVerifiedDate()` helper so
site-wide freshness signals derive from the worst-case (oldest) date across the
collection. Added GitHub PR template, source-check-failed issue template, and
this log file. Created label taxonomy on the remote repo for routine output.

**Outcome:** Foundation in place. Routines (weekly / monthly / annual) can now
be built in a follow-up session and will write entries here on each run.
