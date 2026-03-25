import { test, expect, type Locator } from '@playwright/test'

test.describe('Skip to content link', () => {
  let skipToContentLink: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto('')

    skipToContentLink = page.getByRole('link', { name: 'Skip to content' })
  })

  test('exists in the DOM', async () => {
    await expect(skipToContentLink).toBeAttached()
  })

  test('in viewport when focused', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'WebKit does not handle focus correctly in this case')

    await page.keyboard.press('Tab')

    await expect(skipToContentLink).toBeFocused()
    await expect(skipToContentLink).toBeInViewport()
  })

  test('not in viewport when not focused', async () => {
    await expect(skipToContentLink).not.toBeFocused()
    await expect(skipToContentLink).not.toBeInViewport()
  })
})
