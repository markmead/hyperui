# Writing components

Conventions for the HTML files in `public/examples/`. The steps for adding one are in `CLAUDE.md` and `CONTRIBUTING.md`. Accessibility specifics are in [accessibility.md](accessibility.md).

## Markup

- **Real copy, not lorem ipsum.** Write plausible content a product would show: names, dates, counts. Short and specific.
- **Standalone pages.** Each file is a full page loaded in an iframe. It loads `/component.js` and `/component.css` in its head, and carries its own `<script>` for behaviour. Don't depend on another file.
- **Tailwind only,** with official plugins declared on the entry in the collection MDX (`plugins: ['@tailwindcss/forms']`). Utilities in `public/component.css` are compiled, so a class that no file has used before needs `pnpm css` (see below).
- **Buttons** that don't submit a form are `<button type="button">`.
- **Ids** are prefixed so two components on one page can't collide: `base-tab-0`, `base-panel-0`. Ids that a heading label points at must be unique within the file.
- **Scripts** are plain, small, and inline. Name things for what they are (`tabEl`, `sidebarToggle`), keep to one `setXOpen`-style function per behaviour, and skip frameworks.
- **Dark files** are generated, not hand-written (`pnpm dark <file>`). A hand edit to a dark file is lost the next time it's generated, so change the light file, regenerate, then review. Run `pnpm dark <file> --check` first, since over a hundred existing dark files differ from a fresh run. If a section can't be generated (a hand-tuned area), say so in the PR.
- **Colour swatches** (a product's real colour, such as the dots on a product card or the colour picker on the storefront) must look the same in both themes. The generator doesn't know they are swatches and shifts their fill, so after `pnpm dark` put the original `bg-*` back on each swatch and remove its `dark:bg-*`. Keep their ring and focus `dark:` variants. `--check` then reports the file as different, so don't regenerate `templates/storefront/2-dark.html` or `marketing/product-cards/3-dark.html` without putting the fix back.

## Compiled CSS

`public/component.css` is compiled from `src/styles/component.css` with `pnpm css`. Recompile and commit it when you use a Tailwind class no example used before, for instance a new variant like `max-lg:`. If you only reuse classes, nothing changes.

## Changing a component that templates use

Search `public/examples/templates` for its distinctive classes. Either update the template, or keep the old markup as a new variant the template uses. Then regenerate dark variants (`pnpm dark`) and thumbnails (`pnpm thumbnails`). A template must not fall behind its component, for example by missing a focus style the component gained.

## Checklist before you open a PR

- [ ] Light file, dark file (if `dark: true`) and the collection MDX entry agree.
- [ ] `<title>` follows `{component title} - {collection title} - HyperUI`, with ` (dark)` on dark files.
- [ ] No `pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-` or `text-left`.
- [ ] Looked at it at 390px, 768px and 1280px, in light and dark.
- [ ] `pnpm test:a11y:diff` is clean.
- [ ] If you fixed a pattern, you searched every other copy of it.
- [ ] After committing a collection or component change, run `pnpm run generate:git-metadata` and commit `src/data/git-metadata.json`. When several PRs are open together, do this in a separate PR once they merge, to avoid conflicts.
