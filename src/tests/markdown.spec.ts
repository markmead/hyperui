import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', markdownPath: '/index.md', heading: '# Free Tailwind CSS Components' },
  {
    path: '/components/application',
    markdownPath: '/components/application.md',
    heading: '# Tailwind CSS Application UI Components',
  },
  {
    path: '/components/application/accordions',
    markdownPath: '/components/application/accordions.md',
    heading: '# Tailwind CSS Accordions',
  },
  { path: '/blog', markdownPath: '/blog.md', heading: '# Tailwind CSS Tips & Tutorials' },
  { path: '/blog/faqs', markdownPath: '/blog/faqs.md', heading: '# ' },
  { path: '/tools', markdownPath: '/tools.md', heading: '# Free Tailwind CSS Tools' },
]

test.describe('Markdown for agents', () => {
  for (const { path, markdownPath, heading } of pages) {
    test(`serves ${markdownPath}`, async ({ request }) => {
      const response = await request.get(markdownPath)

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('text/markdown')

      const body = await response.text()

      expect(body.startsWith('---\n')).toBe(true)
      expect(body).toContain(`\n${heading}`)
      expect(body).not.toContain('<html')
    })

    test(`links ${path} to its markdown version`, async ({ page }) => {
      await page.goto(path)

      await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute(
        'href',
        markdownPath,
      )
    })
  }

  test('does not link the 404 page to markdown', async ({ page }) => {
    await page.goto('/does-not-exist')

    await expect(page.locator('link[type="text/markdown"]')).toHaveCount(0)
  })

  test('includes component markup in code blocks', async ({ request }) => {
    const response = await request.get('/components/application/accordions.md')

    expect(await response.text()).toContain('```html\n<div')
  })

  test('strips MDX components from blog posts', async ({ request }) => {
    const response = await request.get('/blog/remove-number-input-spinners-with-tailwindcss.md')
    const body = await response.text()

    expect(body).not.toContain('<ComponentPreview')
    expect(body).not.toContain('{/*')
    expect(body).toContain('```html')
  })

  test('serves llms.txt with links to markdown pages', async ({ request }) => {
    const response = await request.get('/llms.txt')
    const body = await response.text()

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('text/plain')
    expect(body.startsWith('# HyperUI\n\n> ')).toBe(true)
    expect(body).toContain('## Components')
    expect(body).toContain('(https://hyperui.dev/components/application/accordions.md)')
  })

  test('serves llms-full.txt with every page', async ({ request }) => {
    const response = await request.get('/llms-full.txt')
    const body = await response.text()

    expect(response.status()).toBe(200)
    expect(body).toContain('# Tailwind CSS Accordions')
    expect(body).toContain('# Tailwind CSS Tips & Tutorials')
  })
})

// `public/_headers` only applies to the built site. Run against a preview:
//   pnpm build && npx astro preview --port 4322
//   MARKDOWN_BASE_URL=http://localhost:4322 pnpm test src/tests/markdown.spec.ts
test.describe('Markdown headers (built site)', () => {
  const baseURL = process.env.MARKDOWN_BASE_URL

  test.skip(!baseURL, 'Set MARKDOWN_BASE_URL to an `astro preview` server to run these tests')

  test.use({ baseURL })

  test('marks markdown and llms-full.txt as noindex', async ({ request }) => {
    for (const path of ['/components/application/accordions.md', '/index.md', '/llms-full.txt']) {
      const response = await request.get(path)

      expect(response.headers()['x-robots-tag'], path).toBe('noindex')
    }
  })

  test('does not mark html pages as noindex', async ({ request }) => {
    const response = await request.get('/components/application/accordions')

    expect(response.headers()['x-robots-tag']).toBeUndefined()
  })
})
