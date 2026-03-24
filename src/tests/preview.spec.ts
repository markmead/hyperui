import { test, expect, type Locator } from '@playwright/test'

const BASE_URL = 'http://localhost:4321/components/application/accordions'

test('has title', async ({ page }) => {
  await page.goto(BASE_URL)

  await expect(page).toHaveTitle('Free Tailwind CSS Accordions | HyperUI')
})

test('has component preview', async ({ page }) => {
  await page.goto(BASE_URL)

  await expect(
    page
      .locator('component-preview')
      .and(page.locator('[data-src="/examples/application/accordions/1.html"]')),
  ).toBeVisible()
})

test.describe('Component preview hotlink', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })

  test('can link to component preview', async ({ page }) => {
    await page.locator('[href="#component-5-dark"]').click()

    await expect(page).toHaveURL(`${BASE_URL}#component-5-dark`)

    const componentPreview = page
      .locator('component-preview')
      .and(page.locator('[data-src="/examples/application/accordions/5-dark.html"]'))

    await expect(componentPreview).toBeVisible()
    await expect(componentPreview).toBeInViewport()
  })

  test('can load to component preview', async ({ page }) => {
    const componentPreview = page
      .locator('component-preview')
      .and(page.locator('[data-src="/examples/application/accordions/5-dark.html"]'))

    await expect(componentPreview).not.toBeInViewport()

    await page.goto(`${BASE_URL}#component-5-dark`)

    await expect(componentPreview).toBeInViewport()
  })
})

test.describe('Component preview breakpoints', () => {
  let previewIframe: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)

    previewIframe = page.locator('iframe[src="/examples/application/accordions/1.html"]')
  })

  test('defaults to full breakpoint', async ({ page }) => {
    const fullButton = page.getByRole('button', { name: 'Full' }).first()

    await expect(fullButton).toBeVisible()
    await expect(fullButton).toHaveAttribute('aria-pressed', 'true')

    const breakpointWidth = await fullButton.getAttribute('data-breakpoint')

    await expect(previewIframe).toBeVisible()
    await expect(previewIframe).toHaveAttribute('style', `max-width: ${breakpointWidth};`)
  })

  test('can set to medium breakpoint', async ({ page }) => {
    const mediumButton = page.getByRole('button', { name: 'MD' }).first()

    await expect(mediumButton).toBeVisible()
    await expect(mediumButton).toHaveAttribute('aria-pressed', 'false')

    const breakpointWidth = await mediumButton.getAttribute('data-breakpoint')

    await mediumButton.click()

    await expect(mediumButton).toHaveAttribute('aria-pressed', 'true')

    await expect(previewIframe).toBeVisible()
    await expect(previewIframe).toHaveAttribute('style', `max-width: ${breakpointWidth};`)
  })
})

test.describe('Component preview direction', () => {
  let previewIframe: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)

    previewIframe = page.locator('iframe[src="/examples/application/accordions/1.html"]')
  })

  test('defaults to left-to-right', async ({ page }) => {
    const ltrButton = page.locator('[aria-label="Toggle direction"]').first()

    await expect(ltrButton).toBeVisible()
    await expect(ltrButton).toHaveText('LTR')

    await expect(previewIframe).toBeVisible()
    await expect(previewIframe.contentFrame().locator('html')).not.toHaveAttribute('dir', 'rtl')
  })

  test('can toggle to right-to-left', async ({ page }) => {
    const ltrButton = page.locator('[aria-label="Toggle direction"]').first()

    await expect(ltrButton).toBeVisible()
    await expect(ltrButton).toHaveText('LTR')

    await ltrButton.click()

    await expect(ltrButton).toHaveText('RTL')

    await expect(previewIframe).toBeVisible()
    await expect(previewIframe.contentFrame().locator('html')).toHaveAttribute('dir', 'rtl')
  })
})
