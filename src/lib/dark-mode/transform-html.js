import { transformClass } from './transform-class.js'

/**
 * Transform class attributes in an HTML string using regex (no DOM, element-unaware).
 * Used by the Node CLI.
 *
 * @param {string} htmlContent
 * @param {import('./config.js').DarkModeConfig} configData
 * @returns {string}
 */
export function transformHtmlString(htmlContent, configData) {
  return htmlContent.replace(/class="([^"]*)"/g, (_, classAttr) => {
    const transformedValue = transformClassAttribute(classAttr, configData, null)

    return `class="${transformedValue}"`
  })
}

/**
 * Transform class attributes in an HTML string using DOMParser (element-aware).
 * Browser-only — requires DOMParser global.
 *
 * @param {string} htmlContent
 * @param {import('./config.js').DarkModeConfig} configData
 * @returns {string}
 */
export function transformHtmlDom(htmlContent, configData) {
  const domParser = new DOMParser()
  const parsedDocument = domParser.parseFromString(htmlContent, 'text/html')

  parsedDocument.querySelectorAll('[class]').forEach((classElement) => {
    const tagName = classElement.tagName.toLowerCase()
    const transformedValue = transformClassAttribute(
      classElement.getAttribute('class') ?? '',
      configData,
      tagName
    )

    classElement.setAttribute('class', transformedValue)
  })

  return parsedDocument.body.innerHTML
}

/**
 * @param {string | null} classAttr
 * @param {import('./config.js').DarkModeConfig} configData
 * @param {string | null} tagName
 * @returns {string}
 */
function transformClassAttribute(classAttr, configData, tagName) {
  if (!classAttr) {
    return classAttr ?? ''
  }

  return classAttr
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => {
      if (!configData.overwriteExisting && className.includes('dark:')) {
        return className
      }

      return transformClass(className, configData, tagName)
    })
    .join(' ')
}
