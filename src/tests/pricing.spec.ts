import { test, expect } from './fixtures'

const EXAMPLE = '/examples/marketing/pricing'

for (const theme of ['', '-dark']) {
  test.describe(`Pricing${theme ? ' (dark)' : ''}`, () => {
    test('the billing switch changes prices and announces it', async ({ page }) => {
      await page.goto(`${EXAMPLE}/3${theme}.html`)

      const group = page.getByRole('group', { name: 'Billing period' })
      const monthly = group.getByRole('radio', { name: 'Monthly' })
      const yearly = group.getByRole('radio', { name: /Yearly/ })
      const starterPrice = page.locator('strong[data-monthly]').first()

      await expect(monthly).toBeChecked()
      await expect(starterPrice).toHaveText('$15')

      // Radios move with the arrow keys, like any radio group.
      await monthly.focus()
      await page.keyboard.press('ArrowRight')

      await expect(yearly).toBeChecked()
      await expect(starterPrice).toHaveText('$12')
      await expect(page.getByText('Billed $144 yearly')).toBeVisible()
      await expect(page.locator('[data-billing-status]')).toHaveText('Showing yearly prices.')

      await page.keyboard.press('ArrowLeft')

      await expect(starterPrice).toHaveText('$15')
      await expect(page.locator('[data-billing-status]')).toHaveText('Showing monthly prices.')
    })

    test('the comparison table names every cell', async ({ page }) => {
      await page.goto(`${EXAMPLE}/4${theme}.html`)

      const table = page.getByRole('table', { name: 'Compare plans' })

      await expect(table.locator('thead').getByRole('columnheader')).toHaveText([
        'Starter',
        /Team/,
        'Business',
      ])
      await expect(table.getByRole('rowheader', { name: 'Custom fields' })).toBeVisible()

      const customFields = table.getByRole('row', { name: /Custom fields/ })

      // The visible dash is aria-hidden, so the hidden text is what's announced.
      await expect(customFields.getByRole('cell')).toHaveText([
        /Not included/,
        /Not included/,
        /^(?![\s\S]*Not included)[\s\S]*Included/,
      ])
    })

    test('the comparison table scrolls inside its region on a phone', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 700 })
      await page.goto(`${EXAMPLE}/4${theme}.html`)

      const region = page.getByRole('region', { name: 'Compare plans' })

      await expect(region).toHaveAttribute('tabindex', '0')
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
    })

    test('excluded features are announced as not included', async ({ page }) => {
      await page.goto(`${EXAMPLE}/2${theme}.html`)

      await expect(page.getByText('Not included:')).toHaveCount(5)
    })
  })
}
