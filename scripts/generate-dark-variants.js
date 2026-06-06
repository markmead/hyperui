#!/usr/bin/env node

import { fileURLToPath } from 'url'

import fs from 'fs'
import path from 'path'

import { DEFAULT_CONFIG } from '../src/lib/dark-mode/config.js'
import { transformHtmlString } from '../src/lib/dark-mode/transform-html.js'

function getProjectRoot() {
  const scriptFilePath = fileURLToPath(import.meta.url)

  return path.resolve(path.dirname(scriptFilePath), '..')
}

function isPathWithinBounds(targetPath, allowedParent) {
  const normalizedTarget = path.normalize(path.resolve(targetPath))
  const normalizedParent = path.normalize(path.resolve(allowedParent))

  return (
    normalizedTarget.startsWith(normalizedParent + path.sep) ||
    normalizedTarget === normalizedParent
  )
}

function getDisplayPath(targetPath, projectRoot) {
  const relativePath = path.relative(projectRoot, targetPath)

  if (!relativePath || relativePath === '') {
    return '.'
  }

  return relativePath.startsWith('..') ? path.basename(targetPath) : relativePath
}

function validateComponentPath(folderPath, projectRoot) {
  const absolutePath = path.resolve(projectRoot, folderPath)
  const allowedComponentPath = path.join(projectRoot, 'public', 'examples')
  const allowedComponentDisplayPath = getDisplayPath(allowedComponentPath, projectRoot)
  const providedDisplayPath = getDisplayPath(absolutePath, projectRoot)

  if (!isPathWithinBounds(absolutePath, allowedComponentPath)) {
    console.error(`❌ Error: Component path must be within "${allowedComponentDisplayPath}"`)
    console.error(`🙅‍♀️ Provided path: ${providedDisplayPath}`)

    process.exit(1)
  }

  if (fs.existsSync(absolutePath)) {
    const realAbsolutePath = fs.realpathSync.native(absolutePath)
    const realAllowedComponentPath = fs.realpathSync.native(allowedComponentPath)

    if (!isPathWithinBounds(realAbsolutePath, realAllowedComponentPath)) {
      console.error(`❌ Error: Component path must be within "${allowedComponentDisplayPath}"`)
      console.error(`🙅‍♀️ Provided path: ${providedDisplayPath}`)

      process.exit(1)
    }
  }

  return absolutePath
}

function processFolder() {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Error: This script is blocked in production.')

    process.exit(1)
  }

  const folderPath = process.argv[2]

  if (!folderPath) {
    console.error('❌ Error: Please provide a folder path')
    console.error(
      'Usage: pnpm generate:dark-variants public/examples/<category>/<component-folder>',
    )

    process.exit(1)
  }

  const projectRoot = getProjectRoot()
  const absolutePath = validateComponentPath(folderPath, projectRoot)
  const displayPath = getDisplayPath(absolutePath, projectRoot)

  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Error: Folder not found: ${displayPath}`)

    process.exit(1)
  }

  if (!fs.statSync(absolutePath).isDirectory()) {
    console.error(`❌ Error: Path is not a directory: ${displayPath}`)

    process.exit(1)
  }

  const htmlFiles = fs.readdirSync(absolutePath).filter((htmlFile) => htmlFile.endsWith('.html'))
  const lightFiles = htmlFiles.filter((htmlFile) => !htmlFile.includes('-dark'))
  const darkFiles = new Set(htmlFiles.filter((htmlFile) => htmlFile.includes('-dark')))

  const filesToProcess = lightFiles.filter(
    (htmlFile) => !darkFiles.has(htmlFile.replace('.html', '-dark.html')),
  )

  if (filesToProcess.length === 0) {
    console.log('✅ No files need dark variants in this folder')

    return
  }

  console.log(`📁 Processing folder: ${displayPath}`)
  console.log(`🔍 Found ${filesToProcess.length} file(s) without dark variants\n`)

  let generatedCount = 0
  let failedCount = 0

  for (const processFile of filesToProcess) {
    const lightPath = path.join(absolutePath, processFile)
    const darkPath = path.join(absolutePath, processFile.replace('.html', '-dark.html'))

    try {
      const lightContent = fs.readFileSync(lightPath, 'utf-8')
      const darkContent = transformHtmlString(lightContent, DEFAULT_CONFIG)

      fs.writeFileSync(darkPath, darkContent, 'utf-8')

      console.log(`✨ Created: ${processFile.replace('.html', '-dark.html')}`)

      generatedCount++
    } catch (processError) {
      console.error(`❌ Error processing ${processFile}: ${processError}`)

      failedCount++
    }
  }

  if (failedCount > 0) {
    console.log(
      `⚠️ Done with errors. Generated ${generatedCount} dark variant(s), failed ${failedCount}`,
    )

    process.exitCode = 1
  } else {
    console.log(`✅ Done! Generated ${generatedCount} dark variant(s)`)
  }

  console.log('👋 Remember to manually update the related .mdx file with dark: true if needed')
}

processFolder()
