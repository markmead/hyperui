import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export const COLLECTIONS_PATH = path.join(repositoryRoot, 'src/content/collection')

const UUID_PATTERN = /\buuid:\s*'?([0-9a-f-]{36})'?/

/**
 * The entries of a collection file's `components` array, as line ranges. An
 * entry is `- title: ...`, `- { ... }` on one line, or a `- {` block, and the
 * Nth entry is the Nth example file (`N.html`).
 */
export function readEntries(source) {
  const lines = source.split('\n')

  const startOfComponents = lines.findIndex((line) => line === 'components:')
  const endOfFrontmatter = lines.indexOf('---', 1)

  if (startOfComponents === -1 || endOfFrontmatter === -1) {
    return { lines, entries: [] }
  }

  const starts = []

  for (let index = startOfComponents + 1; index < endOfFrontmatter; index += 1) {
    if (/^ {2}- /.test(lines[index])) {
      starts.push(index)
    }
  }

  const entries = starts.map((start, position) => {
    const end = starts[position + 1] ?? endOfFrontmatter
    const text = lines.slice(start, end).join('\n')

    return { start, end, uuid: text.match(UUID_PATTERN)?.[1] }
  })

  return { lines, entries }
}

/** Adds a uuid to an entry, in whichever form the entry is written. */
export function withUuid(lines, entry, uuid) {
  const first = lines[entry.start]

  if (first.trim() === '- {') {
    const indent = lines[entry.start + 1].match(/^\s*/)[0]

    lines.splice(entry.start + 1, 0, `${indent}uuid: '${uuid}',`)
  } else if (/^ {2}- \{/.test(first)) {
    lines[entry.start] = first.replace('- { ', `- { uuid: '${uuid}', `)
  } else {
    lines[entry.start] = first.replace(/^ {2}- /, `  - uuid: ${uuid}\n    `)
  }
}

export function collectionFiles() {
  return ['application', 'marketing', 'neobrutalism', 'templates'].flatMap((category) =>
    fs
      .readdirSync(path.join(COLLECTIONS_PATH, category))
      .filter((file) => file.endsWith('.mdx'))
      .sort()
      .map((file) => ({
        category,
        slug: file.replace(/\.mdx$/, ''),
        file: path.join(COLLECTIONS_PATH, category, file),
      })),
  )
}

/** Every component's uuid and where it lives: `uuid` to `category/slug/variant`. */
export function componentIndex() {
  const index = new Map()

  for (const { category, slug, file } of collectionFiles()) {
    const { entries } = readEntries(fs.readFileSync(file, 'utf8'))

    entries.forEach((entry, position) => {
      if (entry.uuid) {
        index.set(entry.uuid, `${category}/${slug}/${position + 1}`)
      }
    })
  }

  return index
}
