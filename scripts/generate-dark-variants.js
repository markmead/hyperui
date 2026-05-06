#!/usr/bin/env node

/**
 * Dark Mode Variant Generator (CLI)
 *
 * Generates -dark.html versions of component HTML files by appending
 * Tailwind CSS dark: variant classes based on a predefined class map.
 *
 * Usage:
 *   pnpm dark:generate <component-folder>
 *
 * Example:
 *   pnpm dark:generate public/examples/application/accordions
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const DARK_CLASS_MAP = {
  // Backgrounds
  'bg-white': 'dark:bg-gray-900',
  'bg-gray-50': 'dark:bg-gray-800',
  'bg-gray-100': 'dark:bg-gray-800',
  'bg-gray-200': 'dark:bg-gray-700',
  'bg-gray-300': 'dark:bg-gray-600',

  // Text
  'text-gray-900': 'dark:text-white',
  'text-gray-800': 'dark:text-gray-100',
  'text-gray-700': 'dark:text-gray-200',
  'text-gray-600': 'dark:text-gray-300',
  'text-gray-500': 'dark:text-gray-400',
  'text-gray-400': 'dark:text-gray-500',

  // Borders
  'border-gray-100': 'dark:border-gray-800',
  'border-gray-200': 'dark:border-gray-700',
  'border-gray-300': 'dark:border-gray-600',

  // Divide
  'divide-gray-100': 'dark:divide-gray-800',
  'divide-gray-200': 'dark:divide-gray-700',
  'divide-gray-300': 'dark:divide-gray-600',

  // Ring offset
  'ring-offset-white': 'dark:ring-offset-gray-900',

  // Hover
  'hover:bg-white': 'dark:hover:bg-gray-900',
  'hover:bg-gray-50': 'dark:hover:bg-gray-800',
  'hover:bg-gray-100': 'dark:hover:bg-gray-700',
  'hover:text-gray-900': 'dark:hover:text-white',
  'hover:text-gray-700': 'dark:hover:text-gray-200',
  'hover:text-gray-500/75': 'dark:hover:text-white/75',
  'hover:border-gray-300': 'dark:hover:border-gray-600',

  // Focus
  'focus:ring-offset-white': 'dark:focus:ring-offset-gray-900',

  // Semantic colors
  'bg-green-100': 'dark:bg-green-700',
  'text-green-600': 'dark:text-green-50',
  'bg-red-100': 'dark:bg-red-700',
  'text-red-600': 'dark:text-red-50',
  'bg-blue-100': 'dark:bg-blue-700',
  'text-blue-600': 'dark:text-blue-50',
  'bg-purple-100': 'dark:bg-purple-700',
  'text-purple-700': 'dark:text-purple-100',
  'bg-amber-100': 'dark:bg-amber-700',
  'text-amber-600': 'dark:text-amber-50',
  'bg-teal-100': 'dark:bg-teal-700',
  'text-teal-600': 'dark:text-teal-300',
}

function toDarkTheme(html) {
  return html.replace(/class="([^"]*)"/g, (match, classes) => {
    const tokens = classes.trim().split(/\s+/)
    const existingSet = new Set(tokens)
    const toAdd = []

    for (const token of tokens) {
      const darkClass = DARK_CLASS_MAP[token]

      if (darkClass && !existingSet.has(darkClass)) {
        toAdd.push(darkClass)
        existingSet.add(darkClass)
      }
    }

    if (toAdd.length === 0) return match

    return `class="${[...tokens, ...toAdd].join(' ')}"`
  })
}

function main() {
  const [, , folderArg] = process.argv

  if (!folderArg) {
    console.error('Usage: pnpm dark:generate <component-folder>')
    console.error('Example: pnpm dark:generate public/examples/application/accordions')
    process.exit(1)
  }

  const folder = resolve(folderArg)

  if (!existsSync(folder)) {
    console.error(`Folder not found: ${folder}`)
    process.exit(1)
  }

  const stat = statSync(folder)

  if (!stat.isDirectory()) {
    console.error(`Not a directory: ${folder}`)
    process.exit(1)
  }

  const files = readdirSync(folder).filter(
    (f) => f.endsWith('.html') && !f.endsWith('-dark.html'),
  )

  if (files.length === 0) {
    console.log('No HTML files found to process.')
    return
  }

  console.log(`Found ${files.length} HTML file(s) to process in ${folder}\n`)

  let created = 0
  let skipped = 0

  for (const file of files) {
    const filePath = join(folder, file)
    const darkFilePath = join(folder, file.replace('.html', '-dark.html'))

    if (existsSync(darkFilePath)) {
      console.log(`⏭  Skipping ${file} — dark variant already exists`)
      skipped++
      continue
    }

    try {
      const html = readFileSync(filePath, 'utf8')
      const darkHtml = toDarkTheme(html)

      writeFileSync(darkFilePath, darkHtml, 'utf8')

      console.log(`✓  Generated ${file.replace('.html', '-dark.html')}`)
      created++
    } catch (err) {
      console.error(`✗  Error processing ${file}: ${err.message}`)
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}`)
}

main()

