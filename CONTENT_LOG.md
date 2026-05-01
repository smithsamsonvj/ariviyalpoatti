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
