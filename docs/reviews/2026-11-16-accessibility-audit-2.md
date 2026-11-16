# Accessibility audit 2: templates, the site, and the components agents copy most

**Standard:** WCAG 2.1 AA | **Date:** 2026-11-16 | **Follows:** [the first audit](2026-11-15-accessibility-audit.md)

**Scope:** 87 pages and example files.

- **Templates the first audit didn't cover:** portfolio (2), SaaS landing page (1), storefront (2) and support inbox (2), light and dark.
- **The components agents fetch most:** `marketing/footers`, `marketing/faqs`, `application/file-uploaders`, `marketing/ctas`, `marketing/contact-forms` and `application/modals`, every variant, light and dark.
- **The site itself:** the homepage, the application, marketing and templates category pages, a component page with the preview toolbar (`marketing/footers`), a template page (`storefront`), FAQs, Tools and the dark mode generator.

## Method

1. **Automated scan.** axe-core 4.10.3 with the WCAG 2.0/2.1 A and AA tags, at 390px and 1280px, against a production build (`pnpm build` and `wrangler dev`).
2. **Keyboard pass.** Tab through each page at 1280px and flag any focus stop with no outline and no box-shadow.
3. **Markup review.** What axe can't judge: ARIA patterns, dialogs, form purpose, and whether controls actually do something.

We haven't tested with a real screen reader, so treat behaviour notes as predictions.

## Summary

**Issues found:** 5 | **Major:** 3 | **Minor:** 2. All five are fixed in the same PR as this report.

**What passed:**

- Every focus stop on all 87 pages had a visible indicator.
- The homepage, category pages, component and template pages, FAQs and Tools had no axe violations (the dark mode generator page had one, #5).
- The modals use native `<dialog>` with `showModal()`, so focus is trapped, Escape closes them and they're labelled by their heading.
- The FAQs use `<details>`/`<summary>`. The file uploaders and contact forms label every field.
- The storefront's Description, Shipping and Reviews tabs are a complete ARIA tabs pattern with arrow keys, and the gallery thumbnails expose `aria-pressed`.

## Findings

| #   | Issue                                                                                                                                                                                               | WCAG  | Severity | Where                                                                                                                                                   | Fix                                                                                                                                                                                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | The mobile menu, queue rail and ticket details toggles are hidden checkboxes behind a `<label aria-expanded>`. `aria-expanded` isn't allowed on a label, and the control is announced as a checkbox | 4.1.2 | Major    | `templates/portfolio/1–2`, `saas-landing-page/1`, `storefront/1–2`, `support-inbox/1–2`                                                                 | Use a `<button aria-expanded aria-controls>`. The mobile nav uses the `hidden` attribute. The support inbox panels keep their state on `<body>` and are `invisible` while closed, so they're out of the tab order |
| 2   | The colour swatches are buttons that do nothing and don't say which colour is selected                                                                                                              | 4.1.2 | Major    | `templates/storefront/2`                                                                                                                                | A `<fieldset>` radio group with visually hidden radios, so arrow keys work and the selection is announced. The visible colour name updates on change                                                              |
| 3   | Name, email and phone fields have no `autocomplete`, so browsers and assistive tech can't fill them                                                                                                 | 1.3.5 | Major    | `marketing/contact-forms/*`, footer and newsletter sign-ups, `templates/saas-landing-page/1`, `templates/analytics-dashboard/5`, and other email inputs | `autocomplete="name"`, `"email"`, `"tel"` or `"organization"`, on 38 files                                                                                                                                        |
| 4   | Contrast failures                                                                                                                                                                                   | 1.4.3 | Minor    | See below                                                                                                                                               | Darken by one or two shades                                                                                                                                                                                       |
| 5   | Two buttons (rule examples, add rule) are inside a `<summary>`                                                                                                                                      | 4.1.2 | Minor    | `/tools/dark-mode-generator`                                                                                                                            | Move them beside the `<summary>`, in the same visual position                                                                                                                                                     |

### Contrast

| Element                              | Was                      | Ratio  | Now                                   |
| ------------------------------------ | ------------------------ | ------ | ------------------------------------- |
| Footer 1 and 6 subscribe button      | white on `teal-500`      | 2.44:1 | `bg-teal-700`, hover `teal-800`       |
| Footer 10 links                      | `teal-600` on white      | 3.7:1  | `text-teal-700`                       |
| Footer 8 and 9 text                  | `gray-500` on `gray-100` | 4.39:1 | `text-gray-600`                       |
| CTA 1 and 3 button                   | white on `emerald-600`   | 3.69:1 | `bg-emerald-700`, hover `emerald-800` |
| Support inbox "/ Support" and "Tags" | `gray-400` on white      | 2.6:1  | `text-gray-500`                       |

## After the fixes

- **axe:** all 87 pages and files have no violations at 390px or 1280px.
- **Keyboard:** every focus stop is visible.
- **Behaviour,** checked in Chromium:
  - Each mobile nav opens, sets `aria-expanded`, closes on Escape and returns focus to its toggle.
  - The support inbox rail and details panels slide in and out in both left-to-right and right-to-left, stay visible on desktop, and close on Escape.
  - The storefront colours work with arrow keys and update the visible colour name.

## Next

- Change the template wording ("Starting point — not a finished product") now that all five templates have been audited. See `TemplateDisclaimer.astro`, the template MDX descriptions, the templates index hero and the homepage Templates section.
- Add axe-core to the Playwright suite, so regressions like these fail the tests.
