# Plan: Dark Mode Generator — Bottom-Sheet Rule Inspector

## Problem

Each rule has 6 fields across 3 sections rendered inline inside a sidebar accordion. It's tall, clunky, and the per-rule DOM generation in `rule-renderer.js` is the most complex part of the codebase — `innerHTML` template strings, per-rule `querySelector` chains, manual stopPropagation hacks, and a hand-rolled inline rename interaction.

## Approach

A bottom-sheet inspector panel using `dialog.show()` (non-modal, no backdrop). The rule list in the sidebar becomes a compact row per rule. Clicking "configure" opens the inspector, which slides up from the bottom of the viewport full-width — lots of horizontal space for the 6 fields in one row.

Live preview updates continue to work: `onChange` → `transformAndRender` → iframe `srcdoc` fires as you type, and the preview panel above stays fully visible.

## Why not Vue

The pain is concentrated in `rule-renderer.js`. The bottom-sheet refactor itself removes most of it — the 6-field form becomes static Astro markup authored once, killing the `innerHTML` strings and per-rule `querySelector` chains. ~70% of what Vue would buy, for free, just from doing the UI change correctly.

Adding Vue for one tool on a zero-island docs site means two interactivity models, a hydration runtime shipped to users, and the preview/iframe half stays imperative anyway — hybrid component, full integration cost, no clean win. If a second stateful tool appears, that's the right moment to add Vue.

## Files

### New: `src/components/DarkModeInspector.astro`

A `<dialog data-rule-inspector>` with a header (rule name + close button) and all 6 fields as static Astro markup — authored once, not generated per-rule. This is the core simplification.

### Modified: `src/lib/dark-mode/rule-renderer.js`

Split into two focused functions:

- `buildRuleListItem(ruleData, ruleIndex, { onConfigure, onDelete, onToggleEnabled })` — compact row only: enabled toggle, name, configure button, delete button. Drops the `<details>`/chevron/stopPropagation/inline-rename entirely.
- `bindInspector(inspectorEl, ruleData, { onChange })` — seeds the 6 static fields from the selected rule and wires their `change` listeners. Much simpler because it targets one persistent dialog rather than a freshly-built subtree per rule.

### Modified: `src/components/DarkModeSidePanel.astro`

Rules accordion body becomes the compact list only. No inline field markup.

### Modified: `src/components/DarkModeGenerator.astro`

- Add `DarkModeInspector` as a sibling of `DarkModeRulesDialog`
- Add `currentInspectorRuleId` private field
- Add `openInspector(ruleId)` — finds rule, calls `bindInspector`, sets header name, calls `inspectorDialog.show()`
- Add outside-click dismissal via `pointerdown` on `document` (no backdrop on non-modal dialogs — this is the one fiddly bit)
- Close inspector on structural rule changes (add/delete/import/reset) to avoid stale rule references
- Retarget existing `@starting-style` + `allow-discrete` animation CSS to `[data-rule-inspector]`: `fixed inset-x-0 bottom-0`, `translateY(100%)` closed → `translateY(0)` open

### Modified: `src/lib/dark-mode/ui-renderer.js`

`renderRules` calls the new `buildRuleListItem`, passes `onConfigure` callback.

## Notes

- Rule naming (click-to-edit span) moves into the inspector as a plain text input — the 7th field. Removes the current summary interaction hack.
- The 6 fields can sit in a `grid grid-cols-3 gap-6` (or `grid-cols-6`) inside the inspector for a clean single-row layout.
- `dialog.show()` not `dialog.showModal()` — no backdrop, no focus trap, preview remains interactive.
