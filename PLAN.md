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
| 5.1 | Reading Time              | Completed   |
| 6.1 | CLI / Starter             | Not started |
| 7.1 | Keyboard Preview Controls | Not started |
| 7.2 | Copy Announce             | In progress |
| 8.1 | Structured Data           | Not started |
| 8.2 | Dynamic OG                | Not started |

---

## 6. Export & Integration

### 6.1 NPM Starter Package / CLI

Goal: Personal tooling (quick scaffold) even if low external usage
Implementation: Separate package repo later; placeholder script enumerating selected components copying into user path

---

## 7. Accessibility & Keyboard Power

### 7.1 Full Keyboard Support for Preview Controls

### 7.2 Announce Copy Action

---

## 8. SEO & Meta

### 8.1 Structured Data (JSON-LD)

Goal: Rich results for blog & component catalog
Implementation: Inject `<script type="application/ld+json">` per page; Component collection pages as `ItemList`, blog posts as `Article`

### 8.2 Open Graph per Collection & Blog with Dynamic Counts

Goal: Sharable cards reflecting number of components or last updated date
Implementation: Edge OG image generation route (`/api/og`) or static pre-render using Satori / @vercel/og. Include counts from index
