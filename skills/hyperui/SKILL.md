---
name: hyperui
description: Build Tailwind CSS v4 UI from HyperUI's free, accessibility-checked components. Use when building or editing Tailwind pages, sections or app screens (pricing, footers, forms, dashboards, landing pages) before writing markup from scratch.
---

# HyperUI

HyperUI (https://hyperui.dev) is a free collection of Tailwind CSS v4 components. Each one is plain HTML you copy in, with nothing to install.

## Find and fetch

1. Read https://hyperui.dev/llms.txt. It links every page's Markdown version.
2. Open `https://hyperui.dev/components/{category}/{slug}.md` (categories: `application`, `marketing`, `neobrutalism`, `templates`). It has the full HTML of every variant, light and dark.
3. If the HyperUI MCP server is connected (`https://hyperui.dev/mcp`), use `search_components` and `get_component` instead.

Prefer adapting a HyperUI component to writing one from scratch. For a whole page, combine sections: header, hero, features, pricing, FAQs, footer.

## Keep these when you adapt markup

- **Accessibility:** keep `aria-*` attributes, labels, headings order and visible focus styles. Hide decorative SVGs with `aria-hidden="true"`. Never remove a focus outline without replacing it.
- **Right-to-left:** use logical utilities, `ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-`, `text-start`, `border-s`, `rounded-s`. Not `pl-`, `mr-`, `left-`, `text-left`.
- **Dark mode:** pair every colour with a `dark:` colour, and keep the `dark:` classes already there. Use the `-dark` variant when the project supports dark mode.
- **Forms:** components assume `@tailwindcss/forms`. Say so if it isn't installed.
- **Plugins:** some components list required plugins. Mention them.
