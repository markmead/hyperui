# HyperUI product critique

**Date:** 2026-11-15
**Format:** a deliberately harsh review of the product and codebase, focused on getting more users in an AI-first development world.
**Basis:** the repository, plus the top-paths pageview export for 2026-10-16 to 2026-11-15 (170,800 views). That export comes from browser-side analytics, so it counts people browsing the site. It does not count agents fetching `llms.txt` or the `.md` pages. Those requests come from a separate export for the same window (1,050 requests), covered in "What agents are already doing" below.

**The short version:** HyperUI is a well-maintained 2021 product. It is competing on the one thing AI has made free, which is producing plausible Tailwind markup. The site is built for a human who browses, copies and pastes, and that person is disappearing. The recent work on llms.txt, `.md` pages and "Copy for AI" (#767, #768) points the right way, but it's table stakes. Nobody visits a site because it has an llms.txt.

## Where the traffic goes

| Area                         | Views  | Share | Pages | Variants |
| ---------------------------- | ------ | ----- | ----- | -------- |
| Homepage `/`                 | 50,420 | 29.5% | 1     | –        |
| Application (index + pages)  | 48,110 | 28.2% | 34    | 163      |
| Marketing (index + pages)    | 33,820 | 19.8% | 22    | 103      |
| Neobrutalism (index + pages) | 14,120 | 8.3%  | 11    | 37       |
| Templates (index + pages)    | 13,790 | 8.1%  | 5     | 12       |
| Blog                         | 4,500  | 2.6%  | –     | –        |
| Tools                        | 3,730  | 2.2%  | 3     | –        |
| `/cdn-cgi/content`           | 2,310  | 1.4%  | –     | –        |

`/cdn-cgi/content` is Cloudflare-internal noise. Filter it out of future exports.

Two numbers stand out. The homepage takes almost a third of all views, so it's the page most worth changing. And templates get about **1,150 views per variant**, against about 290 for the site as a whole.

## 1. The core problem: what can you get here that a prompt can't give you?

Today the answer is nothing. "Free Tailwind components, copy and paste" describes what ChatGPT, Claude, v0 and Cursor do in about four seconds, and they were probably trained partly on HyperUI. The homepage headline, "Free Open Source Tailwind CSS Components", and its paragraph would read the same in 2021. That copy is the first thing 29.5% of visitors see.

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

### What agents are already doing

A second export covers requests to `.md` and `.txt` paths over the same 30 days: **1,050 requests**. That's 0.6% of the 170,800 human page views. But the Markdown pages only shipped on Nov 11 (#767), so most of these requests probably came in the last four days. At that rate it's about 260 a day against about 5,700 human views a day, roughly 4–5%. That's early, and it's growing from zero.

The values are rounded to tens, so any single row of 10–40 is noise. The patterns are what matter.

| What                                                                     | Requests | Share   |
| ------------------------------------------------------------------------ | -------- | ------- |
| Entry points: `/llms.txt` (160), `/index.md` (60), `/llms-full.txt` (50) | 270      | 26%     |
| Component pages (`/components/{category}/{slug}.md`)                     | 550      | 52%     |
| Category and blog `.md` pages, `/tools/typography-mapper.md`             | 110      | 10%     |
| **Guessed URLs that don't exist**                                        | **120**  | **11%** |

What this tells us:

1. **Agents find the site through `llms.txt`.** It's the most-requested path by a wide margin. Keep it short, current and ordered by what's most useful. It's the new homepage for this audience.
2. **Agents want landing-page sections.** The top component pages are footers (40), FAQs, file uploaders and banners (30 each), then CTAs, contact forms, cards, headers and the SaaS landing page (20 each). Those are the parts of a landing page. Agents are assembling whole pages from fragments, which backs up the case for templates. Accordions, the top page for humans (4,090 views), got only 10 agent requests.
3. **About one request in nine is a guess that fails.** These include:
   - `/components/application/index.html.md`, plus four more `…/index.html.md` paths
   - `/docs/llms-full.txt` (20)
   - `/components/application/filters/llms.txt` and `/components/application/empty-states/llms.md`
   - `/examples/marketing/pricing/1.md`
   - `/readme.md` and `/.github/issue_template.md`

   Most of these can be caught with a few redirects in `public/_redirects`. For example, `/*/index.html.md` would go to `/:splat.md`, `/docs/llms-full.txt` to `/llms-full.txt`, and `/components/*/llms.txt` to `/llms.txt`. That's an hour's work, and it recovers roughly 11% of agent requests.

4. **Agents go looking for the raw examples.** One agent asked for `/examples/marketing/pricing/1.md`, which confirms point 5 above about `robots.txt`.

The export doesn't split requests by user agent and doesn't include `/examples/*.html`. Add both to the next export, so we can tell which assistants are using the site and whether they copy the raw markup.

## 3. Are the tools pointless? Mostly, yes

| Tool                                                       | Views (30 days) | Verdict                                                                                                                                                                                                  |
| ---------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dark Mode Generator** (≈1,000 lines across 5 components) | 570             | A rule engine that does what "add dark mode to this" does in any LLM. It's also the internal tool used to make `-dark.html` files. Keep it as a dev script, remove it from the marketing.                |
| **Typography Mapper** (966 lines)                          | 370             | Maps px values to Tailwind classes. Figma Dev Mode, Tailwind IntelliSense and every LLM already do this. It's the most code for the least value on the site. Kill it.                                    |
| **Contrast Checker / Config Builder**                      | –               | Both are listed as "coming soon" in `src/data/tools.json`, yet the `/tools` hero copy says "contrast checking… theme building, and more" as if they exist. That's a credibility leak. Remove them today. |

The bigger issue is placement: the homepage puts **Tools above every component collection**. The traffic shows the cost. The `/tools/` index gets 2,790 views, but the two real tools get only 940 between them. People click the section in the best slot on the homepage, find nothing they want and leave.

The one tool worth building is an **"audit my Tailwind" checker**: paste AI-generated markup and get our a11y, RTL and dark-mode rules applied as a diff. It's the dark-mode generator's rule engine pointed at the verification angle above, and it's something people would bookmark.

## 4. Which components aren't needed?

Judge each component on two numbers: its views, and its views per variant. The site averages about 290 views per variant. A page with lots of variants and few views is where effort is being wasted.

**Cut or merge. Low traffic, and trivial for AI to produce:**

| Component                                              | Views     | Variants | Per variant | Action                                                                                                                             |
| ------------------------------------------------------ | --------- | -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Media                                                  | 600       | 8        | 75          | The lowest on the site. "Left align top / center / bottom / stretch", then the same on the right. Merge into one flexbox component |
| Grids                                                  | 850       | 10       | 85          | Grey boxes in `grid-cols-*`. Cut to 2–3                                                                                            |
| Polls                                                  | 390       | 3        | 130         | Niche, low search intent. Cut                                                                                                      |
| Skip links                                             | 440       | 3        | 147         | One line of HTML. Turn it into a pattern inside a "page shell" component                                                           |
| Empty content (marketing) / Empty states (application) | 780 / 660 | 5 / 5    | 156 / 132   | Duplicates in two categories. Merge them                                                                                           |
| Textareas (application / neobrutalism)                 | 320 / 300 | 3 / 3    | 107 / 100   | The lowest-traffic form controls. Fold into inputs                                                                                 |

**Trim. The traffic is real, but there are too many variants for it:**

| Component       | Views     | Variants | Per variant | Action                                                                                                                   |
| --------------- | --------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| Footers         | 1,300     | 12       | 108         | Keep the page, cut to about 5 variants. It's the top component page for agents (40 requests), so keep the strongest ones |
| Vertical menu   | 1,120     | 8        | 140         | Cut to about 4                                                                                                           |
| Loaders         | 970       | 7        | 139         | Mid-table, so keep the page, cut to 3–4                                                                                  |
| Modals / Toasts | 740 / 720 | 6 / 6    | 123 / 120   | Cut to about 4 each                                                                                                      |

That comes to roughly 40–50 variants. Put that effort into the areas below.

**Keep. These looked like filler but the traffic says otherwise:**

- **Charts (2,580 views)** are the 4th most-visited component page. They do lean on Chart.js and stretch the "nothing to install" promise, but people clearly want them. Keep all 11 and add data alternatives (see the accessibility audit, finding #1).
- **Dividers (1,270)** rank around 30th, ahead of tables, inputs and pricing.
- **Neobrutalism (8.3% of traffic).** Its index (4,160) beats `/tools/`, and its accordions (1,610) and cards (1,560) outrank most marketing pages. Don't freeze it. If anything, build on it as the start of **styles**: the same component in several visual languages. "Give me this in neobrutalism" is a real AI-era feature.

**Invest. Highest return per variant:**

- **Templates (5 pages, 12 variants, 13,790 views).** This is the strongest signal in the data. The SaaS landing page has **1 file and 1,770 views**, the best ratio on the site. Portfolio (910 per variant) and storefront (510) follow. Agents want whole pages, not fragments, and visitors already do. **None of the templates has dark mode.** Expand templates first.
- **Small pages that do well.** Banners (833 per variant), accordions (818), side menu (570), dropdown (537) and headers (528) all have 2–5 variants. More variants here would probably get used.
- **Pricing (900 views, 2 variants, 450 per variant).** Not a top page, but the ratio is well above average, so more variants are a reasonable bet. Testimonials (600 views, 200 per variant) are average. Don't prioritise them over templates.
- **Missing dark variants** on cards, product cards, media, grids, logo clouds, sections, product collections, pricing, testimonials, progress bars, range inputs, skip links and **every template**. Marketing cards (2,510 views, 9 variants, no dark) are the biggest gap after templates.

## 5. Smaller hits

- **The ads went off and came back on within five weeks:** removed Sep 6, re-added Oct 10, and now in the homepage hero. The homepage gets 29.5% of all views, so the hero is the most valuable space on the site. Ads there tell visitors we're harvesting traffic, not earning it. Pick a lane.
- **The blog has 10 posts**, mostly from the Tailwind v3 era, plus an FAQ that's really a page. All of it together gets 2.6% of views, and individual posts get 170–470. Either write "AI + Tailwind" pieces (for example "Why your AI-generated modal fails WCAG") or drop the blog.
- **There's no reason to come back.** No "new this week", no changelog front and centre. `git-metadata.json` holds update dates but the homepage doesn't use them.

## What to do, in order

1. Remove the coming-soon tools and the false copy, and move Tools below the components (an hour).
2. Reposition the homepage around "verified for accessibility, RTL and dark mode, built for your AI". It's 29.5% of views, and that includes the decision about the hero ad.
3. Expand templates: dark mode for all five, then more landing-page variants like the SaaS one.
4. Add redirects for the URLs agents guess (about 11% of their requests currently fail). Split the agent export by user agent and include `/examples/*`. Then ship the MCP server and a published skill.
5. Cut and trim the components listed above (roughly 40–50 variants). Put that effort into templates, dark coverage, pricing, and the small pages that do well.
6. Rebuild the dark-mode generator as the "audit my markup" tool, and kill the typography mapper.

## Progress (updated 2026-11-18)

### Done

| Plan item              | What shipped                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Tools               | Tools moved below the components, and the coming-soon tools, false copy and Typography Mapper removed (#774)                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2. Homepage            | Templates come first on the homepage (#776). The template pages now say "Accessible, responsive and dark mode ready" instead of "Starting point — not a finished product" (#781). The hero now pitches checked components built for your AI (#785), with a live template preview that has dark mode, right-to-left and focus order switches (#787)                                                                                                                                                                  |
| 3. Templates           | Dark mode for all five (#773). Every template has been through an accessibility audit (#777, #780). Template cards show a screenshot, made with `pnpm thumbnails` (#788), regenerated with real photos (#797). A developer tool landing page, built on a new code blocks component (#791, #792), and a pricing page, built on new pricing components (#794, #796). Template pages list the checks every template passes, each backed by a test: axe, a keyboard pass, a right-to-left guard and 320px reflow (#798) |
| 4. Agents              | The Markdown URLs agents guess now redirect to the real files (#771). "Copy for AI" on templates adds what to wire up and what to keep: placeholders, the accessibility behaviour and logical utilities (#798)                                                                                                                                                                                                                                                                                                      |
| 5. Cuts                | Copies are counted per component, variant and theme (#772), so cuts can be based on data. The unused `marketing/stats` examples were deleted (#782)                                                                                                                                                                                                                                                                                                                                                                 |
| 6. Dark mode generator | Its engine is now also a script, `pnpm dark`, which generates and checks dark files (#779). Surfaces that are dark in both themes are left as they are (#791). Every marketing component now has dark mode                                                                                                                                                                                                                                                                                                          |

Also done:

- **Blog:** removed. FAQs moved to `/faqs` and stay in the header (#775).
- **Accessibility:** two audits, with every finding fixed (#777, #780). axe runs in the Playwright suite: `pnpm test:a11y:diff` checks changed examples, and `pnpm test:a11y` checks everything (#782, #783).
- **CI:** lint, Prettier, the build, type checks and the Chromium tests run on every PR and push to `main`, with a weekly run in every browser and the full accessibility sweep (#789).
- **Reviews:** each new template or component gets an accessibility review before its PR, with the findings in the PR description. axe and the keyboard pass stay the CI gate (#799).

### Decisions

- **Focus:** templates come first.
- **Cuts:** only remove pages and variants once the copy counts confirm it.
- **Dark mode generator:** keep it, and turn it into a "Hemingway for Tailwind" checker (paste markup, get accessibility, RTL and dark mode findings with fixes) with an AI angle.
- **FAQs:** stay in the header.
- **Hero ad:** stays in the hero, beside the pitch.

### Next

1. **More templates:** start with more landing page variants like the SaaS one. Run `pnpm thumbnails <slug>` for each new card.
2. **Agents:**
   - Split the agent export by user agent, and include `/examples/*`.
   - Add accessibility, RTL and dark mode rules to "Copy for AI" on components, as templates have now.
   - Ship the MCP server and a published skill. The `pnpm dark` engine could back an MCP tool or CLI.
3. **The checker:** rebuild the dark mode generator as described under Decisions.
4. **Cuts:** once there's enough copy data, review the cut and trim lists in section 4.
5. **Dark gaps:** add the missing dark variants listed in section 4. Marketing is done: cards, product cards, product collections, logo clouds, sections and testimonials. Left: progress bars and range inputs, plus one radio group and one blog card. Media, grids and skip links are on the cut list, so they wait for that decision. `pnpm dark` misses text that has no colour class and inherits black, and it inverts surfaces that are already dark, so check each file with axe and by eye.
