import { test, expect } from './fixtures'

test.describe('Copy counter', () => {
  test('accepts a copy of a known example', async ({ request }) => {
    const response = await request.post('/api/copy', {
      data: JSON.stringify({ src: '/examples/marketing/footers/3-dark.html', kind: 'ai' }),
    })

    expect(response.status()).toBe(204)
  })

  test('rejects a copy sent from another site', async ({ request }) => {
    const response = await request.post('/api/copy', {
      data: JSON.stringify({ src: '/examples/marketing/footers/1.html', kind: 'html' }),
      headers: { 'Sec-Fetch-Site': 'cross-site' },
    })

    expect(response.status()).toBe(403)
  })

  test('accepts a same-origin copy', async ({ request }) => {
    const response = await request.post('/api/copy', {
      data: JSON.stringify({ src: '/examples/marketing/footers/1.html', kind: 'html' }),
      headers: { 'Sec-Fetch-Site': 'same-origin' },
    })

    expect(response.status()).toBe(204)
  })

  for (const [name, body] of [
    ['an unknown path', JSON.stringify({ src: '/etc/passwd', kind: 'html' })],
    ['an unknown kind', JSON.stringify({ src: '/examples/marketing/footers/3.html', kind: 'x' })],
    ['a body that is not JSON', 'nope'],
    [
      'an example that does not exist',
      JSON.stringify({ src: '/examples/marketing/does-not-exist/999.html', kind: 'html' }),
    ],
    [
      'a dark variant that does not exist',
      JSON.stringify({ src: '/examples/application/grids/1-dark.html', kind: 'html' }),
    ],
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

  test('Copy for AI sends a beacon with kind ai', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only granted in Chromium')

    await page.goto('/components/marketing/footers')

    const previewCopy = page.locator('preview-copy').first()
    const beacon = page.waitForRequest((request) => request.url().endsWith('/api/copy'))

    await previewCopy.locator('button[data-menu-toggle]').click()
    await previewCopy.locator('[role="menu"] [data-copy="ai"]').click()

    expect(JSON.parse((await beacon).postData() ?? '')).toEqual({
      src: '/examples/marketing/footers/1.html',
      kind: 'ai',
    })
  })

  test('a failed copy is not counted', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only granted in Chromium')

    await page.goto('/components/marketing/footers')

    await page.evaluate(() => {
      Object.defineProperty(navigator.clipboard, 'writeText', {
        value: () => Promise.reject(new Error('Clipboard blocked')),
      })
    })

    const beacons: string[] = []

    page.on('request', (request) => {
      if (request.url().endsWith('/api/copy')) {
        beacons.push(request.url())
      }
    })

    const copyButton = page.locator('preview-copy').first().locator(':scope > button[data-copy]')

    await copyButton.click()
    await page.waitForTimeout(500)

    expect(beacons).toHaveLength(0)
    await expect(copyButton).not.toContainText('Copied')
  })

  test('a copy with no clipboard API is not counted and can be retried', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only granted in Chromium')

    await page.goto('/components/marketing/footers')

    await page.evaluate(() => {
      Object.defineProperty(navigator.clipboard, 'writeText', {
        configurable: true,
        value: () => {
          throw new TypeError('Clipboard unavailable')
        },
      })
    })

    const beacons: string[] = []

    page.on('request', (request) => {
      if (request.url().endsWith('/api/copy')) {
        beacons.push(request.url())
      }
    })

    const copyButton = page.locator('preview-copy').first().locator(':scope > button[data-copy]')

    await copyButton.click()
    await page.waitForTimeout(300)

    expect(beacons).toHaveLength(0)
    await expect(copyButton).not.toContainText('Copied')

    // The control isn't left busy: once the clipboard works, the next click copies.
    await page.evaluate(() => {
      Reflect.deleteProperty(navigator.clipboard, 'writeText')
    })

    await copyButton.click()

    await expect(copyButton).toContainText('Copied')
    expect(beacons).toHaveLength(1)
  })
})
