#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'

import { collectionFiles, readEntries, withUuid } from './lib/component-ids.js'

// Gives every component without a `uuid` one. Safe to run again, as components
// that have one are left alone. A component keeps its uuid when it moves,
// is renumbered or is renamed, which is how links between templates and
// components survive.

let assigned = 0

for (const { file } of collectionFiles()) {
  const source = fs.readFileSync(file, 'utf8')
  const { lines, entries } = readEntries(source)

  // From the last entry up, so earlier line numbers stay put.
  for (const entry of entries.toReversed()) {
    if (!entry.uuid) {
      withUuid(lines, entry, crypto.randomUUID())

      assigned += 1
    }
  }

  const updated = lines.join('\n')

  if (updated !== source) {
    fs.writeFileSync(file, updated, 'utf8')
  }
}

console.log(assigned === 0 ? 'Every component has a uuid.' : `Gave ${assigned} components a uuid.`)
