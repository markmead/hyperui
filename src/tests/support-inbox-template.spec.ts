import { test, expect } from './fixtures'

const TEMPLATE = '/examples/templates/support-inbox'

for (const theme of ['', '-dark']) {
  test.describe(`Support inbox template${theme ? ' (dark)' : ''}`, () => {
    test('the panels and their backdrops go away when the window grows', async ({ page }) => {
      await page.setViewportSize({ width: 700, height: 900 })
      await page.goto(`${TEMPLATE}/2${theme}.html`)

      // The toggles are hidden at desktop width, and getByRole skips hidden
      // elements, so look them up by id to read their state after the resize.
      const railToggle = page.locator('#rail-toggle')
      const detailsToggle = page.locator('#details-toggle')
      const railBackdrop = page.locator('[data-rail-overlay]')
      const detailsBackdrop = page.locator('[data-details-overlay]')

      await railToggle.click()
      await detailsToggle.click()
      await expect(railBackdrop).toBeVisible()
      await expect(detailsBackdrop).toBeVisible()

      // Both panels were left open. At desktop width they are part of the page,
      // so neither backdrop should be left dimming it.
      await page.setViewportSize({ width: 1536, height: 900 })

      await expect(railBackdrop).toBeHidden()
      await expect(detailsBackdrop).toBeHidden()
      await expect(railToggle).toHaveAttribute('aria-expanded', 'false')
      await expect(detailsToggle).toHaveAttribute('aria-expanded', 'false')
    })

    test('an open panel reaches the bottom of the window and leaves the header clear', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 700, height: 900 })
      await page.goto(`${TEMPLATE}/2${theme}.html`)

      const rail = page.locator('#queue-rail')
      const backdrop = page.locator('[data-rail-overlay]')
      const header = page.locator('header').first()

      await page.getByRole('button', { name: 'Toggle queues' }).click()
      await expect(rail).toBeVisible()

      const railBox = await rail.boundingBox()
      const backdropBox = await backdrop.boundingBox()
      const headerBox = await header.boundingBox()

      expect(Math.round((railBox?.y ?? 0) + (railBox?.height ?? 0))).toBe(900)
      expect(Math.round(backdropBox?.y ?? 0)).toBe(Math.round(headerBox?.height ?? 0))
    })
  })
}
