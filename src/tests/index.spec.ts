import { test, expect, type Locator, pageURL } from './fixtures'

test.describe('Component category sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
  })

  test('can navigate to application components', async ({ page }) => {
    const viewAllLink: Locator = page.getByRole('link', {
      name: /^View all \d+ application components$/,
    })

    await expect(viewAllLink).toBeVisible()

    await viewAllLink.click()

    await expect(page).toHaveURL(pageURL('/components/application'))
    await expect(page).toHaveTitle('Tailwind CSS Application UI Components | HyperUI')
  })

  test('can navigate to application component', async ({ page }) => {
    const componentLink: Locator = page.locator('a[href="/components/application/accordions"]')

    await expect(componentLink).toBeVisible()

    await componentLink.click()

    await expect(page).toHaveURL(pageURL('/components/application/accordions'))
    await expect(page).toHaveTitle('Free Tailwind CSS Accordions | HyperUI')

    await expect(
      page
        .locator('component-preview')
        .and(page.locator('[data-src="/examples/application/accordions/1.html"]')),
    ).toBeVisible()
  })

  test('lists the first six templates first, in title order', async ({ page }) => {
    const firstSection: Locator = page.locator('#main-content section').nth(1)

    await expect(firstSection.getByRole('heading', { level: 2 })).toHaveText('Templates')
    await expect(firstSection.getByRole('heading', { level: 3 })).toHaveText([
      'Analytics Dashboard',
      'Developer Tool Landing Page',
      'Portfolio',
      'Pricing Page',
      'SaaS Landing Page',
      'Storefront',
    ])
  })

  test('can navigate to templates', async ({ page }) => {
    const viewAllLink: Locator = page.getByRole('link', { name: /^View all \d+ templates$/ })

    await expect(viewAllLink).toBeVisible()

    await viewAllLink.click()

    await expect(page).toHaveURL(pageURL('/components/templates'))
    await expect(page).toHaveTitle('Tailwind CSS Full Page Templates | HyperUI')
  })
})

test.describe('Homepage hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
  })

  test('the preview switches change the template', async ({ page }) => {
    const preview: Locator = page.locator('home-preview')
    const frame = page.frameLocator('home-preview iframe')

    // The preview loads lazily, once it's near the viewport.
    await preview.locator('iframe').scrollIntoViewIfNeeded()

    await expect.poll(() => frame.locator('title').textContent()).toMatch(/^SaaS landing page - /)

    const dark: Locator = preview.getByRole('button', { name: 'Dark mode' })

    await dark.click()

    await expect(dark).toHaveAttribute('aria-pressed', 'true')
    await expect
      .poll(() => frame.locator('title').textContent())
      .toMatch(/^SaaS landing page \(dark\) - /)

    const rtl: Locator = preview.getByRole('button', { name: 'Right-to-left' })

    await rtl.click()

    await expect(frame.locator('html')).toHaveAttribute('dir', 'rtl')

    await preview.getByRole('button', { name: 'Focus order' }).click()

    await expect(frame.locator('[data-hyperui-focus-order] span').first()).toHaveText('1')

    // The template's links stay out of the homepage's tab order.
    await expect(frame.locator('a[href]').first()).toHaveAttribute('tabindex', '-1')

    // Turning dark mode off loads a new document. The other checks carry over.
    await dark.click()

    await expect.poll(() => frame.locator('title').textContent()).toMatch(/^SaaS landing page - /)
    await expect(frame.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(frame.locator('[data-hyperui-focus-order] span').first()).toHaveText('1')
  })
})

test('every template card has a thumbnail', async ({ page, request }) => {
  await page.goto('/components/templates')

  const sources = await page
    .locator('a[href^="/components/templates/"] img')
    .evaluateAll((images) => images.map((img) => img.getAttribute('src') ?? ''))

  expect(sources).toHaveLength(7)

  for (const src of sources) {
    const response = await request.get(src)

    expect(response.status(), `${src} is missing. Run pnpm thumbnails`).toBe(200)
  }
})

test('the homepage links to the Use HyperUI with AI page', async ({ page }) => {
  await page.goto('')
  await page.getByRole('link', { name: 'View more AI examples' }).click()

  await expect(page).toHaveURL(pageURL('/ai'))
  await expect(page.getByRole('heading', { level: 1, name: 'Use HyperUI with AI' })).toBeVisible()
  await expect(page.getByText('https://hyperui.dev/mcp').first()).toBeVisible()
})
