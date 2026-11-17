import { test, expect } from './fixtures'

const EXAMPLE = '/examples/application/code-blocks'

for (const theme of ['', '-dark']) {
  test.describe(`Code blocks${theme ? ' (dark)' : ''}`, () => {
    test('the Copy button copies the command and announces it', async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Clipboard permissions are only granted in Chromium')

      await page.goto(`${EXAMPLE}/1${theme}.html`)

      const copyButton = page.locator('button[data-copy-target]')

      await expect(copyButton).toHaveAccessibleName('Copy command')
      await copyButton.click()

      await expect(copyButton).toContainText('Copied')
      await expect(page.locator('[aria-live="polite"]')).toHaveText('Copied to clipboard.')
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        'npm install @acme/sdk',
      )

      await expect(copyButton).toContainText('Copy', { timeout: 3000 })
      await expect(copyButton).not.toContainText('Copied')
    })

    test('the language tabs follow the tabs pattern', async ({ page }) => {
      await page.goto(`${EXAMPLE}/2${theme}.html`)

      const node = page.getByRole('tab', { name: 'Node' })
      const python = page.getByRole('tab', { name: 'Python' })
      const curl = page.getByRole('tab', { name: 'cURL' })

      await expect(node).toHaveAttribute('aria-selected', 'true')
      await expect(page.getByRole('tabpanel')).toHaveCount(1)

      await node.focus()
      await page.keyboard.press('ArrowRight')

      await expect(python).toBeFocused()
      await expect(python).toHaveAttribute('aria-selected', 'true')
      await expect(page.getByRole('tabpanel', { name: 'Python' })).toBeVisible()
      await expect(page.getByRole('tabpanel', { name: 'Node' })).toBeHidden()

      await page.keyboard.press('End')
      await expect(curl).toBeFocused()

      await page.keyboard.press('ArrowRight')
      await expect(node).toBeFocused()

      await page.keyboard.press('ArrowLeft')
      await expect(curl).toBeFocused()

      // Only the selected tab is in the tab order, then its panel.
      await page.keyboard.press('Tab')
      await expect(page.getByRole('tabpanel', { name: 'cURL' })).toBeFocused()
    })

    test('code stays left-to-right on a right-to-left page', async ({ page }) => {
      for (const variant of [1, 2, 3]) {
        await page.goto(`${EXAMPLE}/${variant}${theme}.html`)
        await page.evaluate(() => document.documentElement.setAttribute('dir', 'rtl'))

        const direction = await page
          .locator('pre')
          .first()
          .evaluate((element) => getComputedStyle(element).direction)

        expect(direction).toBe('ltr')
      }
    })
  })
}
