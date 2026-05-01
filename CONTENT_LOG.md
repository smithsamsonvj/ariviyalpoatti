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
