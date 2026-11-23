# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

Tailwind CSS v4, Astro 7, Cloudflare Pages (via Wrangler), Playwright (E2E tests). No package to install for end users — this repo is the documentation site for the component library.

## Commands

```bash
pnpm dev                          # start dev server (also runs wrangler types first)
pnpm run css:component --watch    # compile component preview CSS (run alongside dev)
pnpm build                        # production build
pnpm test                         # run Playwright E2E tests (reuses `pnpm dev`, or starts it)
pnpm test:a11y                    # axe (WCAG 2.1 AA) on every example and site page
pnpm test:a11y:diff               # axe on the examples changed against main (also part of `pnpm test`)
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

Generate dark variants with `pnpm dark public/examples/{category}/{slug}/{n}.html`. It runs the same engine as the browser tool at `/tools/dark-mode-generator` (`src/lib/dark-mode/`), with the rules in `scripts/dark-mode.config.json`, plus post-steps for what the engine can't do: page background, backdrops, form controls, chart colours and scripts that toggle classes. Surfaces that are dark in both themes, like code blocks, use a `bg-gray-950` background in the light file, and the script leaves them and everything inside them as they are. Review the output in the preview before committing. `templates/portfolio/1-dark.html` has a hand-tuned contact section, so `--check` reports it as different.

### Preview System

`ComponentPreview.astro` defines a `<component-preview>` custom element. Preview controls (breakpoints, copy, view toggle, direction) are separate custom elements that communicate with `<component-preview>` via namespaced `CustomEvent`s on `document`, keyed by the component's src path (e.g., `preview:copy:/examples/application/accordions/1.html`).

### CI

`.github/workflows/ci.yml` runs lint, Prettier, `pnpm build`, `pnpm check` and the Chromium tests on every pull request and push to `main`, against the built site served by `wrangler dev`. A weekly run adds Firefox, WebKit and the full accessibility sweep. Tests import `test` and `expect` from `src/tests/fixtures.ts`, which blocks ads and analytics so test runs never count as impressions or visits.

### Copy Counts

`PreviewCopy.astro` sends a beacon to `/api/copy` (`src/pages/api/copy.ts`, a server-rendered route) after each copy. It writes the category, slug, variant, theme and copy kind to the `hyperui_copies` Workers Analytics Engine dataset (`COPY_EVENTS` binding in `wrangler.jsonc`).

### Interest Counts

`TemplateInterest.astro` adds an "I'm interested" button to a template's page, placed in that template's MDX file, never in the template markup. A click sends a beacon to `/api/interest` (`src/pages/api/interest.ts`), which writes only the template slug to the `hyperui_interest` dataset (`INTEREST_EVENTS` binding).

### MCP Server and Skill

`src/pages/mcp.ts` is a stateless remote MCP server at `/mcp` (JSON-RPC over POST, server-rendered). Tools: `list_categories`, `search_components` and `get_component`. Each request is counted in the `hyperui_mcp` dataset (`MCP_EVENTS` binding): the method, the tool, the category and slug for `get_component`, and a coarse client bucket from the user agent. Search queries and anything else about the caller are never stored. `skills/hyperui/SKILL.md` is the published agent skill.

### Page Routing

- `/components/{category}` → `src/pages/components/{category}/index.astro`
- `/components/{category}/{slug}` → `src/pages/components/{category}/[...slug].astro` → `ComponentPost.astro` layout
- `/faqs` → `src/pages/faqs.astro`, rendering `src/content/pages/faqs.mdx`

### Adding a New Component

1. Add an entry to the `components` array in the relevant MDX file under `src/content/collection/`.
2. Create the corresponding HTML file(s) in `public/examples/{category}/{slug}/`. Give each a `<title>` in the form `{component title} - {collection title} - HyperUI`, adding ` (dark)` after the component title for dark files.
3. If dark mode is supported, add `dark: true` to the frontmatter entry and provide a `{n}-dark.html` file.

## Templates

- Only build pages people would otherwise build themselves inside their own product. No kanban boards or other templates that copy tools teams already use off the shelf.
- Support Inbox stays, as a preview of the application components working together.

## PR Title Format

```
<Feature|Bugfix|Update|Epic> - Description in sentence case
```

## Git Workflow

When on a branch other than `main`, always push to the current branch (`git push origin HEAD:<current-branch-name>` or equivalent), unless a new branch is explicitly requested. Do not `git checkout -b <name>` a local branch whose name differs from the remote branch it's meant to track (e.g. dropping a `claude/` prefix) — a plain `git push -u origin <name>` in that situation creates a new, unrelated remote branch instead of updating the intended one.

Merge small, low-risk pull requests (a fix to one example, a typo, a test update) yourself once CI is green. Larger changes, anything touching `src/pages`, `wrangler.jsonc` or the build, wait for review.
