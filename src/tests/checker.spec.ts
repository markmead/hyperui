import fs from 'node:fs'
import path from 'node:path'

import AxeBuilder from '@axe-core/playwright'

import { test, expect } from './fixtures'

import { normalizeConfig } from '../lib/dark-mode/config.js'
import {
  applyFixes,
  axeFindings,
  checkMarkup,
  findingsForAi,
  instrumentMarkup,
} from '../lib/checker/index.js'
import { scanTags } from '../lib/checker/tags.js'

const config = normalizeConfig(
  JSON.parse(fs.readFileSync(path.resolve('scripts/dark-mode.config.json'), 'utf8')),
)

const rulesOf = (html: string) => checkMarkup(html, config).findings.map(({ rule }) => rule)

const fixAll = (html: string) =>
  applyFixes(
    html,
    checkMarkup(html, config).findings.map(({ fix }) => fix),
  )

// The engine is plain string work, so these run in Node with one browser.
test.describe('Tailwind checker engine', () => {
  test.beforeEach(({ browserName }) => {
    test.skip(browserName !== 'chromium', 'Node-only tests')
  })

  test('scans tags with their lines, attributes and nesting', () => {
    const tags = scanTags(
      '<div class="a">\n  <!-- <p class="no"> -->\n  <button type="button" disabled>\n    <svg><title>Hi</title></svg>\n  </button>\n</div>',
    )

    expect(tags.map(({ name, line }) => `${name}:${line}`)).toEqual([
      'div:1',
      'button:3',
      'svg:4',
      'title:4',
    ])
    expect(tags[1]?.attributes.map(({ name, value }) => [name, value])).toEqual([
      ['type', 'button'],
      ['disabled', null],
    ])
    expect(tags[2]?.parent?.name).toBe('button')
    expect(tags[2]?.children.map(({ name }) => name)).toEqual(['title'])
  })

  test('maps physical utilities to logical ones', () => {
    const html =
      '<div class="pl-4 mr-2 -ml-px md:pr-6 left-0 right-auto text-left border-l-2 border-r rounded-l-lg rounded-tr-md float-right"></div>'

    expect(fixAll(html)).toBe(
      '<div class="ps-4 me-2 -ms-px md:pe-6 start-0 end-auto text-start border-s-2 border-e rounded-s-lg rounded-se-md float-end"></div>',
    )
  })

  test('leaves logical, direction-specific and centring utilities alone', () => {
    expect(
      rulesOf(
        '<div class="ps-4 px-2 ltr:pl-4 rtl:pr-4 inset-x-0 left-1/2 -translate-x-1/2 border-x"></div>',
      ),
    ).toEqual([])
  })

  test('flags a removed focus outline with nothing in its place', () => {
    const html = '<button class="outline-none">Go</button>'

    expect(rulesOf(html)).toEqual(['focus-outline-removed'])
    expect(fixAll(html)).toBe(
      '<button class="outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">Go</button>',
    )
    // @tailwindcss/forms gives form controls a focus ring.
    expect(rulesOf('<input class="focus:outline-hidden" />')).toEqual([])
    expect(rulesOf('<button class="focus:outline-none focus-visible:ring-2">Go</button>')).toEqual(
      [],
    )
  })

  test('flags SVG icons that screen readers would read', () => {
    const html = '<button>Save <svg viewBox="0 0 24 24"><path d="M0 0" /></svg></button>'

    expect(rulesOf(html)).toEqual(['svg-not-hidden'])
    expect(fixAll(html)).toBe(
      '<button>Save <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M0 0" /></svg></button>',
    )
    expect(
      rulesOf('<svg role="img" aria-label="Logo"></svg><svg><title>Logo</title></svg>'),
    ).toEqual([])
  })

  test('markup with no dark mode gets one finding that generates it', () => {
    const html = '<body class="p-6">\n  <p class="bg-white text-gray-900">Hi</p>\n</body>'
    const { findings } = checkMarkup(html, config)

    expect(findings.map(({ rule }) => rule)).toEqual(['no-dark-mode'])
    expect(findings[0]?.message).toContain('2 elements')
    expect(fixAll(html)).toBe(
      '<body class="p-6 dark:bg-gray-900">\n  <p class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">Hi</p>\n</body>',
    )
  })

  test('flags only the colours that are missing a dark pair', () => {
    const html =
      '<p class="bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-900 dark:text-white">Hi</p>'
    const { findings } = checkMarkup(html, config)

    expect(findings.map(({ rule }) => rule)).toEqual(['missing-dark-pair'])
    expect(findings[0]?.message).toBe('Colours with no dark pair: `hover:bg-gray-50`.')
    expect(findings[0]?.fix?.label).toBe('Add `dark:hover:bg-gray-800`')
  })

  test('colours meant to stay the same in dark mode are not flagged', () => {
    expect(rulesOf('<p class="text-gray-400 dark:bg-black">x</p>')).toEqual([])
    // Accent colours read well in both themes.
    expect(
      rulesOf(
        '<a class="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 dark:bg-black">Go</a>',
      ),
    ).toEqual([])
    // Dark text on a yellow badge stays dark.
    expect(
      rulesOf('<span class="bg-amber-400 text-gray-900 dark:bg-amber-500">3 left</span>'),
    ).toEqual([])
  })

  test('leaves surfaces that are dark in both themes alone', () => {
    expect(
      rulesOf(
        '<p class="dark:text-white">x</p><pre class="bg-gray-950"><code class="text-gray-100">x</code></pre><div class="bg-gray-900"><p class="text-gray-300">x</p></div>',
      ),
    ).toEqual([])
  })

  test('fixes on the same element combine', () => {
    expect(fixAll('<a class="pl-4 text-gray-900 outline-none dark:bg-black">x</a>')).toBe(
      '<a class="ps-4 text-gray-900 outline-hidden dark:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-white">x</a>',
    )
  })

  test('fixed markup has nothing left to fix', () => {
    const html = fs.readFileSync('public/examples/marketing/headers/1.html', 'utf8')
    const physical = html.replace('class="', 'class="pl-4 ')
    const fixed = fixAll(physical)

    expect(rulesOf(fixed)).toEqual([])
  })

  test('findings for AI list each finding by group, with its line and fix', () => {
    const prompt = findingsForAi(
      checkMarkup('<div class="pl-4">\n<svg></svg></div>', config).findings,
    )

    expect(prompt).toContain('Fix these 2 issues')
    expect(prompt).toContain('## Accessibility (WCAG 2.1 AA)\n\n- Line 2:')
    expect(prompt).toContain('## Right-to-left\n\n- Line 1: `pl-4` always means')
    expect(prompt).toContain('Fix: Use `ps-4`.')
    expect(findingsForAi([])).toContain('found no accessibility')
  })
})

test('axe findings on the instrumented preview point at source lines', async ({ page }) => {
  const html = [
    '<main>',
    '  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" />',
    '  <button style="color: #d1d5db; background: #fff">Faint</button>',
    '</main>',
  ].join('\n')

  await page.setContent(
    `<!doctype html><html lang="en"><head><title>Preview</title></head><body>${instrumentMarkup(html)}</body></html>`,
  )

  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  const findings = axeFindings(violations)

  expect(findings.map(({ rule, line }) => `${rule}:${line}`).sort()).toEqual([
    'color-contrast:3',
    'image-alt:2',
  ])
  expect(findings.find(({ rule }) => rule === 'image-alt')?.snippet).not.toContain('data-checker')
})
