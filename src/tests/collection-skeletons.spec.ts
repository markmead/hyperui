import fs from 'node:fs'
import path from 'node:path'

import { test, expect } from './fixtures'

import { SKELETONS, SKELETON_BY_SLUG } from '../lib/skeletons'

const collectionsPath = path.resolve(import.meta.dirname, '../content/collection')

// Templates show a screenshot instead.
const categories = ['application', 'marketing', 'neobrutalism']

test.describe('Collection skeletons', () => {
  test('every collection has a skeleton', () => {
    const missing = categories.flatMap((category) =>
      fs
        .readdirSync(path.join(collectionsPath, category))
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx$/, ''))
        .filter((slug) => !SKELETON_BY_SLUG[slug]),
    )

    expect(missing, 'Add these slugs to SKELETON_BY_SLUG in src/lib/skeletons.ts').toEqual([])
  })

  test('every mapping points at a drawing', () => {
    for (const name of Object.values(SKELETON_BY_SLUG)) {
      expect(SKELETONS[name].length).toBeGreaterThan(0)
    }
  })

  test('drawings stay inside the canvas', () => {
    for (const [name, shapes] of Object.entries(SKELETONS)) {
      for (const shape of shapes) {
        const left = shape.kind === 'rect' ? shape.x : shape.x - shape.r
        const top = shape.kind === 'rect' ? shape.y : shape.y - shape.r
        const right = shape.kind === 'rect' ? shape.x + shape.w : shape.x + shape.r
        const bottom = shape.kind === 'rect' ? shape.y + shape.h : shape.y + shape.r

        expect(left, `${name} starts left of the canvas`).toBeGreaterThanOrEqual(0)
        expect(top, `${name} starts above the canvas`).toBeGreaterThanOrEqual(0)
        expect(right, `${name} ends right of the canvas`).toBeLessThanOrEqual(320)
        expect(bottom, `${name} ends below the canvas`).toBeLessThanOrEqual(128)
      }
    }
  })

  test('collection cards show a hidden skeleton', async ({ page }) => {
    await page.goto('/components/marketing')

    const cards = page.locator('main ul li a')
    const skeletons = page.locator('main ul li a svg[data-skeleton]')

    await expect(skeletons).toHaveCount(await cards.count())
  })

  test('template cards keep their screenshot', async ({ page }) => {
    await page.goto('/components/templates')

    await expect(page.locator('main ul li a img').first()).toBeVisible()
    await expect(page.locator('main ul li a svg[data-skeleton]')).toHaveCount(0)
  })
})
