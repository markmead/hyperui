#!/usr/bin/env node
/* eslint-disable no-undef */

import fs from 'fs'
import path from 'path'

const SHADE_MAP = {
  50: 900,
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

const COLOR_MAP = {
  white: 'gray-900',
  'white/': 'gray-900/',
  black: 'white',
  'black/': 'white/',
}

const COLOR_FAMILIES = [
  'amber',
  'cyan',
  'emerald',
  'fuchsia',
  'gray',
  'green',
  'indigo',
  'lime',
  'neutral',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'sky',
  'slate',
  'stone',
  'teal',
  'violet',
  'yellow',
  'zinc',
]

function transformClass(className) {
  const gray900Match = className.match(/^(.*?)(gray-900)(\/\d+)?$/)

  if (gray900Match) {
    const [, grayPrefix, , graySuffix = ''] = gray900Match

    return `${className} dark:${grayPrefix}white${graySuffix}`
  }

  for (const [lightColor, darkColor] of Object.entries(COLOR_MAP)) {
    if (className.includes(lightColor)) {
      const colorMatch = className.match(/^([\w-]*)(white|black)(.*?)$/)

      if (colorMatch) {
        const [, colorPrefix, , colorSuffix] = colorMatch
        const darkClass = `${colorPrefix}${darkColor}${colorSuffix}`

        return `${className} dark:${darkClass}`
      }
    }
  }

  for (const colorFamily of COLOR_FAMILIES) {
    const colorRegex = new RegExp(`^([\\w-]*?)${colorFamily}-(\\d{1,3})(.*?)$`)
    const colorMatch = className.match(colorRegex)

    if (colorMatch) {
      const [, colorPrefix, colorShade, colorSuffix] = colorMatch

      const shadeNum = parseInt(colorShade, 10)

      if (shadeNum in SHADE_MAP) {
        const darkShade = SHADE_MAP[shadeNum]
        const darkClass = `${colorPrefix}${colorFamily}-${darkShade}${colorSuffix}`

        return `${className} dark:${darkClass}`
      }
    }
  }

  return className
}

function transformClassAttribute(classAttr) {
  if (!classAttr) return classAttr

  return classAttr
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => (className.startsWith('dark:') ? className : transformClass(className)))
    .join(' ')
}

function transformHtmlContent(htmlContent) {
  return htmlContent.replace(/class="([^"]*)"/g, (_, classAttr) => {
    const transformedClass = transformClassAttribute(classAttr)

    return `class="${transformedClass}"`
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
  const allowedComponentPath = path.join(projectRoot, 'public', 'components')

  if (!isPathWithinBounds(absolutePath, allowedComponentPath)) {
    console.error(`❌ Error: Component path must be within "${allowedComponentPath}"`)
    console.error(`🙅‍♀️ Provided path: ${absolutePath}`)

    process.exit(1)
  }

  return absolutePath
}

function processFolder() {
  const folderPath = process.argv[2]

  if (!folderPath) {
    console.error('❌ Error: Please provide a folder path')
    console.error('Usage: yarn dark:generate /path/to/component/folder')

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

  const processedFiles = []

  for (const processFile of filesToProcess) {
    const lightPath = path.join(absolutePath, processFile)
    const darkPath = path.join(absolutePath, processFile.replace('.html', '-dark.html'))

    try {
      const lightContent = fs.readFileSync(lightPath, 'utf-8')
      const darkContent = transformHtmlContent(lightContent)

      fs.writeFileSync(darkPath, darkContent, 'utf-8')

      console.log(`✨ Created: ${processFile.replace('.html', '-dark.html')}`)

      processedFiles.push(processFile.replace('.html', '-dark.html'))
    } catch {
      console.error(`❌ Error processing ${processFile}`)
    }
  }

  console.log('')

  console.log(`✅ Done! Generated ${filesToProcess.length} dark variant(s)`)
  console.log('👋 Remember to manually update the related .mdx file with dark: true if needed')
}

processFolder()
