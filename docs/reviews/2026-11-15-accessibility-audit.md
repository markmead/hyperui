# Accessibility audit: seven high-traffic components

**Standard:** WCAG 2.1 AA | **Date:** 2026-11-15 | **Run with:** the `/accessibility-review` skill

**Scope:** 70 HTML files, every light and dark variant of:

- `application/accordions`
- `application/badges`
- `application/charts`
- `marketing/cards`
- `marketing/banners`
- `templates/analytics-dashboard`
- `marketing/headers`

These are the seven most-visited component pages in the pageview export for 2026-10-16 to 2026-11-15. Category index pages are left out. Together they got 18,770 views, 11% of the site total.

**Not in scope:** the site itself. That means the homepage (29.5% of views), the category index pages (16.3%) and the preview toolbar on every component page. The only site-level check was the `title` on the preview iframes. See "Next".

## Method

1. **Automated scan.** axe-core 4.10.3 in Playwright Chromium at 1280×900, with the WCAG 2.0/2.1 A and AA rule tags, run against `public/examples/**` served locally with the committed `public/component.css`.
2. **Keyboard pass.** Tabbing through every light variant and flagging any focused element with no outline and no box-shadow.
3. **Markup review.** Reading the files for ARIA patterns, labels and the state handling in their scripts.

We haven't tested with a real screen reader (VoiceOver or NVDA), so read the screen reader notes as predictions.

## Summary

**Issues found:** 9 | **Critical:** 1 | **Major:** 6 | **Minor:** 2

**What passed:**

- Every tab stop has a visible focus indicator.
- The accordions use native `<details>`/`<summary>` and are clean.
- The badge remove buttons have screen-reader text ("Remove badge").
- The chart and dashboard range toggles update `aria-pressed` correctly.
- Every preview `<iframe>` in `ComponentPreview.astro` has a `title`.

## Findings

### Perceivable

| #   | Issue                                                                                                                                                                       | WCAG  | Severity | Where                                                                  | Fix                                                                                              |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | Charts have no text alternative for their data: `<canvas role="img">` with a title-only `aria-label`, e.g. "Monthly revenue, line chart"                                    | 1.1.1 | 🟡 Major | `application/charts/1–11` and `templates/analytics-dashboard`          | Add a visually hidden `<table>` of the data, or an `aria-describedby` summary of the key figures |
| 2   | The Login and Register buttons fail contrast: white on `teal-600` is 3.7:1, `teal-600` on `gray-100` is 3.36:1                                                              | 1.4.3 | 🟡 Major | `marketing/headers/1–3`, light and dark                                | Change `teal-600` to `teal-700`                                                                  |
| 3   | The percentage badges fail contrast: `green-600` on `green-100` is 2.95:1, `red-600` on `red-100` is 4.0:1                                                                  | 1.4.3 | 🟡 Major | `templates/analytics-dashboard/1`                                      | Change them to `green-800` and `red-700`                                                         |
| 4   | Smaller contrast failures: `indigo-600` on `gray-900` is 2.74:1 (large text, needs 3:1), `opacity-50` text is 3.94:1, and the white "Solved!" pill on `green-600` is 3.21:1 | 1.4.3 | 🟢 Minor | `marketing/banners/1–3-dark`, `marketing/cards/7`, `marketing/cards/9` | Use `dark:text-indigo-400`, `text-gray-600` instead of `opacity-50`, and `bg-green-700`          |

### Operable

| #   | Issue                                                                | WCAG  | Severity | Where               | Fix                                                       |
| --- | -------------------------------------------------------------------- | ----- | -------- | ------------------- | --------------------------------------------------------- |
| 5   | An image link has no accessible name (`<a>` wrapping `<img alt="">`) | 2.4.4 | 🟡 Major | `marketing/cards/9` | Give the image `alt` text or add `aria-label` to the link |

### Understandable

| #   | Issue                                                                                              | WCAG  | Severity    | Where                             | Fix                                                                                                |
| --- | -------------------------------------------------------------------------------------------------- | ----- | ----------- | --------------------------------- | -------------------------------------------------------------------------------------------------- |
| 6   | Three settings toggles (email notifications, product updates, weekly summary) have no label at all | 3.3.2 | 🔴 Critical | `templates/analytics-dashboard/5` | Wrap each `sr-only` checkbox in a `<label>`, or add `aria-labelledby` pointing at the visible text |

### Robust

| #   | Issue                                                                                                                                                                                                             | WCAG  | Severity | Where                               | Fix                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7   | The sidebar toggle is a hidden checkbox (`#sidebar-toggle`), so screen readers announce "checkbox" instead of "button, collapsed". The script sets `aria-expanded` on a `<label>`, where screen readers ignore it | 4.1.2 | 🟡 Major | `templates/analytics-dashboard/1–5` | Use a `<button aria-expanded aria-controls="dashboard-sidebar">`                                                                                                    |
| 8   | The mobile "Toggle menu" button has no `aria-expanded` or `aria-controls` and doesn't open anything                                                                                                               | 4.1.2 | 🟡 Major | `marketing/headers/*`               | Add `aria-expanded` and `aria-controls` plus a target (a small script or `popover`). As it stands, people copy a button that does nothing                           |
| 9   | Example files have no `<title>`                                                                                                                                                                                   | 2.4.2 | 🟢 Minor | All 70 files                        | Not a problem for users, since the iframe has a title. But it fails automated checks, so add a `<title>` to each file or switch the `document-title` rule off in CI |

## Colour contrast check

| Element                   | Foreground             | Background            | Ratio  | Required    | Pass? |
| ------------------------- | ---------------------- | --------------------- | ------ | ----------- | ----- |
| Header "Login" button     | `#ffffff`              | `#009689` (teal-600)  | 3.7:1  | 4.5:1       | ❌    |
| Header "Register" button  | `#009689` (teal-600)   | `#f3f4f6` (gray-100)  | 3.36:1 | 4.5:1       | ❌    |
| Dashboard positive change | `#00a63e` (green-600)  | `#dcfce7` (green-100) | 2.95:1 | 4.5:1       | ❌    |
| Dashboard negative change | `#e7000b` (red-600)    | `#ffe2e2` (red-100)   | 4.0:1  | 4.5:1       | ❌    |
| Banner highlight (dark)   | `#4f39f6` (indigo-600) | `#101828` (gray-900)  | 2.74:1 | 3:1 (large) | ❌    |
| Card meta text            | `#808080` (opacity-50) | `#ffffff`             | 3.94:1 | 4.5:1       | ❌    |
| Card "Solved!" pill       | `#ffffff`              | `#00a63e` (green-600) | 3.21:1 | 4.5:1       | ❌    |

## Keyboard navigation

| Component           | Result                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------- |
| Accordions          | `<summary>` is focusable and toggles with Enter/Space. Focus is visible                   |
| Badges              | Remove buttons are focusable with visible focus                                           |
| Charts              | Range toggle buttons are focusable and expose `aria-pressed`                              |
| Marketing cards     | All links are focusable with visible focus. The name is missing on `cards/9` (#5)         |
| Banners             | CTAs are focusable with visible focus                                                     |
| Analytics dashboard | 10–15 tab stops per page, all visibly focused. The sidebar toggle has the wrong role (#7) |
| Headers             | 9–12 tab stops per page, all visibly focused. The menu button is inert (#8)               |

## Screen reader (predicted)

| Element                    | Announced as                         | Issue                               |
| -------------------------- | ------------------------------------ | ----------------------------------- |
| Chart canvas               | "Monthly revenue, line chart, image" | No data available (#1)              |
| Dashboard sidebar toggle   | "checkbox, not checked"              | Should be "button, collapsed" (#7)  |
| Dashboard settings toggles | "checkbox, checked" with no name     | Unlabelled (#6)                     |
| Header menu button         | "Toggle menu, button"                | No expanded or collapsed state (#8) |
| `cards/9` image link       | "link"                               | No name (#5)                        |

## Priority fixes

1. **Header contrast and the dead menu button (#2, #8).** Headers are among the first components people paste.
2. **Dashboard labels and sidebar toggle (#6, #7).** Templates are a growth area, so they must be clean.
3. **Chart data alternatives (#1).** One pattern applied to 12 files.
4. **The remaining contrast and naming fixes (#3, #4, #5).**
5. **Example `<title>`s (#9)** before adding axe-core to the Playwright suite.

## Next

- **Make the scan repeatable.** Add `@axe-core/playwright` to the Playwright suite and run it against every `public/examples/**/*.html`. Use `/accessibility-review` for what the scan can't catch: behaviour, labels and ARIA patterns. Findings #1, #6, #7 and #8 came from that manual pass.
- **Audit the site itself.** Start with the homepage, the four category index pages and the preview toolbar (breakpoints, copy, view toggle, direction). Together that's about 46% of all views, more than all the component pages in this audit combined.
- **Audit the next components, in traffic order:**

  | Component                     | Views |
  | ----------------------------- | ----- |
  | `application/button-groups`   | 2,000 |
  | `marketing/announcements`     | 1,990 |
  | `marketing/buttons`           | 1,930 |
  | `application/breadcrumbs`     | 1,850 |
  | `templates/portfolio`         | 1,820 |
  | `marketing/blog-cards`        | 1,810 |
  | `templates/saas-landing-page` | 1,770 |
  | `application/details-list`    | 1,640 |
  | `neobrutalism/accordions`     | 1,610 |
  | `application/dropdown`        | 1,610 |
  | `neobrutalism/cards`          | 1,560 |
  | `templates/storefront`        | 1,020 |
  | `templates/support-inbox`     | 530   |

  Neobrutalism hasn't been covered at all yet, even though its accordions and cards outrank most marketing pages.

- **Prioritise what agents copy.** Whatever an agent fetches ends up in someone's app, accessibility problems included. These are the component pages agents request most (`.md` requests, 2026-10-16 to 2026-11-15):

  | Component                                                                 | Agent requests | In this audit?                     |
  | ------------------------------------------------------------------------- | -------------- | ---------------------------------- |
  | `marketing/footers`                                                       | 40             | No                                 |
  | `marketing/faqs`                                                          | 30             | No                                 |
  | `application/file-uploaders`                                              | 30             | No                                 |
  | `marketing/banners`                                                       | 30             | Yes                                |
  | `marketing/ctas`                                                          | 20             | No                                 |
  | `marketing/contact-forms`                                                 | 20             | No                                 |
  | `marketing/cards`, `marketing/headers`                                    | 20 each        | Yes                                |
  | `templates/saas-landing-page`                                             | 20             | No (listed above)                  |
  | `application/modals`, `application/dropdown`, `application/progress-bars` | 20 each        | No (only dropdown is listed above) |
  | `neobrutalism/cards`, `neobrutalism/alerts`                               | 20 each        | No (only cards is listed above)    |

  The values are rounded to tens, so treat them as a rough order. Add footers, FAQs, file uploaders, CTAs, contact forms and modals to the next round. Contact forms and file uploaders are forms, so labels and error handling matter most there.
