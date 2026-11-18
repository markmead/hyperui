/**
 * The Tailwind checker's engine. It runs in the browser on `/tools/tailwind-checker`
 * and in Node for tests: everything except `instrumentMarkup`'s preview and
 * `axeFindings` is plain string work, with no DOM.
 *
 *   const { findings } = checkMarkup(html, config)
 *   const fixed = applyFixes(html, findings.map((finding) => finding.fix))
 */

import { checkDarkMode, checkFocusOutline, checkRtl, checkSvgIcons } from './rules.js'
import { getAttribute, scanTags } from './tags.js'

/**
 * @typedef {import('./rules.js').Finding} Finding
 * @typedef {import('./rules.js').Fix} Fix
 * @typedef {import('./rules.js').Change} Change
 * @typedef {import('./rules.js').Group} Group
 */

export const GROUPS = /** @type {const} */ (['accessibility', 'rtl', 'dark'])

/**
 * The checks that don't need a rendered page. axe runs separately, on the
 * preview (see `instrumentMarkup` and `axeFindings`).
 *
 * @param {string} source
 * @param {import('../dark-mode/config.js').DarkModeConfig} darkConfig
 * @returns {{ findings: Finding[] }}
 */
export function checkMarkup(source, darkConfig) {
  const tags = scanTags(source)

  return {
    findings: sortFindings([
      ...checkFocusOutline(source, tags),
      ...checkSvgIcons(source, tags),
      ...checkRtl(source, tags),
      ...checkDarkMode(source, tags, darkConfig),
    ]),
  }
}

/**
 * @param {Finding[]} findings
 * @returns {Finding[]}
 */
export function sortFindings(findings) {
  return [...findings].sort(
    (first, second) =>
      GROUPS.indexOf(first.group) - GROUPS.indexOf(second.group) || first.line - second.line,
  )
}

/**
 * Apply fixes to the source, keeping everything else byte for byte. Several
 * fixes on one element combine: a class replaced by one fix can still gain
 * `dark:` pairs from another.
 *
 * @param {string} source
 * @param {(Fix | undefined)[]} fixes
 * @returns {string}
 */
export function applyFixes(source, fixes) {
  const tags = scanTags(source)
  /** @type {Map<number, Change[]>} */
  const changesByTag = new Map()

  for (const fix of fixes) {
    for (const change of fix?.changes ?? []) {
      changesByTag.set(change.tag, [...(changesByTag.get(change.tag) ?? []), change])
    }
  }

  /** @type {{ start: number, end: number, text: string }[]} */
  const edits = []

  for (const [tagIndex, changes] of changesByTag) {
    const tag = tags[tagIndex]

    if (!tag) {
      continue
    }

    const classAttribute = getAttribute(tag, 'class')
    let classes = (classAttribute?.value ?? '').split(/\s+/).filter(Boolean)
    let classesChanged = false
    /** @type {string[]} */
    const newAttributes = []

    for (const change of changes) {
      if (change.type === 'replace-class') {
        classes = classes.map((className) => (className === change.from ? change.to : className))
        classesChanged = true
      } else if (change.type === 'add-classes') {
        classes.push(...change.classes.filter((className) => !classes.includes(className)))
        classesChanged = true
      } else if (!getAttribute(tag, change.name) && !newAttributes.includes(change.name)) {
        newAttributes.push(change.name)
        edits.push({
          start: tag.nameEnd,
          end: tag.nameEnd,
          text: ` ${change.name}="${change.value}"`,
        })
      }
    }

    if (!classesChanged) {
      continue
    }

    if (classAttribute && classAttribute.value !== null) {
      edits.push({
        start: classAttribute.valueStart,
        end: classAttribute.valueEnd,
        text: classes.join(' '),
      })
    } else if (classAttribute) {
      edits.push({
        start: classAttribute.valueStart,
        end: classAttribute.valueEnd,
        text: `="${classes.join(' ')}"`,
      })
    } else {
      edits.push({ start: tag.nameEnd, end: tag.nameEnd, text: ` class="${classes.join(' ')}"` })
    }
  }

  // Apply from the end, so earlier offsets stay valid. Two inserts at the
  // same offset keep their order.
  return edits
    .map((edit, order) => ({ ...edit, order }))
    .sort((first, second) => second.start - first.start || second.order - first.order)
    .reduce(
      (output, edit) => `${output.slice(0, edit.start)}${edit.text}${output.slice(edit.end)}`,
      source,
    )
}

export const LINE_ATTRIBUTE = 'data-checker-line'

/**
 * A copy of the markup with each element's source line in a data attribute,
 * so axe results on the rendered preview can point back at a line.
 *
 * @param {string} source
 * @returns {string}
 */
export function instrumentMarkup(source) {
  return scanTags(source)
    .filter((tag) => !['html', 'head', 'meta', 'link', 'title', 'base'].includes(tag.name))
    .reverse()
    .reduce(
      (output, tag) =>
        `${output.slice(0, tag.nameEnd)} ${LINE_ATTRIBUTE}="${tag.line}"${output.slice(tag.nameEnd)}`,
      source,
    )
}

/**
 * Tailwind-flavoured fixes for the axe rules people hit most in generated
 * markup. Everything else links to axe's own explanation.
 */
const AXE_HINTS = /** @type {Record<string, string>} */ ({
  'button-name':
    'Add visible text, or `<span class="sr-only">What it does</span>` inside an icon-only button.',
  'link-name':
    'Add visible text, or `<span class="sr-only">Where it goes</span>` inside an icon-only link.',
  'image-alt': 'Add `alt` text that says what the image shows, or `alt=""` if it is decorative.',
  label:
    'Add a `<label for="…">`, or wrap the input in a `<label>`. Use `sr-only` on the label text if it must not show.',
  'color-contrast':
    'Use a darker text shade on light backgrounds (`text-gray-600` or darker on white), or a lighter one on dark backgrounds.',
  'html-has-lang': 'Add `lang="en"` (or the page language) to `<html>`.',
})

/** @typedef {import('axe-core').Result} AxeViolation */

/**
 * Turn axe violations from the instrumented preview into findings.
 *
 * @param {AxeViolation[]} violations
 * @returns {Finding[]}
 */
export function axeFindings(violations) {
  const linePattern = new RegExp(`\\s${LINE_ATTRIBUTE}="(\\d+)"`)

  return violations.flatMap((violation) =>
    violation.nodes.map((node) => {
      const criteria = violation.tags
        .map((tag) => /^wcag(\d)(\d)(\d+)$/.exec(tag))
        .filter(Boolean)
        .map((match) => `${match?.[1]}.${match?.[2]}.${match?.[3]}`)

      return {
        rule: violation.id,
        group: /** @type {Group} */ ('accessibility'),
        line: Number(linePattern.exec(node.html)?.[1] ?? 1),
        message: `${violation.help}.`,
        why: `${AXE_HINTS[violation.id] ?? 'See the linked explanation for how to fix it.'}${criteria.length ? ` (WCAG ${criteria.join(', ')})` : ''}`,
        help: violation.helpUrl,
        snippet: node.html.replaceAll(new RegExp(linePattern, 'g'), '').replaceAll(/\s+/g, ' '),
      }
    }),
  )
}

/**
 * A prompt that hands the findings back to an AI assistant, for people who
 * want their agent to make the fixes.
 *
 * @param {Finding[]} findings
 * @returns {string}
 */
export function findingsForAi(findings) {
  if (findings.length === 0) {
    return 'The HyperUI Tailwind checker found no accessibility, right-to-left or dark mode issues in this markup.'
  }

  const titles = /** @type {Record<Group, string>} */ ({
    accessibility: 'Accessibility (WCAG 2.1 AA)',
    rtl: 'Right-to-left',
    dark: 'Dark mode',
  })
  const sections = GROUPS.map((group) => {
    const groupFindings = findings.filter((finding) => finding.group === group)

    if (groupFindings.length === 0) {
      return ''
    }

    const items = groupFindings.map((finding) => {
      const fix = finding.fix ? ` Fix: ${finding.fix.label}.` : ''

      return `- Line ${finding.line}: ${finding.message} ${finding.why}${fix}\n  \`${finding.snippet}\``
    })

    return `## ${titles[group]}\n\n${items.join('\n')}`
  }).filter(Boolean)

  return [
    `Fix these ${findings.length} issues in the Tailwind CSS markup above, found by the HyperUI Tailwind checker (https://hyperui.dev/tools/tailwind-checker).`,
    'Keep everything else as it is. Use logical utilities (`ps-`, `me-`, `start-`) for spacing and position, and pair every colour with a `dark:` colour.',
    ...sections,
  ].join('\n\n')
}
