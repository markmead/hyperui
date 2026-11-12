import { test, expect, type Locator, type Page } from '@playwright/test'

const PAGE_URL = '/components/application/accordions'
const FIRST_IFRAME = '[src="/examples/application/accordions/1.html"]'
const FIRST_PREVIEW = '[data-src="/examples/application/accordions/1.html"]'
const LAST_PREVIEW = '[data-src="/examples/application/accordions/5-dark.html"]'

test('has component preview', async ({ page }) => {
  await page.goto(PAGE_URL)

  await expect(page.locator('component-preview').and(page.locator(FIRST_PREVIEW))).toBeVisible()
})

test.describe('Component pattern link', () => {
  test('is visible when pattern metadata exists', async ({ page }) => {
    await page.goto('/components/application/tabs')

    const patternLink = page.getByRole('link', { name: 'HyperUX Pattern Available' })

    await expect(patternLink).toBeVisible()

    await patternLink.hover()

    await expect(page.getByText('View related HyperUX pattern documentation')).toHaveCSS(
      'opacity',
      /^1(\.0+)?$/,
    )
  })

  test('is hidden when pattern metadata does not exist', async ({ page }) => {
    await page.goto(PAGE_URL)

    await expect(page.getByRole('link', { name: 'HyperUX Pattern Available' })).toHaveCount(0)
  })
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

test.describe('Component preview copy menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL)
  })

  const copyEl = (page: Page, selector = FIRST_PREVIEW): Locator =>
    page.locator('preview-copy').and(page.locator(selector))

  const menuToggle = (page: Page, selector = FIRST_PREVIEW): Locator =>
    copyEl(page, selector).getByRole('button', { name: 'More copy options' })

  test('opens and closes the menu', async ({ page }) => {
    const toggle = menuToggle(page)
    const menu = copyEl(page).getByRole('menu', { name: 'Copy options' })

    await expect(menu).toBeHidden()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.click()

    await expect(menu).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(menu.getByRole('menuitem')).toHaveCount(2)

    await page.locator('h1').first().click()

    await expect(menu).toBeHidden()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('supports the keyboard', async ({ page }) => {
    const toggle = menuToggle(page)
    const menu = copyEl(page).getByRole('menu', { name: 'Copy options' })

    await toggle.focus()
    await page.keyboard.press('ArrowDown')

    await expect(menu).toBeVisible()
    await expect(menu.getByRole('menuitem', { name: /Copy HTML/ })).toBeFocused()

    await page.keyboard.press('ArrowDown')

    await expect(menu.getByRole('menuitem', { name: /Copy for AI/ })).toBeFocused()

    await page.keyboard.press('Escape')

    await expect(menu).toBeHidden()
    await expect(toggle).toBeFocused()
  })

  test('copies HTML with context for AI', async ({ page, browserName }) => {
    test.skip(
      browserName !== 'chromium',
      'Only Chromium grants clipboard-read in this config to verify the contents',
    )

    await menuToggle(page).click()
    await copyEl(page)
      .getByRole('menuitem', { name: /Copy for AI/ })
      .click()

    await expect(copyEl(page).getByRole('menu')).toBeHidden()
    await expect(copyEl(page).getByRole('button', { name: 'Copy HTML' })).toHaveText('Copied')

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())

    expect(clipboardText).toMatch(/^# Accordions: /)
    expect(clipboardText).toContain('https://hyperui.dev/components/application/accordions#')
    expect(clipboardText).toContain('Tailwind CSS v4')
    expect(clipboardText).toContain('```html\n<div')
    expect(clipboardText).toContain('<details')
  })

  test('copies plain HTML from the menu', async ({ page, browserName }) => {
    test.skip(
      browserName !== 'chromium',
      'Only Chromium grants clipboard-read in this config to verify the contents',
    )

    await menuToggle(page).click()
    await copyEl(page)
      .getByRole('menuitem', { name: /Copy HTML/ })
      .click()

    await expect(copyEl(page).getByRole('button', { name: 'Copy HTML' })).toHaveText('Copied')

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())

    expect(clipboardText).toMatch(/^<div/)
    expect(clipboardText).not.toContain('# Accordions')
  })

  test('explains dark mode setup for dark variants', async ({ page, browserName }) => {
    test.skip(
      browserName !== 'chromium',
      'Only Chromium grants clipboard-read in this config to verify the contents',
    )

    await menuToggle(page, LAST_PREVIEW).click()
    await copyEl(page, LAST_PREVIEW)
      .getByRole('menuitem', { name: /Copy for AI/ })
      .click()

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())

    expect(clipboardText).toContain('(Dark)')
    expect(clipboardText).toContain('@custom-variant dark')
  })
})

test('groups breakpoint buttons', async ({ page }) => {
  await page.goto(PAGE_URL)

  const group = page
    .locator('preview-breakpoints')
    .and(page.locator(FIRST_PREVIEW))
    .and(page.getByRole('group', { name: 'Preview width' }))

  await expect(group).toBeVisible()
  await expect(group.getByRole('button')).toHaveCount(5)
})
