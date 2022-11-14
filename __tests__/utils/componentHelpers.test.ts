import '@testing-library/jest-dom'
import {
  transformComponentHtml,
  transformComponentSlug,
} from '../../src/utils/componentHelpers'

describe('Transform Component Slug Test', () => {
  it('Correctly replaces the slug by string', () => {
    const slug = 'test-category-my_slug'
    const category = 'test-category'

    const transformedSlug = transformComponentSlug(slug, category)
    expect(transformedSlug).toBe('my_slug')
  })
})

describe('Transform Component HTML', () => {
  it('correctly returns the correct html without spacing passed in', () => {
    const html = `<div class="test-class
    test-class-2">
    <h1>Test</h1>
    <p>Test</p>
    </div>`
    const transformedHtml = transformComponentHtml(html)

    expect(transformedHtml).toBe(
      `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        let links = [...document.querySelectorAll('a')]
        let forms = [...document.querySelectorAll('form')]

        links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()))
        forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()))
      })
    </script>

    <link rel="stylesheet" href="/tailwind.css">

    <body class="relative">
      ${html}
    </body>
  `
    )
  })
  it('correctly returns the correct html with spacing passed in', () => {
    const html = `<div class="test-class
    test-class-2">
    <h1>Test</h1>
    <p>Test</p>
    </div>`
    const spacing = `width: 100%;`
    const transformedHtml = transformComponentHtml(html, spacing)

    expect(transformedHtml).toBe(
      `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        let links = [...document.querySelectorAll('a')]
        let forms = [...document.querySelectorAll('form')]

        links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()))
        forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()))
      })
    </script>

    <link rel="stylesheet" href="/tailwind.css">

    <body class="${spacing}">
      ${html}
    </body>
  `
    )
  })
})
