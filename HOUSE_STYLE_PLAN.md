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
- `dividers` migrated through Phase 2 → Phase 3 (see below)
- `dropdown` migrated through Phase 2 → Phase 3 (see below)
- `empty-states` migrated through Phase 2 → Phase 3 (see below)
- `file-uploaders` migrated through Phase 2 → Phase 3 (see below)
- `filters` migrated through Phase 2 → Phase 3 (see below)
- `inputs` migrated through Phase 2 → Phase 3 (see below)
- `loaders` migrated through Phase 2 → Phase 3 (see below)
- `modals` migrated through Phase 2 → Phase 3 (see below)
- `pagination` migrated through Phase 2 → Phase 3 (see below)

Done: Phase 1, the schema/layout rewiring, and `badges`, `breadcrumbs`,
`button-groups`, `checkboxes`, `details-list`, `dividers`, `dropdown`,
`empty-states`, `file-uploaders`, `filters`, `inputs`, `loaders`,
`modals`, and `pagination` as fully-migrated collections (see sections
below for exactly what that entailed).

`breadcrumbs` needed one Phase 2 fix: its grouped/bordered variant used
`border-gray-300` for the group wrapper, but grouped interactive elements
elsewhere (`button-groups`, `pagination`) use `border-gray-200` — changed to
match. Everything else already conformed.

`button-groups` needed one Phase 2 fix: all five variants used
`focus:ring-blue-500`, a shade found nowhere else in the codebase (not the
Action color, not the documented non-action-control ring color) — changed
to `focus:ring-gray-900` per the house style table.

Regenerating dark variants via `pnpm run generate:dark-variants` used to
also surface gaps in *other*, not-yet-migrated collections (it scanned
every category) — those drafts had to be discarded each run, not
committed. This is now fixed: pass `--category=<name> --slug=<name>` to
scope a run to just the collection being migrated, e.g.
`pnpm run generate:dark-variants --category=application --slug=dropdown`.
Use the scoped form for every collection from here on.

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

`dividers` needed one Phase 2 fix: all six variants used `bg-gray-300` (and
gradient `to-gray-300`) for the divider line, but the house style table
lists dividers under `border-gray-200` (default), not `-300`
(inputs/interactive outlines only) — changed to `bg-gray-200`/`to-gray-200`.

**Another Phase 3 gotcha, found after the fact on `breadcrumbs`'s "Grouped
with chevron divider" variant:** the engine's generic `bg-white →
dark:bg-black` mapping is the theoretically-consistent shade inversion, but
it's a poor *practical* choice for any component with its own `bg-white`
card/panel surface (as opposed to a plain text/link component like the
other `breadcrumbs` variants) — `black` and the preview iframe's own
`bg-gray-900` wrapper are perceptually almost indistinguishable, so the
card nearly disappears against the page it's previewed on. Manually check
the regenerated dark output for any component that has its own `bg-white`
container: prefer `dark:bg-gray-800` for the card (visibly *lighter* than
the `gray-900` page, an "elevated" card) and, if the component nests a
highlighted/recessed sub-region inside that card (e.g. a "current page"
tab), give that sub-region `dark:bg-gray-900` instead of matching the
engine's shade-mapped output — one step *darker* than the card, preserving
the same light-mode relationship (`bg-gray-100` inside `bg-white`) just
inverted, rather than the flat engine output which used the same
`dark:bg-gray-800` for both card and sub-region and lost that distinction
entirely.

`dropdown` needed one Phase 2 fix: both wrapper elements (the split-button
trigger and the flyout menu panel) used `border-gray-300`/`divide-gray-300`,
but neither is a form input — one's a grouped interactive control (matching
`button-groups`' `border-gray-200` precedent) and the other's a floating
card/panel (default `border-gray-200`) — changed both, plus the internal
`divide-x` on the trigger to match. Also caught a real drift on the
"Delete" menu item: `text-red-700` where the house style table calls for
`red-600` on plain destructive text (as opposed to the `bg-*-100
text-*-700` status-tint recipe, which is a different, exempt case) —
changed to `text-red-600`.

`dropdown` also hit the `bg-white`-card gotcha above (both wrapper
elements have their own `bg-white` surface), fixed the same way
(`dark:bg-gray-800`) — but this component's cards have hoverable items
*inside* them (`hover:bg-gray-50` menu items/trigger buttons), which the
breadcrumbs case didn't. The engine had paired `hover:bg-gray-50` with
`dark:hover:bg-gray-800` on the assumption the card itself was
`dark:bg-black`; once the card becomes `dark:bg-gray-800` to fix its own
visibility, that hover shade collides with the card and the highlight
stops reading as a highlist. Fixed by bumping the item hover one step
*lighter* than the (now `gray-800`) card, to `dark:hover:bg-gray-700` —
same principle as the recessed-sub-region fix above, just in the opposite
direction (a hover state should lift off the card, not recess into it).
Check for this same collision on any future component with hoverable
items inside its own `bg-white` card.

`empty-states` needed one Phase 2 fix: its "No results found" search
`<input>` used `focus:border-indigo-500` (the Action color, borrowed onto a
non-action control) — changed to `focus:border-gray-900` per the house
style table's non-action-control focus-ring row, keeping the existing
border-based focus mechanism rather than switching it to a ring. Its
solid `bg-indigo-600` buttons and `border-gray-300` outline
buttons/dropzone/input already conformed — `border-gray-300` is correct
here (not the grouped-control `border-gray-200` case) because these are
standalone "interactive outlines"/inputs, the exact case the table
reserves `-300` for. Its large decorative `text-gray-400` icons
(`aria-hidden="true"`, purely illustrative, not body copy) were left
alone — sitewide convention, identical in the not-yet-migrated
`marketing/empty-content` sibling collection, and outside what the
Text-role table governs. Also confirmed the missing `focus:ring-2
focus:ring-indigo-600` on its Action buttons — present in the house
style table's Action recipe, but not actually implemented on *any*
`bg-indigo-600` button anywhere in the codebase today (verified via
grep), and the dedicated a11y-fixes commit (`47a41de`) touched these
exact files but deliberately didn't add it — so treated as a separate,
not-yet-started convention rather than Phase 2 drift, and left untouched.

`empty-states` also hit the `@tailwindcss/forms` gotcha from `checkboxes`
above, extended to a plain text input (verified in
`@tailwindcss/forms`'s own source: `[type='text']` etc. get the same
baked-in `background-color: #fff` and, on `:focus`,
`--tw-ring-offset-color: #fff`, not just `[type=checkbox]`/`[type=radio]`)
— the previous hand-tuned dark file had `dark:bg-gray-900 dark:text-white`
on the search input with no light-mode counterpart, which the regenerate
step silently dropped. Restored by hand as `dark:bg-gray-900
dark:text-gray-50 dark:ring-offset-gray-900` (text shade tightened to
match the engine's current `text-gray-50` convention, ring-offset added
to match the `checkboxes` pairing). Verified in the dev server (light +
dark, standalone iframe and the full collection page) that the input's
dark background/text/focus all render correctly instead of showing a
stray white box.

`file-uploaders` needed no Phase 2 fix (already conformed — both variants
are bordered, non-card `<label>` dropzones, matching the `empty-states`
upload-dropzone precedent for `border-gray-300` on a standalone
interactive outline). Its "Base with button" variant's "Browse files"
chip (`bg-gray-50 hover:bg-gray-100`, a resting/hover pair one step apart
in the `50`/`100` range) exposed a new, systemic gap in the shared
`SHADE_MAP` (`src/constants/dark-mode.js`): both `50` and `100` invert to
the same target shade, `800` — so any component using this exact
resting/hover pair loses its hover feedback entirely in dark mode (regen
produced `dark:bg-gray-800 dark:hover:bg-gray-800`, identical). Not
something to fix in the shared map itself (that shade collision is
probably intentional/harmless for most `50`/`100` uses that aren't a
resting/hover pair on the same element, and changing it site-wide is out
of scope for a single collection's migration) — fixed by hand per the same
principle as the `dropdown` hover/card-shade collision above: bumped the
*hover* shade one step lighter than the mapped resting shade,
`dark:hover:bg-gray-700`, so the chip visibly lifts on hover instead of
staying flat. **Watch for this same `50`/`100` resting/hover collision on
any future component with a light tinted chip/pill that darkens on
hover** — it's a different trigger than the dropdown case (that was a
card recoloring collision; this is a shade-map coincidence) but the same
fix.

`filters` needed one Phase 2 fix, on both its "Dropdown" and "Accordion"
variants: their filter panels/cards used `border-gray-300`/`divide-gray-300`
for what is either a floating flyout panel (variant 1, exactly the
`dropdown` flyout-panel case) or a self-contained accordion card (variant
2's outer `<details>`, matching the `details-list`/`accordions`
card-wrapper convention) — both changed to the default `border-gray-200`/
`divide-gray-200`. Left alone: variant 1's `<summary>` toggle's own
`border-b border-gray-300` — a single standalone trigger (not grouped with
adjacent buttons like `dropdown`'s split-button), so it stays under the
table's "interactive outline" `-300` case rather than the "grouped
control"/"floating panel" `-200` case. Also left alone: the checkboxes'
plugin-default blue checked-state fill (no `checked:` override anywhere in
the light source) — matches the `checkboxes` collection precedent of never
touching that state.

Both variants' filter panels also have their own `bg-white` card surface
(hit the `bg-white`-card gotcha, fixed to `dark:bg-gray-800` by hand) and
contain both checkbox and `type="number"` inputs (hit the
`@tailwindcss/forms` gotcha, restored `dark:bg-gray-900
dark:ring-offset-gray-900` on the checkboxes and `dark:bg-gray-900
dark:text-gray-50 dark:ring-offset-gray-900` on the number inputs, by
hand) — both gotchas already covered above, no new discoveries, just
confirming they recur together whenever a form-control collection also has
its own card surface.

`inputs` needed no Phase 2 fix (already conformed — the collection this
effort's `@tailwindcss/forms` gotcha is named after). All four variants
(`email`/`text` inputs, icon and button decorations) hit that gotcha on
regeneration exactly as expected — restored `dark:bg-gray-900
dark:text-gray-50 dark:ring-offset-gray-900` on each `<input>` by hand.

Its "Floating label" variant surfaced a new, narrower case of the
`bg-white`-card gotcha: the floating `<span>` that visually "cuts" the
input's top border isn't a card at all, just a small opaque patch masking
the border line behind the label text — it needs to exactly match
whatever sits *behind* it (the page), not become a visually distinct
elevated surface. The engine's generic `bg-white → dark:bg-black` mapping
is *closer* to correct here than the card case (`black` and the page's
`dark:bg-gray-900` are close in luminance), but still technically off —
changed to `dark:bg-gray-900` to exactly match the page background it's
masking against (confirmed against the previous hand-tuned dark file,
which had independently arrived at the same value). **Distinguish this
from the `bg-white`-card gotcha going forward: a `bg-white` masking
patch behind inline text (crossing a border line, sitting over another
element) wants `dark:bg-gray-900` to disappear into the page; a `bg-white`
card/panel surface wants `dark:bg-gray-800` to stay visible against it —
opposite goals, same starting class.**

`loaders` needed no Phase 2 fix (already conformed — all 7 variants
already used `text-indigo-600`/`bg-indigo-600` for spinners, dots, and the
progress fill, and `text-gray-700` for the "Loading..." caption). Its
regeneration is the first real payoff of Phase 1's solid-fill rule outside
a button: the old hand-tuned dark files for the pulse/ping/bounce dots and
the progress-bar fill all had the exact `dark:bg-indigo-300` pastel-fill
bug the whole effort's Context section opens with — regenerating from the
current (unchanged) light source now correctly produces solid
`dark:bg-indigo-500` for all of them. The spinners' `text-indigo-600`
stroke color is untouched by that rule (scoped to `bg` only) and still
maps to the generic `dark:text-indigo-300` — confirmed by eye this is
fine for a thin stroke (unlike a solid fill, a lighter stroke still reads
clearly against the dark page), so left as-is. No `bg-white` card, no
form controls, no other gotchas — the simplest migration so far.

`modals` needed two Phase 2 fixes and settled one open design question:

- All four variants with an "Actions" row had a `bg-blue-600
  hover:bg-blue-700` "Done" button — the exact blue-vs-indigo Action drift
  the whole effort's Context section opens with — changed to
  `bg-indigo-600 hover:bg-indigo-700`.
- The "Input with close" variant's `Confirm` input was missing the
  `focus:ring-2 focus:ring-indigo-600` its otherwise-identical sibling
  ("Input" variant) has — a copy-paste omission, not a color choice —
  added to match.

**Settled: the `focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
focus:ring-offset-white focus:outline-none focus-visible:ring-2
focus-visible:ring-indigo-600 focus-visible:ring-offset-2
focus-visible:ring-offset-white focus-visible:outline-none` recipe
flagged as unresolved after `empty-states` is out of this effort's scope,
full stop.** `modals` has it on *every* interactive control (Close icon
button, Cancel, Done, and the Confirm input) — not just the primary
action, contradicting the house style table's "Action-only" framing — and
it's confirmed present in several other untouched collections (`pricing`,
`support-inbox`, `saas-landing-page`) too. It was added by the dedicated
a11y-fixes commits (`47a41de` / `b227536` / `a24d52e`), which also touched
`empty-states` (adding `aria-hidden` to its icons) but deliberately did
*not* add this recipe there. Conclusion: this is a pre-existing, actively
maintained accessibility convention that predates and is orthogonal to
the color-focused house-style effort — rolling it out to collections the
a11y sweep didn't reach (or ripping it out of collections that have it) is
that sweep's unfinished business, not Phase 2's. Going forward: preserve
whatever focus-ring treatment a component's light source already has
(fix its *colors* if they're wrong, per the two fixes above) and don't add
or remove the recipe wholesale. The house style table's "Focus ring —
non-action controls: `ring-gray-900`" row stands as-is for controls with
no pre-existing recipe (its origin — `checkboxes`/`empty-states` — is
unaffected), but don't apply it retroactively to controls that already
carry the indigo recipe.

The `<dialog>` element is the most literal case yet of the `bg-white`-card
gotcha (an actual popover card over a `backdrop:bg-black/50` scrim) —
fixed to `dark:bg-gray-800` as usual. Three new things fell out of having
a real elevated card with several different kinds of nested content,
generalizing the card-adjacent fixes from earlier collections:

1. **The dark-mode engine transforms `backdrop:` pseudo-element classes
   too, and got the modal backdrop backwards.** `backdrop:bg-black/50`
   (the dimming scrim behind the modal) became `dark:backdrop:bg-white/50`
   — inverting a dimming overlay into a *lightening* one, which would
   wash out the page behind the modal in dark mode instead of dimming it.
   A backdrop scrim should stay the same color in both themes (it's
   dimming whatever's behind it, not itself a themed surface) — removed
   the generated `dark:backdrop:*` override entirely, leaving the plain
   `backdrop:bg-black/50` to apply in both themes. **Check for this same
   backwards inversion on any future component using `backdrop:*`
   classes** (modals, dialogs, popovers) — the generic engine has no
   concept of "this class shouldn't get inverted at all."
2. **`ring-offset` should match the nearest enclosing surface, not
   always default to the page.** Every earlier `ring-offset-white` /
   plugin-baked-ring-offset fix (`checkboxes`, `inputs`, `filters`) used
   `dark:ring-offset-gray-900` because those controls sat directly on the
   plain page (`dark:bg-gray-900`). `modals`' Close/Cancel/Done buttons
   and the Confirm input all sit *inside* the `bg-white`-turned-card —
   using `dark:ring-offset-gray-900` there would mismatch the
   `dark:bg-gray-800` card around them (a visible halo where the ring's
   offset gap doesn't match its background). Used `dark:ring-offset-gray-800`
   throughout instead — general rule now: **ring-offset color = the dark
   background of whatever surface the control's ring-offset gap will
   actually show against**, page gray-900 or card gray-800 (or deeper
   nesting, if it ever comes up) as appropriate, never assumed.
3. **The "recessed sub-region inside a card" fix from `breadcrumbs`
   applies to interactive buttons too, not just passive display
   elements.** The Cancel button's `bg-gray-100` (subtly muted against the
   dialog's `bg-white`, by design — the quiet secondary action next to
   the solid indigo "Done") mapped via the generic engine to
   `dark:bg-gray-800` — identical to the now-corrected card background,
   making the button's resting state completely flush/invisible against
   its own card (worse than the light-mode relationship, which still has
   a faint but real white/gray-100 distinction). Overrode to
   `dark:bg-gray-900` — one step *darker* than the `gray-800` card,
   preserving the light-mode "quieter than the card" relationship instead
   of erasing it, exactly the same principle as breadcrumbs' recessed
   "current page" indicator, just applied to a button. Its own hover
   (`dark:hover:bg-gray-700`, fixed per the hover-collision gotcha below)
   now provides a bigger, clearer resting→hover jump than the engine's
   flat output would have. The Close icon button's `hover:bg-gray-50`
   hit the familiar dropdown-style hover/card-shade collision (engine gave
   it `dark:hover:bg-gray-800`, identical to the card) — fixed to
   `dark:hover:bg-gray-700` the same way as before.

**Fixed:** `scripts/generate-dark-variants.js` didn't add the `dark:bg-*`
background from #754 to a freshly-generated file's `<body>` — that fix
predates the script's authoring and nothing wired them together, so every
regenerated file needed it added by hand. The script now does this itself:
`ensureBodyDarkBackground()` post-processes each generated file's `<body>`
tag directly (adding `dark:bg-gray-900` to its existing `class`, or adding
the attribute if `<body>` has none), independent of the class-shade
engine — `<body>` never carries a `bg-*` class in light mode, so there was
never anything for the engine to invert in the first place; this is a
fixed convention, not a color-shade mapping. Only touches the Node CLI
path (`transformHtmlString`); the browser tool's DOM-aware path
(`transformHtmlDom`) only ever returns `body.innerHTML` for iframe
embedding and never touches the `<body>` tag itself, so it was never
affected by this gap. No more by-hand patching needed for future
collections.

**Found after the fact, fixed on `empty-states` and `modals`:** the
engine's blanket `white ↔ black` `colorMap` swap fires on *any* utility,
not just `bg` surfaces — so `text-white` labels sitting on a solid Action
fill (`bg-indigo-600 → dark:bg-indigo-500`) were being rewritten to
`dark:text-black` on regeneration. That undoes the entire point of Phase
1's fill-shade override (chosen specifically so a light label stays
legible on the fill): contrast-checked, white-on-`indigo-500` is ~4.47:1
(their light-mode pairing, white-on-`indigo-600`, is 6.29:1); black text
technically edges past AA at ~4.70:1 but is visibly the wrong design
against a colored fill. `white`/`black` swapping is correct for a page/card
*surface* (`bg-white → dark:bg-black`) but wrong for foreground text on a
colored sibling fill — the engine has no notion of "this text sits on that
fill" so it can't be ruled out automatically. Went unnoticed through both
collections' own migrations and the later a11y-fixes/`modals` sessions;
found and fixed by hand in the affected files first (`empty-states`: 3
buttons/badges across `1-dark.html`/`2-dark.html`/`4-dark.html`; `modals`:
the "Done" button across `3-dark.html`–`6-dark.html`; `pagination`: the
current-page indicator in `1-dark.html`).

**Tried an engine-level fix, reverted it — it was wrong, not just
incomplete.** Relying on each migration session to notice and hand-fix
this had already failed twice, so a rule was added to
`DEFAULT_CONFIG.rules` (`house-style-foreground-text-no-invert`) that made
the engine's `colorMap` swap never fire on the `text` utility at all —
`text-white`/`text-black` would pass through every regeneration unchanged.
Verified against the 11 known occurrences (byte-for-byte identical
regeneration of `empty-states`) and shipped as "root-caused." That
verification was the mistake: all 11 known cases happen to be `application`
buttons/badges where white text sits on a *colored* Phase-1-overridden
fill (indigo/red) that stays colored in dark mode, so the text correctly
never needs to invert — but that's not the only shape this pattern takes.
`neobrutalism` is an entire design system built the other way: `text-black`
paired with a *neutral* surface (`bg-white`, `bg-blue-100`, etc, 32+
occurrences across `accordions`/`badges`/`buttons`/`cards`/`checkboxes`/
`inputs`/`selects`/`tabs`/`textareas`) that itself flips via the existing
`bg-white → dark:bg-black` rule — there, the text *must* invert with its
surface (`dark:text-white`) or it goes invisible against its own now-black
card. A global "never invert `text` white/black" rule fixes the first
shape and silently breaks the second, and would have shipped completely
unnoticed since `neobrutalism` hasn't been migrated yet — nothing would
have caught it until someone actually ran the generator against it.
**The real distinction isn't the utility (`text` vs `bg`) or the color —
it's whether the paired surface/fill itself inverts to its opposite
neutral in dark mode.** That's sibling-class information, and it turns out
the engine already had what it needed to know it — `transformClassAttribute`
(`src/lib/dark-mode/transform-html.js`) processes one element's full
`class=""` attribute at a time, splitting it into tokens *before* mapping
each token through `transformClass`; it just never threaded that token
list any further down. Extended the `Rule` schema with
`requireClasses: string[] | null` — an additional match gate, alongside
the existing `utilities`/`shade`/`colors`/`excludeElements` gates, that
only fires when the *same element* also carries one of the listed
light-mode classes — and threaded a `siblingClasses` param through
`applyRules`/`transformClass`/`transformClassAttribute` so the gate has
something to check against. Re-added the fill-text rule, now scoped
correctly: `house-style-action-fill-text-preserve` matches `text-white`
only when `requireClasses: ['bg-indigo-600', 'bg-red-600']` is also present
on the element — i.e., only the exact case that's actually broken.
`neobrutalism`'s `text-black`/`text-white` pair with `bg-white`/`bg-{color}-100`/
`bg-black`, never `bg-indigo-600`/`bg-red-600`, so the rule never fires
there and the plain `colorMap` swap (already correct) still runs
unmodified. Verified both directions before shipping this time, not just
one: regenerated `empty-states`/`pagination`/one `modals` file and diffed
byte-for-byte against the hand-fixed committed versions (both diffs came
back containing only the *other*, unrelated, already-documented manual
gotchas — `modals`' card/backdrop/ring-offset fixes, `pagination`'s
border-shade mismatch — with the text-color handling itself identical in
both); separately ran the transform against `neobrutalism/badges/1.html`
(`text-black` on tinted `bg-*-100` cards), `badges/3.html` (`bg-white
text-black` *and*, on the same file, `bg-black text-white` — the exact
inverse pairing, both correctly inverting in both directions), and
`tabs/1.html`'s `hover:bg-black hover:text-white` state, confirming all of
them still invert normally. Re-ran the pre-existing `dark-mode-generator`
Playwright suite — identical 8 passed / 6 pre-existing-and-unrelated
failures as the reverted baseline, no new regressions. This is `text-white`/
`text-black`'s *only* documented failure mode found so far, so nothing is
left on the manual watch-list for it — but the underlying lesson holds for
anything discovered later: verify a fix against the case that's known
broken *and* against the cases that already work, before it goes in
`DEFAULT_CONFIG` where every future collection inherits it silently.

Prompted by this, audited every already-migrated (`badges` through
`pagination`) collection for the same bug shape before trusting the "done"
list: grepped for every `text-white` occurrence (all 8 already-hand-fixed
instances, all still clean, all a `bg-indigo-600` pairing — nothing missed)
and for any `text-black` at all (none — `application`'s house style never
uses it). Nothing in the done list needed rework.

`pagination` needed no Phase 2 fix (already conformed) — its individual
page-link buttons' `border-gray-200` is the "grouped interactive elements"
case named explicitly back in the `breadcrumbs` write-up above (pagination
was cited there as the existing precedent for that reading, even before
this collection itself was migrated), and its number-input variant's
`border-gray-300` is the plain "inputs" case. Regenerating hit two gotchas:

- The current-page indicator (`border-indigo-600 bg-indigo-600 ... text-white`,
  a non-interactive `<li aria-current="page">`, not a link) hit the
  `text-white → dark:text-black` flip documented above — fixed the same
  way. It also surfaced a *new* variant of that same underlying problem:
  its `border-indigo-600` exists purely to match its own `bg-indigo-600`
  fill (a seamless solid box, no visible border) — regenerating shade-maps
  `border` and `bg` independently (`border` has no Phase 1 rule so rides
  the generic `600→300` map, `bg` uses the Phase 1 override to `500`),
  producing a mismatched `dark:border-indigo-300` ring around a
  `dark:bg-indigo-500` fill where light mode had none. Fixed by hand to
  `dark:border-indigo-500`, matching the fill instead of the generic map.
  **Any self-matching `border-X bg-X` pair on a solid fill needs its
  border shade fixed to follow the fill's Phase-1-overridden shade, not
  the generic map** — same sibling-awareness gap as the text-color flip,
  different utility.
- The number-input variant hit the `@tailwindcss/forms` gotcha (declares
  `plugins: ['@tailwindcss/forms']`) — restored `dark:bg-gray-900
  dark:text-gray-50 dark:ring-offset-gray-900` by hand, matching the
  `inputs`/`filters` convention (added the ring-offset even though this
  particular input has no visible `focus:` state in its light source,
  for consistency with how every other forms-plugin restoration in this
  effort has included it regardless).

Next action: pick the next `application` collection (alphabetical after
`pagination` — `progress-bars` is next) and run it through Phase 2 → Phase 3
the same way the collections above were done, remembering: the
self-matching `border-X bg-X` shade-mismatch gotcha above for any other
solid-fill element with a same-color border (the `text-white ↔ black`
counterpart of this is now fixed at the engine level via the sibling-aware
`requireClasses` rule, see above — no longer a manual check for the
`bg-indigo-600`/`bg-red-600` case specifically; still watch for any *other*
solid Phase-1-covered fill color this effort adds later, which would need
its own `requireClasses` entry); the forms-plugin gotcha for any remaining
form-control collections; the `50`/`100`
resting/hover shade-map collision for any light tinted chip/pill that
darkens on hover; the floating-panel-vs-standalone-trigger border
distinction from `filters` (grouped controls and floating panels/cards →
`-200`, a single standalone toggle/outline/input → `-300`); the
`bg-white`-masking-patch-vs-`bg-white`-card distinction from `inputs`
(`dark:bg-gray-900` to disappear into the page vs `dark:bg-gray-800` to
stay visible against it); that Phase 1's solid-fill dark rule only covers
the `bg` utility, so a stroke/text use of the same color still rides the
generic `600→300` map (fine for thin strokes, per `loaders`); the settled
focus-ring scope decision from `modals` (preserve what's there, fix
colors only, don't add/remove the recipe); and — the big one, from
`modals` — **ring-offset and any "recessed sub-region" color must match
the nearest enclosing surface, not always the page**: once a component
has its own `bg-white`-turned-`dark:bg-gray-800` card, everything nested
inside it (ring-offsets, muted sub-fills, hover collisions) needs to
reason relative to that card's shade, not reflexively reuse the
page-level `gray-900`/`gray-800` pairing from earlier page-level-only
collections. Also watch for the `backdrop:` inversion bug on any other
component using a `backdrop:*` class (the engine inverts it like any
other class, which is wrong for a dimming scrim). No open design
questions remain for the normal pipeline — the house style table below
and the collection-exemption list are settled. Note: `accordions` sorts
alphabetically before `badges` (the original pilot) and was never picked
up by this effort — it isn't on the exemption list, so it's presumably
just an oversight in the ordering and still needs a pass at some point.

Also flagged, not yet resolved: the house style table's Action recipe
includes `focus:ring-2 focus:ring-indigo-600` on solid buttons, but no
`bg-indigo-600` button anywhere in the codebase actually has it today, and
the dedicated a11y-fixes pass deliberately skipped adding it. Worth a
decision in its own session (add it everywhere as part of Phase 2, or
drop it from the table as aspirational/out-of-scope) rather than having
each collection guess — `empty-states` left it alone pending that call.

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
| Focus ring — non-action controls | `ring-gray-900` | checkboxes, inputs — only when the component has no pre-existing focus-ring recipe already (see `modals` write-up below: don't retrofit this onto controls that already carry the a11y-sweep's `focus:ring-indigo-600` recipe) |

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
`public/examples/{category}/{slug}/*-dark.html` files, run
`pnpm run generate:dark-variants --category=<category> --slug=<slug>` to
regenerate just that collection (the badges pilot predates the
`--category`/`--slug` flags — an unscoped run back then scanned *all*
categories and also surfaced ~51 pre-existing gaps in unrelated
collections, see "Known follow-up" below; scoping avoids that now), review
the rendered output, then set that collection's `dark: true` once in its
MDX frontmatter.

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
