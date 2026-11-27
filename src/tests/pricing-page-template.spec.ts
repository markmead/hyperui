import { test, expect } from './fixtures'

const TEMPLATE = '/examples/templates/pricing-page'

for (const theme of ['', '-dark']) {
  test.describe(`Pricing page template${theme ? ' (dark)' : ''}`, () => {
    test('the mobile menu opens, and closes on Escape', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 800 })
      await page.goto(`${TEMPLATE}/1${theme}.html`)

      const toggle = page.getByRole('button', { name: 'Toggle menu' })
      const mobileNav = page.getByRole('navigation', { name: 'Global Mobile' })

      await expect(mobileNav).toBeHidden()

      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')
      await expect(mobileNav).toBeVisible()
      await expect(mobileNav.getByRole('link', { name: 'Pricing' })).toHaveAttribute(
        'aria-current',
        'page',
      )

      await page.keyboard.press('Escape')
      await expect(mobileNav).toBeHidden()
      await expect(toggle).toBeFocused()
    })

    test('the billing switch changes every plan and announces it', async ({ page }) => {
      await page.goto(`${TEMPLATE}/1${theme}.html`)

      const prices = page.locator('strong[data-monthly]')

      await expect(prices).toHaveText(['$0', '$10', '$15'])

      await page.getByRole('radio', { name: 'Monthly' }).focus()
      await page.keyboard.press('ArrowRight')

      await expect(prices).toHaveText(['$0', '$8', '$12'])
      await expect(page.getByText('Per user, billed $96 yearly')).toBeVisible()
      await expect(page.locator('[data-billing-status]')).toHaveText('Showing yearly prices.')
    })

    test('the comparison table is labelled and fits a phone', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 800 })
      await page.goto(`${TEMPLATE}/1${theme}.html`)

      await expect(page.getByRole('table', { name: 'Larkline plans compared' })).toBeAttached()
      await expect(page.getByRole('region', { name: 'Larkline plans compared' })).toHaveAttribute(
        'tabindex',
        '0',
      )
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
    })
  })
}
