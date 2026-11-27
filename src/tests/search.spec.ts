import { test, expect, pageURL } from './fixtures'

test.describe('Site search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('is closed by default', async ({ page }) => {
    await expect(page.getByRole('dialog', { name: 'Search HyperUI' })).toBeHidden()
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible()
  })

  test('opens from the header button and closes with escape', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Search' })
    const dialog = page.getByRole('dialog', { name: 'Search HyperUI' })

    await trigger.click()

    await expect(dialog).toBeVisible()
    await expect(page.getByRole('combobox')).toBeFocused()

    await page.keyboard.press('Escape')

    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('opens and closes with the keyboard shortcut', async ({ page }) => {
    const dialog = page.getByRole('dialog', { name: 'Search HyperUI' })

    await page.keyboard.press('ControlOrMeta+k')

    await expect(dialog).toBeVisible()

    await page.keyboard.press('ControlOrMeta+k')

    await expect(dialog).toBeHidden()
  })

  test('closes from the close button', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('button', { name: 'Close search' }).click()

    await expect(page.getByRole('dialog', { name: 'Search HyperUI' })).toBeHidden()
  })

  test('suggests the categories before anything is typed', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')

    await expect(page.getByRole('option')).toHaveCount(4)
    await expect(page.getByRole('option').first()).toContainText('Application')
  })

  test('shows results when searching', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('combobox').fill('accordion')

    await expect(page.getByRole('option').first()).toContainText('Accordions')
  })

  test('ranks a title match ahead of description matches', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('combobox').fill('product')

    await expect(page.getByRole('option').first()).toContainText('Product Cards')
  })

  test('shows a message when nothing matches', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('combobox').fill('abcdefg')

    await expect(page.getByRole('option')).toHaveCount(0)
    await expect(page.getByText('No results for “abcdefg”.')).toBeVisible()
  })

  test('shows page results', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('combobox').fill('faqs')

    await expect(page.getByRole('option', { name: /FAQs/ })).toBeVisible()
  })

  test('moves through results with the arrow keys without scrolling the page', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('combobox').fill('card')

    const options = page.getByRole('option')

    await expect(options.first()).toHaveAttribute('aria-selected', 'true')

    await page.keyboard.press('ArrowDown')

    await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(options.first()).toHaveAttribute('aria-selected', 'false')

    await page.keyboard.press('ArrowUp')

    await expect(options.first()).toHaveAttribute('aria-selected', 'true')

    expect(await page.evaluate(() => globalThis.scrollY)).toBe(0)
  })

  test('opens the highlighted result with enter', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('combobox').fill('accordion')
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(pageURL('/components/application/accordions'))
    await expect(page).toHaveTitle('Free Tailwind CSS Accordions | HyperUI')
  })

  test('opens a result with a click', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('combobox').fill('faqs')
    await page.getByRole('option', { name: /FAQs/ }).click()

    await expect(page).toHaveURL(pageURL('/faqs'))
    await expect(page.locator('article')).toBeVisible()
  })

  test('starts clean when opened again', async ({ page }) => {
    await page.keyboard.press('ControlOrMeta+k')
    await page.getByRole('combobox').fill('accordion')
    await page.keyboard.press('Escape')
    await page.keyboard.press('ControlOrMeta+k')

    await expect(page.getByRole('combobox')).toHaveValue('')
  })
})
