#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'

const SHADE_MAP: Record<number, number | 'white'> = {
  50: 800,
  100: 800,
  200: 700,
  300: 600,
  400: 500,
  500: 400,
  600: 300,
  700: 200,
  800: 100,
  900: 'white',
}

const COLOR_MAP: Record<string, string> = {
  white: 'gray-900',
  'white/': 'gray-900/',
  black: 'white',
  'black/': 'white/',
}

const COLOR_FAMILIES: string[] = [
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

const VARIANT_PREFIXES: string[] = [
  'hover',
  'active',
  'disabled',
  'group-hover',
  'group',
  'peer-hover',
]

function transformClass(className: string): string {
  const variantMatch = className.match(/^([\w-]*?):(.+)$/)

  let variantPrefix = ''
  let classWithoutVariant = className

  if (variantMatch) {
    const potentialVariant = variantMatch[1] ?? ''

    if (VARIANT_PREFIXES.includes(potentialVariant)) {
      variantPrefix = `${potentialVariant}:`
      classWithoutVariant = variantMatch[2] ?? className
    }
  }

  const gray900Match = classWithoutVariant.match(/^(.*?)(gray-900)(\/\d+)?$/)

  if (gray900Match) {
    const grayPrefix = gray900Match[1] ?? ''
    const graySuffix = gray900Match[3] ?? ''

    return `${className} dark:${variantPrefix}${grayPrefix}white${graySuffix}`
  }

  for (const [lightColor, darkColor] of Object.entries(COLOR_MAP)) {
    if (classWithoutVariant.includes(lightColor)) {
      const colorMatch = classWithoutVariant.match(/^((?:[\w]+-)*)(white|black)(\/\d+)?$/)

      if (colorMatch) {
        const colorPrefix = colorMatch[1] ?? ''
        const colorSuffix = colorMatch[3] ?? ''
        const darkClass = `${colorPrefix}${darkColor}${colorSuffix}`

        return `${className} dark:${variantPrefix}${darkClass}`
      }
    }
  }

  for (const colorFamily of COLOR_FAMILIES) {
    const colorRegex = new RegExp(`^([\\w-]*?)${colorFamily}-(\\d+)(.*?)$`)
    const colorMatch = classWithoutVariant.match(colorRegex)

    if (colorMatch) {
      const colorPrefix = colorMatch[1] ?? ''
      const colorShade = colorMatch[2] ?? '0'
      const colorSuffix = colorMatch[3] ?? ''
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

function transformClassAttribute(classAttr: string): string {
  if (!classAttr) return classAttr

  return classAttr
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => (className.includes('dark:') ? className : transformClass(className)))
    .join(' ')
}

function transformHtmlContent(htmlContent: string): string {
  return htmlContent.replace(/class="([^"]*)"/g, (_, classAttr: string) => {
    const transformedClass = transformClassAttribute(classAttr)

    return `class="${transformedClass}"`
  })
}

function isPathWithinBounds(targetPath: string, allowedParent: string): boolean {
  const normalizedTarget = path.normalize(path.resolve(targetPath))
  const normalizedParent = path.normalize(path.resolve(allowedParent))

  return (
    normalizedTarget.startsWith(normalizedParent + path.sep) ||
    normalizedTarget === normalizedParent
  )
}

function validateComponentPath(folderPath: string): string {
  const absolutePath = path.resolve(folderPath)
  const projectRoot = process.cwd()
  const allowedComponentPath = path.join(projectRoot, 'public', 'examples')

  if (!isPathWithinBounds(absolutePath, allowedComponentPath)) {
    console.error(`❌ Error: Component path must be within "${allowedComponentPath}"`)
    console.error(`🙅‍♀️ Provided path: ${absolutePath}`)

    process.exit(1)
  }

  return absolutePath
}

function processFolder(): void {
  const folderPath = process.argv[2]

  if (!folderPath) {
    console.error('❌ Error: Please provide a folder path')
    console.error('Usage: pnpm dark:generate public/examples/<category>/<component-folder>')

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
    (htmlFile) => !darkFiles.has(htmlFile.replace('.html', '-dark.html'))
  )

  if (filesToProcess.length === 0) {
    console.log('✅ No files need dark variants in this folder')

    return
  }

  console.log(`📁 Processing folder: ${absolutePath}`)
  console.log(`🔍 Found ${filesToProcess.length} file(s) without dark variants\n`)

  let generatedCount = 0

  for (const processFile of filesToProcess) {
    const lightPath = path.join(absolutePath, processFile)
    const darkPath = path.join(absolutePath, processFile.replace('.html', '-dark.html'))

    try {
      const lightContent = fs.readFileSync(lightPath, 'utf-8')
      const darkContent = transformHtmlContent(lightContent)

      fs.writeFileSync(darkPath, darkContent, 'utf-8')

      console.log(`✨ Created: ${processFile.replace('.html', '-dark.html')}`)

      generatedCount++
    } catch (error) {
      console.error(`❌ Error processing ${processFile}: ${error}`)
    }
  }

  console.log('')
  console.log(`✅ Done! Generated ${generatedCount} dark variant(s)`)
  console.log('👋 Remember to manually update the related .mdx file with dark: true if needed')
}

processFolder()
