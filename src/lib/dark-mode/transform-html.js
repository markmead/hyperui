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
  return htmlContent.replace(/class="([^"]*)"/g, (_, classAttribute) => {
    const transformedValue = transformClassAttribute(classAttribute, configData, null)

    return `class="${transformedValue}"`
  })
}

/**
 * Transform class attributes in an HTML string using DOMParser (element-aware).
 * Browser-only — requires DOMParser global.
 *
 * Returns both the normalised light HTML and the transformed dark HTML from a single parse.
 * Only body content is returned — full-document inputs (with <html>/<head>) will have
 * those elements stripped, since the output is always embedded in a preview document shell.
 *
 * @param {string} htmlContent
 * @param {import('./config.js').DarkModeConfig} configData
 * @returns {{ lightHtml: string, darkHtml: string }}
 */
export function transformHtmlDom(htmlContent, configData) {
  const domParser = new DOMParser()
  const parsedDocument = domParser.parseFromString(htmlContent, 'text/html')
  const lightHtml = parsedDocument.body.innerHTML

  parsedDocument.querySelectorAll('[class]').forEach((classElement) => {
    const tagName = classElement.tagName.toLowerCase()
    const transformedValue = transformClassAttribute(
      classElement.getAttribute('class') ?? '',
      configData,
      tagName,
    )

    classElement.setAttribute('class', transformedValue)
  })

  return { lightHtml, darkHtml: parsedDocument.body.innerHTML }
}

/**
 * @param {string | null} classAttribute
 * @param {import('./config.js').DarkModeConfig} configData
 * @param {string | null} tagName
 * @returns {string}
 */
function transformClassAttribute(classAttribute, configData, tagName) {
  if (!classAttribute) {
    return classAttribute ?? ''
  }

  return classAttribute
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => {
      if (className.includes('dark:')) {
        return className
      }

      return transformClass(className, configData, tagName)
    })
    .join(' ')
}
