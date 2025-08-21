# HyperUI Feature Implementation Plan

This plan captures only the features you explicitly bookmarked plus the clarifications you requested. No new ideas have been introduced. Each item lists: Goal, Scope, Key Tasks, Data / Code Touchpoints, Complexity, and Status (New / Existing / Clarify / Optional).

---

## Summary Table

(Condensed for quick scan)

| ID  | Feature                      | Status      |
| --- | ---------------------------- | ----------- |
| 1.1 | Command Palette              | Completed   |
| 1.2 | Site Dark Mode Toggle        | Not started |
| 1.3 | Related Components           | Not started |
| 2.1 | Keyboard Navigation (Search) | Not started |
| 2.2 | Group Counts & View All      | Not started |
| 3.1 | Split View                   | Not started |
| 3.2 | Permalinks                   | Not started |
| 3.3 | Embed Generator              | Not started |
| 3.4 | A11y Audit Script            | Not started |
| 4.1 | Favorites                    | Not started |
| 4.2 | Recently Viewed              | Not started |
| 4.3 | Custom Collections           | Not started |
| 4.4 | Settings Panel               | Not started |
| 5.1 | Blog TOC                     | Not started |
| 5.2 | Reading Time                 | Not started |
| 6.1 | Batch Download               | Not started |
| 6.2 | CLI / Starter                | Not started |
| 7.1 | Keyboard Preview Controls    | Not started |
| 7.2 | Jump Links                   | Not started |
| 7.3 | Copy Announce                | Not started |
| 8.1 | Structured Data              | Not started |
| 8.2 | Dynamic OG                   | Not started |

---

## Proposed Implementation Phases

1. Core Search & Navigation: 2.1–2.4, 1.1
2. Preview Enhancements: 3.1, 3.2, 7.1, 7.3, 3.4
3. Personalization: 4.1–4.4, 1.3
4. Content & SEO: 5.1, 5.2, 8.1, 8.2
5. Export & Integration: 6.1, 6.2
6. Theming: 1.2
7. Optional / Nice-to-Have: 3.3

---

## 1. Discovery & Navigation

### 1.1 Command Palette (⌘K)

Goal: Instant fuzzy jump to components, collections, blog posts.
Scope: Use the existing header search input, focus it with keyboard activation (⌘K / Ctrl+K), arrow navigation, Enter to visit.
Key Tasks:

- Build search index (reuse 2.x index) loaded once.
- Add global key listener in `layout.jsx` to focus the header search input on ⌘K / Ctrl+K.
- Ensure keyboard navigation and result ranking (reuse 2.2 scoring) work as expected in the search dropdown.
  Touchpoints: `app/layout.jsx`, `src/components/global/HeaderSearch.jsx`, search index JSON.
  Complexity: Medium.

### 1.2 Site Dark Mode Toggle

Goal: Allow users to view entire site (docs + previews) in dark UI shell (separate from component dark variants you declined later).
Scope: Global theme toggle (light/dark) persisted in `localStorage` & `prefers-color-scheme` fallback; inject `class="dark"` on `<html>`.
Key Tasks:

- Add a small `useTheme` hook.
- Tailwind config already v4 (supports dark class). Ensure styles rely on `dark:` utilities (minimal pass may be required later).
  Touchpoints: `app/layout.jsx`, global header (add toggle control), site stylesheet for any base tokens.
  Complexity: Medium (styling audit risk). Start with structural toggle first.

### 1.3 Related Components Panel

Goal: Suggest exploration from a collection / component page.
Scope: Show 3–6 related items by shared `tag` > overlapping `terms` > same category fallback.
Key Tasks:

- Similarity scoring function.
- Client-side module fed by fetched component list.
  Touchpoints: Collection detail page component.
  Complexity: Low.

---

## 2. Search Improvements

### 2.1 Keyboard Navigation in Dropdown

Goal: Full keyboard accessibility.
Scope: Up/Down cycles through visible combined list (components then blogs), Enter selects, Esc closes, Tab maintains focus order.
Key Tasks:

- Manage `activeIndex` in state.
- Scroll item into view on change.
- `aria-activedescendant` + listbox roles (optional but recommended).
  Complexity: Low.

### 2.2 Inline Result Group Counts & “View All” (Clarification)

Meaning: Show group headers with counts: "Components (12)" / "Blogs (3)" + a trailing row linking to a dedicated search results page (or filtered category) that shows full paginated set if truncated (e.g., show top 8 inline, link to "View all components for ‘badge’").
Value: Communicates depth of results and offers extended exploration beyond dropdown limit.
Implementation:

- Add configurable truncate limit (e.g., 8 each) & conditional tail link.
- Optional `?q=` page to render full list reusing index (no new API call).
  Complexity: Low.

---

## 3. Component Preview UX

### 3.1 Split View Toggle

Goal: View preview + code simultaneously.
Scope: Add `showSplit` state; responsive: stack on small screens (vertical), two-column on `lg:`.
Key Tasks:

- Wrap existing conditional in layout wrapper that renders both when `showSplit`.
- Sync code type buttons and copy actions.
  Complexity: Low.

### 3.2 Shareable Permalinks

Goal: Deep link to a specific component preview state.
Scope: Encode state in URL hash: `#component-3?view=split&type=jsx&rtl=1&w=640`.
Key Tasks:

- Serialize state on change (debounce to avoid flicker).
- Parse on mount & apply (validate components exist before scroll).
- Update `history.replaceState` instead of push to avoid back button noise.
  Complexity: Medium.

### 3.3 Embed Snippet Generator (Responsiveness Concern)

Feasibility: Responsive can be preserved. Strategy:

- Dedicated `/embed/[category]/[slug]/[id]` minimal route (no header/footer) sets `<meta name="viewport">` and allows fluid width.
- Outer consumer includes `<iframe style="width:100%;border:0;" allowtransparency="true">` so iframe width tracks container. Inside, component uses regular Tailwind responsive classes — they work because iframe has correct width.
- Height Auto-Resize: PostMessage from iframe measuring `document.body.scrollHeight` (ResizeObserver). Parent script adjusts iframe height inline.
- Dark variant remains controlled inside (not coupled to site theme toggle unless query param `?theme=dark`).
  Conclusion: Responsive embed is achievable without sacrificing fluid behavior; you can optionally ship a tiny snippet that auto-resizes height.
  Complexity: Medium.

### 3.4 Project-Level A11y Audit (Clarification)

Goal: Automated accessibility checks across all component HTML variants.
Approach:

- Node script enumerates component HTML files (`public/components/**/**/[id].html`).
- Loads each into headless browser (Playwright or Puppeteer) OR JSDOM + axe-core.
- Runs axe-core rules; outputs JSON + summary markdown (violations grouped by rule).
- Fails CI if severity threshold exceeded (configurable allowlist for known false positives).
  Implementation Outline:
- Script: `scripts/a11y-audit.mjs`.
- Use `axe-core` npm package with `jsdom` for speed; if needing layout-dependent checks (color contrast already works), consider Playwright.
- Output: `reports/a11y/<timestamp>.json` + `reports/a11y/summary.md`.
  Complexity: Medium.

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

### 5.1 Blog TOC & Scroll Spy

### 5.2 Estimated Reading Time

---

## 6. Export & Integration

### 6.1 Batch Download Selected Components

Goal: Productivity: quickly pull a curated set into a project.
Implementation: Client collects selection -> POST to route building ZIP (use `archiver` or `jszip`); includes HTML + minimal README + optional aggregated plugin list.
Status: New.

### 6.2 NPM Starter Package / CLI (Internal Value)

Goal: Personal tooling (quick scaffold) even if low external usage.
Implementation: Separate package repo later; placeholder script enumerating selected components copying into user path.

---

## 7. Accessibility & Keyboard Power

### 7.1 Full Keyboard Support for Preview Controls

### 7.2 Jump Links (In-Page Nav for Components)

### 7.3 Announce Copy Action

---

## 8. SEO & Meta

### 8.1 Structured Data (JSON-LD)

Goal: Rich results for blog & component catalog.
Implementation: Inject `<script type="application/ld+json">` per page; Component collection pages as `ItemList`, blog posts as `Article`.

### 8.2 Open Graph per Collection & Blog with Dynamic Counts

Goal: Sharable cards reflecting number of components or last updated date.
Implementation: Edge OG image generation route (`/api/og`) or static pre-render using Satori / @vercel/og. Include counts from index.

---
