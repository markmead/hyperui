import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import { test, expect } from './fixtures'

const TEMPLATES_DIR = 'public/examples/templates'

const templateFiles = readdirSync(TEMPLATES_DIR).flatMap((slug) =>
  readdirSync(join(TEMPLATES_DIR, slug))
    .filter((file) => file.endsWith('.html'))
    .sort()
    .map((file) => `${slug}/${file}`),
)

// Backs the "Keyboard tested" check on template pages: Tab reaches every
// focusable element, each one shows a visible focus indicator, and focus
// never gets stuck.
test.describe('Templates keyboard pass', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Keyboard pass runs in Chromium')

  for (const file of templateFiles) {
    test(file, async ({ page }) => {
      await page.goto(`/examples/templates/${file}`)

      const stops: { name: string; visible: boolean }[] = []
      const seen = new Set<string>()

      for (let press = 0; press < 400; press += 1) {
        await page.keyboard.press('Tab')

        const stop = await page.evaluate(() => {
          const element = document.activeElement as HTMLElement | null

          if (!element || element === document.body) {
            return null
          }

          const style = getComputedStyle(element)
          const hasOutline = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0
          const hasRing = style.boxShadow !== 'none'

          // A stable id for the element, so a full loop can be detected.
          const path: string[] = []

          for (let node: Element | null = element; node && node !== document.body;) {
            const parent: Element | null = node.parentElement

            path.unshift(String(parent ? [...parent.children].indexOf(node) : 0))
            node = parent
          }

          const label =
            element.getAttribute('aria-label') ??
            element.textContent?.trim().replaceAll(/\s+/g, ' ').slice(0, 40) ??
            ''

          return {
            key: path.join('/'),
            name: `${element.tagName.toLowerCase()} "${label}"`,
            visible: hasOutline || hasRing,
          }
        })

        // Focus left the page, or came back round: every stop has been seen.
        if (!stop || seen.has(stop.key)) {
          break
        }

        seen.add(stop.key)
        stops.push(stop)
      }

      expect(stops.length, 'Tab should reach at least one control').toBeGreaterThan(0)
      expect(stops.filter(({ visible }) => !visible).map(({ name }) => name)).toEqual([])
    })
  }
})
