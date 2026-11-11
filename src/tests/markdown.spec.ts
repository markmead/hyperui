import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', heading: '# Free Tailwind CSS Components' },
  { path: '/components/application', heading: '# Tailwind CSS Application UI Components' },
  { path: '/components/application/accordions', heading: '# Tailwind CSS Accordions' },
  { path: '/blog', heading: '# Tailwind CSS Tips & Tutorials' },
  { path: '/blog/faqs', heading: '# ' },
  { path: '/tools', heading: '# Free Tailwind CSS Tools' },
]

// Content negotiation lives in the Cloudflare worker (src/worker.ts), which
// `astro dev` does not run. Test against the production build instead:
//   pnpm build && npx astro preview --port 4322
//   MARKDOWN_BASE_URL=http://localhost:4322 pnpm test src/tests/markdown.spec.ts
const baseURL = process.env.MARKDOWN_BASE_URL

test.use({ baseURL })

test.describe('Markdown for Agents', () => {
  test.skip(!baseURL, 'Set MARKDOWN_BASE_URL to a `astro preview` server to run these tests')

  for (const { path, heading } of pages) {
    test(`serves markdown for ${path} when requested`, async ({ request }) => {
      const response = await request.get(path, { headers: { Accept: 'text/markdown' } })

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('text/markdown')
      expect(response.headers()['vary']).toContain('Accept')

      const body = await response.text()

      expect(body.startsWith('---\n')).toBe(true)
      expect(body).toContain(`\n${heading}`)
      expect(body).not.toContain('<html')
    })

    test(`serves html for ${path} by default`, async ({ request }) => {
      const response = await request.get(path, {
        headers: { Accept: 'text/html,application/xhtml+xml,*/*;q=0.8' },
      })

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('text/html')
    })
  }

  test('prefers html when markdown has a lower quality', async ({ request }) => {
    const response = await request.get('/blog', {
      headers: { Accept: 'text/html, text/markdown;q=0.5' },
    })

    expect(response.headers()['content-type']).toContain('text/html')
  })

  test('includes component markup in code blocks', async ({ request }) => {
    const response = await request.get('/components/application/accordions', {
      headers: { Accept: 'text/markdown' },
    })

    expect(await response.text()).toContain('```html\n<div')
  })
})
