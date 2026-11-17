import { test, expect } from './fixtures'

const TEMPLATE = '/examples/templates/developer-tool'

for (const theme of ['', '-dark']) {
  test.describe(`Developer tool template${theme ? ' (dark)' : ''}`, () => {
    test('the mobile menu opens, and closes on Escape', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 800 })
      await page.goto(`${TEMPLATE}/1${theme}.html`)

      const toggle = page.getByRole('button', { name: 'Toggle menu' })
      const mobileNav = page.getByRole('navigation', { name: 'Global Mobile' })

      await expect(mobileNav).toBeHidden()

      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')
      await expect(mobileNav).toBeVisible()

      await page.keyboard.press('Escape')
      await expect(mobileNav).toBeHidden()
      await expect(toggle).toBeFocused()
    })

    test('both install commands copy and announce', async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Clipboard permissions are only granted in Chromium')

      await page.goto(`${TEMPLATE}/1${theme}.html`)

      const copyButtons = page.locator('button[data-copy-target]')

      await expect(copyButtons).toHaveCount(2)

      for (const index of [0, 1]) {
        const copyButton = copyButtons.nth(index)

        await expect(copyButton).toHaveAccessibleName('Copy command')
        await copyButton.click()

        await expect(copyButton).toContainText('Copied')
        await expect(page.locator('[data-copy-status]').nth(index)).toHaveText(
          'Copied to clipboard.',
        )
        expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
          'npm install @tidehook/node',
        )
      }
    })

    test('the code sample tabs work with the keyboard', async ({ page }) => {
      await page.goto(`${TEMPLATE}/1${theme}.html`)

      await page.getByRole('tab', { name: 'Node' }).focus()
      await page.keyboard.press('ArrowLeft')

      const curl = page.getByRole('tab', { name: 'cURL' })

      await expect(curl).toBeFocused()
      await expect(curl).toHaveAttribute('aria-selected', 'true')
      await expect(page.getByRole('tabpanel', { name: 'cURL' })).toBeVisible()
      await expect(page.getByRole('tabpanel', { name: 'Node' })).toBeHidden()
    })

    test('code stays left-to-right on a right-to-left page', async ({ page }) => {
      await page.goto(`${TEMPLATE}/1${theme}.html`)
      await page.evaluate(() => document.documentElement.setAttribute('dir', 'rtl'))

      const directions = await page
        .locator('pre')
        .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).direction))

      expect(directions.length).toBeGreaterThan(0)
      expect(new Set(directions)).toEqual(new Set(['ltr']))
    })
  })
}
