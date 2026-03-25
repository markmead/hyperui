import { test, expect } from '@playwright/test'

test.describe('Site search', () => {
  test.beforeEach(async ({ page }) => await page.goto('/'))

  test('search is not visible by default', async ({ page }) => {
    await expect(page.locator('search-results [data-container="false"]')).not.toBeVisible()
  })

  test('shows results when searching', async ({ page }) => {
    const searchInput = page.locator('search-input input')
    const resultsContainer = page.locator('search-results [data-container]')

    await expect(resultsContainer).not.toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'false')

    await searchInput.fill('accordion')

    await expect(resultsContainer).toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'true')

    const resultCount = await page.locator('search-results [role="listbox"] li').count()

    expect(resultCount).toBeGreaterThan(0)
  })

  test('shows error when no results are found', async ({ page }) => {
    const searchInput = page.locator('search-input input')
    const resultsContainer = page.locator('search-results [data-container]')
    const errorMessage = page.locator('search-results [data-error]')

    await expect(resultsContainer).not.toBeVisible()
    await expect(errorMessage).not.toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'false')
    await expect(errorMessage).toHaveAttribute('data-error', 'false')

    await searchInput.fill('abcdefg')

    await expect(resultsContainer).toBeVisible()
    await expect(errorMessage).toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'true')
    await expect(errorMessage).toHaveAttribute('data-error', 'true')

    const resultCount = await page.locator('search-results [role="listbox"] li').count()

    expect(resultCount).toBe(0)
  })

  test('can clear results', async ({ page }) => {
    const searchInput = page.locator('search-input input')
    const clearButton = page.getByRole('button', { name: 'Clear' })
    const resultsContainer = page.locator('search-results [data-container]')

    await expect(resultsContainer).not.toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'false')

    await searchInput.fill('accordion')

    await expect(resultsContainer).toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'true')

    await clearButton.click()

    await expect(searchInput).toHaveValue('')
    await expect(resultsContainer).not.toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'false')
  })

  test('shows both component and blog results', async ({ page }) => {
    const searchInput = page.locator('search-input input')

    await searchInput.fill('faqs')

    await expect(
      page.locator('search-results [data-list] strong', { hasText: 'Components' }),
    ).toBeVisible()

    await expect(
      page.locator('search-results [data-list] strong', { hasText: 'Blog Posts' }),
    ).toBeVisible()
  })

  test('can navigate to a component result', async ({ page }) => {
    const searchInput = page.locator('search-input input')

    await searchInput.fill('accordion')

    const componentLink = page.locator('search-results [role="listbox"] a').first()
    const componentHref = await componentLink.getAttribute('href')

    await componentLink.click()

    await expect(page).toHaveURL(componentHref || '')
    await expect(page).toHaveTitle('Free Tailwind CSS Accordions | HyperUI')

    const componentPreviews = await page.locator('component-preview').count()

    expect(componentPreviews).toBeGreaterThan(0)
  })

  test('can navigate to a blog result', async ({ page }) => {
    const searchInput = page.locator('search-input input')

    await searchInput.fill('project acknowledgements')

    const blogLink = page.locator('search-results [role="listbox"] a').first()
    const blogHref = await blogLink.getAttribute('href')

    await blogLink.click()

    await expect(page).toHaveURL(blogHref || '')
    await expect(page).toHaveTitle('Project Acknowledgements | HyperUI')

    await expect(page.locator('article')).toBeVisible()
  })

  test('can close with escape', async ({ page }) => {
    const searchInput = page.locator('search-input input')
    const resultsContainer = page.locator('search-results [data-container]')

    await expect(resultsContainer).not.toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'false')

    await searchInput.fill('accordion')

    await expect(resultsContainer).toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'true')

    await page.keyboard.press('Escape')

    await expect(searchInput).toHaveValue('')
    await expect(resultsContainer).not.toBeVisible()
    await expect(resultsContainer).toHaveAttribute('data-container', 'false')
  })
})
