import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:4321/'

test('has title', async ({ page }) => {
  await page.goto(BASE_URL)

  await expect(page).toHaveTitle('Free Tailwind CSS v4 Components | HyperUI')
})

test.describe('Component category sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })

  test('can navigate to application components', async ({ page }) => {
    const viewAllLink = page.getByRole('link', { name: 'View all application components' })

    await expect(viewAllLink).toBeVisible()

    await viewAllLink.click()

    await expect(page).toHaveURL(`${BASE_URL}components/application`)
    await expect(page).toHaveTitle('Tailwind CSS Application UI Components | HyperUI')
  })

  test('can navigate to application component', async ({ page }) => {
    const componentLink = page.locator('a[href="/components/application/accordions"]')

    await expect(componentLink).toBeVisible()

    await componentLink.click()

    await expect(page).toHaveURL(`${BASE_URL}components/application/accordions`)
    await expect(page).toHaveTitle('Free Tailwind CSS Accordions | HyperUI')

    await expect(
      page
        .locator('component-preview')
        .and(page.locator('[data-src="/examples/application/accordions/1.html"]')),
    ).toBeVisible()
  })
})
