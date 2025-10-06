# Contributing to HyperUI

Thanks for helping improve HyperUI. This file gives a short, actionable guide to get contributions accepted quickly. For the full internal guide see the blog post: https://www.hyperui.dev/blog/how-to-contribute

## Quick start (local)
```bash
git clone git@github.com:markmead/hyperui.git
yarn install
yarn dev
yarn css --watch
```
Note: you may see a console warning `params should be awaited before using its properties` — this can be ignored.

## Found a bug or idea?
- Open an issue first. Include reproduction steps, screenshots, and the page/component path.
- If proposing a new collection or category, open an issue to discuss first.

## Adding or changing a component
1. Add the component example file under:
   - `public/components/<category>/<group>/`
   - Follow the numeric filename pattern used in the folder (e.g., `21.mdx`, `22.mdx`).
2. Register the example in the MDX index:
   - `src/data/components/<category>/<group>.mdx`
   - Provide metadata fields: `title`, `description`, optional `container`, and `plugins` when required.
3. If the component uses Tailwind plugins, declare them in the MDX frontmatter, e.g.:
```mdx
plugins: ['@tailwindcss/forms']
```
4. `container:` affects preview placement only and does not change the copied code output.

Guidelines:
- Use Tailwind CSS classes only.
- Use only official Tailwind plugins and declare any plugin usage in MDX metadata.
- Keep components accessible: visible focus states, ARIA where applicable, and keyboard interactions.

## Pull request process
- Open a small, focused PR and link the related issue.
- PRs are reviewed before merging. Respond to feedback promptly.
- If feedback from the first review isn’t addressed by the third review the PR may be closed; new review cycles are allowed if changes are made.

## Checklist before submitting a PR
- [ ] Run the site locally and verify the component preview and the copied code output.
- [ ] Confirm any Tailwind plugins used are declared in MDX metadata.
- [ ] Follow the numeric naming pattern and correct folder path.
- [ ] Add/update any documentation or the MDX index entry.
- [ ] Run formatting/lint scripts (if applicable).

## CI / tests / QA (notes)
- Add GitHub Actions changes/tests sparingly and consider maintainability.
- Visual or accessibility tests are welcomed — add instructions in the PR for maintainers to run them.

## Need help?
- If you’re unsure where to add something or need review before implementing, open an issue describing your plan.
- Maintainers will advise on folder structure, naming, and plugin usage.

Thank you — concise, well-documented contributions are appreciated.