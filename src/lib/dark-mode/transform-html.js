import { transformClass } from './transform-class.js'

/**
 * Transform class attributes in an HTML string using regex (no DOM, element-unaware).
 * Used by the Node CLI.
 *
 * @param {string} htmlContent
 * @param {import('./config.js').DarkModeConfig} config
 * @returns {string}
 */
export function transformHtmlString(htmlContent, config) {
  return htmlContent.replace(/class="([^"]*)"/g, (_, classAttr) => {
    const transformed = transformClassAttribute(classAttr, config, null)

    return `class="${transformed}"`
  })
}

/**
 * Transform class attributes in an HTML string using DOMParser (element-aware).
 * Browser-only — requires DOMParser global.
 *
 * @param {string} htmlContent
 * @param {import('./config.js').DarkModeConfig} config
 * @returns {string}
 */
export function transformHtmlDom(htmlContent, config) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')

  doc.querySelectorAll('[class]').forEach((el) => {
    const tagName = el.tagName.toLowerCase()
    const transformed = transformClassAttribute(el.getAttribute('class') ?? '', config, tagName)

    el.setAttribute('class', transformed)
  })

  return doc.body.innerHTML
}

/**
 * @param {string | null} classAttr
 * @param {import('./config.js').DarkModeConfig} config
 * @param {string | null} tagName
 * @returns {string}
 */
function transformClassAttribute(classAttr, config, tagName) {
  if (!classAttr) return classAttr ?? ''

  return classAttr
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => {
      if (!config.overwriteExisting && className.includes('dark:')) return className

      return transformClass(className, config, tagName)
    })
    .join(' ')
}
