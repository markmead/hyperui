# HyperUI product critique

**Date:** 2026-11-15
**Format:** a deliberately harsh review of the product and codebase, focused on getting more users in an AI-first development world.
**Basis:** the repository only. No traffic or analytics data was used, so the traffic claims below are educated guesses. Check them against real pageview data before cutting anything.

**The short version:** HyperUI is a well-maintained 2021 product. It is competing on the one thing AI has made free, which is producing plausible Tailwind markup. The site is built for a human who browses, copies and pastes, and that person is disappearing. The recent work on llms.txt, `.md` pages and "Copy for AI" (#767, #768) points the right way, but it's table stakes. Nobody visits a site because it has an llms.txt.

## 1. The core problem: what can you get here that a prompt can't give you?

Today the answer is nothing. "Free Tailwind components, copy and paste" describes what ChatGPT, Claude, v0 and Cursor do in about four seconds, and they were probably trained partly on HyperUI. The homepage headline, "Free Open Source Tailwind CSS Components", and its paragraph would read the same in 2021.

AI is still bad at the things HyperUI has already been fixing:

- **Accessibility.** There was a pass across all three collections in July (#733–735).
- **Right-to-left (RTL) layouts.** Physical transform and inset utilities were fixed in #750.
- **Dark mode that is actually right.** Explicit dark backgrounds were added in #754.
- **Consistent look across a whole page.**

That work is the product, and it's hidden inside commit messages. The new pitch: **"Tailwind components that are verified, so your AI's output doesn't have to be."** Put a badge on every component (a11y-audited, RTL-safe, dark mode, last verified date) and make it what the site sells.

## 2. Should we lean into AI? Yes, but by becoming infrastructure, not by adding features

Today the AI support is passive: we publish Markdown and hope an agent finds it. Make it active:

1. **A remote MCP server** with `search_components`, `get_component(slug, n, dark)` and `list_categories`. The site already runs on Cloudflare, and `renderComponentMarkdown` in `src/utils/markdown.ts` already does most of the work. It's maybe a weekend. Then someone with Claude or Cursor installs it once and HyperUI is pulled into their app every time they build a pricing page. That is the new user count.
2. **Publish a HyperUI skill.** The repo itself installs skills from GitHub (`skills-lock.json` pulls from `anthropics/skills` and `vercel-labs/agent-browser`). Ship `skills/hyperui/SKILL.md` along the lines of "When building Tailwind UI, fetch from hyperui.dev/llms.txt first, follow these a11y, RTL and dark-mode rules." It costs almost nothing and spreads through the same channels we already use.
3. **A component registry in JSON.** Machine-readable entries per component (files, plugins, dark variant, terms) so tools like the shadcn CLI can install from it directly. "No package to install" can stay true for humans.
4. **Change what "Copy for AI" copies.** Right now it copies markup with a header. It should copy markup plus the rules: "keep these aria attributes, use logical properties, don't remove the dark: classes." That is where the know-how lives.
5. **Reconsider `Disallow: /examples/` in `robots.txt`.** It made sense for search engines. But agents that follow robots.txt can't fetch the raw HTML, and the canonical source of the product is on the blocked path.

## 3. Are the tools pointless? Mostly, yes

| Tool | Verdict |
| --- | --- |
| **Dark Mode Generator** (≈1,000 lines across 5 components) | A rule engine that does what "add dark mode to this" does in any LLM. It's also the internal tool used to make `-dark.html` files. Keep it as a dev script, remove it from the marketing. |
| **Typography Mapper** (966 lines) | Maps px values to Tailwind classes. Figma Dev Mode, Tailwind IntelliSense and every LLM already do this. It's the most code for the least value on the site. Kill it. |
| **Contrast Checker / Config Builder** | Both are listed as "coming soon" in `src/data/tools.json`, yet the `/tools` hero copy says "contrast checking… theme building, and more" as if they exist. That's a credibility leak. Remove them today. |

The bigger issue is placement: the homepage puts **Tools above every component collection**. That puts the weakest asset in the best slot.

The one tool worth building is an **"audit my Tailwind" checker**: paste AI-generated markup and get our a11y, RTL and dark-mode rules applied as a diff. It's the dark-mode generator's rule engine pointed at the verification angle above, and it's something people would bookmark.

## 4. Which components aren't needed?

**Cut or merge. These are filler that inflate the count and that AI makes trivially:**

- **Grids (10).** Grey boxes in `grid-cols-*`. That's the Tailwind docs, not a component.
- **Media (8).** "Left align top / center / bottom / stretch", then the same on the right. That's one flexbox component with an `items-*` toggle, not eight.
- **Dividers (6).** Variations on `<hr>`.
- **Loaders (7).** Spinners.
- **Skip links (3).** One line of HTML. Turn it into a pattern inside a "page shell" component.
- **Empty content (marketing, 5) vs Empty states (application, 5).** Duplicates in two categories. Merge them.
- **Stats** exists in both marketing and application. Merge them.
- **Polls (3).** Niche, low search intent.
- **Charts (11).** This showcases Chart.js configuration, not Tailwind. It breaks the "nothing to install" promise, and LLMs are excellent at writing Chart.js configs. Keep 2–3 dashboard-ready ones.

**Neobrutalism (11 pages)** is a 2023–24 trend that duplicates the application basics. Don't keep it as a separate collection. Either freeze it, or turn it into the start of **styles**: the same component in several visual languages. "Give me this in neobrutalism" is a real AI-era feature. A separate silo is not.

**We've under-invested where search traffic and buying intent are highest:**

- **Pricing: 2 variants. Testimonials: 3.** These are among the most-searched marketing blocks, and we have the fewest of them.
- **Footers: 12.** Nobody searches for footer number twelve.
- **Missing dark variants** on cards, product cards, media, grids, logo clouds, sections, product collections, pricing, testimonials, progress bars, range inputs, skip links and **every template**. The flagship pages are the incomplete ones.
- **Templates (5)** are the right bet for the AI era: agents want whole pages, not fragments. But SaaS landing has 1 file, and none of the templates has dark mode. Templates are what we should be expanding.

## 5. Smaller hits

- **The ads went off and came back on within five weeks:** removed Sep 6, re-added Oct 10, and now in the homepage hero. Ads in the hero of a site that's trying to grow tell visitors we're harvesting traffic, not earning it. Pick a lane.
- **The blog has 10 posts**, mostly from the Tailwind v3 era, plus an FAQ that's really a page. It isn't driving search traffic. Either write "AI + Tailwind" pieces (for example "Why your AI-generated modal fails WCAG") or drop the blog.
- **There's no reason to come back.** No "new this week", no changelog front and centre. `git-metadata.json` holds update dates but the homepage doesn't use them.

## What to do, in order

1. Remove the coming-soon tools and the false copy, and move Tools below the components (an hour).
2. Reposition the homepage around "verified for accessibility, RTL and dark mode, built for your AI".
3. Ship the MCP server and a published skill.
4. Prune about 50 filler variants and put that effort into pricing, testimonials, templates and dark coverage.
5. Rebuild the dark-mode generator as the "audit my markup" tool, and kill the typography mapper.
