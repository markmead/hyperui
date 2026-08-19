#!/usr/bin/env node

import { fileURLToPath } from 'node:url'

import fs from 'node:fs'
import path from 'node:path'

import { transformHtmlString } from '../src/lib/dark-mode/transform-html.js'
import { DEFAULT_CONFIG } from '../src/lib/dark-mode/config.js'

const scriptFilePath = fileURLToPath(import.meta.url)
const repositoryRootPath = path.resolve(path.dirname(scriptFilePath), '..')
const examplesRootPath = path.join(repositoryRootPath, 'public/examples')

const componentCategories = ['application', 'marketing', 'neobrutalism', 'templates']

function findComponentSlugFolders(categoryPath) {
  return fs
    .readdirSync(categoryPath)
    .filter((entryName) => fs.statSync(path.join(categoryPath, entryName)).isDirectory())
}

function findMissingDarkVariantsInFolder(categoryName, componentSlug, componentFolderPath) {
  const htmlFileNames = fs
    .readdirSync(componentFolderPath)
    .filter((fileName) => fileName.endsWith('.html'))

  const darkFileNameSet = new Set(
    htmlFileNames.filter((fileName) => fileName.endsWith('-dark.html')),
  )
  const lightFileNames = htmlFileNames.filter((fileName) => !fileName.endsWith('-dark.html'))

  return lightFileNames
    .map((lightFileName) => lightFileName.replace(/\.html$/, '-dark.html'))
    .filter((darkFileName) => !darkFileNameSet.has(darkFileName))
    .map((darkFileName) => {
      const lightFileName = darkFileName.replace(/-dark\.html$/, '.html')

      return {
        categoryName,
        componentSlug,
        lightFilePath: path.join(componentFolderPath, lightFileName),
        darkFilePath: path.join(componentFolderPath, darkFileName),
      }
    })
}

function findMissingDarkVariants() {
  const missingDarkVariants = []

  for (const categoryName of componentCategories) {
    const categoryPath = path.join(examplesRootPath, categoryName)

    if (!fs.existsSync(categoryPath)) {
      continue
    }

    for (const componentSlug of findComponentSlugFolders(categoryPath)) {
      const componentFolderPath = path.join(categoryPath, componentSlug)

      missingDarkVariants.push(
        ...findMissingDarkVariantsInFolder(categoryName, componentSlug, componentFolderPath),
      )
    }
  }

  return missingDarkVariants
}

function generateDarkVariants() {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Error: This script is blocked in production.')

    process.exit(1)
  }

  const missingDarkVariants = findMissingDarkVariants()

  if (missingDarkVariants.length === 0) {
    console.log('✅ Every component already has a dark variant')

    return
  }

  console.log(`🔍 Found ${missingDarkVariants.length} file(s) without a dark variant\n`)

  const touchedComponentKeys = new Set()

  for (const missingVariant of missingDarkVariants) {
    const lightHtmlContent = fs.readFileSync(missingVariant.lightFilePath, 'utf8')
    const darkHtmlContent = transformHtmlString(lightHtmlContent, DEFAULT_CONFIG)

    fs.writeFileSync(missingVariant.darkFilePath, darkHtmlContent, 'utf8')

    const relativeDarkFilePath = path.relative(repositoryRootPath, missingVariant.darkFilePath)

    console.log(`✨ Created: ${relativeDarkFilePath}`)

    touchedComponentKeys.add(`${missingVariant.categoryName}/${missingVariant.componentSlug}`)
  }

  console.log(`\n✅ Generated ${missingDarkVariants.length} dark variant(s)`)
  console.log('👋 These are drafts — review each rendering, then for every touched component')
  console.log('   add `dark: true` to the matching entry in its .mdx `components` array:\n')

  for (const touchedComponentKey of [...touchedComponentKeys].sort()) {
    console.log(`   - src/content/collection/${touchedComponentKey}.mdx`)
  }
}

generateDarkVariants()
