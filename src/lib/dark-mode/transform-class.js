import { COLOR_MAP, COLOR_FAMILIES } from '../../constants/dark-mode.js'

/**
 * @param {string} className
 * @returns {{ variantPrefix: string, classWithoutVariant: string }}
 */
export function splitVariantPrefix(className) {
  const lastSeparatorIndex = className.lastIndexOf(':')

  if (lastSeparatorIndex === -1) {
    return {
      variantPrefix: '',
      classWithoutVariant: className,
    }
  }

  return {
    variantPrefix: className.slice(0, lastSeparatorIndex + 1),
    classWithoutVariant: className.slice(lastSeparatorIndex + 1),
  }
}

/**
 * @param {string} utility  e.g. 'bg', 'text', 'border'
 * @param {string} colorFamily  e.g. 'blue'
 * @param {number} shade  e.g. 600
 * @param {string | null | undefined} tagName  e.g. 'BUTTON' (uppercased from el.tagName)
 * @param {import('./config.js').DarkModeConfig} config
 * @returns {{ skip: boolean, darkShade: number } | null}  null = no override, use shade map
 */
function applyRules(utility, colorFamily, shade, tagName, config) {
  const normalizedTag = tagName ? tagName.toLowerCase() : null

  for (const rule of config.rules) {
    if (!rule.enabled) continue

    if (rule.utilities && rule.utilities.length > 0 && !rule.utilities.includes(utility)) continue
    if (rule.shade != null && rule.shade !== shade) continue
    if (rule.colors && rule.colors.length > 0 && !rule.colors.includes(colorFamily)) continue

    if (rule.excludeElements && normalizedTag && rule.excludeElements.includes(normalizedTag)) {
      return { skip: true, darkShade: 0 }
    }

    if (rule.excludeColors && rule.excludeColors.includes(colorFamily)) {
      return { skip: true, darkShade: 0 }
    }

    if (rule.darkShade != null) {
      return { skip: false, darkShade: rule.darkShade }
    }
  }

  return null
}

/**
 * Transform a single Tailwind class to include a dark: variant.
 * Returns the original class if no transformation applies.
 *
 * @param {string} className
 * @param {import('./config.js').DarkModeConfig} config
 * @param {string | null} [tagName]  lowercase element tag e.g. 'button' (browser only)
 * @returns {string}
 */
export function transformClass(className, config, tagName = null) {
  const { variantPrefix, classWithoutVariant } = splitVariantPrefix(className)

  // gray-900 ↔ white special case
  const gray900Match = classWithoutVariant.match(/^(.*?)(gray-900)(\/\d+)?$/)

  if (gray900Match) {
    const grayPrefix = gray900Match[1] ?? ''
    const graySuffix = gray900Match[3] ?? ''
    const utility = grayPrefix.replace(/-$/, '')

    if (config.utilities[utility] === false) return className

    const ruleResult = applyRules(utility, 'gray', 900, tagName, config)

    if (ruleResult?.skip) return className

    return `${className} dark:${variantPrefix}${grayPrefix}white${graySuffix}`
  }

  // white/black named colors
  for (const [lightColor, darkColor] of Object.entries(COLOR_MAP)) {
    if (classWithoutVariant.includes(lightColor)) {
      const colorMatch = classWithoutVariant.match(/^((?:[\w]+-)*)(white|black)(\/\d+)?$/)

      if (colorMatch) {
        const colorPrefix = colorMatch[1] ?? ''
        const colorSuffix = colorMatch[3] ?? ''
        const utility = colorPrefix.replace(/-$/, '')

        if (config.utilities[utility] === false) return className

        const ruleResult = applyRules(utility, lightColor, 0, tagName, config)

        if (ruleResult?.skip) return className

        const darkClass = `${colorPrefix}${darkColor}${colorSuffix}`

        return `${className} dark:${variantPrefix}${darkClass}`
      }
    }
  }

  // color family shades (e.g. bg-blue-600)
  for (const colorFamily of COLOR_FAMILIES) {
    const colorRegex = new RegExp(`^([\\w-]*?)${colorFamily}-(\\d+)(.*?)$`)
    const colorMatch = classWithoutVariant.match(colorRegex)

    if (colorMatch) {
      const colorPrefix = colorMatch[1] ?? ''
      const colorShade = colorMatch[2] ?? '0'
      const colorSuffix = colorMatch[3] ?? ''
      const shadeNum = parseInt(colorShade, 10)
      const utility = colorPrefix.replace(/-$/, '')

      if (config.utilities[utility] === false) return className

      if (!(shadeNum in config.shadeMap)) return className

      const ruleResult = applyRules(utility, colorFamily, shadeNum, tagName, config)

      if (ruleResult?.skip) return className

      const darkShade = ruleResult?.darkShade ?? config.shadeMap[shadeNum]
      const darkClass = `${colorPrefix}${colorFamily}-${darkShade}${colorSuffix}`

      return `${className} dark:${variantPrefix}${darkClass}`
    }
  }

  return className
}
