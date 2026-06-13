import { SHADE_MAP, COLOR_MAP, STORAGE_KEY } from '../../constants/dark-mode.js'

/**
 * @typedef {Object} Rule
 * @property {string} id
 * @property {boolean} enabled
 * @property {string[] | null} [utilities]    - e.g. ['bg','text'] — null means any utility
 * @property {number | null} [shade]          - e.g. 600 — null means any shade
 * @property {string[] | null} [colors]       - allow-list of color families; null means any
 * @property {number | null} [darkShade]      - override target shade; null uses shade map
 * @property {string | null} [darkColor]      - override entire color e.g. 'gray-900'; null uses darkShade/shade map
 * @property {string[]} excludeElements       - e.g. ['button', 'a']
 * @property {string[]} excludeColors         - e.g. ['blue', 'indigo']
 */

/**
 * @typedef {Object} DarkModeConfig
 * @property {{ [shade: number]: number }} shadeMap
 * @property {{ [name: string]: string }} colorMap
 * @property {{ [utility: string]: boolean }} utilities
 * @property {Rule[]} rules
 */

/** @type {DarkModeConfig} */
export const DEFAULT_CONFIG = {
  shadeMap: { ...SHADE_MAP },
  colorMap: { ...COLOR_MAP },
  utilities: {
    bg: true,
    text: true,
    border: true,
    ring: true,
    divide: true,
    outline: true,
    shadow: true,
    accent: true,
    caret: true,
    fill: true,
    stroke: true,
    decoration: true,
    placeholder: true,
  },
  rules: [],
}

/** @returns {DarkModeConfig} */
function createDefaultConfig() {
  return {
    shadeMap: { ...DEFAULT_CONFIG.shadeMap },
    colorMap: { ...DEFAULT_CONFIG.colorMap },
    utilities: { ...DEFAULT_CONFIG.utilities },
    rules: [],
  }
}

/**
 * Merge raw (possibly partial/corrupt) data with defaults, dropping invalid fields.
 *
 * @param {unknown} rawData
 * @returns {DarkModeConfig}
 */
export function normalizeConfig(rawData) {
  if (!rawData || typeof rawData !== 'object') {
    return createDefaultConfig()
  }

  const rawConfigRecord = /** @type {Record<string, unknown>} */ (rawData)

  return {
    shadeMap: normalizeShadeMap(rawConfigRecord.shadeMap),
    colorMap: normalizeColorMap(rawConfigRecord.colorMap),
    utilities: normalizeUtilities(rawConfigRecord.utilities),
    rules: normalizeRules(rawConfigRecord.rules),
  }
}

/** @param {unknown} rawData @returns {DarkModeConfig['shadeMap']} */
function normalizeShadeMap(rawData) {
  if (!rawData || typeof rawData !== 'object') {
    return { ...DEFAULT_CONFIG.shadeMap }
  }

  const normalizedShadeMap = { ...DEFAULT_CONFIG.shadeMap }

  for (const [shadeKey, shadeValue] of Object.entries(rawData)) {
    const parsedShade = parseInt(shadeKey, 10)

    if (!isNaN(parsedShade) && typeof shadeValue === 'number') {
      normalizedShadeMap[parsedShade] = shadeValue
    }
  }

  return normalizedShadeMap
}

/** @param {unknown} rawData @returns {DarkModeConfig['colorMap']} */
function normalizeColorMap(rawData) {
  if (!rawData || typeof rawData !== 'object') {
    return { ...DEFAULT_CONFIG.colorMap }
  }

  const normalizedColorMap = { ...DEFAULT_CONFIG.colorMap }

  for (const [colorKey, colorValue] of Object.entries(rawData)) {
    if (typeof colorKey === 'string' && typeof colorValue === 'string') {
      normalizedColorMap[colorKey] = colorValue
    }
  }

  return normalizedColorMap
}

/** @param {unknown} rawData @returns {DarkModeConfig['utilities']} */
function normalizeUtilities(rawData) {
  if (!rawData || typeof rawData !== 'object') {
    return { ...DEFAULT_CONFIG.utilities }
  }

  const normalizedUtilities = { ...DEFAULT_CONFIG.utilities }

  for (const [utilityKey, utilityValue] of Object.entries(rawData)) {
    if (typeof utilityKey === 'string' && typeof utilityValue === 'boolean') {
      normalizedUtilities[utilityKey] = utilityValue
    }
  }

  return normalizedUtilities
}

/** @param {unknown} rawData @returns {Rule[]} */
function normalizeRules(rawData) {
  if (!Array.isArray(rawData)) {
    return []
  }

  return rawData.map(normalizeRule).filter(Boolean)
}

/** @param {unknown} rawRule @returns {Rule | null} */
function normalizeRule(rawRule) {
  if (!rawRule || typeof rawRule !== 'object') {
    return null
  }

  const ruleRecord = /** @type {Record<string, unknown>} */ (rawRule)

  if (typeof ruleRecord.id !== 'string') {
    return null
  }

  // Migrate old `utility: string` field to `utilities: string[]`
  let utilityList = null
  if (Array.isArray(ruleRecord.utilities)) {
    utilityList = ruleRecord.utilities.filter((utilityItem) => typeof utilityItem === 'string')
  } else if (typeof ruleRecord.utility === 'string' && ruleRecord.utility) {
    utilityList = [ruleRecord.utility]
  }

  return {
    id: ruleRecord.id,
    name: typeof ruleRecord.name === 'string' ? ruleRecord.name : '',
    enabled: typeof ruleRecord.enabled === 'boolean' ? ruleRecord.enabled : true,
    utilities: utilityList && utilityList.length > 0 ? utilityList : null,
    shade: typeof ruleRecord.shade === 'number' ? ruleRecord.shade : null,
    colors: Array.isArray(ruleRecord.colors)
      ? ruleRecord.colors.filter((colorItem) => typeof colorItem === 'string')
      : null,
    darkShade: typeof ruleRecord.darkShade === 'number' ? ruleRecord.darkShade : null,
    darkColor:
      typeof ruleRecord.darkColor === 'string' && ruleRecord.darkColor
        ? ruleRecord.darkColor
        : null,
    excludeElements: Array.isArray(ruleRecord.excludeElements)
      ? ruleRecord.excludeElements.filter((elementItem) => typeof elementItem === 'string')
      : [],
    excludeColors: Array.isArray(ruleRecord.excludeColors)
      ? ruleRecord.excludeColors.filter((colorItem) => typeof colorItem === 'string')
      : [],
  }
}

// Browser-only helpers (guard against SSR / Node)

/** @returns {DarkModeConfig} */
export function loadConfig() {
  if (typeof localStorage === 'undefined') {
    return createDefaultConfig()
  }

  try {
    const storedJson = localStorage.getItem(STORAGE_KEY)

    if (!storedJson) {
      return createDefaultConfig()
    }

    return normalizeConfig(JSON.parse(storedJson))
  } catch {
    return createDefaultConfig()
  }
}

/** @param {DarkModeConfig} configData @returns {void} */
export function saveConfig(configData) {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configData))
  } catch {
    // quota exceeded etc. — silently ignore
  }
}

/** @returns {DarkModeConfig} */
export function resetConfig() {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return createDefaultConfig()
}

/** @param {DarkModeConfig} configData @returns {string} */
export function exportConfig(configData) {
  return JSON.stringify(configData, null, 2)
}

/**
 * @param {string} jsonString
 * @returns {{ ok: true, config: DarkModeConfig } | { ok: false, error: string }}
 */
export function importConfig(jsonString) {
  try {
    const parsedJson = JSON.parse(jsonString)
    const normalizedConfig = normalizeConfig(parsedJson)

    return { ok: true, config: normalizedConfig }
  } catch {
    return { ok: false, error: 'Invalid JSON' }
  }
}
