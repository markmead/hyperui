# Plan: Tailwind checker

_Status: dropped on 2026-11-21. The engine shipped (#809) and stays in the repo. The page, retiring the generator page and the MCP server won't be built. Kept as a record of what was planned._

## What it is

Paste Tailwind CSS HTML, for example markup an AI assistant just wrote, and get back:

1. **What's wrong**, as text, grouped into accessibility, right-to-left and dark mode. Each finding has a line, why it matters and a fix.
2. **A prompt for your AI**, listing every finding, to paste back into the assistant so it makes the fixes.
3. **The fixed HTML**, with every fix applied.

It replaces the dark mode generator page. The generator's engine stays: it backs `pnpm dark`, the checker's dark mode fixes and the planned MCP server.

## Why it's worth having

- **Deterministic.** The same markup always gives the same findings, with exact lines and fixes. Asking an AI to "check this" gives a different, sometimes invented, answer each time.
- **axe measures what AI guesses.** Contrast in particular needs real colours and layout.
- **HyperUI's own rules.** The dark mode colour mapping from `pnpm dark`, logical utilities, focus styles and the `@tailwindcss/forms` assumption. Position it as "checks markup against the rules HyperUI's components pass", not as a general accessibility checker.
- **Built for agents.** The same findings and prompt are what an MCP tool returns, so an agent can check its own output.

Traffic to a paste-in tool will be modest. The tools index got 2,790 views against 940 for the two tools combined. The page is mainly the demo and the redirect target for the old generator. The MCP server is where the engine earns its keep.

## Done: the engine (#809)

`src/lib/checker/` is plain string work, with no DOM and no repo paths, so it runs in the browser, in Node and in an MCP server.

| Group         | Checks                                                                                                                                                                                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility | A focus outline removed with nothing in its place. SVG icons that screen readers would read. Everything axe covers                                                                                                                                                         |
| Right-to-left | `pl-`, `mr-`, `left-`, `text-left`, `float-right`, `border-l`, `rounded-tl` and others, each with its logical equivalent                                                                                                                                                   |
| Dark mode     | Colours with no `dark:` pair, from the `pnpm dark` engine. Leaves alone accent colours (300–600), text and colours on a coloured background, colours meant to stay the same and surfaces already dark in the light theme. Markup with no dark mode at all gets one finding |

- `applyFixes` combines fixes per element and leaves the rest of the source byte for byte.
- `findingsForAi` writes the prompt.
- `instrumentMarkup` and `axeFindings` map axe results back to source lines.

Running it over all 305 dark examples tuned the dark rule until most of what's left is real. It also found `*:text-left` in Support Inbox, which the template right-to-left test missed. Both are fixed.

## Next: the page (PR 2)

`/tools/tailwind-checker`: a textarea, the findings as text, and two buttons, "Copy prompt for AI" and "Copy fixed HTML". There is no visible preview.

### Running axe safely

axe needs a real document, so the markup is rendered in a **hidden** iframe that exists only for axe. Tested in Chromium with hostile markup:

| Pasted in                                                         | Result                                                    |
| ----------------------------------------------------------------- | --------------------------------------------------------- |
| `<script>` that tries to reach the parent page and call `fetch()` | Blocked: only our scripts, carrying a one-time nonce, run |
| `<img onerror="fetch(…)">`                                        | Blocked                                                   |
| An external tracking image                                        | Blocked: no request reached the host                      |
| Reading `localStorage` from inside                                | `SecurityError`: the frame has no access to hyperui.dev   |
| axe results                                                       | Correct, contrast included                                |

Running axe from the parent page doesn't work: it only checks the parent document and skips the frame. axe must run inside.

**How:**

1. The iframe is `sandbox="allow-scripts"` with no `allow-same-origin`, so it has an opaque origin and no access to hyperui.dev's storage, cookies or APIs.
2. A Content Security Policy in the frame allows only scripts with a fresh random nonce per run, and blocks every network request:

   ```
   default-src 'none'; script-src 'nonce-…'; style-src 'unsafe-inline'; img-src data:
   ```

   Pasted scripts and inline handlers can't run, even if stripping misses one.

3. Pinned, self-hosted axe-core and the Tailwind CSS browser runtime are inlined into the frame with the nonce, so Tailwind classes have real colours for contrast. There are no CDN scripts.
4. Scripts, `on*` attributes and `javascript:` URLs are stripped before rendering. The policy is the backstop.
5. Results come back by `postMessage`. The page accepts a message only from that frame's window, with the run's nonce and the expected shape.
6. Findings, messages and snippets are shown with `textContent`, never `innerHTML`.
7. Input is capped at about 200 KB. If axe hasn't answered within a few seconds, the frame is replaced and the page says so.
8. Images are never loaded. Nobody sees the frame, and axe's results don't depend on the pixels.

### Broken markup

Browsers repair malformed HTML before axe sees it, while the scanner reads the raw source, so the two can disagree. The scanner reports unclosed or mismatched tags as a finding ("This markup isn't well-formed, so some line numbers may be off") instead of quietly giving odd results.

### Tests

- Every hostile case in the table above, plus a forged `postMessage` that is ignored.
- Snippets render as text.
- Input over the limit is refused.
- The keyboard pass, axe on the page itself and the accessibility review, as for any page.

Build the page with /frontend-design and drive it with /agent-browser.

## Then: retire the generator page (PR 3)

- Remove `/tools/dark-mode-generator`, its five `DarkMode*.astro` components, `ui-renderer.js`, `rule-renderer.js`, `preview-document.js` and `dark-mode-generator.spec.ts`.
- **Keep** the shared rule handling in `src/lib/dark-mode/config.js` (`normalizeConfig`, `importConfig`): the MCP's `generate_dark` tool takes optional rules, with HyperUI's own rules as the default. Only the browser storage goes.
- Redirect `/tools/dark-mode-generator` permanently to `/tools/tailwind-checker`.
- Replace the generator in `src/data/tools.json` and in the site page list in `accessibility.spec.ts`.
- Update `CLAUDE.md` and the header of `scripts/generate-dark.js`.

## Later: the MCP server

Under Agents in the product plan. Tools such as `check_markup`, `fix_markup`, `generate_dark` and `findings_for_ai` wrap the engines directly. In Node, axe can run on a script-free DOM such as jsdom for every rule except contrast, which needs layout. For contrast, either use a headless browser or work it out from the Tailwind palette. Decide when it's built.

## Not in scope

- Accounts. HyperUI has none, for anything.
- Sending markup to a server. Everything runs in the visitor's browser.
- A visible preview, and loading external images.

## Found along the way, not fixed yet

- `application/filters/2`: `hover:text-gray-900` has no dark hover, so the text goes near-black on a dark background.
- `marketing/footers/10`: `group-hover` in light, `hover` in dark.
- About 60 component files use physical left and right utilities. Only templates are guarded.
