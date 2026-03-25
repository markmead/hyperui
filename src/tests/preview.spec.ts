import { test, expect, type Locator } from '@playwright/test'

const PAGE_URL = '/components/application/accordions'
const FIRST_IFRAME = '[src="/examples/application/accordions/1.html"]'
const FIRST_PREVIEW = '[data-src="/examples/application/accordions/1.html"]'
const LAST_PREVIEW = '[data-src="/examples/application/accordions/5-dark.html"]'

test('has component preview', async ({ page }) => {
  await page.goto(PAGE_URL)

  await expect(page.locator('component-preview').and(page.locator(FIRST_PREVIEW))).toBeVisible()
})

test.describe('Component preview hotlink', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL)
  })

  test('can link to component preview', async ({ page }) => {
    await page.locator('[href="#component-5-dark"]').click()

    await expect(page).toHaveURL(`${PAGE_URL}#component-5-dark`)

    await expect(page.locator('component-preview').and(page.locator(LAST_PREVIEW))).toBeVisible()
    await expect(page.locator('component-preview').and(page.locator(LAST_PREVIEW))).toBeInViewport()
  })

  test('can load to component preview', async ({ page }) => {
    await expect(
      page.locator('component-preview').and(page.locator(LAST_PREVIEW)),
    ).not.toBeInViewport()

    await page.goto(`${PAGE_URL}#component-5-dark`)

    await expect(page.locator('component-preview').and(page.locator(LAST_PREVIEW))).toBeVisible()
    await expect(page.locator('component-preview').and(page.locator(LAST_PREVIEW))).toBeInViewport()
  })
})

test.describe('Component preview breakpoints', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL)
  })

  test('defaults to full breakpoint', async ({ page }) => {
    const fullButton: Locator = page
      .locator('preview-breakpoints')
      .and(page.locator(FIRST_PREVIEW))
      .getByRole('button', { name: 'Full' })

    await expect(fullButton).toBeVisible()
    await expect(fullButton).toHaveAttribute('aria-pressed', 'true')

    const breakpointWidth = await fullButton.getAttribute('data-breakpoint')

    await expect(page.locator(FIRST_IFRAME)).toBeVisible()
    await expect(page.locator(FIRST_IFRAME)).toHaveAttribute(
      'style',
      `max-width: ${breakpointWidth};`,
    )
  })

  test('can set to medium breakpoint', async ({ page }) => {
    const mediumButton: Locator = page
      .locator('preview-breakpoints')
      .and(page.locator(FIRST_PREVIEW))
      .getByRole('button', { name: 'MD' })

    await expect(mediumButton).toBeVisible()
    await expect(mediumButton).toHaveAttribute('aria-pressed', 'false')

    await mediumButton.click()

    await expect(mediumButton).toHaveAttribute('aria-pressed', 'true')

    const breakpointWidth = await mediumButton.getAttribute('data-breakpoint')

    await expect(page.locator(FIRST_IFRAME)).toBeVisible()
    await expect(page.locator(FIRST_IFRAME)).toHaveAttribute(
      'style',
      `max-width: ${breakpointWidth};`,
    )
  })
})

test.describe('Component preview direction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL)
  })

  test('defaults to left-to-right', async ({ page }) => {
    const ltrButton: Locator = page
      .locator('preview-direction')
      .and(page.locator(FIRST_PREVIEW))
      .getByRole('button', { name: 'Toggle direction' })

    await expect(ltrButton).toBeVisible()
    await expect(ltrButton).toHaveText('LTR')
    await expect(ltrButton).toHaveAttribute('aria-pressed', 'true')

    await expect(page.locator(FIRST_IFRAME)).toBeVisible()
    await expect(page.locator(FIRST_IFRAME).contentFrame().locator('html')).not.toHaveAttribute(
      'dir',
      'rtl',
    )
  })

  test('can toggle to right-to-left', async ({ page }) => {
    const ltrButton: Locator = page
      .locator('preview-direction')
      .and(page.locator(FIRST_PREVIEW))
      .getByRole('button', { name: 'Toggle direction' })

    await expect(ltrButton).toBeVisible()
    await expect(ltrButton).toHaveText('LTR')
    await expect(ltrButton).toHaveAttribute('aria-pressed', 'true')

    await ltrButton.click()

    await expect(ltrButton).toHaveText('RTL')
    await expect(ltrButton).toHaveAttribute('aria-pressed', 'false')

    await expect(page.locator(FIRST_IFRAME)).toBeVisible()
    await expect(page.locator(FIRST_IFRAME).contentFrame().locator('html')).toHaveAttribute(
      'dir',
      'rtl',
    )
  })
})

test.describe('Component preview view', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL)
  })

  test('defaults to preview', async ({ page }) => {
    const viewButton: Locator = page
      .locator('preview-view')
      .and(page.locator(FIRST_PREVIEW))
      .getByRole('button', { name: 'Toggle preview mode' })

    await expect(viewButton).toBeVisible()
    await expect(viewButton).toHaveAttribute('aria-pressed', 'true')

    await expect(page.locator(FIRST_IFRAME)).toBeVisible()
    await expect(page.locator(FIRST_IFRAME)).toHaveAttribute('data-preview', 'true')

    await expect(
      page.locator('preview-view').and(page.locator(FIRST_PREVIEW)).locator('pre[data-html]'),
    ).not.toBeVisible()
  })

  test('can toggle to code view', async ({ page }) => {
    const viewButton: Locator = page
      .locator('preview-view')
      .and(page.locator(FIRST_PREVIEW))
      .getByRole('button', { name: 'Toggle preview mode' })

    await expect(viewButton).toBeVisible()
    await expect(viewButton).toHaveAttribute('aria-pressed', 'true')

    await viewButton.click()

    await expect(viewButton).toHaveText('HTML')
    await expect(viewButton).toHaveAttribute('aria-pressed', 'false')

    await expect(
      page.locator('component-preview').and(page.locator(FIRST_PREVIEW)).locator('pre[data-html]'),
    ).toBeVisible()
    await expect(page.locator(FIRST_IFRAME)).toHaveAttribute('data-preview', 'false')

    await expect(page.locator(FIRST_IFRAME)).not.toBeVisible()
  })
})

test.describe('Component preview copy to clipboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL)
  })

  test('copies to clipboard', async ({ page, browserName }) => {
    test.skip(
      browserName === 'webkit',
      'WebKit does not handle copy to clipboard correctly in this case',
    )

    const copyButton: Locator = page
      .locator('preview-copy')
      .and(page.locator(FIRST_PREVIEW))
      .getByRole('button', { name: 'Copy HTML' })

    await expect(copyButton).toBeVisible()
    await expect(copyButton).toHaveAttribute('aria-pressed', 'false')

    await copyButton.click()

    await expect(copyButton).toHaveText('Copied')
    await expect(copyButton).toHaveAttribute('aria-pressed', 'true')

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())

    expect(clipboardText).toContain('<details')
  })

  test('copies to clipboard (WebKit)', async ({ page, browserName }) => {
    test.skip(
      browserName !== 'webkit',
      'WebKit does not handle copy to clipboard correctly in this case',
    )

    const copyButton: Locator = page
      .locator('preview-copy')
      .and(page.locator(FIRST_PREVIEW))
      .getByRole('button', { name: 'Copy HTML' })

    await expect(copyButton).toBeVisible()
    await expect(copyButton).toHaveAttribute('aria-pressed', 'false')

    await copyButton.click()

    await expect(copyButton).toHaveText('Copied')
    await expect(copyButton).toHaveAttribute('aria-pressed', 'true')
  })
})
