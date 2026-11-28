import { test, expect } from './fixtures'

const PAGES = [
  ...[1, 2, 4, 5].map((n) => `/examples/application/tabs/${n}`),
  '/examples/templates/storefront/2',
]

// In a right-to-left page the first tab sits on the right, so the arrow keys
// swap: ArrowLeft moves to the tab on its left, which is the next one.
for (const theme of ['', '-dark']) {
  for (const page of PAGES) {
    test(`${page.replace('/examples/', '')}${theme ? ' (dark)' : ''} moves between tabs with the arrows in RTL`, async ({
      page: browserPage,
    }) => {
      await browserPage.goto(`${page}${theme}.html`)
      await browserPage.evaluate(() => document.documentElement.setAttribute('dir', 'rtl'))

      const tabs = browserPage.getByRole('tab')

      await tabs.first().focus()
      await browserPage.keyboard.press('ArrowLeft')

      await expect(tabs.nth(1)).toBeFocused()
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')

      await browserPage.keyboard.press('ArrowRight')

      await expect(tabs.first()).toBeFocused()
      await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
    })
  }
}
