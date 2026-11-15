# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

Tailwind CSS v4, Astro 7, Cloudflare Pages (via Wrangler), Playwright (E2E tests). No package to install for end users — this repo is the documentation site for the component library.

## Commands

```bash
pnpm dev                          # start dev server (also runs wrangler types first)
pnpm run css:component --watch    # compile component preview CSS (run alongside dev)
pnpm build                        # production build
pnpm test                         # run Playwright E2E tests (requires dev server running)
pnpm lint                         # ESLint
pnpm format                       # Prettier
pnpm run generate:git-metadata    # regenerate src/data/git-metadata.json from git history
pnpm dark <light.html>...         # generate {n}-dark.html files (add --check to compare instead)
```

## Architecture

### Content Collections

Components are defined in MDX files under `src/content/collection/{application,marketing,neobrutalism}/`. Each MDX file's frontmatter declares the collection metadata and a `components` array — each entry in that array corresponds to a numbered HTML file. The MDX body is minimal (typically just a `<BaseHero>` import).

The three categories map to Astro content collections defined in `src/content.config.ts`, which also reads `src/data/git-metadata.json` to attach `updated` (commit + date) metadata to each collection entry.

### Component HTML Files

The actual component markup lives in `public/examples/{category}/{slug}/{n}.html` (light) and `public/examples/{category}/{slug}/{n}-dark.html` (dark). These are standalone HTML pages loaded in iframes by the `<component-preview>` custom element.

Generate dark variants with `pnpm dark public/examples/{category}/{slug}/{n}.html`. It runs the same engine as the browser tool at `/tools/dark-mode-generator` (`src/lib/dark-mode/`), with the rules in `scripts/dark-mode.config.json`, plus post-steps for what the engine can't do: page background, backdrops, form controls, chart colours and scripts that toggle classes. Review the output in the preview before committing. `templates/portfolio/1-dark.html` has a hand-tuned contact section, so `--check` reports it as different.

### Preview System

`ComponentPreview.astro` defines a `<component-preview>` custom element. Preview controls (breakpoints, copy, view toggle, direction) are separate custom elements that communicate with `<component-preview>` via namespaced `CustomEvent`s on `document`, keyed by the component's src path (e.g., `preview:copy:/examples/application/accordions/1.html`).

### Copy Counts

`PreviewCopy.astro` sends a beacon to `/api/copy` (`src/pages/api/copy.ts`, the only server-rendered route) after each copy. It writes the category, slug, variant, theme and copy kind to the `hyperui_copies` Workers Analytics Engine dataset (`COPY_EVENTS` binding in `wrangler.jsonc`).

### Page Routing

- `/components/{category}` → `src/pages/components/{category}/index.astro`
- `/components/{category}/{slug}` → `src/pages/components/{category}/[...slug].astro` → `ComponentPost.astro` layout
- `/faqs` → `src/pages/faqs.astro`, rendering `src/content/pages/faqs.mdx`

### Adding a New Component

1. Add an entry to the `components` array in the relevant MDX file under `src/content/collection/`.
2. Create the corresponding HTML file(s) in `public/examples/{category}/{slug}/`. Give each a `<title>` in the form `{component title} - {collection title} - HyperUI`, adding ` (dark)` after the component title for dark files.
3. If dark mode is supported, add `dark: true` to the frontmatter entry and provide a `{n}-dark.html` file.

## PR Title Format

```
<Feature|Bugfix|Update|Epic> - Description in sentence case
```

## Git Workflow

When on a branch other than `main`, always push to the current branch (`git push origin HEAD:<current-branch-name>` or equivalent), unless a new branch is explicitly requested. Do not `git checkout -b <name>` a local branch whose name differs from the remote branch it's meant to track (e.g. dropping a `claude/` prefix) — a plain `git push -u origin <name>` in that situation creates a new, unrelated remote branch instead of updating the intended one.
