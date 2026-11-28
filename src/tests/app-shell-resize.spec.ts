import { test, expect } from './fixtures'

const PAGES = [
  ...[1, 2, 3].map((n) => `/examples/application/app-shells/${n}`),
  ...[1, 3].map((n) => `/examples/templates/analytics-dashboard/${n}`),
]

for (const theme of ['', '-dark']) {
  for (const page of PAGES) {
    test(`${page.replace('/examples/', '')}${theme ? ' (dark)' : ''} closes its sidebar and backdrop when the window grows`, async ({
      page: browserPage,
    }) => {
      await browserPage.setViewportSize({ width: 700, height: 900 })
      await browserPage.goto(`${page}${theme}.html`)

      const toggle = browserPage.locator('#sidebar-toggle')
      const backdrop = browserPage.locator('[data-sidebar-overlay]')

      await toggle.click()
      await expect(backdrop).toBeVisible()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')

      // The sidebar is part of the page at desktop width, so a backdrop left
      // behind would dim all of it. The toggle is hidden there, so read it by id.
      await browserPage.setViewportSize({ width: 1536, height: 900 })

      await expect(backdrop).toBeHidden()
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })
  }
}
