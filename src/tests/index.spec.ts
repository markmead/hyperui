import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:4321/'

test('has title', async ({ page }) => {
  await page.goto(BASE_URL)

  await expect(page).toHaveTitle('Free Tailwind CSS v4 Components | HyperUI')
})
