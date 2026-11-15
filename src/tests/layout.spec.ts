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

test.describe('Footer', () => {
  test('links to the FAQs', async ({ page }) => {
    await page.goto('')

    const faqsLink = page
      .getByRole('navigation', { name: 'Footer' })
      .getByRole('link', { name: 'FAQs' })

    // Check the target rather than clicking: in dev, Astro's toolbar covers the footer.
    await expect(faqsLink).toHaveAttribute('href', '/faqs')

    await page.goto('/faqs')

    await expect(page).toHaveTitle('FAQs | HyperUI')
  })

  test('keeps the FAQs out of the header', async ({ page }) => {
    await page.goto('')

    await expect(page.locator('header').getByRole('link', { name: 'FAQs' })).toHaveCount(0)
  })
})
