import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import AxeBuilder from '@axe-core/playwright'
import { test, expect, type Page } from './fixtures'

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
  '/ai',
  '/tools',
  '/tools/dark-mode-generator',
]

/**
 * `pnpm test:a11y:diff` (and `pnpm test`) only checks what changed against
 * main: committed, staged, unstaged and untracked files. `pnpm test:a11y`
 * (A11Y_ALL=1) checks everything, and so does a change to the shared
 * component CSS.
 */
function changedFiles(): string[] | null {
  const git = (...args: string[]) =>
    execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      .split('\n')
      .filter(Boolean)

  for (const base of ['origin/main', 'main']) {
    try {
      const [mergeBase] = git('merge-base', 'HEAD', base)

      return [
        ...git('diff', '--name-only', mergeBase!),
        ...git('ls-files', '--others', '--exclude-standard'),
      ]
    } catch {
      continue
    }
  }

  return null
}

const changed = process.env.A11Y_ALL === '1' ? null : changedFiles()
const isFullSweep = changed === null || changed.includes('src/styles/component.css')

const isChecked = (path: string) => isFullSweep || changed!.includes(path)

// One test per component (category/slug), covering its light and dark files.
const exampleGroups = readdirSync(EXAMPLES_DIR)
  .flatMap((category) =>
    readdirSync(join(EXAMPLES_DIR, category)).map((slug) => ({
      name: `${category}/${slug}`,
      files: readdirSync(join(EXAMPLES_DIR, category, slug))
        .filter((file) => file.endsWith('.html'))
        .filter((file) => isChecked(join(EXAMPLES_DIR, category, slug, file)))
        .sort(),
    })),
  )
  .filter(({ files }) => files.length > 0)

// The site pages are checked when anything the site is built from has changed.
const isSiteChecked =
  isFullSweep ||
  changed!.some(
    (path) => path.startsWith('src/') && !path.startsWith('src/tests/') && existsSync(path),
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

  if (exampleGroups.length === 0) {
    test('changed examples', () => {
      test.skip(true, 'No examples changed. Run pnpm test:a11y to check them all')
    })
  }

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
  test.skip(!isSiteChecked, 'No site files changed. Run pnpm test:a11y to check them all')

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
