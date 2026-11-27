import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { componentIndex } from './component-ids.js'

/**
 * Templates are built from components, and new templates feed components. A
 * link in `src/data/template-links.json` records that, along with a hash of
 * each side's structure when the two were last in step. When either side
 * changes, the check fails until someone brings the other side along and
 * accepts the new hashes.
 *
 * A link is `{ template, component, direction }`, where both are component
 * uuids (see `pnpm component:ids`), so a link survives a component being
 * renumbered, renamed or moved. Direction is:
 * - `uses`: the template is built from the component. The component changing
 *   means the template should follow, or the component should be copied into a
 *   new variant that the template keeps.
 * - `feeds`: the component was made from the template. The template changing
 *   means the component should follow.
 */

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export const LINKS_PATH = path.join(repositoryRoot, 'src/data/template-links.json')

const EXAMPLES_PATH = path.join(repositoryRoot, 'public/examples')

// Attributes that change how a component behaves or reads, as opposed to text.
const KEPT_ATTRIBUTES = /^(class|role|type|aria-[a-z]+|data-[a-z-]+|name|for|tabindex)$/

export function examplePath(reference) {
  return path.join(EXAMPLES_PATH, `${reference}.html`)
}

/**
 * The tags, classes and accessibility attributes of an example's body, in
 * order, and nothing else. Changing words or links does not change it, but
 * changing a class, a role or an ARIA attribute does.
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
      .filter(([, name]) => KEPT_ATTRIBUTES.test(name))
      .map(([, name, value = '']) =>
        name === 'class'
          ? `class=${value.split(/\s+/).filter(Boolean).sort().join(' ')}`
          : `${name}=${value}`,
      )

    tokens.push(`${tagMatch[1].toLowerCase()}[${attributes.join(';')}]`)
  }

  return tokens
}

export function hashOf(reference) {
  const html = fs.readFileSync(examplePath(reference), 'utf8')

  return crypto.createHash('sha256').update(structureOf(html).join('\n')).digest('hex').slice(0, 12)
}

/**
 * @typedef {object} Link
 * @property {string} template  uuid of the template component
 * @property {string} component  uuid of the component
 * @property {'uses' | 'feeds'} direction
 * @property {string} templateName  path of the template, for people reading the file
 * @property {string} componentName  path of the component, for people reading the file
 * @property {string} templateHash
 * @property {string} componentHash
 */

/** @returns {Link[]} */
export function readLinks() {
  return JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'))
}

export function writeLinks(links) {
  fs.writeFileSync(LINKS_PATH, `${JSON.stringify(links, null, 2)}\n`, 'utf8')
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

/** What is out of step, as a list of messages. An empty list means all links hold. */
export function findDrift(links = readLinks()) {
  const index = componentIndex()
  const problems = []

  for (const link of links) {
    const { template, component, direction } = link

    const templateLocation = index.get(template)
    const componentLocation = index.get(component)

    if (!templateLocation || !componentLocation) {
      const missing = !templateLocation ? link.templateName : link.componentName

      problems.push(
        `${missing} (${!templateLocation ? template : component}) is gone, but it is linked to ${!templateLocation ? link.componentName : link.templateName}. Remove the link from src/data/template-links.json, or restore the component with its uuid.`,
      )

      continue
    }

    if (
      !fs.existsSync(examplePath(templateLocation)) ||
      !fs.existsSync(examplePath(componentLocation))
    ) {
      problems.push(
        `${templateLocation} or ${componentLocation} has no example file. A component's position in its collection is its file number.`,
      )

      continue
    }

    if (direction === 'uses' && hashOf(componentLocation) !== link.componentHash) {
      problems.push(
        `${componentLocation} changed since ${templateLocation} was built from it. Update the template to match, or copy the old component into a new variant and keep the template on that. Then run: pnpm templates:links --accept ${templateLocation}`,
      )
    }

    if (direction === 'feeds' && hashOf(templateLocation) !== link.templateHash) {
      problems.push(
        `${templateLocation} changed since ${componentLocation} was made from it. Update the component to match. Then run: pnpm templates:links --accept ${templateLocation}`,
      )
    }
  }

  return problems
}

/**
 * A link between two components, by uuid, with their paths for people reading
 * the file. The paths are refreshed whenever the file is written.
 */
export function makeLink({ template, component, direction = 'uses' }, index = componentIndex()) {
  const templateUuid = toUuid(template, index)
  const componentUuid = toUuid(component, index)

  const templateName = index.get(templateUuid)
  const componentName = index.get(componentUuid)

  return {
    template: templateUuid,
    component: componentUuid,
    direction,
    templateName,
    componentName,
    templateHash: hashOf(templateName),
    componentHash: hashOf(componentName),
  }
}

/** Records the current state of the links for a template (any variant of a page, or one), or all links. */
export function accept(links, templateReference) {
  const index = componentIndex()
  const templateUuid = templateReference ? toUuid(templateReference, index) : undefined

  return links.map((link) =>
    !templateUuid || link.template === templateUuid ? makeLink(link, index) : link,
  )
}

/**
 * Components whose structure the template contains, best first. Components
 * that are near copies of each other score alike, so a person chooses.
 */
export function suggest(templateReference, threshold = 0.8) {
  const templateTokens = structureOf(fs.readFileSync(examplePath(templateReference), 'utf8'))
  const templateCounts = new Map()

  for (const token of templateTokens) {
    templateCounts.set(token, (templateCounts.get(token) ?? 0) + 1)
  }

  const results = []

  for (const category of ['application', 'marketing', 'neobrutalism']) {
    const categoryPath = path.join(EXAMPLES_PATH, category)

    for (const slug of fs.readdirSync(categoryPath)) {
      for (const file of fs.readdirSync(path.join(categoryPath, slug))) {
        if (!/^\d+\.html$/.test(file)) {
          continue
        }

        const reference = `${category}/${slug}/${file.replace('.html', '')}`
        const tokens = structureOf(fs.readFileSync(examplePath(reference), 'utf8'))

        if (tokens.length < 8) {
          continue
        }

        const available = new Map(templateCounts)
        let shared = 0

        for (const token of tokens) {
          if ((available.get(token) ?? 0) > 0) {
            available.set(token, available.get(token) - 1)
            shared += 1
          }
        }

        const score = shared / tokens.length

        if (score >= threshold) {
          results.push({ reference, score: Math.round(score * 100) / 100, size: tokens.length })
        }
      }
    }
  }

  return results.sort((a, b) => b.score - a.score || b.size - a.size)
}
