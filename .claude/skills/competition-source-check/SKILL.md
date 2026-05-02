---
name: competition-source-check
description: Cross-check the 13 competitions in src/content/competitions/ against their official portals. Reports matches, proposes changes, flags failures. Used by the manual / monthly / annual cadence routines for ariviyalpoatti.in.
---

# competition-source-check

You are running inside a scheduled cadence routine for **ariviyalpoatti.in**, a bilingual (Tamil + English) Astro site listing 13 school-level science competitions in Tamil Nadu, India. Your job is to **verify each competition's data against its official source portal** and act on what you find — without breaking the trust signal that the site depends on.

You have been invoked with a **mode** (set by the calling routine):

- `manual` — light scan. For each portal, check the home page and any visible "announcements" / "important dates" panel. Report anything _new_ since the last run. Don't propose deadline changes unless the portal explicitly states them.
- `monthly` — deadline audit. For every competition with a future `deadline`, fetch the portal and confirm the date still matches. Bump `last_verified` on confirmed entries. Open PRs for mismatches.
- `annual` — full sweep. Re-read the `process` text against current portal copy. Refresh the next academic cycle's deadlines. Heavier review, expect to draft real PRs.

The mode will be passed to you in the user message at the top of the run.

---

## Repo orientation

You are in a fresh checkout of `https://github.com/smithsamsonvj/ariviyalpoatti` on the `main` branch.

Critical files:

- `src/content/competitions/*.md` — 13 markdown files, one per competition. YAML frontmatter has the data you check.
- `src/content.config.ts` — Zod schema; `npm run build` validates against it.
- `CONTENT_LOG.md` — append-only audit trail. **Every run writes one entry here, at the top, immediately under the `---` separator after the header.**
- `RUNBOOK.md` — section "Content Cadence" describes the workflow you're implementing.
- `.github/pull_request_template.md` — fill this when opening PRs.
- `.github/ISSUE_TEMPLATE/source-check-failed.md` — fill this when opening issues.

Frontmatter fields you care about per competition:

- `id`, `status`, `deadline` (YYYY-MM-DD), `deadlineLabel`, `official` (URL without protocol), `last_verified` (YYYY-MM-DD)

Today's date (UTC) is available via `date -u +%Y-%m-%d`. Always use the actual current date, never a guess.

---

## The check loop — run this for every competition in scope

Scope by mode:

- `manual` and `monthly`: only competitions where `status` is `open`, `upcoming`, or `soon`. Skip `closed`.
- `annual`: all 13 regardless of status.

For each in-scope competition:

1. Read the markdown file. Extract: `id`, `status`, `deadline`, `official`, `last_verified`.
2. Construct the URL: `https://{official}` (the field has no protocol).
3. **Fetch the URL using `curl` via Bash.** Use this exact command so the request looks like a real browser visit and follows redirects:

   ```bash
   curl -s -L --max-time 30 \
     -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" \
     -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
     -H "Accept-Language: en-IN,en;q=0.9,ta;q=0.8" \
     "https://{official}"
   ```

   If `curl` returns a non-zero exit code, an HTTP 4xx/5xx (check with `-w "%{http_code}"`), or empty output, record the competition as `fetch-failed`. Do not retry more than once.

   If `curl` succeeds but the page is a CAPTCHA wall, login gate, or yields no readable content about the competition, also record as `fetch-failed` with reason "page not parseable".

4. From the fetched HTML, look for:
   - The official deadline for the current cycle (compare to `deadline` field).
   - For `manual` mode: any new announcement / banner / news item the portal is highlighting.
   - For `annual` mode: changes to the application process described in the markdown's `process` field.
5. Decide outcome — exactly one of three buckets:
   - **`match`** — portal confirms what's in markdown. Nothing changed.
   - **`change`** — portal disagrees with markdown OR shows a change relevant to this competition.
   - **`fetch-failed`** — couldn't reach or parse the portal.

Track every competition in a list with: `id`, outcome, evidence (URL fragment or quoted snippet, ≤15 words for copyright), `proposed_changes` (if any).

---

## What to do with each outcome

### `match` — bump `last_verified`, commit direct to main (Option B)

For each competition in this bucket:

1. Edit the markdown file: change `last_verified: 'OLD_DATE'` to today's date in `YYYY-MM-DD` format.
2. After processing all `match` competitions, **stage and commit them in one batch** directly to `main`:

   ```bash
   git add src/content/competitions/<changed-files>
   git commit -m "chore(content): bump last_verified for N competitions

   Routine: <routine-name>
   Mode: <mode>
   Verified against source on $(date -u +%Y-%m-%d).

   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
   git push origin main
   ```

3. If the push fails (e.g. branch protection, conflict), do NOT silently skip — convert to a PR for these bumps instead, and flag the push failure in the CONTENT_LOG entry.

### `change` — open one PR with all proposed changes from this run

For each competition in this bucket:

1. Edit the markdown file with the proposed change (deadline, status, process text — only what's actually different).
2. Also bump `last_verified` to today on the same file.

After all changes are staged, open ONE PR for the whole batch:

```bash
BRANCH="cadence/<mode>-$(date -u +%Y-%m-%d)"
git checkout -b "$BRANCH"
git add src/content/competitions/<changed-files>
git commit -m "content: <mode> source check — N changes proposed

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push -u origin "$BRANCH"
```

PR body MUST follow `.github/pull_request_template.md`. Use `gh pr create` with `--body-file` pointing to a temp file you wrote (do not inline a long heredoc — gh handles file input cleanly):

```bash
gh pr create \
  --title "[<mode>] Source check $(date -u +%Y-%m-%d) — N changes" \
  --body-file /tmp/pr-body.md \
  --label content-update \
  --label source-check \
  --label cadence:<mode> \
  --label needs-review
```

**One PR per run, not one PR per competition.** Multiple competition changes go in the same PR with a section per slug in the body.

### `fetch-failed` — open an issue, don't change anything

For each competition in this bucket, open ONE issue per failure (these are individually actionable):

```bash
gh issue create \
  --title "[verification-failed] <slug>: <short-reason>" \
  --body-file /tmp/issue-<slug>.md \
  --label verification-failed \
  --label source-check
```

Body follows `.github/ISSUE_TEMPLATE/source-check-failed.md`. Include the URL attempted, what went wrong (HTTP code, timeout, etc.), and the date of the last successful verification (read from `last_verified` in frontmatter — or from CONTENT_LOG.md if you can find it).

**Do NOT modify markdown** for `fetch-failed` competitions. Their `last_verified` stays where it was — that's the truth.

---

## CONTENT_LOG.md entry — every run, no exceptions

After all the above is done (success OR partial failure), prepend a new entry to `CONTENT_LOG.md` immediately after the header section. Format:

```markdown
## YYYY-MM-DD · <mode> · <competition-list>

<One paragraph summary>: How many checked, how many matched (last_verified bumped), how many had proposed changes (link to PR), how many failed (link to issues). Note anything unusual — portal that suddenly redirected, surprising new announcement, etc.

**Outcome:**

- Direct commits: <commit SHA or "none">
- PR opened: <PR URL or "none">
- Issues opened: <issue URLs or "none">
```

`<competition-list>` should be `all` if you covered everything in scope, or a comma-separated slug list if it was a subset.

Then commit `CONTENT_LOG.md`:

- If you already committed direct to `main` for `last_verified` bumps, amend that commit to include the log entry, OR commit it as a separate `chore(log)` commit on `main`.
- If your run only opened a PR (no direct commits), add the CONTENT_LOG entry to the PR branch alongside the changes.

---

## Hard rules

1. **Never modify a competition's `last_verified` to a date earlier than what's currently there.** Dates only move forward.
2. **Never modify any field other than `last_verified`, `deadline`, `status`, or `process`** without flagging it explicitly in the PR body. Other fields (`name`, `eligibility`, `since`, `reach`, etc.) require human judgement.
3. **Never invent data.** If the portal doesn't show a clear deadline, mark the competition `fetch-failed` with reason "no deadline visible" — do not propose a date you guessed.
4. **Never push to `main` if `npm run build` fails.** Always run `npm run build` after staging changes. If Zod validation fails, abort the commit, log the error, and open an issue.
5. **Quote source content sparingly.** Maximum one short quote (<15 words) per competition in the PR body, in quotation marks, for copyright safety. Paraphrase otherwise.
6. **Tamil text edits require extra care.** If a `change` involves Tamil content (`name.ta`, `process[].ta`, etc.), flag it `needs-review` with a note that human review of the translation quality is required — don't trust auto-generated Tamil.

---

## Pre-flight checks (run these first, abort if any fail)

```bash
# 1. We're on main with a clean tree
git status --porcelain | grep -q . && { echo "Tree dirty — aborting"; exit 1; }
test "$(git rev-parse --abbrev-ref HEAD)" = "main" || { echo "Not on main — aborting"; exit 1; }

# 2. gh is authenticated and can see the repo
gh auth status || { echo "gh not auth'd — aborting"; exit 1; }
gh repo view smithsamsonvj/ariviyalpoatti > /dev/null || { echo "Can't see repo — aborting"; exit 1; }

# 3. Node + npm available for the build check later
node --version && npm --version || { echo "node/npm missing — aborting"; exit 1; }

# 4. All 8 cadence labels exist
gh label list --repo smithsamsonvj/ariviyalpoatti | grep -q "content-update" || { echo "Labels missing — aborting"; exit 1; }

# 5. Outbound internet access — smoke test against a stable public URL
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://www.google.com")
[ "$HTTP_CODE" = "200" ] || { echo "No outbound internet access (got HTTP $HTTP_CODE from google.com) — aborting"; exit 1; }
```

If any pre-flight fails, write a brief CONTENT_LOG entry noting the abort reason, then stop. Don't try to recover.

---

## Run summary you must end with

Whether the run succeeded fully, partially, or aborted — your final output (the message you end on) must include:

- Mode: manual / monthly / annual
- Competitions checked: N
- Outcomes: M matched, P proposed changes, F failed
- Direct commits: SHA(s) or none
- PR: URL or none
- Issues: URL(s) or none
- CONTENT_LOG.md entry committed: yes / no
- Any unusual observations the next routine run should know about

This summary is what lands in the routine's run log and is what future-you (or a human reviewer) reads to understand what happened.
