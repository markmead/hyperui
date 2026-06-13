import { test, expect } from '@playwright/test'

const GENERATOR_URL = '/tools/dark-mode-generator'
const DEBOUNCE_WAIT_MS = 500

test.describe('Tools index', () => {
  test('has Dark Mode Generator card', async ({ page }) => {
    await page.goto('/tools')

    const generatorCard = page.getByRole('link', { name: 'Dark Mode Generator' })

    await expect(generatorCard).toBeVisible()

    await generatorCard.click()

    await expect(page).toHaveURL(GENERATOR_URL)
  })
})

test.describe('Dark Mode Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(GENERATOR_URL)
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('loads with Beta badge and HTML input', async ({ page }) => {
    await expect(page.getByText('Beta')).toBeVisible()
    await expect(page.locator('[data-input]')).toBeVisible()
  })

  test('transforms bg-white to dark:bg-black', async ({ page }) => {
    await page.locator('[data-input]').fill('<div class="bg-white">text</div>')
    await page.waitForTimeout(DEBOUNCE_WAIT_MS)

    await expect(page.locator('[data-output]')).toContainText('dark:bg-black')
  })

  test('transforms shaded colours using the shade map', async ({ page }) => {
    await page.locator('[data-input]').fill('<div class="bg-blue-600">text</div>')
    await page.waitForTimeout(DEBOUNCE_WAIT_MS)

    await expect(page.locator('[data-output]')).toContainText('dark:bg-blue-300')
  })

  test('preserves bracket opacity modifier on dark variant', async ({ page }) => {
    await page.locator('[data-input]').fill('<div class="bg-white/[.15]">text</div>')
    await page.waitForTimeout(DEBOUNCE_WAIT_MS)

    await expect(page.locator('[data-output]')).toContainText('dark:bg-black/[.15]')
  })

  test('shows rules count and opens rules section after adding a rule', async ({ page }) => {
    await expect(page.locator('[data-rules-count]')).toHaveText('')

    await page.locator('[data-add-rule]').click()

    await expect(page.locator('[data-rules-count]')).toHaveText('(1)')
    await expect(page.locator('details:has([data-rules])')).toHaveAttribute('open', '')
  })

  test('config persists rules across page reload', async ({ page }) => {
    await page.locator('[data-add-rule]').click()
    await expect(page.locator('[data-rules-count]')).toHaveText('(1)')

    await page.reload()

    await expect(page.locator('[data-rules-count]')).toHaveText('(1)')
  })

  test('reset clears rules back to defaults', async ({ page }) => {
    await page.locator('[data-add-rule]').click()
    await expect(page.locator('[data-rules-count]')).toHaveText('(1)')

    await page.locator('[data-reset]').click()

    await expect(page.locator('[data-rules-count]')).toHaveText('')
  })

  test('export and import round-trips the config', async ({ page }) => {
    await page.locator('[data-add-rule]').click()
    await expect(page.locator('[data-rules-count]')).toHaveText('(1)')

    const downloadPromise = page.waitForEvent('download')
    await page.locator('[data-export]').click()
    const configDownload = await downloadPromise
    const configFilePath = await configDownload.path()

    await page.locator('[data-reset]').click()
    await expect(page.locator('[data-rules-count]')).toHaveText('')

    await page.locator('[data-import]').setInputFiles(configFilePath!)
    await expect(page.locator('[data-rules-count]')).toHaveText('(1)')
  })

  test('copy button updates label and ARIA live region', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions only granted in Chromium')

    await page.locator('[data-input]').fill('<div class="bg-white">text</div>')
    await page.waitForTimeout(DEBOUNCE_WAIT_MS)

    await page.locator('[data-copy]').click()

    await expect(page.locator('[data-copy-text]')).toHaveText('Copied')
    await expect(page.locator('[data-copy-polite]')).toHaveText('Copied to clipboard.')
  })

  test.describe('Rule inspector', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('[data-add-rule]').click()
      await page.locator('[data-configure-rule]').first().click()
    })

    test('opens when Configure is clicked', async ({ page }) => {
      await expect(page.locator('[data-rule-inspector]')).toHaveAttribute('open', '')
    })

    test('Apply button keeps inspector open', async ({ page }) => {
      await page.locator('[data-inspector-apply]').click()

      await expect(page.locator('[data-rule-inspector]')).toHaveAttribute('open', '')
    })

    test('darkColor override maps white to the specified colour', async ({ page }) => {
      const darkColorInput = page.locator('[data-inspector-dark-color]')
      await darkColorInput.fill('gray-900')
      await darkColorInput.dispatchEvent('change')

      await page.locator('[data-input]').fill('<div class="bg-white">text</div>')
      await page.waitForTimeout(DEBOUNCE_WAIT_MS)

      await expect(page.locator('[data-output]')).toContainText('dark:bg-gray-900')
    })

    test('excludeElements rule skips matched elements for a given shade', async ({ page }) => {
      const shadeInput = page.locator('[data-inspector-shade]')
      await shadeInput.fill('600')
      await shadeInput.dispatchEvent('change')

      const excludeElementsInput = page.locator('[data-inspector-exclude-elements]')
      await excludeElementsInput.fill('button')
      await excludeElementsInput.dispatchEvent('change')

      await page.locator('[data-input]').fill(
        '<div class="bg-blue-600"><button class="bg-blue-600">text</button></div>',
      )
      await page.waitForTimeout(DEBOUNCE_WAIT_MS)

      const outputText = await page.locator('[data-output]').textContent()
      expect(outputText).toContain('bg-blue-600 dark:bg-blue-300')
      expect(outputText).not.toContain('button class="bg-blue-600 dark:')
    })
  })
})
