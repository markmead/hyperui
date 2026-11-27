import fs from 'node:fs'
import path from 'node:path'

import { test, expect } from './fixtures'

import { componentIndex } from '../../scripts/lib/component-ids.js'
import {
  TARGET_COVERAGE,
  coverageReport,
  findDrift,
  percent,
  readLinks,
} from '../../scripts/lib/template-links.js'

const examplesPath = path.resolve(import.meta.dirname, '../../public/examples')

const exampleCount = () =>
  fs
    .readdirSync(examplesPath)
    .flatMap((category) =>
      fs
        .readdirSync(path.join(examplesPath, category))
        .flatMap((slug) => fs.readdirSync(path.join(examplesPath, category, slug))),
    )
    .filter((file) => /^\d+\.html$/.test(file)).length

test.describe('Component ids', () => {
  test('every component has a unique uuid', () => {
    // One uuid per example file. A shortfall means a component is missing a
    // uuid or two share one.
    expect(componentIndex().size, 'Run pnpm component:ids').toBe(exampleCount())
  })
})

test.describe('Template links', () => {
  test('templates and components are in step', () => {
    expect(findDrift(), 'Templates are built from components. See Templates in CLAUDE.md.').toEqual(
      [],
    )
  })

  test('every link joins a template to a component', () => {
    const index = componentIndex()

    for (const link of readLinks().links) {
      expect(index.get(link.template), `${link.templateName} is a template`).toMatch(/^templates\//)
      expect(index.get(link.component), `${link.componentName} is a component`).not.toMatch(
        /^templates\//,
      )
      expect(['existing', 'template']).toContain(link.origin)
    }
  })

  test('links are not repeated', () => {
    const keys = readLinks().links.map((link) => `${link.template}:${link.component}`)

    expect(new Set(keys).size).toBe(keys.length)
  })

  test('every template page has a coverage floor', () => {
    const { coverage } = readLinks()

    for (const page of coverageReport()) {
      expect(coverage[page.uuid], `${page.name} has no entry in coverage`).toBeDefined()
    }
  })

  test('how much of each template is built from components', () => {
    // Not a failure yet: the floors stop it falling, and this shows the gap.
    const below = coverageReport()
      .filter((page) => page.coverage < TARGET_COVERAGE)
      .map((page) => `${percent(page.coverage)} ${page.name}`)

    test.info().annotations.push({
      type: 'below the target',
      description: `${below.length} templates: ${below.join(', ')}`,
    })
  })
})
