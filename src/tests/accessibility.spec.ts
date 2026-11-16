import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import AxeBuilder from '@axe-core/playwright'
import { test, expect, type Page } from '@playwright/test'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
const EXAMPLES_DIR = 'public/examples'

const SITE_PAGES = [
  '/',
  '/components/application',
  '/components/marketing',
  '/components/templates',
  '/components/marketing/footers',
  '/components/templates/storefront',
  '/faqs',
  '/tools',
  '/tools/dark-mode-generator',
]

// One test per component (category/slug), covering every light and dark file in it.
const exampleGroups = readdirSync(EXAMPLES_DIR).flatMap((category) =>
  readdirSync(join(EXAMPLES_DIR, category)).map((slug) => ({
    name: `${category}/${slug}`,
    files: readdirSync(join(EXAMPLES_DIR, category, slug))
      .filter((file) => file.endsWith('.html'))
      .sort(),
  })),
)

type Violation = { file: string; rule: string; nodes: string[] }

async function scan(page: Page, url: string, configure = (builder: AxeBuilder) => builder) {
  await page.goto(url)

  const { violations } = await configure(new AxeBuilder({ page })).withTags(WCAG_TAGS).analyze()

  return violations.map(({ id, nodes }) => ({
    file: url,
    rule: id,
    nodes: nodes.map(({ target }) => target.join(' ')),
  }))
}

// axe gives the same results in every engine, so one browser keeps the suite fast.
test.skip(({ browserName }) => browserName !== 'chromium', 'Accessibility checks run in Chromium')

test.describe('Examples have no WCAG 2.1 AA violations', () => {
  test.beforeEach(async ({ context }) => {
    // Keep the scan offline and deterministic: block remote images and scripts,
    // and stand in for Chart.js so chart templates still run their scripts.
    await context.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, (route) => route.abort())

    await context.addInitScript(() => {
      // @ts-expect-error - a minimal Chart.js stand-in
      window.Chart = class {
        data = { labels: [], datasets: [{ data: [] }] }
        update() {}
      }
    })
  })

  for (const { name, files } of exampleGroups) {
    test(name, async ({ page }) => {
      const violations: Violation[] = []

      for (const file of files) {
        violations.push(...(await scan(page, `/examples/${name}/${file}`)))
      }

      expect(violations).toEqual([])
    })
  }
})

test.describe('Site pages have no WCAG 2.1 AA violations', () => {
  for (const width of [390, 1280]) {
    for (const path of SITE_PAGES) {
      test(`${path} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })

        // Previews are covered by the example tests above. The dev toolbar only exists in dev.
        const violations = await scan(page, path, (builder) =>
          builder.exclude('astro-dev-toolbar').options({ iframes: false }),
        )

        expect(violations).toEqual([])
      })
    }
  }
})
