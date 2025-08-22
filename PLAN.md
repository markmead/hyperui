# HyperUI Feature Implementation Plan

This plan captures only the features you explicitly bookmarked plus the clarifications you requested. No new ideas have been introduced. Each item lists: Goal, Scope, Key Tasks, Data / Code Touchpoints, Complexity, and Status (New / Existing / Clarify / Optional).

---

## Summary Table

| ID  | Feature                   | Status      |
| --- | ------------------------- | ----------- |
| 1.1 | Command Palette           | Completed   |
| 1.2 | Related Components        | Completed   |
| 2.1 | Group Counts              | Completed   |
| 3.1 | Permalinks                | Completed   |
| 4.1 | Favorites                 | Completed   |
| 4.2 | Recently Viewed           | Not started |
| 5.1 | Reading Time              | Completed   |
| 6.1 | Batch Download            | Not started |
| 6.2 | CLI / Starter             | Not started |
| 7.1 | Keyboard Preview Controls | Not started |
| 7.2 | Jump Links                | Not started |
| 7.3 | Copy Announce             | Not started |
| 8.1 | Structured Data           | Not started |
| 8.2 | Dynamic OG                | Not started |

---

## 4. Personalization

### 4.2 Recently Viewed

Goal: Navigation memory; show last N (e.g., 8) items in header dropdown.
Implementation: Queue in LocalStorage; update on component view intersection.

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
