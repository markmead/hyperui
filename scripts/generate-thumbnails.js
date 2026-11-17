#!/usr/bin/env node

/**
 * Screenshot each template's first example for the cards on the homepage and
 * /components/templates.
 *
 *   pnpm dev                 # in another terminal
 *   pnpm thumbnails          # every template
 *   pnpm thumbnails storefront portfolio
 *
 * Writes public/thumbnails/templates/{slug}.jpg. Re-run it after changing a
 * template's 1.html, and wait for its images to load before committing.
 *
 * Pass --allow-broken-images to save a thumbnail even when an image fails to
 * load, for example where the network blocks the template's photos.
 *
 * Set BASE_URL to use a server other than http://localhost:4321.
 * Set CHROMIUM_PATH to use a Chromium other than Playwright's own.
 */

import fs from 'node:fs'
import path from 'node:path'

import { chromium } from '@playwright/test'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4321'
const EXAMPLES_DIR = 'public/examples/templates'
const OUTPUT_DIR = 'public/thumbnails/templates'

const args = process.argv.slice(2)
const allowBrokenImages = args.includes('--allow-broken-images')
const requested = args.filter((arg) => !arg.startsWith('--'))
const slugs = requested.length > 0 ? requested : fs.readdirSync(EXAMPLES_DIR).sort()

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

let failed = false

for (const slug of slugs) {
  if (!fs.existsSync(path.join(EXAMPLES_DIR, slug, '1.html'))) {
    console.error(`✗ ${slug}: no ${EXAMPLES_DIR}/${slug}/1.html`)
    failed = true
    continue
  }

  await page.goto(`${BASE_URL}/examples/templates/${slug}/1.html`, { waitUntil: 'networkidle' })

  const brokenImages = await page.evaluate(
    () =>
      [...globalThis.document.images].filter((img) => img.complete && img.naturalWidth === 0)
        .length,
  )

  if (brokenImages > 0 && !allowBrokenImages) {
    console.error(`✗ ${slug}: ${brokenImages} image(s) didn't load, so no thumbnail was written`)
    failed = true
    continue
  }

  const file = path.join(OUTPUT_DIR, `${slug}.jpg`)

  await page.screenshot({ path: file, type: 'jpeg', quality: 70 })

  console.log(`✓ ${file}`)
}

await browser.close()

process.exitCode = failed ? 1 : 0
