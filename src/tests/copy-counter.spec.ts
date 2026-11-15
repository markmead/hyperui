import { test, expect } from '@playwright/test'

test.describe('Copy counter', () => {
  test('accepts a copy of a known example', async ({ request }) => {
    const response = await request.post('/api/copy', {
      data: JSON.stringify({ src: '/examples/marketing/footers/3-dark.html', kind: 'ai' }),
    })

    expect(response.status()).toBe(204)
  })

  for (const [name, body] of [
    ['an unknown path', JSON.stringify({ src: '/etc/passwd', kind: 'html' })],
    ['an unknown kind', JSON.stringify({ src: '/examples/marketing/footers/3.html', kind: 'x' })],
    ['a body that is not JSON', 'nope'],
  ]) {
    test(`rejects ${name}`, async ({ request }) => {
      const response = await request.post('/api/copy', { data: body })

      expect(response.status()).toBe(400)
    })
  }

  test('the Copy button sends a beacon for the copied variant', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only granted in Chromium')

    await page.goto('/components/marketing/footers')

    const beacon = page.waitForRequest((request) => request.url().endsWith('/api/copy'))

    await page.locator('preview-copy').first().locator(':scope > button[data-copy]').click()

    expect(JSON.parse((await beacon).postData() ?? '')).toEqual({
      src: '/examples/marketing/footers/1.html',
      kind: 'html',
    })
  })
})
