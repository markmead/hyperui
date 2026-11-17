import { execFileSync } from 'node:child_process'

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { test, expect } from './fixtures'

import { normalizeConfig } from '../lib/dark-mode/config.js'

import { generateDarkHtml } from '../../scripts/generate-dark.js'

const config = normalizeConfig(
  JSON.parse(fs.readFileSync(path.resolve('scripts/dark-mode.config.json'), 'utf8')),
)

function page(head: string, body: string): string {
  return `<!doctype html>\n<html lang="en" class="dark">\n  <head>\n${head}\n  </head>\n${body}\n</html>\n`
}

// These run in Node, so one browser project is enough.
test.describe('pnpm dark', () => {
  test.beforeEach(({ browserName }) => {
    test.skip(browserName !== 'chromium', 'Node-only tests')
  })

  test('applies the config rules', () => {
    const html = generateDarkHtml(
      page('', '  <body>\n    <p class="bg-white text-gray-900 text-gray-400">Hi</p>\n  </body>'),
      config,
    )

    expect(html).toContain('dark:bg-gray-900')
    expect(html).toContain('dark:text-white')
    // gray-400 text keeps its shade, so no dark pair is added for it.
    expect(html).not.toContain('dark:text-gray-500')
  })

  test('marks the title as dark', () => {
    const html = generateDarkHtml(
      page('    <title>Collection - Storefront - HyperUI</title>', '  <body></body>'),
      config,
    )

    expect(html).toContain('<title>Collection (dark) - Storefront - HyperUI</title>')
  })

  test('gives the body a dark page background', () => {
    const plain = generateDarkHtml(page('', '  <body>\n  </body>'), config)
    const grayPage = generateDarkHtml(
      page('', '  <body data-sidebar="closed" class="bg-gray-50">\n  </body>'),
      config,
    )

    expect(plain).toContain('<body class="dark:bg-gray-900">')
    expect(grayPage).toContain('<body data-sidebar="closed" class="bg-gray-50 dark:bg-gray-950">')
  })

  test('handles bodies without a class, and gray-500 pages', () => {
    const noClass = generateDarkHtml(page('', '  <body data-sidebar="closed">\n  </body>'), config)
    const gray500 = generateDarkHtml(page('', '  <body class="bg-gray-500">\n  </body>'), config)

    expect(noClass).toContain('<body data-sidebar="closed" class="dark:bg-gray-900">')
    expect(gray500).toContain('dark:bg-gray-900"')
    expect(gray500).not.toContain('dark:bg-gray-950')
  })

  test('leaves surfaces that are already dark alone', () => {
    const html = generateDarkHtml(
      page(
        '',
        [
          '  <body>',
          '    <div class="bg-gray-950 text-gray-100">',
          '      <div><span class="text-sky-300">code</span><br /></div>',
          '      <img src="a.png" alt="" class="border-gray-200" />',
          '    </div>',
          '    <p class="text-gray-900">After</p>',
          '  </body>',
        ].join('\n'),
      ),
      config,
    )

    expect(html).toContain('<div class="bg-gray-950 text-gray-100">')
    expect(html).toContain('<span class="text-sky-300">code</span>')
    expect(html).toContain('class="border-gray-200"')
    // The generator picks up again once the surface closes.
    expect(html).toContain('<p class="text-gray-900 dark:text-white">After</p>')
  })

  test('gives form controls without a class a dark field', () => {
    const html = generateDarkHtml(
      page(
        '',
        '  <body>\n    <input type="text" />\n    <textarea></textarea>\n    <input type="hidden" />\n  </body>',
      ),
      config,
    )

    expect(html).toContain('<input type="text" class="dark:bg-gray-900 dark:text-white" />')
    expect(html).toContain('<textarea class="dark:bg-gray-900 dark:text-white"></textarea>')
    expect(html).toContain('<input type="hidden" />')
  })

  test('keeps backdrops dark and gives bare inputs a dark field', () => {
    const html = generateDarkHtml(
      page(
        '',
        '  <body>\n    <div class="bg-gray-900/50"></div>\n    <input type="email" class="rounded-md border-gray-200" />\n  </body>',
      ),
      config,
    )

    expect(html).toContain('dark:bg-black/60')
    expect(html).toContain('dark:bg-gray-900 dark:text-white')
  })

  test('pairs class toggles and swaps chart colours in scripts', () => {
    const html = generateDarkHtml(
      page(
        '',
        "  <body>\n    <script>\n      button.classList.toggle('bg-gray-100', isSelected)\n      const colour = '#4f46e5'\n    </script>\n  </body>",
      ),
      config,
    )

    expect(html).toContain("button.classList.toggle('dark:bg-gray-800', isSelected)")
    expect(html).toContain("'#818cf8'")
  })

  test('uses the same chart colours as the hand-made chart dark files', () => {
    const colourPattern = /'#[0-9a-fA-F]{6}'|rgba\(\d+, \d+, \d+, /g

    for (const variant of ['2', '8', '9', '11']) {
      const lightHtml = fs.readFileSync(
        `public/examples/application/charts/${variant}.html`,
        'utf8',
      )
      const darkHtml = fs.readFileSync(
        `public/examples/application/charts/${variant}-dark.html`,
        'utf8',
      )
      const scriptColours = (html: string) =>
        new Set(
          [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].flatMap(
            ([, body]) => body?.match(colourPattern) ?? [],
          ),
        )

      const generated = scriptColours(generateDarkHtml(lightHtml, config))
      const expected = scriptColours(darkHtml)

      // Compare whole sets, so a swap that stops working fails too.
      expect([...generated].sort(), `charts/${variant}`).toEqual([...expected].sort())
    }
  })

  test('writes dark files and --check reports differences', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'hyperui-dark-'))
    const lightFile = path.join(directory, '1.html')
    const darkFile = path.join(directory, '1-dark.html')
    const script = path.resolve('scripts/generate-dark.js')

    fs.writeFileSync(
      lightFile,
      page('', '  <body>\n    <p class="text-gray-900">Hi</p>\n  </body>'),
    )

    execFileSync('node', [script, lightFile])
    expect(fs.readFileSync(darkFile, 'utf8')).toContain('dark:text-white')

    // A freshly written file matches.
    execFileSync('node', [script, lightFile, '--check'])

    // A hand edit is reported and exits non-zero.
    fs.appendFileSync(darkFile, '<!-- edited -->\n')
    let checkError: { status?: number; stdout?: string } | undefined

    try {
      execFileSync('node', [script, lightFile, '--check'], { encoding: 'utf8', stdio: 'pipe' })
    } catch (error) {
      checkError = error as { status?: number; stdout?: string }
    }

    expect(checkError?.status).toBe(1)
    expect(checkError?.stdout).toContain(`differs: ${darkFile}`)

    fs.rmSync(directory, { recursive: true, force: true })
  })
})
