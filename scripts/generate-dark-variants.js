#!/usr/bin/env node

/**
 * Dark Mode Variant Generator (CLI)
 *
 * Generates -dark.html versions of component HTML files by adding
 * Tailwind CSS dark: variant classes based on a shade/color map.
 *
 * Usage:
 *   pnpm dark:generate <component-folder>
 *
 * Example:
 *   pnpm dark:generate public/examples/application/accordions
 */

import fs from 'fs'
import path from 'path'

/**
 * Maps a shade number to its dark-mode equivalent.
 * 900 is intentionally excluded — it is handled separately for gray via
 * the gray-900 → white special case; for all other color families a -900
 * shade is already dark enough and does not need a dark: counterpart.
 */
const SHADE_MAP = {
  50: 800,
  100: 800,
  200: 700,
  300: 600,
  400: 500,
  500: 400,
  600: 300,
  700: 200,
  800: 100,
}

/** Maps specific standalone color tokens to their dark-mode equivalents. */
const COLOR_MAP = {
  white: 'gray-900',
  'white/': 'gray-900/',
  black: 'white',
  'black/': 'white/',
}

/** All Tailwind CSS color families. */
const COLOR_FAMILIES = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
]

/**
 * Variant prefixes that should be stripped before colour matching so the
 * resulting dark: class is re-prefixed correctly.
 * `dark` is included to prevent `dark:dark:` double-prefixing, though
 * `transformClassAttribute` already skips classes that start with `dark:`.
 */
const VARIANT_PREFIXES = [
  'hover',
  'focus',
  'active',
  'disabled',
  'group-hover',
  'group-focus',
  'group',
  'peer-hover',
  'peer-focus',
  'peer-checked',
  'checked',
  'has-checked',
  'before',
  'after',
  'placeholder',
  'ltr',
  'rtl',
  'dark',
]

/**
 * Returns the dark-mode equivalent of a single Tailwind class, or the
 * original class unchanged if no mapping is found.
 */
function transformClass(className) {
  const variantMatch = className.match(/^([\w-]*?):(.+)$/)

  let variantPrefix = ''
  let classWithoutVariant = className

  if (variantMatch) {
    const potentialVariant = variantMatch[1]

    if (VARIANT_PREFIXES.includes(potentialVariant)) {
      variantPrefix = `${potentialVariant}:`
      classWithoutVariant = variantMatch[2]
    }
  }

  // gray-900 maps to white (e.g. text-gray-900 → dark:text-white)
  const gray900Match = classWithoutVariant.match(/^(.*?)(gray-900)(\/\d+)?$/)

  if (gray900Match) {
    const [, grayPrefix, , graySuffix = ''] = gray900Match

    return `${className} dark:${variantPrefix}${grayPrefix}white${graySuffix}`
  }

  // white / black tokens (e.g. bg-white → dark:bg-gray-900)
  for (const [lightColor, darkColor] of Object.entries(COLOR_MAP)) {
    if (classWithoutVariant.includes(lightColor)) {
      const colorMatch = classWithoutVariant.match(/^([\w-]*)(white|black)(.*?)$/)

      if (colorMatch) {
        const [, colorPrefix, , colorSuffix] = colorMatch
        const darkClass = `${colorPrefix}${darkColor}${colorSuffix}`

        return `${className} dark:${variantPrefix}${darkClass}`
      }
    }
  }

  // All named colour families with numeric shades (e.g. bg-blue-100 → dark:bg-blue-800)
  for (const colorFamily of COLOR_FAMILIES) {
    const colorRegex = new RegExp(`^([\\w-]*?)${colorFamily}-(\\d+)(.*?)$`)
    const colorMatch = classWithoutVariant.match(colorRegex)

    if (colorMatch) {
      const [, colorPrefix, colorShade, colorSuffix] = colorMatch
      const shadeNum = parseInt(colorShade, 10)

      if (shadeNum in SHADE_MAP) {
        const darkShade = SHADE_MAP[shadeNum]
        const darkClass = `${colorPrefix}${colorFamily}-${darkShade}${colorSuffix}`

        return `${className} dark:${variantPrefix}${darkClass}`
      }
    }
  }

  return className
}

/** Transforms all Tailwind classes in a class attribute string. */
function transformClassAttribute(classAttr) {
  if (!classAttr) return classAttr

  return classAttr
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => (className.startsWith('dark:') ? className : transformClass(className)))
    .join(' ')
}

/** Transforms all class="..." attributes in an HTML string. */
function toDarkTheme(htmlContent) {
  return htmlContent.replace(/class="([^"]*)"/g, (_, classAttr) => {
    return `class="${transformClassAttribute(classAttr)}"`
  })
}

function isPathWithinBounds(targetPath, allowedParent) {
  const normalizedTarget = path.normalize(path.resolve(targetPath))
  const normalizedParent = path.normalize(path.resolve(allowedParent))

  return (
    normalizedTarget.startsWith(normalizedParent + path.sep) ||
    normalizedTarget === normalizedParent
  )
}

function validateComponentPath(folderPath) {
  const absolutePath = path.resolve(folderPath)
  const projectRoot = process.cwd()
  const allowedComponentPath = path.join(projectRoot, 'public', 'examples')

  if (!isPathWithinBounds(absolutePath, allowedComponentPath)) {
    console.error(`❌ Error: Component path must be within "${allowedComponentPath}"`)
    console.error(`🙅 Provided path: ${absolutePath}`)

    process.exit(1)
  }

  return absolutePath
}

function processFolder() {
  const folderPath = process.argv[2]

  if (!folderPath) {
    console.error('❌ Error: Please provide a folder path')
    console.error('Usage: pnpm dark:generate public/examples/<category>/<component>')

    process.exit(1)
  }

  const absolutePath = validateComponentPath(folderPath)

  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Error: Folder not found: ${absolutePath}`)

    process.exit(1)
  }

  if (!fs.statSync(absolutePath).isDirectory()) {
    console.error(`❌ Error: Path is not a directory: ${absolutePath}`)

    process.exit(1)
  }

  const htmlFiles = fs.readdirSync(absolutePath).filter((file) => file.endsWith('.html'))
  const lightFiles = htmlFiles.filter((file) => !file.includes('-dark'))
  const darkFiles = new Set(htmlFiles.filter((file) => file.includes('-dark')))

  const filesToProcess = lightFiles.filter(
    (htmlFile) => !darkFiles.has(htmlFile.replace('.html', '-dark.html')),
  )

  if (filesToProcess.length === 0) {
    console.log('✅ No files need dark variants in this folder')

    return
  }

  console.log(`📁 Processing folder: ${absolutePath}`)
  console.log(`🔍 Found ${filesToProcess.length} file(s) without dark variants\n`)

  let created = 0

  for (const processFile of filesToProcess) {
    const lightPath = path.join(absolutePath, processFile)
    const darkPath = path.join(absolutePath, processFile.replace('.html', '-dark.html'))

    try {
      const lightContent = fs.readFileSync(lightPath, 'utf-8')
      const darkContent = toDarkTheme(lightContent)

      fs.writeFileSync(darkPath, darkContent, 'utf-8')

      console.log(`✨ Created: ${processFile.replace('.html', '-dark.html')}`)

      created++
    } catch {
      console.error(`❌ Error processing ${processFile}`)
    }
  }

  console.log('')
  console.log(`✅ Done! Generated ${created} dark variant(s)`)
  console.log('👋 Remember to manually update the related .mdx file with dark: true if needed')
}

processFolder()

