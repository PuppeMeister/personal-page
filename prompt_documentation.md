# Prompt Documentation

A running log of prompts and responses in this project.

---

## 2026-06-11

**Prompt:** Guide me to publish the rss feed from my medium so it will show up in ARTICLES.tsx in a good software engineering manner.

**Response:** Implemented a two-layer Medium RSS integration for the Articles section (Medium handle `@rinnadia`). Since the site is static on GitHub Pages and Medium's RSS endpoint blocks browser CORS requests, the chosen architecture (user picked "both" after comparing build-time vs runtime options):

1. **Build-time fetch (primary)** — `scripts/fetch-articles.js` fetches `https://medium.com/feed/@rinnadia`, normalizes items (title, link without tracking params, ISO pubDate, first real image as thumbnail — Medium's 1px tracking pixel filtered out, ~200-char plain-text snippet, categories) and writes `src/data/articles.json`. Wired to the npm `prebuild` hook so it runs automatically on `npm run build` / `npm run deploy`; also runnable via `npm run fetch:articles`. Resilient: if the fetch fails but a cached JSON exists, the build proceeds with stale data. Supports `FEED_FILE=<path>` env var for offline testing.
2. **Runtime refresh (fallback/freshness layer)** — `src/utils/articles.ts` fetches the feed through rss2json.com at page load; on success the component swaps in fresh data, on any failure it silently keeps the build-time snapshot.

Files added/changed:

- `src/config/medium.json` — single source of truth for username + maxArticles (inside `src/` because CRA forbids imports from outside it)
- `scripts/fetch-articles.js` — build-time fetcher/parser (dependency-free Node)
- `src/data/articles.json` — generated snapshot (committed so builds work offline)
- `src/types/article.ts` — shared `Article` interface
- `src/utils/articles.ts` — runtime rss2json fetch + normalization
- `src/components/Articles.tsx` — rewritten: renders articles from JSON via `useState`/`useEffect`, removed the template's 10 hardcoded projects; cards reuse `Project.scss` grid styling, thumbnail hidden when absent
- `src/assets/styles/Project.scss` — added `.article-date` style
- `package.json` — added `fetch:articles` and `prebuild` scripts

Verified: script generates correct JSON from the live feed structure; `tsc --noEmit` passes. Note: current Medium posts are two Lorem-ipsum test posts with no images, so cards render without thumbnails until real posts with images are published.

---

## 2026-06-10

**Prompt:** How to get RSS feed from medium?

**Response:** Medium automatically generates RSS feeds for every profile and publication.

- For a user profile: `https://medium.com/feed/@username`
- For a publication: `https://medium.com/feed/publication-name`

Replace `username` or `publication-name` with the actual handle. The URL can be used in any RSS reader (Feedly, Inoreader, etc.) or fetched programmatically.

---

**Prompt:** do reanalyzing the project!

**Response:**

### Project Overview (Reanalysis — 2026-06-10)
React 18 + TypeScript single-page portfolio for **Rin Nadia**, built with Create React App, styled with SCSS + MUI 5, deployed to GitHub Pages.

### Component Inventory
| Component | Section ID | Status |
|---|---|---|
| `Main` | *(hero, no ID)* | ✅ Personalized — name, tagline, correct GitHub/LinkedIn links |
| `Navigation` | `#navigation` | ✅ Working — scroll-to-section, dark/light toggle, mobile Drawer |
| `Expertise` | `#expertise` | ⚠️ Lorem ipsum placeholder descriptions in all 3 cards |
| `Timeline` | `#professional-experience` | ✅ Real data — 5 entries from Jun 2015 → present |
| `Articles` | `#articles` | ⚠️ Shows "Coming soon..." but still renders the original template's 10 projects grid below it |
| `Publication` | `#publication` | ❌ Copy-paste of Expertise with no changes — still showing generic freelancer skill content, not actual publications |
| `Project` | `#projects` | ⚠️ Entire grid is commented out, only shows "Coming soon..." |
| `Contact` | `#contact` | ⚠️ Form validates but doesn't send — EmailJS commented out |
| `Footer` | *(no ID)* | ❌ Still links to template author `yujisatojr`, not Rin Nadia |

### Nav Items with broken/empty section targets
`Publications`, `Awards`, and `Blogs` all map to `''` — clicking them does nothing.

### Key Issues
1. **Articles component** renders the template's 10 projects (Filmate AI, games, etc.) that have nothing to do with Rin Nadia's articles.
2. **Publication** is a structural/content duplicate of Expertise — needs real academic publication data.
3. **Footer** social links still point to the original template author.
4. **Expertise descriptions** — all Lorem Ipsum; the tech stacks are relevant but the prose needs to be written.
5. **Contact form** — EmailJS keys needed to activate sending.
6. **Profile photo** — `fotodiri_bw_1.jpg` exists in assets but the `<img>` tag in `Main.tsx` is commented out.
7. **`mode` state** — initialized as `'dark'`/`'light'` (not `'dark-mode'`/`'light-mode'` as CLAUDE.md states); works correctly but CLAUDE.md docs are inaccurate.

### What's in Good Shape
- Hero section fully personalized (name, correct social links, tagline)
- Professional Experience timeline has real, accurate data
- Dark/light theme toggle works correctly
- Mobile responsiveness (MUI Drawer, SCSS breakpoints at 768px/567px) is functional
- Build artifacts are present (`/build`) and up to date

---

**Prompt:** Analyze the project!

**Response:**

### Project Overview
A React 18 + TypeScript single-page portfolio site for Rin Nadia, built on Create React App and deployed to GitHub Pages via `gh-pages`.

### Structure
- **8 components:** `Main`, `Navigation`, `Expertise`, `Timeline`, `Project`, `Publication`, `Contact`, `Footer` — all barrel-exported from `src/components/index.js`
- **FadeIn wrapper** in `App.tsx` provides staggered entrance animation for all sections
- **SCSS files** per component in `src/assets/styles/`; global theme via `src/index.scss`

### Sections
| Section | Status | Notes |
|---|---|---|
| Main (hero) | ✅ Active | Name + tagline + social icons |
| Core Competencies | ✅ Active | 3 skill categories with MUI Chips; descriptions are Lorem Ipsum placeholder |
| Professional Experience | ✅ Active | 7 timeline entries using `react-vertical-timeline-component` |
| Personal Projects | ⚠️ Placeholder | Grid of 10 projects is fully commented out; shows "Coming soon..." |
| Academic Publication | ⚠️ Stale | Copy-pasted from Expertise — still shows generic freelancer content (Full Stack, DevOps, GenAI), not actual publications |
| Contact | ⚠️ Incomplete | Form validates but doesn't send — EmailJS integration commented out |
| Footer | ⚠️ Wrong links | Points to original template author (yujisatojr), not Rin Nadia |

### Known Issues / TODOs
1. **Social links broken** — `Main.tsx` uses `href=""` for GitHub/LinkedIn; URLs are in `rel` attribute instead of `href`
2. **Footer links wrong** — still pointing to `yujisatojr`'s GitHub/LinkedIn
3. **Publication section** — is a copy of Expertise with no customization; needs actual publication content
4. **Projects section** — fully commented out with placeholder text
5. **Expertise descriptions** — all three cards have Lorem Ipsum body text
6. **Contact form non-functional** — EmailJS service/template/API key needed
7. **Nav items have duplicates and empty routes** — `navItems` array has `Projects` twice, and `Publications`, `Awards`, `Blogs` all have empty `''` as section IDs (clicking them does nothing)
8. **`mode` state bug** — `App.tsx` initializes mode as `'dark'` but the CSS class applied is `dark-mode`/`light-mode`; the conditional check is `mode === 'dark'` which works, but CLAUDE.md says the state is `"dark-mode" | "light-mode"` — actual code uses `"dark"` / `"light"` so docs are slightly off
9. **Profile photo commented out** — image import exists but `<img>` tag is commented out in `Main.tsx`

### Tech Debt
- `any` typed props on `Navigation` (old prop-drilling, no Context)
- `Publication` and `Expertise` are intentional duplicates (acknowledged in CLAUDE.md) but Publication has not been updated with real content
- `form` ref in `Contact.tsx` typed as `useRef()` without a generic type parameter
