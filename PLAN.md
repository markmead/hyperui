# HyperUI Feature Implementation Plan

This plan captures only the features you explicitly bookmarked plus the clarifications you requested. No new ideas have been introduced. Each item lists: Goal, Scope, Key Tasks, Data / Code Touchpoints, Complexity, and Status (New / Existing / Clarify / Optional).

---

## 1. Discovery & Navigation

### 1.1 Command Palette (⌘K)

Goal: Instant fuzzy jump to components, collections, blog posts.
Scope: Modal overlay with keyboard activation (⌘K / Ctrl+K), arrow navigation, Enter to visit.
Key Tasks:

- Build search index (reuse 2.x index) loaded once.
- Component `CommandPalette.jsx` mounted in `layout.jsx`.
- Global key listener & focus trap.
- Result ranking (reuse 2.2 scoring).
  Touchpoints: `app/layout.jsx`, new `src/components/global/CommandPalette.jsx`, search index JSON.
  Complexity: Medium.
  Status: New.

### 1.2 Site Dark Mode Toggle

Goal: Allow users to view entire site (docs + previews) in dark UI shell (separate from component dark variants you declined later).
Scope: Global theme toggle (light/dark) persisted in `localStorage` & `prefers-color-scheme` fallback; inject `class="dark"` on `<html>`.
Key Tasks:

- Add a small `useTheme` hook.
- Tailwind config already v4 (supports dark class). Ensure styles rely on `dark:` utilities (minimal pass may be required later).
  Touchpoints: `app/layout.jsx`, global header (add toggle control), site stylesheet for any base tokens.
  Complexity: Medium (styling audit risk). Start with structural toggle first.
  Status: New.

### 1.3 “New / Updated” Badges & Sort

Goal: Surface component freshness.
Scope: Already present (your note). Keep as-is; ensure consistent badge styling.
Status: Existing.

### 1.5 Related Components Panel

Goal: Suggest exploration from a collection / component page.
Scope: Show 3–6 related items by shared `tag` > overlapping `terms` > same category fallback.
Key Tasks:

- Similarity scoring function.
- Client-side module fed by fetched component list.
  Touchpoints: Collection detail page component.
  Complexity: Low.
  Status: New.

---

## 2. Search Improvements

### 2.1 Pre-built Search Index

Goal: Faster search, single network fetch.
Scope: Static JSON: `{ id, type, title, slug, category, tag, terms, updated }`.
Key Tasks:

- Build script reads MDX frontmatter via existing `database.js` helpers.
- Emit `/public/search-index.json` before build (script run in `postbuild` chain or separate `prepare`).
  Touchpoints: New script `scripts/generate-search-index.mjs`, `package.json` scripts, `HeaderSearch.jsx`.
  Complexity: Low.
  Status: New.

### 2.2 Fuzzy Matching & Weighted Ranking ("kinda have")

Goal: Improve relevance beyond substring.
Scope: Lightweight custom scorer (no dependency) -> Score breakdown: title (5), tag (3), terms (2), category (1), prefix bonus (+2), exact match (+4).
Key Tasks:

- Implement scoring util consumed by 2.1 & 1.1.
  Touchpoints: `src/service/search/scorer.js` (new), integrate in `HeaderSearch.jsx` & Command Palette.
  Complexity: Low.
  Status: Enhancement of existing.

### 2.3 Highlight Matches in Results (Clarification)

Purpose: Visual feedback; faster scanning.
Implementation Detail:

- During scoring, store matched ranges per field.
- Simple function wraps matched substrings in `<mark>` with accessible styling.
- Avoid dangerouslySetInnerHTML by splitting text nodes.
  Edge Cases: Overlapping ranges (merge first), long titles (truncate after highlight).
  Complexity: Low.
  Status: Clarify -> Include.

### 2.4 Keyboard Navigation in Dropdown

Goal: Full keyboard accessibility.
Scope: Up/Down cycles through visible combined list (components then blogs), Enter selects, Esc closes, Tab maintains focus order.
Key Tasks:

- Manage `activeIndex` in state.
- Scroll item into view on change.
- `aria-activedescendant` + listbox roles (optional but recommended).
  Complexity: Low.
  Status: New.

### 2.5 Inline Result Group Counts & “View All” (Clarification)

Meaning: Show group headers with counts: "Components (12)" / "Blogs (3)" + a trailing row linking to a dedicated search results page (or filtered category) that shows full paginated set if truncated (e.g., show top 8 inline, link to "View all components for ‘badge’").
Value: Communicates depth of results and offers extended exploration beyond dropdown limit.
Implementation:

- Add configurable truncate limit (e.g., 8 each) & conditional tail link.
- Optional `?q=` page to render full list reusing index (no new API call).
  Complexity: Low.
  Status: Clarify -> Include.

---

## 3. Component Preview UX

### 3.1 Split View Toggle

Goal: View preview + code simultaneously.
Scope: Add `showSplit` state; responsive: stack on small screens (vertical), two-column on `lg:`.
Key Tasks:

- Wrap existing conditional in layout wrapper that renders both when `showSplit`.
- Sync code type buttons and copy actions.
  Complexity: Low.
  Status: New.

### 3.2 Shareable Permalinks

Goal: Deep link to a specific component preview state.
Scope: Encode state in URL hash: `#component-3?view=split&type=jsx&rtl=1&w=640`.
Key Tasks:

- Serialize state on change (debounce to avoid flicker).
- Parse on mount & apply (validate components exist before scroll).
- Update `history.replaceState` instead of push to avoid back button noise.
  Complexity: Medium.
  Status: New.

### 3.3 Embed Snippet Generator (Responsiveness Concern)

Feasibility: Responsive can be preserved. Strategy:

- Dedicated `/embed/[category]/[slug]/[id]` minimal route (no header/footer) sets `<meta name="viewport">` and allows fluid width.
- Outer consumer includes `<iframe style="width:100%;border:0;" allowtransparency="true">` so iframe width tracks container. Inside, component uses regular Tailwind responsive classes — they work because iframe has correct width.
- Height Auto-Resize: PostMessage from iframe measuring `document.body.scrollHeight` (ResizeObserver). Parent script adjusts iframe height inline.
- Dark variant remains controlled inside (not coupled to site theme toggle unless query param `?theme=dark`).
  Conclusion: Responsive embed is achievable without sacrificing fluid behavior; you can optionally ship a tiny snippet that auto-resizes height.
  Complexity: Medium.
  Status: New (Optional if later deprioritized).

### 3.5 Copy Language (Already Present)

Status: Existing; no action.

### 3.6 Project-Level A11y Audit (Clarification)

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
  Status: New.

### 3.7 Dark/Light Sync

Status: Declined / Not Included.

---

## 4. Personalization (Local-First)

### 4.1 Favorites

Goal: Quick reference and collection page of starred components.
Implementation: LocalStorage set of `{category, slug, id}`; star button in `ComponentPreview` & listing page `/favorites`.
Status: New.

### 4.2 Recently Viewed

Goal: Navigation memory; show last N (e.g., 8) items in header dropdown.
Implementation: Queue in LocalStorage; update on component view intersection.
Status: New.

### 4.3 Custom Collections

Goal: User-defined named bundles (e.g., "Dashboard").
Implementation: LocalStorage object mapping collectionName -> array of component keys. Simple manage dialog.
Status: New.

### 4.4 Settings Panel

Goal: Persist user defaults (code language, preview width, RTL, theme, split view).
Implementation: Context + LocalStorage; small modal accessible from header.
Status: New.

---

## 5. Documentation & Learning

### 5.1 Blog TOC & Scroll Spy

Status: New.

### 5.2 Estimated Reading Time

Status: New.

### 5.3 Series / Related Posts (Low Frequency Blogging OK)

Status: New (Lightweight: group by `series` frontmatter).

---

## 7. Export & Integration

### 7.1 Batch Download Selected Components

Goal: Productivity: quickly pull a curated set into a project.
Implementation: Client collects selection -> POST to route building ZIP (use `archiver` or `jszip`); includes HTML + minimal README + optional aggregated plugin list.
Status: New.

### 7.2 NPM Starter Package / CLI (Internal Value)

Goal: Personal tooling (quick scaffold) even if low external usage.
Implementation: Separate package repo later; placeholder script enumerating selected components copying into user path.
Status: New (defer infrastructure).

### 7.4 JSON API for Components (Clarification)

Meaning: Public (or local) endpoint `/api/components` returning metadata (NOT full HTML code) enabling:

- External tooling (e.g., your future CLI can fetch index).
- IDE integrations / search offline caching.
- Third-party site referencing component catalog programmatically.
  Security: Metadata only; code retrieval still via existing static HTML paths.
  Caching: Statically generated or at least `Cache-Control: s-maxage=...`.
  Status: New.

---

## 8. Theming & Customization

### 8.1 Live Color Palette Swapper

Goal: Allow users to experiment with Tailwind CSS variable-driven palettes against components.
Implementation: Panel exposes semantic tokens (primary, secondary, accent). Inject `<style>` into preview iframe root overriding CSS vars or generate dynamic Tailwind layer if using CSS vars naming pattern.
Status: New.

---

## 9. Performance & Resilience (Only Clarification Requested)

### 9.1 Idle-Time Prefetch vs IntersectionObserver (Clarification)

Why Consider: IntersectionObserver fetches only when in view (good for bandwidth) but preview code transforms cause a visible delay on first toggle. Idle prefetch during CPU/network idle warms cache & transformation so code view toggles are instant.
Trade-Off: Slight extra network early; mitigated by limiting to _next N_ components and aborting if user navigates away. Optional enhancement—can skip initially.
Decision: Keep optional; not in committed scope unless later re-evaluated.
Status: Optional (Not Included Now).

---

## 10. Accessibility & Keyboard Power

### 10.1 Full Keyboard Support for Preview Controls

Status: New.

### 10.2 Jump Links (In-Page Nav for Components)

Status: New.

### 10.4 Announce Copy Action

Status: New.

---

## 13. SEO & Meta

### 13.1 Structured Data (JSON-LD)

Goal: Rich results for blog & component catalog.
Implementation: Inject `<script type="application/ld+json">` per page; Component collection pages as `ItemList`, blog posts as `Article`.
Status: New.

### 13.2 Sitemap Component Detail URLs (Clarification)

Meaning: Today sitemap likely lists pages (categories, collections, blog posts). If you want individual component anchor states indexed, anchors (`#component-3`) are not parsed by crawlers. Two approaches:

- (A) Skip (simple).
- (B) Generate lightweight virtual pages (e.g., `/components/application/buttons/component-3`) that render the same collection page but scroll server-side (could increase crawl surface). Mainly useful if you want long-tail search for specific component names.
  Recommendation: Probably **not** needed now; keep to collection-level. Marking as Clarified but _Not Included_ unless you later decide to generate dedicated per-component routes.
  Status: Clarified (Not Included Now).

### 13.3 Open Graph per Collection & Blog with Dynamic Counts

Goal: Sharable cards reflecting number of components or last updated date.
Implementation: Edge OG image generation route (`/api/og`) or static pre-render using Satori / @vercel/og. Include counts from index.
Status: New.

---

## Summary Table

(Condensed for quick scan)

| ID   | Feature                      | Status                   |
| ---- | ---------------------------- | ------------------------ |
| 1.1  | Command Palette              | New                      |
| 1.2  | Site Dark Mode Toggle        | New                      |
| 1.3  | New/Updated Badges           | Existing                 |
| 1.5  | Related Components           | New                      |
| 2.1  | Pre-built Search Index       | New                      |
| 2.2  | Fuzzy Weighted Ranking       | Enhancement              |
| 2.3  | Highlight Matches            | New                      |
| 2.4  | Keyboard Navigation (Search) | New                      |
| 2.5  | Group Counts & View All      | New                      |
| 3.1  | Split View                   | New                      |
| 3.2  | Permalinks                   | New                      |
| 3.3  | Embed Generator              | New (Optional)           |
| 3.5  | Copy Language                | Existing                 |
| 3.6  | A11y Audit Script            | New                      |
| 4.1  | Favorites                    | New                      |
| 4.2  | Recently Viewed              | New                      |
| 4.3  | Custom Collections           | New                      |
| 4.4  | Settings Panel               | New                      |
| 5.1  | Blog TOC                     | New                      |
| 5.2  | Reading Time                 | New                      |
| 5.3  | Series / Related Posts       | New                      |
| 7.1  | Batch Download               | New                      |
| 7.2  | CLI / Starter                | New                      |
| 7.4  | JSON API                     | New                      |
| 8.1  | Palette Swapper              | New                      |
| 9.1  | Idle Prefetch                | Optional (Not Included)  |
| 10.1 | Keyboard Preview Controls    | New                      |
| 10.2 | Jump Links                   | New                      |
| 10.4 | Copy Announce                | New                      |
| 13.1 | Structured Data              | New                      |
| 13.2 | Sitemap Component URLs       | Clarified (Not Included) |
| 13.3 | Dynamic OG                   | New                      |

---

## Proposed Implementation Phases

1. Core Search & Navigation: 2.1, 2.2, 2.3, 2.4, 2.5, 1.1
2. Preview Enhancements: 3.1, 3.2, 10.1, 10.4, 3.6
3. Personalization: 4.1–4.4, 1.5
4. Content & SEO: 5.1–5.3, 13.1, 13.3
5. Export & Integration: 7.1, 7.4, (7.2 scaffold after JSON API)
6. Theming: 1.2, 8.1
7. Optional / Nice-to-Have: 3.3, 9.1 (if performance justified)

---

## Immediate Low-Risk Starters (Good First PRs)

- Implement search index build script (2.1) + integrate fuzzy scoring (2.2).
- Add highlight & keyboard nav in existing `HeaderSearch.jsx` (2.3, 2.4) using new index.
- Add aria-live copy announce & toolbar roles to preview controls (10.1, 10.4).

---

## Notes

- No unrequested features added.
- Clarifications provided only where you asked.
- Optional items explicitly marked so they can be deferred without blocking others.

End of plan.
