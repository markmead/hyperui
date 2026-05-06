#!/usr/bin/env node

/**
 * Dark Mode Variant Generator (CLI)
 *
 * Generates -dark.html versions of component HTML files by adding
 * Tailwind CSS dark: variant classes using the OpenAI API.
 *
 * Usage:
 *   pnpm dark:generate <component-folder>
 *
 * Example:
 *   pnpm dark:generate public/examples/application/accordions
 *
 * Requirements:
 *   OPENAI_API_KEY environment variable must be set.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const SYSTEM_PROMPT = `You are a Tailwind CSS dark mode expert. Add dark: variant classes to an HTML file that uses Tailwind CSS.

Rules:
1. Keep the HTML structure EXACTLY the same — only modify class attributes.
2. Append dark: variant classes to existing class strings where appropriate.
3. Do not add dark: classes that are already present.
4. Return ONLY the modified HTML — no markdown fences, no explanations.
5. The <html> element already has class="dark" to enable Tailwind dark mode.

Common transformations:
- bg-white            → add dark:bg-gray-900
- bg-gray-50          → add dark:bg-gray-800
- bg-gray-100         → add dark:bg-gray-800
- bg-gray-200         → add dark:bg-gray-700
- text-gray-900       → add dark:text-white
- text-gray-800       → add dark:text-gray-100
- text-gray-700       → add dark:text-gray-200
- text-gray-600       → add dark:text-gray-300
- text-gray-500       → add dark:text-gray-400
- border-gray-100     → add dark:border-gray-800
- border-gray-200     → add dark:border-gray-700
- hover:bg-gray-50    → add dark:hover:bg-gray-800
- hover:bg-gray-100   → add dark:hover:bg-gray-700
- ring-gray-200       → add dark:ring-gray-700`

async function generateDark(html) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY environment variable is required.\n' +
        'Set it with: export OPENAI_API_KEY=your-key',
    )
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: html },
      ],
      temperature: 0.1,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error (${response.status}): ${error}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('Empty response from OpenAI API')
  }

  return content.trim()
}

async function main() {
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

    process.stdout.write(`⚙  Generating dark variant for ${file}...`)

    try {
      const html = readFileSync(filePath, 'utf8')
      const darkHtml = await generateDark(html)

      writeFileSync(darkFilePath, darkHtml + '\n', 'utf8')

      process.stdout.write(' ✓\n')
      created++
    } catch (err) {
      process.stdout.write(' ✗\n')
      console.error(`   Error: ${err.message}`)
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
