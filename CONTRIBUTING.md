# Contributing to HyperUI

Thanks for helping improve HyperUI.

## Before you start

Please open an issue first before starting work.

## Run the site locally

```bash
git clone git@github.com:markmead/hyperui.git
pnpm install
pnpm dev
pnpm css --watch
```

## Submit a contribution

1. Open an issue.
2. Create a branch.
3. Make your change.
4. Open a PR for review.

All pull requests are reviewed before merging. If feedback from the first review isn't addressed by the third review, the PR will be closed. New feedback in a later review is fine; just address it as usual.

## Add a component

For example, to add a footer to the marketing category:

1. Add the HTML file to `public/examples/marketing/footers/`, with a `<title>` such as `Large with newsletter form - Footers - HyperUI`. Files are numbered in order (`12.html`, then `13.html`), with a matching `13-dark.html` if it has a dark mode version. Generate the dark file with `pnpm dark public/examples/marketing/footers/13.html`, then check it in the preview.
2. Add an entry to the `components` array in `src/content/collection/marketing/footers.mdx`, with `dark: true` if you added a dark file.
3. With `pnpm dev` running, run `pnpm test:a11y:diff`. It checks the example files you changed with axe (WCAG 2.1 AA). `pnpm test:a11y` checks every example.

Component guidelines:

- Use Tailwind CSS for all styling.
- Only use official Tailwind CSS plugins, and declare them on the component's entry, for example `plugins: ['@tailwindcss/forms']`.

To propose a new collection, [open an issue](https://github.com/markmead/hyperui/issues/new/choose) so we can discuss it first.

## Issue and PR title format

- Use sentence case for the description part.
- Keep descriptions concise and specific.
- Pull request titles must use: `<Feature|Bugfix|Update|Epic> - Description`
- Examples:
  - `Feature - Add new card variants`
  - `Bugfix - Resolve search input focus state`
  - `Update - Improve footer component docs`
  - `Epic - Refactor component preview architecture`
