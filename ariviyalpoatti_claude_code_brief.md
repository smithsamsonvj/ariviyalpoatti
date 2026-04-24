# Claude Code Brief — ariviyalpoatti.in

> Read this file fully before writing a single line of code.
> Read the design README.md next. Then start.

---

## Project overview

Build a bilingual (Tamil + English) static website about school-level science competitions in Tamil Nadu, India.

- **Site name:** ariviyalpoatti.in — அறிவியல் போட்டி
- **Purpose:** Free public resource. No backend, no database, no authentication.
- **Audience:** Science teachers, school principals, and parents of school-age children in Tamil Nadu

---

## Stack — locked

| Decision   | Choice                                                |
| ---------- | ----------------------------------------------------- |
| Framework  | Astro                                                 |
| Hosting    | Netlify (auto-deploy on push to main)                 |
| Styling    | CSS custom properties — no Tailwind, no CSS framework |
| Components | Astro components only — no React, no Vue for v1       |
| Node       | LTS                                                   |

---

## Design files — source of truth

The following files are provided and must drive all visual decisions:

- **HTML component files** from Claude Design — convert directly into Astro components
- **PNG screenshots** — pixel-level fidelity reference for each page
- **README.md** from the design package — read before touching any code
- **Index file** — entry point reference

Do not deviate from the design files. When in doubt, refer to the PNG screenshots.

---

## Colour palette — hardcoded, do not change

Define as CSS custom properties in `global.css`. Every component uses these variables — no hardcoded hex values anywhere in components.

```css
:root {
  --color-primary: #0d5c63; /* Deep Teal — headers, nav, hero */
  --color-background: #f5f0e8; /* Warm Ivory — page background */
  --color-accent: #b5603a; /* Chola Bronze — CTAs only, use sparingly */
  --color-sage: #5c7c6f; /* Soft Sage — tags, labels, secondary text */
  --color-text: #1a1a2e; /* Near Black — all body text */
}
```

---

## Typography — locked

Load via Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Tiro+Tamil&family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

| Font              | Use                               |
| ----------------- | --------------------------------- |
| Tiro Tamil        | Tamil script body text            |
| DM Serif Display  | English headings and hero text    |
| DM Sans 400 / 500 | English body, labels, UI elements |

Tamil and English font stacks must be defined separately and applied contextually. Tamil content always renders in Tiro Tamil — never DM Sans.

```css
.en {
  font-family: 'DM Sans', sans-serif;
}
.en h1,
.en h2 {
  font-family: 'DM Serif Display', serif;
}
.ta {
  font-family: 'Tiro Tamil', serif;
}
```

---

## Site map

```
/                      → Home
/competitions          → Competition listing
/competitions/[slug]   → Competition detail (dynamic route)
/key-dates             → Deadline tracker
/start-here            → Tabbed by Teacher / Principal / Parent
/why-this-exists       → About
```

---

## Content architecture — critical

Competitions are not hardcoded pages. Use **Astro Content Collections**.

Set up `/src/content/competitions/` — one markdown file per competition.

### Frontmatter schema

```markdown
---
title_en: 'INSPIRE-MANAK'
title_ta: 'இன்ஸ்பயர்-மாணக்'
slug: 'inspire-manak'
eligible_classes_en: 'Classes 6 to 10'
eligible_classes_ta: '6 முதல் 10 வரை'
process_en: ''
process_ta: ''
deadline_start: '2025-06-01'
deadline_end: '2025-09-30'
portal_url: 'https://www.inspireaward.dst.gov.in'
active: true
---
```

### Competitions at launch

| File                  | Competition      |
| --------------------- | ---------------- |
| `inspire-manak.md`    | INSPIRE-MANAK    |
| `rbvp-jnnsmee.md`     | RBVP / JNNSMEE   |
| `vaanavil-mandram.md` | Vaanavil Mandram |

> Adding a new competition in future = dropping a new markdown file. Nothing else changes.

---

## Bilingual toggle — behaviour

- **Default language on load:** Tamil
- Toggle visible in nav, persistent across all pages
- User preference stored in `localStorage`
- Implementation: `data-lang` attribute on root `<html>` element

```html
<!-- Tamil default -->
<html data-lang="ta"></html>
```

```css
[data-lang='en'] .ta {
  display: none;
}
[data-lang='ta'] .en {
  display: none;
}
```

```js
// Toggle handler
const toggle = () => {
  const lang = document.documentElement.dataset.lang === 'ta' ? 'en' : 'ta'
  document.documentElement.dataset.lang = lang
  localStorage.setItem('lang', lang)
}

// On load — restore preference
const saved = localStorage.getItem('lang') || 'ta'
document.documentElement.dataset.lang = saved
```

Every component must have both language versions present in the DOM. CSS shows and hides based on `data-lang`. No page reload required.

---

## Page specifications

### Home (`/`)

- Hero: site name in both scripts, one-line description in both languages
- Three audience cards: Teacher / Principal / Parent
  - Each links to `/start-here?for=teacher` (or principal / parent)
- Urgency strip: nearest upcoming competition deadline — pulled from content collections, calculated at build time
- Mobile: cards stacked vertically. Desktop: three-column grid

### Competitions (`/competitions`)

- Card grid — one card per competition, generated from content collection
- Each card: competition name (both languages), eligible classes, deadline, link to detail page
- Responsive grid: 1 col mobile → 2 col tablet → 3 col desktop
- Scales automatically as new markdown files are added

### Competition detail (`/competitions/[slug]`)

- Dynamic route from content collection
- Sections in order: What it is / Who can participate / The process / Key dates / Official portal
- All sections bilingual
- CTA button to official portal — opens in new tab

### Key Dates (`/key-dates`)

- All competition deadlines from content collection frontmatter
- Sorted chronologically — nearest first
- Each entry: competition name (bilingual), deadline window, link to detail page
- Designed to be bookmarked and shared via WhatsApp — clean, scannable, no clutter

### Start Here (`/start-here`)

- Three tabs: Teacher / Principal / Parent
- Tab pre-selected via URL param `?for=teacher` / `?for=principal` / `?for=parent`
- Each tab: tailored action path for that audience with links to relevant competitions
- All content bilingual

### Why This Exists (`/why-this-exists`)

- Single column, editorial layout
- Short honest text — who built this, why, what gap it fills
- No images, no cards — well-set type only

---

## Project structure

```
/
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── CompetitionCard.astro
│   │   ├── AudienceCard.astro
│   │   ├── DeadlineStrip.astro
│   │   └── LanguageToggle.astro
│   ├── content/
│   │   └── competitions/
│   │       ├── inspire-manak.md
│   │       ├── rbvp-jnnsmee.md
│   │       └── vaanavil-mandram.md
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── competitions/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── key-dates.astro
│   │   ├── start-here.astro
│   │   └── why-this-exists.astro
│   └── styles/
│       └── global.css
├── public/
├── netlify.toml
└── astro.config.mjs
```

---

## Netlify configuration

Create `netlify.toml` at root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Mobile first — non-negotiable

- Every component designed mobile-first. Desktop is an enhancement.
- Primary user is on a smartphone.
- Touch targets minimum 44px.
- No hover-only interactions.

---

## Build order — follow this sequence

1. Read the design README.md
2. Initialise Astro project — `npm create astro@latest`
3. Set up `global.css` with colour variables and font imports
4. Convert Claude Design HTML components into Astro components one by one — use PNG screenshots as fidelity reference
5. Set up content collections with the three competition markdown files
6. Build pages in order — Home first, then Competitions, Key Dates, Start Here, Why This Exists
7. Wire bilingual toggle across all pages
8. Add `netlify.toml`
9. Test build — `npm run build` must complete without errors before handoff

---

## What not to do

- Do not use Tailwind or any CSS framework
- Do not use React or Vue components
- Do not hardcode hex colour values in components — always use CSS variables
- Do not hardcode competition data in page files — always pull from content collections
- Do not change the colour palette or fonts
- Do not add animations or transitions not present in the design files

---

_Brief prepared for ariviyalpoatti.in — அறிவியல் போட்டி_
_JAMstack · Astro · Netlify · Bilingual Tamil + English_
