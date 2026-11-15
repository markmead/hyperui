import { test, expect, type Locator } from '@playwright/test'

test.describe('Component category sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
  })

  test('can navigate to application components', async ({ page }) => {
    const viewAllLink: Locator = page.getByRole('link', { name: 'View all application components' })

    await expect(viewAllLink).toBeVisible()

    await viewAllLink.click()

    await expect(page).toHaveURL('/components/application')
    await expect(page).toHaveTitle('Tailwind CSS Application UI Components | HyperUI')
  })

  test('can navigate to application component', async ({ page }) => {
    const componentLink: Locator = page.locator('a[href="/components/application/accordions"]')

    await expect(componentLink).toBeVisible()

    await componentLink.click()

    await expect(page).toHaveURL('/components/application/accordions')
    await expect(page).toHaveTitle('Free Tailwind CSS Accordions | HyperUI')

    await expect(
      page
        .locator('component-preview')
        .and(page.locator('[data-src="/examples/application/accordions/1.html"]')),
    ).toBeVisible()
  })

  test('lists every template first, in title order', async ({ page }) => {
    const firstSection: Locator = page.locator('#main-content section').nth(1)

    await expect(firstSection.getByRole('heading', { level: 2 })).toHaveText('Templates')
    await expect(firstSection.getByRole('heading', { level: 3 })).toHaveText([
      'Analytics Dashboard',
      'Portfolio',
      'SaaS Landing Page',
      'Storefront',
      'Support Inbox',
    ])
  })

  test('can navigate to templates', async ({ page }) => {
    const viewAllLink: Locator = page.getByRole('link', { name: 'View all templates' })

    await expect(viewAllLink).toBeVisible()

    await viewAllLink.click()

    await expect(page).toHaveURL('/components/templates')
    await expect(page).toHaveTitle('Tailwind CSS Full Page Templates | HyperUI')
  })
})
