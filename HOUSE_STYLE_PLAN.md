# House style + dark mode reset

Tracking doc for an in-progress, multi-session effort. Delete this file once
every collection has been migrated and there's nothing left to resume.

## Status — paused here, resume by continuing Phase 2

Branch: `feature/house-style-dark-mode-reset`, merged up to date with `main`,
plus:

- `854b51c5` — house-style dark-mode rules + single-flag schema/layout rewiring + `badges` pilot
- `54f55c4d` — explanatory note on the browser tool's pre-loaded rules
- `breadcrumbs` migrated through Phase 2 → Phase 3 (see below)
- `button-groups` migrated through Phase 2 → Phase 3 (see below)
- `checkboxes` migrated through Phase 2 → Phase 3 (see below)
- `details-list` migrated through Phase 2 → Phase 3 (see below)

Done: Phase 1, the schema/layout rewiring, and `badges`, `breadcrumbs`,
`button-groups`, `checkboxes`, and `details-list` as fully-migrated
collections (see sections below for exactly what that entailed).

`breadcrumbs` needed one Phase 2 fix: its grouped/bordered variant used
`border-gray-300` for the group wrapper, but grouped interactive elements
elsewhere (`button-groups`, `pagination`) use `border-gray-200` — changed to
match. Everything else already conformed.

`button-groups` needed one Phase 2 fix: all five variants used
`focus:ring-blue-500`, a shade found nowhere else in the codebase (not the
Action color, not the documented non-action-control ring color) — changed
to `focus:ring-gray-900` per the house style table.

Regenerating dark variants via `pnpm run generate:dark-variants` also
surfaces gaps in *other*, not-yet-migrated collections (it scans every
category) — those drafts were discarded each time, not committed; only the
collection being actively migrated gets its dark variants generated and
kept.

**`charts` — skipped, needs a dedicated pass, do not run the normal Phase
2 → Phase 3 process on it.** Its dark variants pair Tailwind classes with
hand-picked hex colors inside inline Chart.js `<script>` blocks (line
color, gridlines, tick colors) that the shared dark-mode engine cannot
touch — it only transforms HTML `class` attributes. The 11 existing dark
variants are already hand-tuned and working, just on an older convention
(`dark:bg-gray-900` cards, `dark:text-white` headings) that predates the
engine's current defaults (`dark:bg-black`, `dark:text-gray-50`). Deleting
and regenerating them the normal way would silently break every chart in
dark mode (same light-mode hex colors copied straight into the dark file,
illegible against a dark background) — the fix has to be by hand, chart
by chart, decided in its own session. Skip past it in the alphabetical
order for now.

`checkboxes` needed no Phase 2 fix (already conformed) but exposed a real
gap in Phase 3's regenerate step, applicable to every `@tailwindcss/forms`
control (checkboxes, radio-groups, inputs, range-inputs, selects,
quantity-inputs, textareas, toggles): the plugin bakes
`background-color: #fff` and `--tw-ring-offset-color: #fff` into its own
base CSS for `[type=checkbox]`/`[type=radio]` etc., so light-mode HTML
never states a `bg-white` or `ring-offset-white` *class* for these
controls. The dark-mode engine only transforms classes present in the
light file, so it silently drops the dark background/ring-offset entirely
— regenerating leaves the control's own fill/ring-offset plugin-default
white even on a dark page. **After regenerating dark variants for any
`@tailwindcss/forms` collection, manually check whether the previous
hand-tuned dark file had a `dark:bg-*`/`dark:ring-offset-*` on the control
itself with no light-mode counterpart, and restore it by hand if so** —
the sitewide convention already in use (`inputs`, `radio-groups`, still
unmigrated) is `dark:bg-gray-900` / `dark:ring-offset-gray-900` for form
control chrome; keep using that pairing rather than inventing a new one,
since these controls aren't cards/pages the `bg-white → dark:bg-black`
house-style surface rule was written for.

`details-list` needed no Phase 2 fix (already conformed) and no manual
dark-mode gotcha — its only regeneration change was tightening
`dark:text-white` to `dark:text-gray-50` (the engine's standard shade-map
inversion for `text-gray-900`), consistent with the other migrations.

Next action: pick the next `application` collection (alphabetical after
`details-list`, skipping `charts` — `dividers` is next) and run it through
Phase 2 → Phase 3 the same way the collections above were done,
remembering the forms-plugin gotcha above for any remaining form-control
collections. No open design questions remain for the normal pipeline — the
house style table below and the collection-exemption list
are settled.

**Collection exemptions are final:** only `grids` and `media` skip dark mode
(`dark: false`), because they have no real themeable surface — `grids` is
placeholder boxes standing in for real content, `media` is photo-dominated
with no wrapper surface. `progress-bars` and `dividers` were checked as
candidates and rejected — both have real `bg-*`/`text-*` colors (a track,
fill, or divider line) that would look visibly broken left unconverted, so
they go through the normal pipeline like everything else.

## Context

HyperUI has never had a documented color "house style" — each of the 311 light
components across `application`/`marketing`/`neobrutalism` was styled
independently. A survey of `public/examples/**/*.html` confirmed real drift:
action buttons split ~91 `bg-indigo-600` vs 66 `bg-blue-600`, dark surfaces
split `bg-gray-800`/`bg-gray-900`, and 146 stray `text-gray-400` body-copy
instances fail WCAG AA (contrast ~2.54:1 on white — below the 4.5:1 minimum).

This inconsistency is also why `scripts/generate-dark-variants.js` produced
bad output: it applies a purely mechanical shade map (`600→300`) with no
awareness of role, so a solid `bg-indigo-600` action button becomes
`dark:bg-indigo-300` — a pastel fill, not a real button. The 225 existing
hand-tuned `-dark.html` files at the time already showed this exact pattern
(`dark:bg-indigo-300` ×14, `dark:bg-blue-300` ×8).

The fix: define an explicit house style, retrofit every light component to
it, wipe all existing dark variants, then regenerate them from the
now-standardized source using the shared dark-mode engine — which already
supports role-aware overrides via its `rules` array
(`src/lib/dark-mode/config.js`, `transform-class.js`) but shipped with
`rules: []` before this effort.

**Dark mode is now an all-or-nothing switch per collection, declared once.**
`content.config.ts`'s collection-level `dark` field defaults to `false`, and
is the *only* thing that decides whether a collection's components get a
dark card — `ComponentPost.astro` no longer looks at anything per-component
to make that call. A collection only flips to `dark: true` once every
component in it has been through Phases 2–3 below. The old per-component
`dark: true` / `dark: { contributors }` field is retired; the only thing
that survives at the component level is an optional `darkContributors`
string array, for the rare case (`announcements`, `toasts`, `steps`) where
someone hand-authored just the dark variant and deserves separate credit.

## House style

| Role | Light | Notes |
|---|---|---|
| Surface — page/section | `bg-gray-50` | |
| Surface — card/panel | `bg-white` | dominant today (231 occurrences) |
| Surface — nested/muted | `bg-gray-100` | |
| Text — heading/primary | `text-gray-900` | |
| Text — body/secondary | `text-gray-700` | |
| Text — muted/caption | `text-gray-600`; `text-gray-500` only on white/`gray-50` | `text-gray-500` clears WCAG AA (~4.8:1) on white/gray-50 but not on darker surfaces; never `text-gray-400` or lighter |
| Border — default | `border-gray-200` | cards, dividers |
| Border — emphasized | `border-gray-300` | inputs, interactive outlines |
| Action (primary button/link) | `bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 text-white` | indigo was already the dominant action color |
| Destructive (delete/remove, error) | `red-600` | |
| Status (badges/alerts/toasts) | success `emerald-600`, warning `amber-600`, error `red-600` | exempt from the Action rule |
| Status tint recipe (pill/badge) | `bg-*-100 text-*-700`, outline variant `border-*-500` | shade recipe, any semantic family — validated in the `badges` pilot, dark output falls out of the generic shade map for free (`100→800`, `700→200`, `500→400`) |
| Trend (chart/stat deltas) | positive `green-600`, negative `red-600` | kept distinct from Status — direction, not state; already the dominant convention in `charts`/`stats` |
| Focus ring — non-action controls | `ring-gray-900` | checkboxes, inputs |

## Phase 1 — Encode dark-mode rules for solid-fill buttons ✅ done

Added targeted entries to `DEFAULT_CONFIG.rules` in `src/lib/dark-mode/config.js`
(consumed by both `scripts/generate-dark-variants.js` and the browser tool at
`/tools/dark-mode-generator` — also fixed `createDefaultConfig()` there to
actually seed from `DEFAULT_CONFIG.rules` instead of hardcoding `rules: []`,
so both stay consistent):

- Action fill: `utilities: ['bg'], colors: ['indigo'], shade: 600 → darkShade: 500`, plus a hover entry `shade: 700 → darkShade: 400`
- Destructive fill: `utilities: ['bg'], colors: ['red'], shade: 600 → darkShade: 500`

Scoped to `utilities: ['bg']` only, so `text-red-600` (destructive text, trend
text) is untouched and keeps riding the generic `SHADE_MAP` — that mapping is
fine for soft/text usage; the only broken case was solid button fills.

## Schema/layout rewiring ✅ done (badges pilot proved this out)

- `content.config.ts`: collection-level `dark` now defaults to `false`;
  per-component `dark` (boolean/object union) replaced with optional
  `darkContributors: string[]`.
- `ComponentPost.astro`: `formattedComponents` now renders a "(Dark)" card
  for *every* component when the collection's `dark` flag is true, using
  `darkContributors ?? contributors` for attribution. Removed the
  `darkCount`/`totalCount` "X/Y Dark Mode (Request)" badge (meaningless
  once it's all-or-nothing) in favor of a plain "Dark Mode" label.
- `ComponentCard.astro` / `SearchWrapper.astro`: their `componentCount`
  calculations (component listing counts) updated from
  `components.length + components.filter(({dark}) => !!dark).length` to
  `components.length + (darkModeSupported ? components.length : 0)`.
- Migrated the 3 files with real per-variant contributor overrides
  (`announcements.mdx`, `toasts.mdx`, `steps.mdx`) from
  `dark: { contributors: [...] }` to `darkContributors: [...]`.

Verified end-to-end in the dev server: `badges` (migrated) shows a "Dark
Mode" badge and a paired dark card per component; `accordions` (untouched)
shows neither — confirming the reset-then-migrate transition behaves as
intended without a mass per-component edit.

## Phase 2 — Standardize all light components to the house style

Go collection by collection (34 `application` + 21 `marketing` + 11
`neobrutalism` MDX files). For each component: grep for non-conforming
classes *and shades* against the role table above and replace them (e.g.
`bg-blue-600` button → `bg-indigo-600`, `border-gray-100` card →
`border-gray-200`, `text-gray-400` body copy → `text-gray-600`, an
off-recipe tinted badge → the `100/700/500` recipe). `badges` is done as
the pilot — its four generic variants used arbitrary `purple`, now
`indigo`; its "Themed with icon" variant already matched the Status recipe
and needed no change.

While reviewing, flag components that exist only as a color reskin of an
otherwise-identical variant in the same collection (structural duplicate) —
these become redundant once one canonical color wins. Removing one requires
care: `ComponentPost.astro` maps `components` array position directly
to filename (`index + 1` → `n.html`), so deleting an entry from the middle
means renaming every subsequent `n.html`/`n-dark.html` in that folder to stay
contiguous, not just deleting the MDX entry.

Given the scope (311 components), continue the per-collection rollout —
`badges` done; remaining `application` collections next, then `marketing`,
then `neobrutalism`.

## Phase 3 — Delete a collection's existing dark variants, then regenerate

Per collection, once its light components are standardized: delete its
`public/examples/**/*-dark.html` files, run
`pnpm run generate:dark-variants` (note: it scans *all* categories for any
missing dark file, not just the one being worked — a run during the badges
pilot also surfaced ~51 pre-existing gaps in unrelated collections, see
"Known follow-up" below), review the rendered output, then set that
collection's `dark: true` once in its MDX frontmatter.

## Verification

- `pnpm astro check` and `pnpm lint` after each collection
- Manual dev-server spot check (light + dark) for each migrated collection —
  contrast against the Text row above, focus-ring visibility, button
  legibility against dark surfaces; use `agent-browser` for the visual pass
- `pnpm test` (Playwright) if any test references specific class names or
  component counts that shift when redundant variants are removed

## Known follow-up (not this pass)

~51 components across `progress-bars`, `radio-groups`, `range-inputs`,
`skip-links`, `blog-cards`, `cards`, `logo-clouds`, `pricing`,
`product-cards`, `product-collections`, `sections`, and `templates/*` have
never had a dark variant generated at all (gap predates this effort). Worth
a dedicated pass once the house-style rollout reaches them, rather than
generating drafts now against un-audited light source.
