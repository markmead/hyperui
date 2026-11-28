# Accessibility gotchas

Read this before editing tabs, sidebars and app shells, scrollable tables, or anything with a custom focus style. Axe (`pnpm test:a11y:diff`) checks static markup. It can't tell you whether the keys do the right thing or whether a layout breaks while the window resizes, so these are the things it misses.

## Fixes are copy-pasted

Most behaviour lives in an inline `<script>` repeated in every file that needs it: light and dark, components and the templates built from them. When you fix one, search for the same snippet and fix every copy.

```bash
git grep -ln "<distinctive line from the old code>" public/examples
```

Then check the dark twin of each file, and any template built from the component (see Templates in `CLAUDE.md`).

## Tabs

- Roles, ids and `aria-controls` must pair up: `role="tablist"`, `role="tab"` with `aria-selected`, and `role="tabpanel"` with `aria-labelledby`. Only the selected tab has `tabindex="0"`.
- Arrow keys move and wrap. Home and End jump to the ends. A vertical list (`aria-orientation="vertical"`) uses Up and Down.
- **Right-to-left:** the first tab sits on the right, so Left and Right swap. Read the direction from the tablist (`getComputedStyle(tabList).direction`) on each key press, not from `<html>`, because a code sample can force `dir="ltr"` inside an RTL page. Don't swap Up and Down.
- When you change the indexing maths, check the wrap in both directions. `(index + step) % length` goes negative at the start, so add `length` first.

## Sidebars, drawers and backdrops

- The backdrop and the panel share one open state, normally `data-sidebar` on `<body>` plus `aria-expanded` on the toggle.
- A state rule like `group-data-[sidebar=open]:block` has higher specificity than `lg:hidden`, so the backdrop stays on screen after the window grows. Scope it: `max-lg:group-data-[sidebar=open]:block`.
- The script must also close the panel when the window grows past the breakpoint, or `aria-expanded` goes stale:

  ```js
  globalThis.matchMedia('(min-width: 64rem)').addEventListener('change', (mediaEvent) => {
    if (mediaEvent.matches) setSidebarOpen(false)
  })
  ```

  `64rem` is Tailwind's `lg`. Keep the two in step.

- Escape closes the panel and returns focus to the toggle. The preview script blocks key presses on links, and once swallowed Escape, so test Escape from a focused link.
- A closed panel is `invisible` below the breakpoint so it leaves the tab order.

## Scrollable tables and regions

A wrapper with `overflow-x-auto` scrolls sideways on a narrow screen, so a keyboard user must be able to reach it (WCAG 2.1.1, axe `scrollable-region-focusable`). Make it a labelled, focusable region:

```html
<h2 id="recent-orders-title">Recent orders</h2>
<div role="region" aria-labelledby="recent-orders-title" tabindex="0" class="overflow-x-auto …">
  <table>…</table>
</div>
```

Give it a visible focus ring. Axe only reports the problem when the table actually overflows, so check at 390px.

## Focus styles

- Every interactive element needs a visible indicator. The house style is `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-<colour>`, with the colour matching the component's accent.
- Where you use a ring instead, `focus:outline-none` leaves nothing in Windows forced-colors mode, because box-shadows are dropped. Use `focus:outline-hidden`, which keeps a transparent outline that forced-colors mode shows.
- `ring-offset-2` uses a white offset by default, which shows as a white gap on a dark surface. In dark files add `dark:focus-visible:ring-offset-<surface colour>`.
- Pointer-only hover states are not a substitute. Check Tab through the page.

## Right-to-left

Components and templates must work with `dir="rtl"`.

- Use logical utilities: `ps-`, `pe-`, `ms-`, `me-`, `start-0`, `end-0`, `text-start`, `border-e`. Never `pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-` or `text-left`.
- Where a layout has no logical form (a table heading, say), use `ltr:` and `rtl:` pairs, as in `ltr:text-left rtl:text-right`.
- Every `translate-x` slide animation needs an `rtl:` counterpart, for example `max-lg:rtl:translate-x-full`.
- Chevrons and arrows that point in a direction need `rtl:rotate-180` (or `rtl:-scale-x-100`).

## Other things axe won't judge

- **Form fields** need a visible or `sr-only` `<label>`, and `autocomplete` on name, email, phone and organisation inputs (WCAG 1.3.5).
- **Toggles** are `<button type="button" aria-expanded aria-controls>`. Never a hidden checkbox behind a `<label aria-expanded>`: `aria-expanded` isn't allowed on a label.
- **Groups of links** (footers, for example) are labelled with `aria-labelledby` pointing at their heading.
- **Contrast:** 4.5:1 for text. Colours that commonly fail on white are `teal-500`, `emerald-600` and `gray-400`. Use `-700` or darker for text and fills with white text. `gray-500` on `gray-100` also fails.
- **Dialogs** use native `<dialog>` with `showModal()`, so focus is trapped and Escape works.
- **Disclosures** use `<details>` and `<summary>`. Don't put buttons inside a `<summary>`.

## How to check your work

1. `pnpm dev`, then `pnpm test:a11y:diff` for the examples you changed.
2. Tab through the page with a real keyboard. Every stop needs a visible indicator.
3. Resize from 390px to 1536px with each menu open. Nothing should stay on screen after the window grows.
4. Set `dir="rtl"` on `<html>` and press the arrow keys on anything with a roving tabindex.
5. Look at the dark file too. It has its own copy of the markup and the script.
