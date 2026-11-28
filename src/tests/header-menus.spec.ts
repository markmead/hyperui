import { test, expect } from './fixtures'

const HEADERS = [1, 2, 3, 4]

// The preview script blocks key presses on links so previews can't navigate.
// It once swallowed Escape too, so a menu couldn't be closed from a link.
for (const theme of ['', '-dark']) {
  for (const header of HEADERS) {
    test(`header ${header}${theme ? ' (dark)' : ''} closes its mobile menu on Escape from a link`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 800 })
      await page.goto(`/examples/marketing/headers/${header}${theme}.html`)

      const toggle = page.locator('[popovertarget]')
      const menu = page.locator('[popover]')
      const firstLink = menu.getByRole('link').first()

      await toggle.click()
      await expect(menu).toBeVisible()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')

      await firstLink.focus()
      await expect(firstLink).toBeFocused()

      await page.keyboard.press('Escape')

      await expect(menu).toBeHidden()
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await expect(toggle).toBeFocused()
    })
  }
}
