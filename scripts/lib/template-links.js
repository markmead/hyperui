import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { componentIndex } from './component-ids.js'

/**
 * Templates are built from components, and new templates feed components.
 *
 * `src/data/template-links.json` lists, for every template page, all of the
 * components it is built from. A component is identified by its uuid (see
 * `pnpm component:ids`), so a link survives the component being renumbered,
 * renamed or moved.
 *
 * Three things are checked:
 * - Each link is true. The component's markup structure is found inside the
 *   template, at least as closely as when the link was recorded.
 * - Each link is current. The component has not changed since the link was
 *   recorded. When it has, the template follows it, or the old markup is kept
 *   as a new component variant that the template uses.
 * - The template is covered. The share of the template's markup that its
 *   components account for never falls below its floor, and only goes up.
 *
 * "Markup structure" is the tags, classes and accessibility attributes in
 * order, so changing wording does not count as a change. State that varies by
 * page, such as `aria-current`, is ignored.
 */

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export const LINKS_PATH = path.join(repositoryRoot, 'src/data/template-links.json')

const EXAMPLES_PATH = path.join(repositoryRoot, 'public/examples')

/** The share of a template that its components should account for. */
export const TARGET_COVERAGE = 0.9

/** How much of a component has to be found in a template for the two to be linked. */
export const MINIMUM_SIMILARITY = 0.8

// Attributes that change how a component behaves or reads, as opposed to text.
const KEPT_ATTRIBUTES = /^(class|role|type|aria-[a-z]+|data-[a-z-]+|name|for|tabindex)$/

// What is true of one page or one moment, not of the component.
const STATE_ATTRIBUTES = /^aria-(current|selected|expanded|pressed|checked|hidden|busy)$/

export function examplePath(reference) {
  return path.join(EXAMPLES_PATH, `${reference}.html`)
}

/**
 * The tags, classes and accessibility attributes of an example's body, in
 * order, and nothing else.
 */
export function structureOf(html) {
  const body = html
    .replaceAll(/<!--[\s\S]*?-->/g, '')
    .replaceAll(/<script[\s\S]*?<\/script>/gi, '')
    .replaceAll(/<style[\s\S]*?<\/style>/gi, '')

  const bodyMatch = body.match(/<body[^>]*>([\s\S]*)<\/body>/i)

  const tokens = []

  for (const tagMatch of (bodyMatch?.[1] ?? body).matchAll(/<([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>/g)) {
    const attributes = [...tagMatch[2].matchAll(/([a-zA-Z:-]+)(?:="([^"]*)")?/g)]
      .filter(([, name]) => KEPT_ATTRIBUTES.test(name) && !STATE_ATTRIBUTES.test(name))
      .map(([, name, value = '']) =>
        name === 'class'
          ? `class=${value.split(/\s+/).filter(Boolean).sort().join(' ')}`
          : `${name}=${value}`,
      )

    tokens.push(`${tagMatch[1].toLowerCase()}[${attributes.join(';')}]`)
  }

  return tokens
}

const structureOfExample = (reference) =>
  structureOf(fs.readFileSync(examplePath(reference), 'utf8'))

export function hashOf(reference) {
  return crypto
    .createHash('sha256')
    .update(structureOfExample(reference).join('\n'))
    .digest('hex')
    .slice(0, 12)
}

const countsOf = (tokens) => {
  const counts = new Map()

  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1)
  }

  return counts
}

/** The share of a component's structure that is found in a template. */
export function similarity(componentTokens, templateTokens) {
  const available = countsOf(templateTokens)
  let shared = 0

  for (const token of componentTokens) {
    if ((available.get(token) ?? 0) > 0) {
      available.set(token, available.get(token) - 1)
      shared += 1
    }
  }

  return componentTokens.length === 0 ? 0 : shared / componentTokens.length
}

/**
 * @typedef {object} Link
 * @property {string} template  uuid of the template page
 * @property {string} component  uuid of the component it is built from
 * @property {'existing' | 'template'} origin  whether the component existed first, or was made from the template
 * @property {string} templateName  path of the template, for people reading the file
 * @property {string} componentName  path of the component, for people reading the file
 * @property {string} componentHash  structure of the component when the link was recorded
 * @property {number} similarity  how much of the component is found in the template, when recorded
 */

/**
 * @typedef {object} TemplateLinks
 * @property {Link[]} links
 * @property {Record<string, { name: string, floor: number }>} coverage  by template uuid
 */

/** @returns {TemplateLinks} */
export function readLinks() {
  return JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'))
}

export function writeLinks(data) {
  fs.writeFileSync(LINKS_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

/** A uuid, or a `category/slug/variant` path, as a uuid. */
export function toUuid(reference, index = componentIndex()) {
  if (UUID_PATTERN.test(reference)) {
    return reference
  }

  for (const [uuid, location] of index) {
    if (location === reference) {
      return uuid
    }
  }

  throw new Error(
    `No component at ${reference}. Run pnpm component:ids if it was just added, and use the form category/slug/variant.`,
  )
}

/**
 * How much of a template its components account for, from 0 to 1. Each
 * component takes its own markup out of the template, once.
 */
export function coverageOf(templateReference, componentReferences) {
  const templateTokens = structureOfExample(templateReference)
  const available = countsOf(templateTokens)
  let covered = 0

  for (const componentReference of componentReferences) {
    for (const token of structureOfExample(componentReference)) {
      if ((available.get(token) ?? 0) > 0) {
        available.set(token, available.get(token) - 1)
        covered += 1
      }
    }
  }

  return templateTokens.length === 0 ? 1 : covered / templateTokens.length
}

const percent = (value) => `${Math.round(value * 100)}%`

/** All the template pages, as uuid and `category/slug/variant`. */
export function templatePages(index = componentIndex()) {
  return [...index].filter(([, location]) => location.startsWith('templates/'))
}

/** The coverage of every template page, with its links. */
export function coverageReport(data = readLinks(), index = componentIndex()) {
  return templatePages(index).map(([uuid, name]) => {
    const components = data.links
      .filter((link) => link.template === uuid)
      .map((link) => index.get(link.component))
      .filter(Boolean)

    return {
      uuid,
      name,
      components,
      coverage: fs.existsSync(examplePath(name)) ? coverageOf(name, components) : 0,
      floor: data.coverage[uuid]?.floor ?? 0,
    }
  })
}

/** What is out of step, as a list of messages. An empty list means everything holds. */
export function findDrift(data = readLinks()) {
  const index = componentIndex()
  const problems = []
  const flagged = new Set()

  for (const link of data.links) {
    const templateName = index.get(link.template)
    const componentName = index.get(link.component)

    if (!templateName || !componentName) {
      problems.push(
        `${!templateName ? link.templateName : link.componentName} is gone, but it is linked to ${!templateName ? link.componentName : link.templateName}. Remove the link from src/data/template-links.json, or restore the component with its uuid.`,
      )

      continue
    }

    if (!fs.existsSync(examplePath(templateName)) || !fs.existsSync(examplePath(componentName))) {
      problems.push(
        `${templateName} or ${componentName} has no example file. A component's file number is its position in its collection.`,
      )

      continue
    }

    if (hashOf(componentName) !== link.componentHash) {
      flagged.add(templateName)

      problems.push(
        `${componentName} changed since ${templateName} was built from it. Update the template to match, or copy the old component into a new variant and keep the template on that. Then run: pnpm templates:links --accept ${templateName}`,
      )

      continue
    }

    const found = similarity(structureOfExample(componentName), structureOfExample(templateName))

    if (found < link.similarity - 0.001) {
      flagged.add(templateName)

      problems.push(
        `${templateName} no longer matches ${componentName} (${percent(found)} of it is found, was ${percent(link.similarity)}). Bring the template back in line with the component, or update the component if the template is right. Then run: pnpm templates:links --accept ${templateName}`,
      )
    }
  }

  for (const page of coverageReport(data, index)) {
    if (page.coverage < page.floor - 0.001 && !flagged.has(page.name)) {
      problems.push(
        `${page.name} is built from fewer components than it was: ${percent(page.coverage)} of it is covered by components, and it was ${percent(page.floor)}. Link the components it is built from.`,
      )
    }
  }

  return problems
}

/**
 * A link between a template page and a component it is built from. Refuses
 * when the component is not found in the template.
 */
export function makeLink({ template, component, origin = 'existing' }, index = componentIndex()) {
  const templateUuid = toUuid(template, index)
  const componentUuid = toUuid(component, index)

  const templateName = index.get(templateUuid)
  const componentName = index.get(componentUuid)

  const found = similarity(structureOfExample(componentName), structureOfExample(templateName))

  if (found < MINIMUM_SIMILARITY) {
    throw new Error(
      `${templateName} is not built from ${componentName}: only ${percent(found)} of the component is found in the template, and ${percent(MINIMUM_SIMILARITY)} is needed. Make the template use the component's markup, or create a component from the template section.`,
    )
  }

  return {
    template: templateUuid,
    component: componentUuid,
    origin,
    templateName,
    componentName,
    componentHash: hashOf(componentName),
    similarity: Math.round(found * 1000) / 1000,
  }
}

/** Sorts, and keeps every template's name and floor current. Floors only go up. */
export function tidy(data, index = componentIndex()) {
  const links = data.links
    .map((link) => ({
      ...link,
      templateName: index.get(link.template) ?? link.templateName,
      componentName: index.get(link.component) ?? link.componentName,
    }))
    .sort(
      (a, b) =>
        a.templateName.localeCompare(b.templateName) ||
        a.componentName.localeCompare(b.componentName),
    )

  const coverage = {}

  for (const page of coverageReport({ links, coverage: data.coverage }, index)) {
    coverage[page.uuid] = {
      name: page.name,
      floor: Math.max(page.floor, Math.floor(page.coverage * 1000) / 1000),
    }
  }

  return { links, coverage }
}

/** Re-records the links for a template page (or all of them), once both sides agree. */
export function accept(data, templateReference) {
  const index = componentIndex()
  const templateUuid = templateReference ? toUuid(templateReference, index) : undefined

  return tidy(
    {
      ...data,
      links: data.links.map((link) =>
        !templateUuid || link.template === templateUuid ? makeLink(link, index) : link,
      ),
    },
    index,
  )
}

/**
 * Components found inside a template that it is not yet linked to, best first.
 * Components with the same structure score alike, so a person chooses.
 */
export function suggest(templateReference, data = readLinks()) {
  const index = componentIndex()
  const templateUuid = toUuid(templateReference, index)
  const linked = new Set(
    data.links.filter((link) => link.template === templateUuid).map((link) => link.component),
  )

  const templateTokens = structureOfExample(templateReference)
  const results = []

  for (const [uuid, reference] of index) {
    if (
      reference.startsWith('templates/') ||
      linked.has(uuid) ||
      !fs.existsSync(examplePath(reference))
    ) {
      continue
    }

    const tokens = structureOfExample(reference)

    if (tokens.length < 8) {
      continue
    }

    const score = similarity(tokens, templateTokens)

    if (score >= MINIMUM_SIMILARITY) {
      results.push({ reference, score: Math.round(score * 100) / 100, size: tokens.length })
    }
  }

  return results.sort((a, b) => b.size - a.size || b.score - a.score)
}

/**
 * The components a template is built from, found by taking them out of the
 * template one at a time, largest first, so a component that fits inside a
 * larger one is not counted twice. Components with identical structure are
 * reported once, as the first of them, with the others in `twins`.
 */
export function findMatches(templateReference, data = readLinks()) {
  const index = componentIndex()
  const templateUuid = toUuid(templateReference, index)

  const linked = new Set(
    data.links.filter((link) => link.template === templateUuid).map((link) => link.component),
  )

  const candidates = []

  for (const [uuid, reference] of [...index].sort((a, b) =>
    a[1].localeCompare(b[1], 'en', { numeric: true }),
  )) {
    if (
      reference.startsWith('templates/') ||
      linked.has(uuid) ||
      !fs.existsSync(examplePath(reference))
    ) {
      continue
    }

    const tokens = structureOfExample(reference)

    if (tokens.length >= 8) {
      candidates.push({ uuid, reference, tokens, key: tokens.join('\n') })
    }
  }

  const available = countsOf(structureOfExample(templateReference))

  // What the linked components already account for is not available again.
  for (const [uuid, reference] of index) {
    if (linked.has(uuid)) {
      for (const token of structureOfExample(reference)) {
        if ((available.get(token) ?? 0) > 0) {
          available.set(token, available.get(token) - 1)
        }
      }
    }
  }

  const matches = []
  const taken = new Set()

  for (;;) {
    let best

    for (const candidate of candidates) {
      if (taken.has(candidate.key)) {
        continue
      }

      const remaining = new Map(available)
      let shared = 0

      for (const token of candidate.tokens) {
        if ((remaining.get(token) ?? 0) > 0) {
          remaining.set(token, remaining.get(token) - 1)
          shared += 1
        }
      }

      if (
        shared / candidate.tokens.length >= MINIMUM_SIMILARITY &&
        (!best || shared > best.shared)
      ) {
        best = { ...candidate, shared }
      }
    }

    if (!best) {
      break
    }

    taken.add(best.key)

    for (const token of best.tokens) {
      if ((available.get(token) ?? 0) > 0) {
        available.set(token, available.get(token) - 1)
      }
    }

    matches.push({
      reference: best.reference,
      size: best.tokens.length,
      twins: candidates
        .filter((candidate) => candidate.key === best.key && candidate.uuid !== best.uuid)
        .map((candidate) => candidate.reference),
    })
  }

  return matches
}

export { percent }
