/**
 * A small HTML tag scanner for the checker. It keeps each opening tag's
 * position in the source, which a DOM parse loses, so findings can point at
 * a line and fixes can edit the exact characters.
 *
 * @typedef {object} Attribute
 * @property {string} name   Lowercase attribute name.
 * @property {string | null} value  `null` for a bare attribute like `hidden`.
 * @property {number} valueStart  Offset of the first character of the value.
 * @property {number} valueEnd    Offset just past the value.
 *
 * @typedef {object} Tag
 * @property {number} index  Position among the scanned opening tags.
 * @property {string} name   Lowercase tag name.
 * @property {number} start  Offset of `<`.
 * @property {number} end    Offset just past `>`.
 * @property {number} nameEnd  Offset just past the tag name, where attributes can be inserted.
 * @property {number} line   1-based line of `<`.
 * @property {Attribute[]} attributes
 * @property {Tag | null} parent
 * @property {Tag[]} children
 */

const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
])

// Their contents are text, not markup.
const RAW_TEXT_ELEMENTS = new Set(['script', 'style', 'textarea', 'title'])

const ATTRIBUTE_PATTERN = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g

/**
 * @param {string} source
 * @returns {Tag[]}
 */
export function scanTags(source) {
  /** @type {Tag[]} */
  const tags = []
  /** @type {Tag[]} */
  const openTags = []
  const lineStarts = [0]

  for (let offset = 0; offset < source.length; offset += 1) {
    if (source[offset] === '\n') {
      lineStarts.push(offset + 1)
    }
  }

  /** @param {number} offset */
  const lineAt = (offset) => {
    let low = 0
    let high = lineStarts.length - 1

    while (low < high) {
      const middle = Math.ceil((low + high) / 2)

      if ((lineStarts[middle] ?? 0) <= offset) {
        low = middle
      } else {
        high = middle - 1
      }
    }

    return low + 1
  }

  let cursor = 0

  while (cursor < source.length) {
    const tagStart = source.indexOf('<', cursor)

    if (tagStart === -1) {
      break
    }

    if (source.startsWith('<!--', tagStart)) {
      const commentEnd = source.indexOf('-->', tagStart + 4)

      cursor = commentEnd === -1 ? source.length : commentEnd + 3
      continue
    }

    if (source[tagStart + 1] === '!' || source[tagStart + 1] === '?') {
      const declarationEnd = source.indexOf('>', tagStart)

      cursor = declarationEnd === -1 ? source.length : declarationEnd + 1
      continue
    }

    const closing = source[tagStart + 1] === '/'
    const nameMatch = /^[a-zA-Z][\w:-]*/.exec(source.slice(tagStart + (closing ? 2 : 1)))

    if (!nameMatch) {
      cursor = tagStart + 1
      continue
    }

    const name = nameMatch[0].toLowerCase()
    const nameEnd = tagStart + (closing ? 2 : 1) + nameMatch[0].length
    const tagEnd = findTagEnd(source, nameEnd)

    if (closing) {
      const openIndex = openTags.findLastIndex((openTag) => openTag.name === name)

      if (openIndex !== -1) {
        openTags.length = openIndex
      }

      cursor = tagEnd
      continue
    }

    const attributeSource = source.slice(nameEnd, tagEnd - 1)
    /** @type {Attribute[]} */
    const attributes = []

    for (const match of attributeSource.matchAll(ATTRIBUTE_PATTERN)) {
      const [whole, attributeName = ''] = match
      const value = match[2] ?? match[3] ?? match[4] ?? null
      const quoted = match[2] !== undefined || match[3] !== undefined
      const valueOffset =
        value === null ? whole.length : whole.length - value.length - (quoted ? 1 : 0)
      const valueStart = nameEnd + (match.index ?? 0) + valueOffset

      attributes.push({
        name: attributeName.toLowerCase(),
        value,
        valueStart,
        valueEnd: valueStart + (value?.length ?? 0),
      })
    }

    const parent = openTags.at(-1) ?? null
    /** @type {Tag} */
    const tag = {
      index: tags.length,
      name,
      start: tagStart,
      end: tagEnd,
      nameEnd,
      line: lineAt(tagStart),
      attributes,
      parent,
      children: [],
    }

    tags.push(tag)
    parent?.children.push(tag)

    const selfClosing = source[tagEnd - 2] === '/'

    if (RAW_TEXT_ELEMENTS.has(name)) {
      const rawEnd = source.toLowerCase().indexOf(`</${name}`, tagEnd)

      cursor = rawEnd === -1 ? source.length : rawEnd
      // The closing tag is skipped next time round, so don't track it as open.
      continue
    }

    if (!VOID_ELEMENTS.has(name) && !selfClosing) {
      openTags.push(tag)
    }

    cursor = tagEnd
  }

  return tags
}

/**
 * The offset just past the `>` that ends a tag, skipping `>` inside quotes.
 *
 * @param {string} source
 * @param {number} from
 */
function findTagEnd(source, from) {
  let quote = ''

  for (let offset = from; offset < source.length; offset += 1) {
    const character = source[offset]

    if (quote) {
      if (character === quote) {
        quote = ''
      }
    } else if (character === '"' || character === "'") {
      quote = character
    } else if (character === '>') {
      return offset + 1
    }
  }

  return source.length
}

/**
 * @param {Tag} tag
 * @param {string} name
 * @returns {Attribute | undefined}
 */
export function getAttribute(tag, name) {
  return tag.attributes.find((attribute) => attribute.name === name)
}

/**
 * @param {Tag} tag
 * @returns {string[]}
 */
export function getClasses(tag) {
  return (getAttribute(tag, 'class')?.value ?? '').split(/\s+/).filter(Boolean)
}

/**
 * @param {Tag} tag
 * @returns {Generator<Tag>}
 */
export function* ancestors(tag) {
  for (let parent = tag.parent; parent; parent = parent.parent) {
    yield parent
  }
}
