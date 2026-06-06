import { test, expect } from '@playwright/test'

const builderPageUrl = '/builder'

test.describe('Landing Page Builder Workspace', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate straight to the builder prototyping workspace route
    await page.goto(builderPageUrl)
  })

  test('displays builder page header and empty canvas placeholder state by default', async ({
    page,
  }) => {
    const mainHeaderTitle = page.locator('text=HyperUI Builder')
    await expect(mainHeaderTitle).toBeVisible()

    const canvasPlaceholderTitle = page.locator('text=Workspace is empty')
    await expect(canvasPlaceholderTitle).toBeVisible()
  })

  test('sidebar filtering input refines displayed component variant list', async ({ page }) => {
    const searchInputElement = page.locator('#searchInputElement')
    await expect(searchInputElement).toBeVisible()

    // Query elements matching base button variants
    const initialVariantButtons = page.locator('.sidebar-variant-button')
    const initialCountValue = await initialVariantButtons.count()
    expect(initialCountValue).toBeGreaterThan(5)

    // Type query to filter results
    await searchInputElement.fill('accordion')

    // Assert non-matching group listings filter out from view dynamically
    const filteredButtons = page.locator(
      '.variant-item-container:not(.hidden) .sidebar-variant-button',
    )
    const filteredCountValue = await filteredButtons.count()
    expect(filteredCountValue).toBeLessThan(initialCountValue)
  })

  test('clicking a component library card adds item to active canvas list', async ({ page }) => {
    // Assert visual list starting items state is clean
    const canvasCardItems = page.locator('.canvas-block-card')
    await expect(canvasCardItems).toHaveCount(0)

    // Pick first sidebar variant element button to simulate add action trigger
    const targetSidebarButton = page.locator('.sidebar-variant-button').first()
    const targetButtonTitle = await targetSidebarButton.innerText()

    // Act: click variant button to inject card item into page stacking canvas area
    await targetSidebarButton.click()

    // Assert block gets populated inside active list container with proper item index numbering
    await expect(canvasCardItems).toHaveCount(1)

    const blockCardTitle = page.locator('.canvas-block-card span.text-xs')
    await expect(blockCardTitle).toContainText(targetButtonTitle.split('\n')[0].trim())
  })

  test('dropdown changes filter visible variants', async ({ page }) => {
    const categoryDropdown = page.locator('#categorySelectElement')
    await expect(categoryDropdown).toBeVisible()

    // Get count of total initial visible buttons
    const allButtonsCount = await page.locator('.variant-item-container:not(.hidden)').count()

    // Select marketing from dropdown filter options
    await categoryDropdown.selectOption('marketing')

    // Wait or assert that the visible elements are less than total
    const marketingButtonsCount = await page.locator('.variant-item-container:not(.hidden)').count()
    expect(marketingButtonsCount).toBeLessThan(allButtonsCount)

    // Select neobrutalism
    await categoryDropdown.selectOption('neobrutalism')
    const neobrutalismCount = await page.locator('.variant-item-container:not(.hidden)').count()
    expect(neobrutalismCount).toBeLessThan(allButtonsCount)
  })

  test('clicking dedicated preview button opens preview modal', async ({ page }) => {
    // Assert visual modal container starting state is hidden
    const previewModal = page.locator('#hoverModalContainer')
    await expect(previewModal).toHaveClass(/hidden/)

    // Click on the first dedicated preview eye button
    const firstPreviewButton = page.locator('.preview-variant-button').first()
    await firstPreviewButton.click()

    // Assert that the preview modal container is now shown (hidden class is removed)
    await expect(previewModal).not.toHaveClass(/hidden/)

    // Click close modal button to hide it again
    const closeModalButton = page.locator('#closeModalButton')
    await closeModalButton.click()
    await expect(previewModal).toHaveClass(/hidden/)
  })
})
