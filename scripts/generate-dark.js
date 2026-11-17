#!/usr/bin/env node

/**
 * Generate `{n}-dark.html` from `{n}.html` with the dark mode generator.
 *
 *   pnpm dark public/examples/templates/storefront/1.html
 *   pnpm dark public/examples/templates/storefront/*.html --check
 *
 * Runs `transformHtmlString` (src/lib/dark-mode) with
 * scripts/dark-mode.config.json, the same rules you can import into
 * /tools/dark-mode-generator. Then applies the post-steps the generator
 * can't do, because it only rewrites `class` attributes.
 *
 * `--check` writes nothing. It reports which dark files differ from what the
 * script would generate, and exits 1 if any do. A dark file that was
 * hand-tuned after generating will show up here, so mention the tuning in
 * the PR that adds it.
 *
 * Output is formatted with the repo's Prettier config, as `pnpm format` would.
 */

import { fileURLToPath } from 'node:url'

import fs from 'node:fs'
import path from 'node:path'

import prettier from 'prettier'

import { normalizeConfig } from '../src/lib/dark-mode/config.js'
import { transformClass } from '../src/lib/dark-mode/transform-class.js'
import { transformHtmlString } from '../src/lib/dark-mode/transform-html.js'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const configPath = path.join(scriptDirectory, 'dark-mode.config.json')

// Chart.js colours live in <script>, which the generator doesn't touch.
// These match the colours used in application/charts/*-dark.html.
const CHART_COLOUR_SWAPS = [
  [/rgba\(79, 70, 229, /g, 'rgba(129, 140, 248, '],
  [/'#4f46e5'/g, "'#818cf8'"],
  [/'#6366f1'/g, "'#818cf8'"],
  [/'#0ea5e9'/g, "'#38bdf8'"],
  [/rgba\(14, 165, 233, /g, 'rgba(56, 189, 248, '],
  [/rgba\(16, 185, 129, /g, 'rgba(52, 211, 153, '],
  [/rgba\(244, 63, 94, /g, 'rgba(251, 113, 133, '],
  [/rgba\(245, 158, 11, /g, 'rgba(251, 191, 36, '],
  [/'#4338ca'/g, "'#a5b4fc'"],
  [/'#10b981'/g, "'#34d399'"],
  [/'#059669'/g, "'#6ee7b7'"],
  [/'#f59e0b'/g, "'#fbbf24'"],
  [/'#d97706'/g, "'#fcd34d'"],
  [/'#f43f5e'/g, "'#fb7185'"],
  [/'#e11d48'/g, "'#fda4af'"],
  [/'#ffffff'/g, "'#111827'"],
  [/'#4b5563'/g, "'#9ca3af'"],
  [/'#e5e7eb'/g, "'rgba(255, 255, 255, 0.1)'"],
]

// Surfaces that are already dark in the light file, like code blocks, stay
// dark in the dark file, so the generator leaves them and everything inside
// them alone. A 950 background marks one: the page itself is never that dark
// in a light file.
const DARK_SURFACE_CLASS = /(^|\s)bg-(gray|slate|zinc|neutral|stone)-950(\s|$)/

const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
])

/**
 * Runs the generator on `bodyHtml`, except inside dark surfaces.
 *
 * @param {string} bodyHtml
 * @param {import('../src/lib/dark-mode/config.js').DarkModeConfig} darkModeConfig
 * @returns {string}
 */
function transformOutsideDarkSurfaces(bodyHtml, darkModeConfig) {
  const tagPattern =
    /<!--[\s\S]*?-->|<(script|style)\b[\s\S]*?<\/\1>|<(\/?)([a-zA-Z][\w-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/g

  let output = ''
  let segmentStart = 0
  let surfaceDepth = 0

  for (const tagMatch of bodyHtml.matchAll(tagPattern)) {
    const [tag, , isClosing, tagName = '', attributes = ''] = tagMatch
    const normalizedTagName = tagName.toLowerCase()

    if (!tagName || VOID_ELEMENTS.has(normalizedTagName) || attributes.trim().endsWith('/')) {
      continue
    }

    if (surfaceDepth === 0) {
      const classMatch = attributes.match(/\sclass="([^"]*)"/)

      if (
        !isClosing &&
        normalizedTagName !== 'body' &&
        classMatch &&
        DARK_SURFACE_CLASS.test(classMatch[1] ?? '')
      ) {
        output += transformHtmlString(bodyHtml.slice(segmentStart, tagMatch.index), darkModeConfig)
        segmentStart = tagMatch.index
        surfaceDepth = 1
      }

      continue
    }

    surfaceDepth += isClosing ? -1 : 1

    if (surfaceDepth === 0) {
      const surfaceEnd = tagMatch.index + tag.length

      output += bodyHtml.slice(segmentStart, surfaceEnd)
      segmentStart = surfaceEnd
    }
  }

  return output + transformHtmlString(bodyHtml.slice(segmentStart), darkModeConfig)
}

/**
 * @param {string} lightHtml
 * @param {import('../src/lib/dark-mode/config.js').DarkModeConfig} darkModeConfig
 * @returns {string}
 */
export function generateDarkHtml(lightHtml, darkModeConfig) {
  const bodyIndex = lightHtml.search(/<body/)
  // Dark files mark their title: "Collection - Storefront - HyperUI" becomes
  // "Collection (dark) - Storefront - HyperUI".
  const head = lightHtml
    .slice(0, bodyIndex)
    .replace(/<title>(\s*)([^<]*?) - /, (match, space, componentTitle) =>
      componentTitle.endsWith('(dark)') ? match : `<title>${space}${componentTitle} (dark) - `,
    )

  // 1. The generator, on everything from <body> down, except dark surfaces.
  let darkHtml = head + transformOutsideDarkSurfaces(lightHtml.slice(bodyIndex), darkModeConfig)

  // 2. Drop dark classes that only repeat their light class. Rules that keep a
  //    shade (gray-400 text stays gray-400) produce these.
  darkHtml = darkHtml.replace(/class="([^"]*)"/g, (_, classAttribute) => {
    const classNames = classAttribute.split(/\s+/).filter(Boolean)
    const keptClassNames = classNames.filter(
      (className) => !(className.startsWith('dark:') && classNames.includes(className.slice(5))),
    )

    return `class="${keptClassNames.join(' ')}"`
  })

  // 3. Dark files give <body> an explicit dark background: gray-950 under a
  //    gray-50 page, otherwise gray-900.
  darkHtml = darkHtml.replace(/<body\b([^>]*)>/, (bodyTag, attributes) => {
    const classMatch = attributes.match(/(\s)class="([^"]*)"/)

    if (!classMatch) {
      return `<body${attributes} class="dark:bg-gray-900">`
    }

    const classNames = classMatch[2].split(/\s+/).filter(Boolean)
    const keptClassNames = classNames.filter((className) => !className.startsWith('dark:bg-'))
    const darkBackground = keptClassNames.includes('bg-gray-50')
      ? 'dark:bg-gray-950'
      : 'dark:bg-gray-900'

    return bodyTag.replace(
      classMatch[0],
      `${classMatch[1]}class="${[...keptClassNames, darkBackground].join(' ')}"`,
    )
  })

  // 4. Backdrops (bg-gray-900/50) stay dark instead of turning light.
  darkHtml = darkHtml.replaceAll('dark:bg-gray-50/50', 'dark:bg-black/60')

  // 5. Form controls without a background class render white, so give them a
  //    dark background and light text.
  darkHtml = darkHtml.replace(
    /<(input|textarea|select)\b([^>]*?)(\s*\/?)>/g,
    (controlTag, tagName, attributes, ending) => {
      if (/\stype="hidden"/.test(attributes)) {
        return controlTag
      }

      const classMatch = attributes.match(/(\s)class="([^"]*)"/)

      if (!classMatch) {
        return `<${tagName}${attributes} class="dark:bg-gray-900 dark:text-white"${ending}>`
      }

      const classAttribute = classMatch[2]

      if (/(^|\s)(bg-|sr-only)/.test(classAttribute)) {
        return controlTag
      }

      const textClass = /(^|\s)dark:text-/.test(classAttribute) ? '' : ' dark:text-white'

      return controlTag.replace(
        classMatch[0],
        `${classMatch[1]}class="${classAttribute} dark:bg-gray-900${textClass}"`,
      )
    },
  )

  // 6. Bright fills (amber, yellow and lime 300–400) keep their dark text.
  darkHtml = darkHtml.replace(
    /class="([^"]*\bbg-(?:amber|yellow|lime)-[34]00\b[^"]*)"/g,
    (_, classAttribute) => `class="${classAttribute.replace(/\s*dark:text-white\b/g, '')}"`,
  )

  // 7. Scripts: swap chart colours, and where a script toggles a colour class,
  //    toggle its dark pair too so selected states stay consistent.
  darkHtml = darkHtml.replace(/<script>([\s\S]*?)<\/script>/g, (_, scriptBody) => {
    let darkScriptBody = scriptBody

    for (const [lightColour, darkColour] of CHART_COLOUR_SWAPS) {
      darkScriptBody = darkScriptBody.replace(lightColour, darkColour)
    }

    darkScriptBody = darkScriptBody.replace(
      /^(\s*)(\S+)\.classList\.toggle\('([^']+)', ([^)]+)\)$/gm,
      (line, indent, target, className, condition) => {
        const darkClassName = transformClass(className, darkModeConfig)
          .split(' ')
          .find((token) => token.startsWith('dark:'))

        return darkClassName
          ? `${line}\n${indent}${target}.classList.toggle('${darkClassName}', ${condition})`
          : line
      },
    )

    return `<script>${darkScriptBody}</script>`
  })

  return darkHtml
}

async function main() {
  const commandLineArguments = process.argv.slice(2)
  const isCheck = commandLineArguments.includes('--check')
  const lightFilePaths = commandLineArguments.filter((argument) => !argument.startsWith('--'))

  if (lightFilePaths.length === 0) {
    console.error('Usage: pnpm dark <light.html>... [--check]')
    process.exit(1)
  }

  const darkModeConfig = normalizeConfig(JSON.parse(fs.readFileSync(configPath, 'utf8')))
  let mismatchCount = 0

  for (const lightFilePath of lightFilePaths) {
    if (!lightFilePath.endsWith('.html') || lightFilePath.endsWith('-dark.html')) {
      console.error(`Skipping ${lightFilePath}: pass the light .html file`)
      continue
    }

    const darkFilePath = lightFilePath.replace(/\.html$/, '-dark.html')
    const prettierConfig = await prettier.resolveConfig(darkFilePath)
    const darkHtml = await prettier.format(
      generateDarkHtml(fs.readFileSync(lightFilePath, 'utf8'), darkModeConfig),
      { ...prettierConfig, filepath: darkFilePath },
    )

    if (isCheck) {
      const existingDarkHtml = fs.existsSync(darkFilePath)
        ? fs.readFileSync(darkFilePath, 'utf8')
        : ''

      if (existingDarkHtml !== darkHtml) {
        mismatchCount += 1
        console.log(`differs: ${darkFilePath}`)
      }

      continue
    }

    fs.writeFileSync(darkFilePath, darkHtml)
    console.log(`wrote ${darkFilePath}`)
  }

  if (isCheck && mismatchCount > 0) {
    process.exit(1)
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main()
}
