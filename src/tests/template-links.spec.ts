import fs from 'node:fs'
import path from 'node:path'

import { test, expect } from './fixtures'

import { componentIndex } from '../../scripts/lib/component-ids.js'
import { findDrift, readLinks } from '../../scripts/lib/template-links.js'

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

    for (const link of readLinks()) {
      expect(index.get(link.template), `${link.templateName} is a template`).toMatch(/^templates\//)
      expect(index.get(link.component), `${link.componentName} is a component`).not.toMatch(
        /^templates\//,
      )
      expect(['uses', 'feeds']).toContain(link.direction)
    }
  })

  test('links are not repeated', () => {
    const keys = readLinks().map((link) => `${link.template}:${link.component}`)

    expect(new Set(keys).size).toBe(keys.length)
  })
})
