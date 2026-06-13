import { COLOR_FAMILIES } from '../../constants/dark-mode.js'

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
 * @param {string} utilityName  e.g. 'bg', 'text', 'border'
 * @param {string} colorFamily  e.g. 'blue'
 * @param {number} shadeNumber  e.g. 600
 * @param {string | null | undefined} tagName  e.g. 'BUTTON' (uppercased from el.tagName)
 * @param {import('./config.js').DarkModeConfig} configData
 * @returns {{ skip: boolean, darkShade: number | null, darkColor: string | null } | null}  null = no override, use shade map
 */
function applyRules(utilityName, colorFamily, shadeNumber, tagName, configData) {
  const normalizedTag = tagName ? tagName.toLowerCase() : null

  for (const activeRule of configData.rules) {
    if (!activeRule.enabled) {
      continue
    }

    if (
      activeRule.utilities &&
      activeRule.utilities.length > 0 &&
      !activeRule.utilities.includes(utilityName)
    ) {
      continue
    }
    if (activeRule.shade !== null && activeRule.shade !== shadeNumber) {
      continue
    }
    if (
      activeRule.colors &&
      activeRule.colors.length > 0 &&
      !activeRule.colors.includes(colorFamily)
    ) {
      continue
    }

    if (
      activeRule.excludeElements &&
      normalizedTag &&
      activeRule.excludeElements.includes(normalizedTag)
    ) {
      return { skip: true, darkShade: null, darkColor: null }
    }

    if (activeRule.excludeColors && activeRule.excludeColors.includes(colorFamily)) {
      return { skip: true, darkShade: null, darkColor: null }
    }

    if (activeRule.darkColor) {
      return {
        skip: false,
        darkShade: activeRule.darkShade ?? null,
        darkColor: activeRule.darkColor,
      }
    }

    if (activeRule.darkShade !== null) {
      return { skip: false, darkShade: activeRule.darkShade, darkColor: null }
    }
  }

  return null
}

/**
 * Transform a single Tailwind class to include a dark: variant.
 * Returns the original class if no transformation applies.
 *
 * @param {string} className
 * @param {import('./config.js').DarkModeConfig} configData
 * @param {string | null} [tagName]  lowercase element tag e.g. 'button' (browser only)
 * @returns {string}
 */
export function transformClass(className, configData, tagName = null) {
  const { variantPrefix, classWithoutVariant } = splitVariantPrefix(className)

  for (const [lightColor, darkColor] of Object.entries(configData.colorMap)) {
    if (classWithoutVariant.includes(lightColor)) {
      const colorRegex = new RegExp(`^((?:[\\w]+-)*)(${lightColor})(\\/\\d+)?$`)
      const colorMatch = classWithoutVariant.match(colorRegex)

      if (colorMatch) {
        const colorPrefix = colorMatch[1] ?? ''
        const colorSuffix = colorMatch[3] ?? ''
        const utilityName = colorPrefix.replace(/-$/, '')

        if (configData.utilities[utilityName] === false) {
          return className
        }

        const ruleResult = applyRules(utilityName, lightColor, 0, tagName, configData)

        if (ruleResult?.skip) {
          return className
        }

        const resolvedDarkColor = ruleResult?.darkColor
          ? ruleResult.darkShade !== null
            ? `${ruleResult.darkColor}-${ruleResult.darkShade}`
            : ruleResult.darkColor
          : darkColor
        const darkClass = `${colorPrefix}${resolvedDarkColor}${colorSuffix}`

        return `${className} dark:${variantPrefix}${darkClass}`
      }
    }
  }

  for (const colorFamily of COLOR_FAMILIES) {
    const colorRegex = new RegExp(`^([\\w-]*?)${colorFamily}-(\\d+)(.*?)$`)
    const colorMatch = classWithoutVariant.match(colorRegex)

    if (colorMatch) {
      const colorPrefix = colorMatch[1] ?? ''
      const colorShade = colorMatch[2] ?? '0'
      const colorSuffix = colorMatch[3] ?? ''
      const parsedShadeNumber = parseInt(colorShade, 10)
      const utilityName = colorPrefix.replace(/-$/, '')

      if (configData.utilities[utilityName] === false) {
        return className
      }

      if (!(parsedShadeNumber in configData.shadeMap)) {
        return className
      }

      const ruleResult = applyRules(
        utilityName,
        colorFamily,
        parsedShadeNumber,
        tagName,
        configData,
      )

      if (ruleResult?.skip) {
        return className
      }

      const resolvedDarkColor = ruleResult?.darkColor
        ? ruleResult.darkShade !== null
          ? `${ruleResult.darkColor}-${ruleResult.darkShade}`
          : ruleResult.darkColor
        : `${colorFamily}-${ruleResult?.darkShade ?? configData.shadeMap[parsedShadeNumber]}`
      const darkClass = `${colorPrefix}${resolvedDarkColor}${colorSuffix}`

      return `${className} dark:${variantPrefix}${darkClass}`
    }
  }

  return className
}
