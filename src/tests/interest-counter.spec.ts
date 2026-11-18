import { test, expect } from './fixtures'

test.describe('Interest counter', () => {
  test('accepts a known template', async ({ request }) => {
    const response = await request.post('/api/interest', {
      data: JSON.stringify({ slug: 'analytics-dashboard' }),
      headers: { 'Sec-Fetch-Site': 'same-origin' },
    })

    expect(response.status()).toBe(204)
  })

  test('rejects a click sent from another site', async ({ request }) => {
    const response = await request.post('/api/interest', {
      data: JSON.stringify({ slug: 'analytics-dashboard' }),
      headers: { 'Sec-Fetch-Site': 'cross-site' },
    })

    expect(response.status()).toBe(403)
  })

  for (const [name, body] of [
    ['an unknown template', JSON.stringify({ slug: 'does-not-exist' })],
    ['a component that is not a template', JSON.stringify({ slug: 'footers' })],
    ['a slug that is not a string', JSON.stringify({ slug: 42 })],
    ['a missing slug', JSON.stringify({})],
    ['a body that is not JSON', 'nope'],
  ]) {
    test(`rejects ${name}`, async ({ request }) => {
      const response = await request.post('/api/interest', { data: body })

      expect(response.status()).toBe(400)
    })
  }

  test('the button sends the template slug, once, and says thanks', async ({ page }) => {
    const beacons: (string | null)[] = []

    page.on('request', (request) => {
      if (request.url().endsWith('/api/interest')) {
        beacons.push(request.postData())
      }
    })

    await page.goto('/components/templates/analytics-dashboard')

    const button = page.getByRole('button', { name: "I'm interested" })
    const beacon = page.waitForRequest((request) => request.url().endsWith('/api/interest'))

    await button.click()

    expect(JSON.parse((await beacon).postData() ?? '')).toEqual({ slug: 'analytics-dashboard' })

    const noted = page.getByRole('button', { name: 'Thanks, noted' })

    await expect(noted).toHaveAttribute('aria-disabled', 'true')
    await expect(noted).toBeFocused()
    await expect(page.locator('[data-interest-status]')).toHaveText(
      'Thanks. Your interest has been noted.',
    )

    // A second click, or a later visit, isn't counted again.
    await noted.dispatchEvent('click')
    await page.reload()

    await expect(page.getByRole('button', { name: 'Thanks, noted' })).toBeVisible()
    expect(beacons).toHaveLength(1)
  })

  test('only appears on templates that offer it', async ({ page }) => {
    await page.goto('/components/templates/storefront')

    await expect(page.locator('template-interest')).toHaveCount(0)
  })
})
