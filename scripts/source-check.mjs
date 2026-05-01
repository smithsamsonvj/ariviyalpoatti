#!/usr/bin/env node
/**
 * source-check.mjs
 * Ariviyalpoatti.in content cadence routine.
 *
 * Usage: node scripts/source-check.mjs <weekly|monthly|annual>
 *
 * For each in-scope competition:
 *   1. Fetch its official portal with curl.
 *   2. Ask Claude to compare the page against the markdown frontmatter.
 *   3. Act: bump last_verified (match) · open PR (change) · open issue (fetch-failed).
 *   4. Write a CONTENT_LOG.md entry.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs'
import { execSync, spawnSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'

// ─── Setup ────────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const COMPS_DIR = path.join(ROOT, 'src/content/competitions')
const LOG_FILE = path.join(ROOT, 'CONTENT_LOG.md')
const TMP = '/tmp/source-check'
mkdirSync(TMP, { recursive: true })

const MODE = process.argv[2]
if (!['weekly', 'monthly', 'annual'].includes(MODE)) {
  console.error('Usage: source-check.mjs <weekly|monthly|annual>')
  process.exit(1)
}

const TODAY = execSync('date -u +%Y-%m-%d').toString().trim()
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── Frontmatter helpers ───────────────────────────────────────────────────────

/** Extract simple scalar fields from YAML frontmatter. */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const yaml = match[1]
  const out = {}
  for (const line of yaml.split('\n')) {
    // Matches:  key: 'value'   or   key: "value"
    const m = line.match(/^(\w+):\s*['"]([^'"]*)['"]\s*$/)
    if (m) out[m[1]] = m[2]
    // Also match unquoted booleans / numbers if needed later
  }
  return out
}

/** Replace one frontmatter scalar in place. */
function setFrontmatterField(content, field, value) {
  // Handles both single and double quotes
  return content.replace(
    new RegExp(`^(${field}:\\s*)(['"])[^'"]*\\2`, 'm'),
    `$1'${value}'`,
  )
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

const CURL_BASE_ARGS = [
  '-s',
  '-L',
  '--max-time',
  '30',
  '--retry',
  '1',
  '--retry-delay',
  '3',
  '-A',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  '-H',
  'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  '-H',
  'Accept-Language: en-IN,en;q=0.9,ta;q=0.8',
  '-w',
  '\n__CODE__:%{http_code}',
]

function curlOnce(url, extraArgs = []) {
  return spawnSync('curl', [...CURL_BASE_ARGS, ...extraArgs, url], {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  })
}

function fetchURL(url) {
  let result = curlOnce(url)

  // curl exit 35 = SSL handshake failure — retry without certificate verification
  // (common for .nic.in / .gov.in sites with outdated TLS configs)
  if (result.status === 35) {
    result = curlOnce(url, ['--insecure'])
  }

  if (result.status !== 0 || result.stderr?.includes('ECONNREFUSED')) {
    return { ok: false, error: `curl exit ${result.status}: ${result.stderr?.slice(0, 120)}` }
  }

  const raw = result.stdout
  const codeMatch = raw.match(/\n__CODE__:(\d+)$/)
  const httpCode = codeMatch ? parseInt(codeMatch[1]) : 0
  const html = codeMatch ? raw.slice(0, raw.lastIndexOf('\n__CODE__:')) : raw

  if (httpCode === 0 || httpCode >= 400) {
    return { ok: false, error: `HTTP ${httpCode}` }
  }
  if (!html.trim()) {
    return { ok: false, error: 'empty response' }
  }

  return { ok: true, html, httpCode }
}

/** Strip HTML → plain text, truncated for Claude. */
function toText(html, maxChars = 12000) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxChars)
}

// ─── Claude analysis ──────────────────────────────────────────────────────────

async function analysePortal(comp, pageText) {
  const modeInstructions =
    MODE === 'weekly'
      ? 'Scan for new announcements, banners, or status changes. Only propose a deadline change if the portal EXPLICITLY states a different date.'
      : MODE === 'monthly'
        ? 'Confirm whether the deadline date in the markdown still matches what the portal shows. Flag any mismatch.'
        : 'Full review: check deadline, status, and whether the application process has materially changed.'

  const prompt = `You are a data verification agent for ariviyalpoatti.in, a Tamil Nadu school science competition guide.

COMPETITION
  id: ${comp.id}
  current deadline: ${comp.deadline}
  current last_verified: ${comp.last_verified}
  official portal: https://${comp.official}

MODE: ${MODE}
INSTRUCTION: ${modeInstructions}

PORTAL TEXT (stripped HTML, may be truncated at 12 000 chars):
${pageText}

Respond with valid JSON only — no markdown fences, no commentary:
{
  "outcome": "match" | "change" | "fetch-failed",
  "evidence": "<phrase under 15 words describing what you found on the page>",
  "proposed": {
    "deadline": "<YYYY-MM-DD or null>",
    "status": "<open|upcoming|soon|closed or null>",
    "note": "<human-readable explanation under 60 words, or null>"
  }
}

RULES
- "match"        → portal confirms existing data, or nothing decisive found.
- "change"       → you see a CLEAR, EXPLICIT difference (different date, new status, portal says registration closed).
- "fetch-failed" → page is a CAPTCHA wall, login gate, totally unrelated, or empty.
- Never invent a deadline date. When uncertain, return "match" and explain in evidence.`

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = msg.content[0].text.trim()
  // Strip markdown fences if model adds them despite instructions
  const json = raw.replace(/^```json\s*/i, '').replace(/\s*```$/, '')
  return JSON.parse(json)
}

// ─── GitHub helpers ───────────────────────────────────────────────────────────

function gh(args) {
  const result = spawnSync('gh', args, { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(`gh ${args[0]} failed: ${result.stderr}`)
  return result.stdout.trim()
}

function git(args, opts = {}) {
  const result = spawnSync('git', args, { encoding: 'utf8', cwd: ROOT, ...opts })
  if (result.status !== 0 && !opts.allowFail)
    throw new Error(`git ${args[0]} failed: ${result.stderr}`)
  return result.stdout.trim()
}

/** Returns true if there are staged changes ready to commit. */
function hasStagedChanges() {
  // exit 1 = differences exist, exit 0 = no differences
  const r = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: ROOT })
  return r.status !== 0
}

// ─── Template builders ────────────────────────────────────────────────────────

function prBody(changes) {
  const rows = changes
    .map(({ comp, analysis }) => {
      const p = analysis.proposed
      return `| ${comp.id} | ${comp.deadline} | ${p?.deadline ?? '—'} | ${p?.status ?? '—'} | ${analysis.evidence} |`
    })
    .join('\n')

  return `## Source check — ${MODE} — ${TODAY}

### Proposed changes

| Competition | Current deadline | Proposed deadline | Proposed status | Evidence |
|---|---|---|---|---|
${rows}

### Reviewer checklist
- [ ] Visited each linked portal and confirmed the proposed change
- [ ] No invented data — all changes have clear portal evidence
- [ ] Tamil fields (if any) reviewed for translation quality
- [ ] \`npm run build\` passes locally after applying changes

---
*Opened by the \`${MODE}\` source-check routine on ${TODAY}*`
}

function issueBody(comp, error) {
  return `## Verification failed — ${comp.id}

**Portal URL:** https://${comp.official}
**Failure reason:** ${error}
**Last successful verification:** ${comp.last_verified}
**Run date:** ${TODAY}

### What to check
1. Is the site accessible in a browser?
2. Has the URL or domain changed?
3. Is the existing deadline / status in the markdown still correct?

Update \`src/content/competitions/${comp.slug}.md\` and bump \`last_verified\` if changes are needed, then close this issue.

---
*Opened by the \`${MODE}\` source-check routine on ${TODAY}*`
}

function logEntry(inScope, matches, changes, failures, prUrl, issueUrls, commitSha) {
  const slugList =
    inScope.length === 13 ? 'all' : inScope.map((c) => c.slug).join(', ')

  const directCommit = matches.length > 0 ? (commitSha ?? 'yes') : 'none'
  const pr = prUrl ?? 'none'
  const issues = issueUrls.length > 0 ? issueUrls.join(', ') : 'none'

  return `## ${TODAY} · ${MODE} · ${slugList}

Checked ${inScope.length} in-scope competitions (mode: ${MODE}). ${matches.length} matched — \`last_verified\` bumped. ${changes.length} proposed change(s)${changes.length > 0 ? ` — see ${pr}` : ''}. ${failures.length} fetch failure(s)${failures.length > 0 ? ` — issues opened` : ''}.

**Outcome:**

- Direct commits: ${directCommit}
- PR opened: ${pr}
- Issues opened: ${issues}
`
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n=== Ariviyal Poatti source-check · ${MODE} · ${TODAY} ===\n`)

  // ── 1. Load competition files ──────────────────────────────────────────────
  const files = readdirSync(COMPS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()

  const all = files
    .map((f) => {
      const filePath = path.join(COMPS_DIR, f)
      const content = readFileSync(filePath, 'utf8')
      const fm = parseFrontmatter(content)
      if (!fm) return null
      return { slug: f.replace('.md', ''), filePath, content, ...fm }
    })
    .filter(Boolean)

  // ── 2. Scope filter ────────────────────────────────────────────────────────
  const inScope =
    MODE === 'annual' ? all : all.filter((c) => ['open', 'upcoming', 'soon'].includes(c.status))

  console.log(`In scope: ${inScope.length} / ${all.length} competitions\n`)

  // ── 3. Fetch + analyse ─────────────────────────────────────────────────────
  const results = []

  for (const comp of inScope) {
    process.stdout.write(`  ${comp.id.padEnd(30)} `)

    const fetch = fetchURL(`https://${comp.official}`)
    if (!fetch.ok) {
      console.log(`fetch-failed  (${fetch.error})`)
      results.push({ comp, outcome: 'fetch-failed', error: fetch.error })
      continue
    }

    const text = toText(fetch.html)
    try {
      const analysis = await analysePortal(comp, text)
      console.log(`${analysis.outcome.padEnd(14)} ${analysis.evidence}`)
      results.push({ comp, outcome: analysis.outcome, analysis })
    } catch (err) {
      console.log(`fetch-failed  (Claude error: ${err.message.slice(0, 60)})`)
      results.push({ comp, outcome: 'fetch-failed', error: `Claude: ${err.message}` })
    }
  }

  // ── 4. Tally ───────────────────────────────────────────────────────────────
  const matches = results.filter((r) => r.outcome === 'match')
  const changes = results.filter((r) => r.outcome === 'change')
  const failures = results.filter((r) => r.outcome === 'fetch-failed')

  console.log(`\nMatched: ${matches.length}  Changes: ${changes.length}  Failed: ${failures.length}\n`)

  let commitSha = null
  let prUrl = null
  const issueUrls = []

  // ── 5. Matches → bump last_verified, commit direct to main ─────────────────
  if (matches.length > 0) {
    for (const { comp } of matches) {
      const updated = setFrontmatterField(comp.content, 'last_verified', TODAY)
      writeFileSync(comp.filePath, updated)
    }

    git(['add', ...matches.map((r) => r.comp.filePath)])

    if (!hasStagedChanges()) {
      console.log('ℹ last_verified already up to date for all matched competitions — skipping commit')
    } else {
      git([
        'commit',
        '-m',
        `chore(content): bump last_verified for ${matches.length} competition(s)\n\nRoutine: source-check · ${MODE}\nVerified on ${TODAY}.\n\n${matches.map((r) => `- ${r.comp.id}: ${r.analysis?.evidence}`).join('\n')}\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`,
      ])
      git(['push', 'origin', 'main'])
      commitSha = git(['rev-parse', '--short', 'HEAD'])
      console.log(`✓ Committed + pushed last_verified bumps (${commitSha})`)
    }
  }

  // ── 6. Changes → open one PR ───────────────────────────────────────────────
  if (changes.length > 0) {
    const branch = `cadence/${MODE}-${TODAY}`
    git(['checkout', '-b', branch])

    for (const { comp, analysis } of changes) {
      let updated = comp.content
      if (analysis.proposed?.deadline) {
        updated = setFrontmatterField(updated, 'deadline', analysis.proposed.deadline)
      }
      if (analysis.proposed?.status) {
        updated = setFrontmatterField(updated, 'status', analysis.proposed.status)
      }
      updated = setFrontmatterField(updated, 'last_verified', TODAY)
      writeFileSync(comp.filePath, updated)
    }

    git(['add', ...changes.map((r) => r.comp.filePath)])

    if (!hasStagedChanges()) {
      console.log('ℹ No actual diff for change candidates — skipping PR')
      git(['checkout', 'main'])
      // treat as matches instead
    } else {
    git([
      'commit',
      '-m',
      `content: ${MODE} source check — ${changes.length} change(s) proposed\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`,
    ])
    git(['push', '-u', 'origin', branch])

    const bodyPath = path.join(TMP, 'pr-body.md')
    writeFileSync(bodyPath, prBody(changes))

    prUrl = gh([
      'pr',
      'create',
      '--title',
      `[${MODE}] Source check ${TODAY} — ${changes.length} change(s)`,
      '--body-file',
      bodyPath,
      '--label',
      'content-update',
      '--label',
      'source-check',
      '--label',
      `cadence:${MODE}`,
      '--label',
      'needs-review',
    ])
    console.log(`✓ PR opened: ${prUrl}`)

    git(['checkout', 'main'])
    } // end hasStagedChanges
  }

  // ── 7. Failures → open one issue per portal ────────────────────────────────
  for (const { comp, error } of failures) {
    const bodyPath = path.join(TMP, `issue-${comp.slug}.md`)
    writeFileSync(bodyPath, issueBody(comp, error))

    try {
      const url = gh([
        'issue',
        'create',
        '--title',
        `[verification-failed] ${comp.slug}: ${error}`,
        '--body-file',
        bodyPath,
        '--label',
        'verification-failed',
        '--label',
        'source-check',
      ])
      issueUrls.push(url)
      console.log(`✓ Issue opened: ${url}`)
    } catch (err) {
      console.error(`  Issue creation failed for ${comp.slug}: ${err.message}`)
    }
  }

  // ── 8. CONTENT_LOG entry ───────────────────────────────────────────────────
  const entry = logEntry(inScope, matches, changes, failures, prUrl, issueUrls, commitSha)
  const log = readFileSync(LOG_FILE, 'utf8')
  const sep = '---\n'
  const idx = log.indexOf(sep)
  writeFileSync(LOG_FILE, log.slice(0, idx + sep.length) + '\n' + entry + log.slice(idx + sep.length))

  git(['add', LOG_FILE])
  if (hasStagedChanges()) {
    git([
      'commit',
      '-m',
      `chore(log): ${MODE} source-check run ${TODAY}\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`,
    ])
    git(['push', 'origin', 'main'])
    console.log('✓ CONTENT_LOG committed + pushed')
  } else {
    console.log('ℹ CONTENT_LOG unchanged — skipping commit')
  }

  // ── 9. Run summary ─────────────────────────────────────────────────────────
  console.log(`
╔══════════════════════════════════════════════╗
  Mode:                ${MODE}
  Competitions checked: ${inScope.length}
  Matched:             ${matches.length}
  Proposed changes:    ${changes.length}
  Fetch-failed:        ${failures.length}
  Direct commit:       ${commitSha ?? 'none'}
  PR:                  ${prUrl ?? 'none'}
  Issues:              ${issueUrls.length > 0 ? issueUrls.join(', ') : 'none'}
  CONTENT_LOG:         committed
╚══════════════════════════════════════════════╝`)
}

main().catch((err) => {
  console.error('\nFatal error:', err)
  process.exit(1)
})
