# Runbook — ariviyalpottai.in

## Quick Reference

| Command           | What it does                             |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start dev server at localhost:4321       |
| `npm run build`   | Type-check + production build to `dist/` |
| `npm run preview` | Serve production build locally           |
| `npm run lint`    | Run ESLint                               |
| `npm run format`  | Auto-format with Prettier                |
| `npm run check`   | Astro type checker                       |

## Project Structure

```
src/
  components/     20 Astro components (TopBar, CompetitionCard, etc.)
  content/
    competitions/ 13 markdown files (one per competition)
  data/
    content.ts    UI strings, helper functions, editorial data
    types.ts      TypeScript interfaces
  layouts/
    Base.astro    Wraps every page (head, TopBar, Footer)
  pages/          File-based routing — each .astro = one URL
  styles/
    global.css    Design tokens, reset, bilingual toggle CSS
```

## Adding a New Competition

1. Create `src/content/competitions/new-comp.md` with YAML frontmatter matching the schema in `src/content.config.ts`
2. Include all required fields: id, category, status, name, shortName, eligibility, fee, schoolType, deadline, deadlineLabel, summary, process, official, organiser, since, reach, intlPath, phases
3. Optionally add `tn` (TN participation) and `sortOrder`
4. Run `npm run build` — Zod validates your frontmatter and errors on missing/wrong fields
5. No other files need to change — listing, detail, dates, and filters update automatically

## Updating Competition Data

- **Status change** (e.g., upcoming -> open): edit `status` in the competition's `.md` frontmatter
- **Deadline change**: edit `deadline` field (YYYY-MM-DD format)
- **Verification date**: update `LAST_VERIFIED` in `src/data/content.ts`
- **UI strings**: edit `COPY` object in `src/data/content.ts`

## Bilingual System

- Default language: Tamil (`data-lang="ta"`)
- Toggle stored in `localStorage` under key `lang`
- Every visible text has `<span class="ta">` and `<span class="en">` — CSS shows/hides based on `[data-lang]`
- Anti-flash: inline script in `<head>` reads localStorage before paint
- Fonts: Tamil = Noto Sans Tamil, English headings = Fraunces, English body = Inter

## Development Workflow

1. Create a feature branch: `git checkout -b feat/description`
2. Make changes — dev server hot-reloads
3. Pre-commit hooks auto-run: Prettier + ESLint on staged files
4. Commit with conventional format: `feat:`, `fix:`, `chore:`, etc.
5. Push and create PR to `main`
6. Merge to `main` triggers Netlify deploy

## Deploying to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and click "Add new site" > "Import an existing project"
2. Connect to GitHub and select `smithsamsonvj/ariviyalpottai`
3. Netlify auto-detects settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 22
4. Click "Deploy site"
5. Set custom domain: Site settings > Domain management > Add custom domain > `ariviyalpottai.in`
6. Netlify provisions SSL automatically

## Running Lighthouse Locally

```bash
npm run build
npx @lhci/cli autorun --collect.staticDistDir=./dist
```

Thresholds (in `lighthouserc.json`): Performance >= 90, Accessibility >= 95, Best Practices >= 90, SEO >= 90.

## Troubleshooting

| Issue                     | Fix                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Build fails on content    | Check frontmatter matches Zod schema in `src/content.config.ts`. Error message tells you which field is wrong.                   |
| Wrong language on load    | Clear localStorage (`localStorage.removeItem('lang')`) or check that `<script is:inline>` is in `<head>` of Base.astro           |
| Fonts not loading         | Check network tab for Google Fonts request. The `<link rel="preload">` in Base.astro handles non-blocking loading.               |
| Pre-commit hook fails     | Run `npm run lint` and `npm run format` manually to see errors, then fix and re-commit                                           |
| Competition not appearing | Verify the `.md` file is in `src/content/competitions/` and has valid frontmatter. Run `npm run build` to see validation errors. |

## Key Files

| File                          | Purpose                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| `src/content.config.ts`       | Zod schema — defines what fields each competition must have |
| `src/data/content.ts`         | All UI strings (COPY), helper functions, editorial content  |
| `src/layouts/Base.astro`      | HTML shell, meta tags, font loading, anti-flash script      |
| `src/components/TopBar.astro` | Sticky navigation with language toggle                      |
| `netlify.toml`                | Build + deploy config for Netlify                           |
| `lighthouserc.json`           | Lighthouse CI score thresholds                              |

## Repo

- **GitHub**: https://github.com/smithsamsonvj/ariviyalpottai (private)
- **Stack**: Astro 6 + TypeScript + vanilla CSS
- **Hosting**: Netlify (to be configured)
