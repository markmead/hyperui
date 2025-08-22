# HyperUI Feature Implementation Plan

This plan captures only the features you explicitly bookmarked plus the clarifications you requested. No new ideas have been introduced. Each item lists: Goal, Scope, Key Tasks, Data / Code Touchpoints, Complexity, and Status (New / Existing / Clarify / Optional).

---

## Summary Table

| ID  | Feature                   | Status      |
| --- | ------------------------- | ----------- |
| 1.1 | Command Palette           | Completed   |
| 1.2 | Related Components        | Completed   |
| 2.1 | Group Counts              | Completed   |
| 3.1 | Split View                | Not started |
| 3.2 | Permalinks                | Not started |
| 3.3 | A11y Audit Script         | Not started |
| 4.1 | Favorites                 | Not started |
| 4.2 | Recently Viewed           | Not started |
| 4.3 | Custom Collections        | Not started |
| 4.4 | Settings Panel            | Not started |
| 5.1 | Reading Time              | Completed   |
| 6.1 | Batch Download            | Not started |
| 6.2 | CLI / Starter             | Not started |
| 7.1 | Keyboard Preview Controls | Not started |
| 7.2 | Jump Links                | Not started |
| 7.3 | Copy Announce             | Not started |
| 8.1 | Structured Data           | Not started |
| 8.2 | Dynamic OG                | Not started |

---

## 1. Discovery & Navigation

### 1.1 Command Palette (⌘K)

Completed.

### 1.2 Related Components Panel

Completed.

---

## 2. Search Improvements

### 2.1 Inline Result Group Counts

Completed.

---

## 3. Component Preview UX

### 3.1 Split View Toggle

Goal: View preview + code simultaneously
Scope: Add `showSplit` state; responsive: stack on small screens (vertical), two-column on `lg:`

- Wrap existing conditional in layout wrapper that renders both when `showSplit`
- Sync code type buttons and copy actions

### 3.2 Shareable Permalinks

Goal: Deep link to a specific component preview state
Scope: Encode state in URL hash: `#component-3?view=split&type=jsx&rtl=1&w=640`

- Serialize state on change (debounce to avoid flicker)
- Parse on mount & apply (validate components exist before scroll)
- Update `history.replaceState` instead of push to avoid back button noise

### 3.3 Project-Level A11y Audit

Goal: Automated accessibility checks across all component HTML variants

- Node script enumerates component HTML files (`public/components/**/**/[id].html`)
- Loads each into headless browser (Playwright or Puppeteer) OR JSDOM + axe-core
- Runs axe-core rules; outputs JSON + summary markdown (violations grouped by rule)
- Fails CI if severity threshold exceeded (configurable allowlist for known false positives)

Implementation:

- Script: `scripts/a11y-audit.mjs`
- Use `axe-core` npm package with `jsdom` for speed; if needing layout-dependent checks (color contrast already works), consider Playwright
- Output: `reports/a11y/<timestamp>.json` + `reports/a11y/summary.md`

---

## 4. Personalization (Local-First)

### 4.1 Favorites

Goal: Quick reference and collection page of starred components.
Implementation: LocalStorage set of `{category, slug, id}`; star button in `ComponentPreview` & listing page `/favorites`.

### 4.2 Recently Viewed

Goal: Navigation memory; show last N (e.g., 8) items in header dropdown.
Implementation: Queue in LocalStorage; update on component view intersection.

### 4.3 Custom Collections

Goal: User-defined named bundles (e.g., "Dashboard").
Implementation: LocalStorage object mapping collectionName -> array of component keys. Simple manage dialog.

### 4.4 Settings Panel

Goal: Persist user defaults (code language, preview width, RTL, theme, split view).
Implementation: Context + LocalStorage; small modal accessible from header.

---

## 5. Documentation & Learning

### 5.1 Estimated Reading Time

Completed.

---

## 6. Export & Integration

### 6.1 Batch Download Selected Components

Goal: Productivity: quickly pull a curated set into a project
Implementation: Client collects selection -> POST to route building ZIP (use `archiver` or `jszip`); includes HTML + minimal README + optional aggregated plugin list

### 6.2 NPM Starter Package / CLI (Internal Value)

Goal: Personal tooling (quick scaffold) even if low external usage
Implementation: Separate package repo later; placeholder script enumerating selected components copying into user path

---

## 7. Accessibility & Keyboard Power

### 7.1 Full Keyboard Support for Preview Controls

### 7.2 Jump Links (In-Page Nav for Components)

### 7.3 Announce Copy Action

---

## 8. SEO & Meta

### 8.1 Structured Data (JSON-LD)

Goal: Rich results for blog & component catalog
Implementation: Inject `<script type="application/ld+json">` per page; Component collection pages as `ItemList`, blog posts as `Article`

### 8.2 Open Graph per Collection & Blog with Dynamic Counts

Goal: Sharable cards reflecting number of components or last updated date
Implementation: Edge OG image generation route (`/api/og`) or static pre-render using Satori / @vercel/og. Include counts from index
