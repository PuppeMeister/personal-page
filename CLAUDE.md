# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server on localhost:3000
npm run build      # Production build to /build
npm run test       # Jest tests (watch mode)
npm run deploy     # Build + deploy to GitHub Pages
```

## Stack

- React 18 + TypeScript (strict, ES5 target) via Create React App (react-scripts)
- SCSS for all styling — component SCSS files live in `src/assets/styles/`
- MUI 5 for UI components (AppBar, Drawer, TextField, Chip) — **not** wrapped in MUI ThemeProvider
- FontAwesome for icons, `react-vertical-timeline-component` for the experience section
- `gh-pages` for deployment

## Architecture

Single-page portfolio app with no router. Navigation uses `scrollIntoView` targeting section IDs (`expertise`, `professional-experience`, `projects`, `publication`, `contact`).

**Theme:** `App.tsx` holds `mode` state (`"dark-mode"` | `"light-mode"`), applied as a CSS class on `.main-container`. Both themes are defined in `src/index.scss` using descendant selectors — MUI components are styled via inline `sx` props, not ThemeProvider.

**Props:** Navigation receives `parentToChild` (containing `mode`) and `modeChange` callback as `any` typed props — old prop-drilling pattern, no Context.

**FadeIn wrapper** (`src/components/FadeIn.tsx`): Staggered entrance animation using `maxIsVisible` state counter. Wraps all page sections in `App.tsx`.

**Barrel export:** All components are re-exported from `src/components/index.js`.

## Key Patterns

- Dark/light mode is purely CSS class–based; toggle by swapping `.dark-mode` / `.light-mode` on `.main-container`
- Responsive breakpoints at 768px and 567px in SCSS; mobile navigation uses an MUI Drawer
- `Expertise` and `Publication` components share identical structure — they are intentional duplicates, not shared abstractions
- EmailJS integration in `Contact.tsx` is commented out; the form validates but does not send
