import { COLOR_FAMILIES } from '../../constants/dark-mode.js'
import { splitVariantPrefix, transformClass } from '../dark-mode/transform-class.js'

import { ancestors, getAttribute, getClasses } from './tags.js'

/**
 * @typedef {import('./tags.js').Tag} Tag
 *
 * @typedef {{ tag: number, type: 'replace-class', from: string, to: string }
 *   | { tag: number, type: 'add-classes', classes: string[] }
 *   | { tag: number, type: 'add-attribute', name: string, value: string }} Change
 *
 * @typedef {object} Fix
 * @property {string} label  What applying it does, e.g. "Use ps-4".
 * @property {Change[]} changes
 *
 * @typedef {'accessibility' | 'rtl' | 'dark'} Group
 *
 * @typedef {object} Finding
 * @property {string} rule   Rule id, e.g. "physical-utility".
 * @property {Group} group
 * @property {number} line
 * @property {string} message  One sentence: what's wrong.
 * @property {string} why      One sentence: who it affects.
 * @property {string} [help]   A link to more detail.
 * @property {string} snippet  The opening tag, shortened.
 * @property {Fix} [fix]
 */

const SKIPPED_TAGS = new Set(['html', 'head', 'meta', 'link', 'script', 'style', 'title', 'base'])

/**
 * @param {string} source
 * @param {Tag} tag
 */
export function snippetOf(source, tag) {
  const opening = source.slice(tag.start, tag.end).replaceAll(/\s+/g, ' ')

  return opening.length > 120 ? `${opening.slice(0, 117)}…` : opening
}

// Right-to-left

const SIDE = /** @type {const} */ ({ l: 's', r: 'e' })
const CORNER = /** @type {const} */ ({ l: 's', r: 'e', tl: 'ss', tr: 'se', bl: 'es', br: 'ee' })

/**
 * The logical equivalent of a physical left or right utility, or `null` when
 * the class is fine as it is.
 *
 * @param {string} className
 * @returns {string | null}
 */
export function toLogical(className) {
  const { variantPrefix, classWithoutVariant } = splitVariantPrefix(className)

  // ltr: and rtl: already say which direction they mean.
  if (/(^|:)(ltr|rtl):/.test(variantPrefix)) {
    return null
  }

  const negative = classWithoutVariant.startsWith('-') ? '-' : ''
  const utility = classWithoutVariant.slice(negative.length)
  let logical = null
  let match

  if ((match = /^(scroll-)?([pm])([lr])-(.+)$/.exec(utility))) {
    logical = `${match[1] ?? ''}${match[2]}${SIDE[/** @type {'l' | 'r'} */ (match[3])]}-${match[4]}`
  } else if ((match = /^(left|right)-(.+)$/.exec(utility))) {
    logical = `${match[1] === 'left' ? 'start' : 'end'}-${match[2]}`
  } else if ((match = /^(text|float|clear)-(left|right)$/.exec(utility))) {
    logical = `${match[1]}-${match[2] === 'left' ? 'start' : 'end'}`
  } else if ((match = /^border-([lr])(-.+)?$/.exec(utility))) {
    logical = `border-${SIDE[/** @type {'l' | 'r'} */ (match[1])]}${match[2] ?? ''}`
  } else if ((match = /^rounded-(tl|tr|bl|br|l|r)(-.+)?$/.exec(utility))) {
    logical = `rounded-${CORNER[/** @type {keyof typeof CORNER} */ (match[1])]}${match[2] ?? ''}`
  }

  return logical === null ? null : `${variantPrefix}${negative}${logical}`
}

/**
 * @param {string} source
 * @param {Tag[]} tags
 * @returns {Finding[]}
 */
export function checkRtl(source, tags) {
  /** @type {Finding[]} */
  const findings = []

  for (const tag of tags) {
    const classes = getClasses(tag)
    // left-1/2 with -translate-x-1/2 centres the element, which reads the
    // same in both directions.
    const centred = classes.some((className) => /(^|:)-translate-x-1\/2$/.test(className))

    for (const className of classes) {
      const logical = toLogical(className)

      if (!logical || (centred && /(^|:)left-1\/2$/.test(className))) {
        continue
      }

      findings.push({
        rule: 'physical-utility',
        group: 'rtl',
        line: tag.line,
        message: `\`${className}\` always means the left or right side.`,
        why: 'In a right-to-left language like Arabic or Hebrew, the layout flips but this spacing or position does not.',
        snippet: snippetOf(source, tag),
        fix: {
          label: `Use \`${logical}\``,
          changes: [{ tag: tag.index, type: 'replace-class', from: className, to: logical }],
        },
      })
    }
  }

  return findings
}

// Focus outline

const FORM_CONTROLS = new Set(['input', 'select', 'textarea'])

const FOCUS_REPLACEMENT = [
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-current',
]

/**
 * @param {string} source
 * @param {Tag[]} tags
 * @returns {Finding[]}
 */
export function checkFocusOutline(source, tags) {
  /** @type {Finding[]} */
  const findings = []

  for (const tag of tags) {
    // @tailwindcss/forms, which HyperUI assumes, gives these a focus ring.
    if (FORM_CONTROLS.has(tag.name)) {
      continue
    }

    const classes = getClasses(tag)
    const removal = classes.find((className) =>
      /^(?:(?:focus|focus-visible):)?outline-(?:none|hidden)$/.test(className),
    )

    if (!removal) {
      continue
    }

    // Any focus style other than removing the outline counts as a replacement.
    const replaced = classes.some(
      (className) =>
        /(^|:)(focus|focus-visible|focus-within|group-focus|group-focus-visible|peer-focus|peer-focus-visible):/.test(
          className,
        ) && !/outline-(none|hidden)$/.test(className),
    )

    if (replaced) {
      continue
    }

    /** @type {Change[]} */
    const changes = [{ tag: tag.index, type: 'add-classes', classes: FOCUS_REPLACEMENT }]

    // In Tailwind CSS v4, outline-none also removes the outline in forced
    // colours mode. outline-hidden keeps it there.
    if (removal.endsWith('outline-none')) {
      changes.unshift({
        tag: tag.index,
        type: 'replace-class',
        from: removal,
        to: removal.replace(/outline-none$/, 'outline-hidden'),
      })
    }

    findings.push({
      rule: 'focus-outline-removed',
      group: 'accessibility',
      line: tag.line,
      message: `\`${removal}\` removes the focus outline, and nothing replaces it.`,
      why: 'Keyboard users can no longer see which element has focus (WCAG 2.4.7).',
      help: 'https://tailwindcss.com/docs/outline-style#hiding-an-outline',
      snippet: snippetOf(source, tag),
      fix: {
        label: 'Show an outline on keyboard focus',
        changes,
      },
    })
  }

  return findings
}

// SVG icons

/**
 * @param {string} source
 * @param {Tag[]} tags
 * @returns {Finding[]}
 */
export function checkSvgIcons(source, tags) {
  /** @type {Finding[]} */
  const findings = []

  for (const tag of tags) {
    if (tag.name !== 'svg') {
      continue
    }

    const labelled =
      getAttribute(tag, 'aria-hidden') ||
      getAttribute(tag, 'aria-label') ||
      getAttribute(tag, 'aria-labelledby') ||
      getAttribute(tag, 'role')?.value === 'img' ||
      tag.children.some((child) => child.name === 'title')

    if (labelled) {
      continue
    }

    findings.push({
      rule: 'svg-not-hidden',
      group: 'accessibility',
      line: tag.line,
      message: 'This SVG has no label and is not hidden from screen readers.',
      why: 'Some screen readers announce it as an unlabelled image. If it is decorative, hide it. If it means something, label it.',
      snippet: snippetOf(source, tag),
      fix: {
        label: 'Add `aria-hidden="true"`',
        changes: [{ tag: tag.index, type: 'add-attribute', name: 'aria-hidden', value: 'true' }],
      },
    })
  }

  return findings
}

// Dark mode

const NEUTRALS = new Set(['gray', 'slate', 'zinc', 'neutral', 'stone'])

/**
 * Mid-shade brand and accent colours, like `bg-indigo-600` or
 * `focus:ring-blue-500`, read well on light and dark backgrounds. Neutrals
 * and light or dark tints are what break in dark mode.
 *
 * @param {string} className
 */
function isAccent(className) {
  const match = /-([a-z]+)-(\d+)(?:\/.+)?$/.exec(splitVariantPrefix(className).classWithoutVariant)

  if (!match || NEUTRALS.has(match[1] ?? '') || !COLOR_FAMILIES.includes(match[1] ?? '')) {
    return false
  }

  const shade = Number(match[2])

  return shade >= 300 && shade <= 600
}

/**
 * @param {string} className
 */
function isChromatic(className) {
  const family = /-([a-z]+)-\d+(?:\/.+)?$/.exec(
    splitVariantPrefix(className).classWithoutVariant,
  )?.[1]

  return !!family && !NEUTRALS.has(family) && COLOR_FAMILIES.includes(family)
}

const COLOR_PATTERN = new RegExp(
  `^(.*?)-(?:(?:${COLOR_FAMILIES.join('|')})-\\d+|white|black)(?:\\/.+)?$`,
)

/**
 * Which utility and variants a colour class sets, so `bg-white` and
 * `dark:bg-gray-900` can be paired. `null` for classes that aren't colours.
 *
 * @param {string} className  Without the `dark:` variant.
 */
function colourKey(className) {
  const { variantPrefix, classWithoutVariant } = splitVariantPrefix(className)
  const utility = COLOR_PATTERN.exec(classWithoutVariant)?.[1]

  if (!utility) {
    return null
  }

  const variants = variantPrefix.split(':').filter(Boolean).sort().join(':')

  return `${variants}|${utility}`
}

/**
 * The `dark:` classes a tag is missing, from the same engine as `pnpm dark`.
 *
 * @param {Tag} tag
 * @param {import('../dark-mode/config.js').DarkModeConfig} config
 * @returns {{ light: string, dark: string }[]}
 */
export function missingDarkClasses(tag, config) {
  if (SKIPPED_TAGS.has(tag.name)) {
    return []
  }

  const classes = getClasses(tag)
  const darkKeys = new Set(
    classes
      .filter((className) => /(^|:)dark:/.test(className))
      .map((className) => colourKey(className.replace(/(^|:)dark:/, '$1')))
      .filter(Boolean),
  )
  /** @type {{ light: string, dark: string }[]} */
  const missing = []
  // Text on a coloured background, like a yellow badge or an indigo
  // button, is chosen for that colour and works in both themes.
  const onColour = classes.some((className) => {
    const match = /^bg-([a-z]+)-(\d+)$/.exec(className)

    return match && !NEUTRALS.has(match[1] ?? '') && Number(match[2]) >= 300
  })

  for (const className of classes) {
    if (
      className.includes('dark:') ||
      isAccent(className) ||
      (onColour &&
        (/^text-/.test(splitVariantPrefix(className).classWithoutVariant) ||
          isChromatic(className)))
    ) {
      continue
    }

    const transformed = transformClass(className, config, tag.name)

    if (transformed === className) {
      continue
    }

    const darkClass = transformed.slice(className.length + 1)
    const darkValue = darkClass.replace(/(^|:)dark:/, '$1')
    const key = colourKey(darkValue)

    // Some colours are meant to stay the same, like text-gray-400.
    if (darkValue === className) {
      continue
    }

    if (key && !darkKeys.has(key)) {
      darkKeys.add(key)
      missing.push({ light: className, dark: darkClass })
    }
  }

  if (tag.name === 'body' && !classes.some((className) => /(^|:)dark:bg-/.test(className))) {
    missing.push({ light: '<body>', dark: 'dark:bg-gray-900' })
  }

  return missing
}

/**
 * A surface that is already dark in the light theme, like a code block or a
 * `bg-gray-900` card, looks the same in both themes.
 *
 * @param {Tag} tag
 */
function onDarkSurface(tag) {
  return [tag, ...ancestors(tag)].some((node) =>
    getClasses(node).some((className) =>
      /^bg-(?:[a-z]+-950|(?:gray|slate|zinc|neutral|stone)-(?:800|900)|black)(?:\/\d+)?$/.test(
        className,
      ),
    ),
  )
}

/**
 * @param {string} source
 * @param {Tag[]} tags
 * @param {import('../dark-mode/config.js').DarkModeConfig} config
 * @returns {Finding[]}
 */
export function checkDarkMode(source, tags, config) {
  const hasDarkMode = /(^|[\s":])dark:/.test(source)
  const gaps = tags
    .filter((tag) => !onDarkSurface(tag))
    .map((tag) => ({ tag, missing: missingDarkClasses(tag, config) }))
    .filter(({ missing }) => missing.length > 0)

  if (gaps.length === 0) {
    return []
  }

  /** @type {Change[]} */
  const allChanges = gaps.map(({ tag, missing }) => ({
    tag: tag.index,
    type: 'add-classes',
    classes: missing.map(({ dark }) => dark),
  }))

  // Markup with no dark mode at all gets one finding, not one per element.
  if (!hasDarkMode) {
    const first = gaps[0]?.tag

    return [
      {
        rule: 'no-dark-mode',
        group: 'dark',
        line: first?.line ?? 1,
        message: `There is no dark mode. ${gaps.length} ${gaps.length === 1 ? 'element needs' : 'elements need'} \`dark:\` colours.`,
        why: 'In dark mode, light backgrounds stay bright and dark text can disappear against dark surroundings.',
        snippet: first ? snippetOf(source, first) : '',
        fix: { label: 'Generate dark mode', changes: allChanges },
      },
    ]
  }

  return gaps.map(({ tag, missing }) => ({
    rule: 'missing-dark-pair',
    group: 'dark',
    line: tag.line,
    message: `Colours with no dark pair: ${missing.map(({ light }) => `\`${light}\``).join(', ')}.`,
    why: 'The rest of the page switches to dark mode, but these colours stay as they are. Ignore this for a section that is meant to look the same in both themes.',
    snippet: snippetOf(source, tag),
    fix: {
      label: `Add ${missing.map(({ dark }) => `\`${dark}\``).join(' ')}`,
      changes: [{ tag: tag.index, type: 'add-classes', classes: missing.map(({ dark }) => dark) }],
    },
  }))
}
