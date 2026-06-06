import { SHADE_MAP, COLOR_MAP } from '../../constants/dark-mode.js'

const STORAGE_KEY = 'hyperui:dark-mode-generator:v1'

/**
 * @typedef {Object} Rule
 * @property {string} id
 * @property {boolean} enabled
 * @property {string[] | null} [utilities]    - e.g. ['bg','text'] — null means any utility
 * @property {number | null} [shade]          - e.g. 600 — null means any shade
 * @property {string[] | null} [colors]       - allow-list of color families; null means any
 * @property {number | null} [darkShade]      - override target shade; null uses shade map
 * @property {string[]} excludeElements       - e.g. ['button', 'a']
 * @property {string[]} excludeColors         - e.g. ['blue', 'indigo']
 */

/**
 * @typedef {Object} DarkModeConfig
 * @property {{ [shade: number]: number }} shadeMap
 * @property {{ [name: string]: string }} colorMap
 * @property {{ [utility: string]: boolean }} utilities
 * @property {Rule[]} rules
 * @property {boolean} overwriteExisting  - when true, re-transform classes that already have dark:
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
  overwriteExisting: false,
}

/**
 * Merge raw (possibly partial/corrupt) data with defaults, dropping invalid fields.
 *
 * @param {unknown} raw
 * @returns {DarkModeConfig}
 */
export function normalizeConfig(raw) {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_CONFIG }
  }

  const r = /** @type {Record<string, unknown>} */ (raw)

  return {
    shadeMap: normalizeShadeMap(r.shadeMap),
    colorMap: normalizeColorMap(r.colorMap),
    utilities: normalizeUtilities(r.utilities),
    rules: normalizeRules(r.rules),
    overwriteExisting:
      typeof r.overwriteExisting === 'boolean'
        ? r.overwriteExisting
        : DEFAULT_CONFIG.overwriteExisting,
  }
}

/** @param {unknown} raw @returns {DarkModeConfig['shadeMap']} */
function normalizeShadeMap(raw) {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_CONFIG.shadeMap }
  }

  const out = { ...DEFAULT_CONFIG.shadeMap }

  for (const [k, v] of Object.entries(raw)) {
    const shade = parseInt(k, 10)

    if (!isNaN(shade) && typeof v === 'number') {
      out[shade] = v
    }
  }

  return out
}

/** @param {unknown} raw @returns {DarkModeConfig['colorMap']} */
function normalizeColorMap(raw) {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_CONFIG.colorMap }
  }

  const out = { ...DEFAULT_CONFIG.colorMap }

  for (const [k, v] of Object.entries(raw)) {
    if (typeof k === 'string' && typeof v === 'string') {
      out[k] = v
    }
  }

  return out
}

/** @param {unknown} raw @returns {DarkModeConfig['utilities']} */
function normalizeUtilities(raw) {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_CONFIG.utilities }
  }

  const out = { ...DEFAULT_CONFIG.utilities }

  for (const [k, v] of Object.entries(raw)) {
    if (typeof k === 'string' && typeof v === 'boolean') {
      out[k] = v
    }
  }

  return out
}

/** @param {unknown} raw @returns {Rule[]} */
function normalizeRules(raw) {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw.map(normalizeRule).filter(Boolean)
}

/** @param {unknown} r @returns {Rule | null} */
function normalizeRule(r) {
  if (!r || typeof r !== 'object') {
    return null
  }

  const rule = /** @type {Record<string, unknown>} */ (r)

  if (typeof rule.id !== 'string') {
    return null
  }

  // Migrate old `utility: string` field to `utilities: string[]`
  let utilities = null
  if (Array.isArray(rule.utilities)) {
    utilities = rule.utilities.filter((s) => typeof s === 'string')
  } else if (typeof rule.utility === 'string' && rule.utility) {
    utilities = [rule.utility]
  }

  return {
    id: rule.id,
    enabled: typeof rule.enabled === 'boolean' ? rule.enabled : true,
    utilities: utilities && utilities.length > 0 ? utilities : null,
    shade: typeof rule.shade === 'number' ? rule.shade : null,
    colors: Array.isArray(rule.colors) ? rule.colors.filter((s) => typeof s === 'string') : null,
    darkShade: typeof rule.darkShade === 'number' ? rule.darkShade : null,
    excludeElements: Array.isArray(rule.excludeElements)
      ? rule.excludeElements.filter((s) => typeof s === 'string')
      : [],
    excludeColors: Array.isArray(rule.excludeColors)
      ? rule.excludeColors.filter((s) => typeof s === 'string')
      : [],
  }
}

// Browser-only helpers (guard against SSR / Node)

/** @returns {DarkModeConfig} */
export function loadConfig() {
  if (typeof localStorage === 'undefined') {
    return { ...DEFAULT_CONFIG }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return { ...DEFAULT_CONFIG }
    }

    return normalizeConfig(JSON.parse(raw))
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

/** @param {DarkModeConfig} config @returns {void} */
export function saveConfig(config) {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
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

  return { ...DEFAULT_CONFIG }
}

/** @param {DarkModeConfig} config @returns {string} */
export function exportConfig(config) {
  return JSON.stringify(config, null, 2)
}

/**
 * @param {string} json
 * @returns {{ ok: true, config: DarkModeConfig } | { ok: false, error: string }}
 */
export function importConfig(json) {
  try {
    const parsed = JSON.parse(json)
    const config = normalizeConfig(parsed)

    return { ok: true, config }
  } catch {
    return { ok: false, error: 'Invalid JSON' }
  }
}
