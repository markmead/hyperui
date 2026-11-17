import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { test, expect } from './fixtures'

const TEMPLATES_DIR = 'public/examples/templates'

test.describe('Template pages', () => {
  test('show the checks every template passes', async ({ page }) => {
    await page.goto('/components/templates/pricing-page')

    await expect(page.getByRole('list', { name: 'Checks' }).getByRole('listitem')).toHaveText([
      'WCAG 2.1 AA checked',
      'Keyboard tested',
      'Right-to-left ready',
    ])
  })

  test('component pages do not show the template checks', async ({ page }) => {
    await page.goto('/components/marketing/pricing')

    await expect(page.getByRole('list', { name: 'Checks' })).toHaveCount(0)
  })

  test('Copy for AI tells agents what to wire up and what to keep', async ({ page }) => {
    await page.goto('/components/templates/developer-tool')

    const header = await page.locator('preview-copy').first().getAttribute('data-ai-header')

    expect(header).toContain('Links, buttons and forms are placeholders')
    expect(header).toContain('the skip link and the keyboard handling')
    expect(header).toContain('logical utilities')
  })

  test('Copy for AI on components leaves the template notes out', async ({ page }) => {
    await page.goto('/components/marketing/pricing')

    const header = await page.locator('preview-copy').first().getAttribute('data-ai-header')

    expect(header).toContain('Tailwind CSS v4')
    expect(header).not.toContain('placeholders')
  })
})

// "Right-to-left ready" holds only while templates avoid physical left and
// right utilities. Runs in Node, so one browser is enough.
test('templates use logical utilities, not left and right ones', ({ browserName }) => {
  test.skip(browserName !== 'chromium', 'Node-only check')

  const physical =
    /(?<![\w:./-])(?:[a-z-]+:)*-?(?:pl|pr|ml|mr|left|right|border-l|border-r|rounded-l|rounded-r|rounded-tl|rounded-tr|rounded-bl|rounded-br)-[\w./[\]]+|(?<![\w:./-])(?:[a-z-]+:)*(?:text-left|text-right|border-l|border-r)(?![\w./-])/g

  const findings: string[] = []

  for (const slug of readdirSync(TEMPLATES_DIR)) {
    for (const file of readdirSync(join(TEMPLATES_DIR, slug))) {
      const html = readFileSync(join(TEMPLATES_DIR, slug, file), 'utf8')

      for (const [, classes = ''] of html.matchAll(/class="([^"]*)"/g)) {
        for (const match of classes.matchAll(physical)) {
          // ltr: and rtl: variants are direction-aware already.
          if (!/(^|:)(ltr|rtl):/.test(match[0])) {
            findings.push(`${slug}/${file}: ${match[0]}`)
          }
        }
      }
    }
  }

  expect(findings).toEqual([])
})
