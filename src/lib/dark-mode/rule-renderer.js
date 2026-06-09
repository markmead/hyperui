import { FORM_INPUT_CLASS, NUMBER_INPUT_CLASS } from './element-constants.js'

export function updateRuleSummaryText(ruleListItem, ruleData) {
  const summaryElement = ruleListItem.querySelector('.rule-summary')
  if (!summaryElement) {
    return
  }

  const matchParts = []
  if (ruleData.utilities && ruleData.utilities.length > 0) {
    matchParts.push(ruleData.utilities.join('/'))
  }
  if (ruleData.shade !== null) {
    matchParts.push(`shade-${ruleData.shade}`)
  }

  const matchString = matchParts.length > 0 ? matchParts.join(' ') : 'All classes'
  const darkModeString = ruleData.darkShade !== null ? `→ ${ruleData.darkShade}` : '→ shade map'

  const skipParts = []
  if (ruleData.excludeElements.length > 0) {
    skipParts.push(ruleData.excludeElements.join(', '))
  }
  if (ruleData.excludeColors.length > 0) {
    skipParts.push(`${ruleData.excludeColors.join(', ')} colors`)
  }

  const skipString = skipParts.length > 0 ? ` (skip: ${skipParts.join('; ')})` : ''

  summaryElement.textContent = `${matchString} ${darkModeString}${skipString}`
}

export function buildRuleElement(ruleData, { onDelete, onChange }) {
  const ruleListItem = document.createElement('li')

  ruleListItem.innerHTML = `
    <details class="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <summary class="flex cursor-pointer items-center justify-between gap-2 p-3 hover:bg-gray-50 list-none [&::-webkit-details-marker]:hidden">
        <div class="flex min-w-0 items-center gap-2">
          <input type="checkbox" class="rule-enabled size-5 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-1" aria-label="Enable rule" />
          <span class="rule-summary truncate text-xs text-gray-600"></span>
        </div>
        <div class="flex shrink-0 items-center gap-1">
          <svg class="size-3.5 text-gray-400 transition-transform [[open]_&]:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          <button type="button" class="rule-delete rounded p-0.5 text-gray-400 transition-colors hover:text-red-500" aria-label="Delete rule">
            <svg class="size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </summary>

      <div class="space-y-4 border-t border-gray-200 p-3">
        <div>
          <h4 class="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">Apply when</h4>
          <div class="space-y-3">
            <label class="block text-sm text-gray-600">
              Utilities (comma-sep, blank = any)
              <input type="text" class="rule-utilities ${FORM_INPUT_CLASS}" placeholder="e.g. bg, text" />
            </label>
            <label class="block text-sm text-gray-600">
              Shade (blank = any)
              <input type="number" class="rule-shade ${NUMBER_INPUT_CLASS}" placeholder="e.g. 600" min="50" max="950" step="50" />
            </label>
            <label class="block text-sm text-gray-600">
              Include only colors (comma-sep, blank = any)
              <input type="text" class="rule-colors ${FORM_INPUT_CLASS}" placeholder="e.g. blue, indigo" />
            </label>
          </div>
        </div>

        <div>
          <h4 class="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">In dark mode</h4>
          <label class="block text-sm text-gray-600">
            Use shade (blank = shade map)
            <input type="number" class="rule-dark-shade ${NUMBER_INPUT_CLASS}" placeholder="e.g. 300" min="50" max="950" step="50" />
          </label>
        </div>

        <div>
          <h4 class="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">Skip when</h4>
          <div class="space-y-3">
            <label class="block text-sm text-gray-600">
              Elements (comma-sep)
              <input type="text" class="rule-exclude-elements ${FORM_INPUT_CLASS}" placeholder="e.g. button, a" />
            </label>
            <label class="block text-sm text-gray-600">
              Colors (comma-sep)
              <input type="text" class="rule-exclude-colors ${FORM_INPUT_CLASS}" placeholder="e.g. blue, indigo" />
            </label>
          </div>
        </div>
      </div>
    </details>
  `

  const enabledEl = ruleListItem.querySelector('.rule-enabled')
  enabledEl.checked = ruleData.enabled

  const utilitiesEl = ruleListItem.querySelector('.rule-utilities')
  utilitiesEl.value = (ruleData.utilities ?? []).join(', ')

  const shadeInputEl = ruleListItem.querySelector('.rule-shade')
  if (ruleData.shade !== null) {
    shadeInputEl.value = String(ruleData.shade)
  }

  const darkShadeEl = ruleListItem.querySelector('.rule-dark-shade')
  if (ruleData.darkShade !== null) {
    darkShadeEl.value = String(ruleData.darkShade)
  }

  const colorsInputEl = ruleListItem.querySelector('.rule-colors')
  colorsInputEl.value = (ruleData.colors ?? []).join(', ')

  const excludeElementsEl = ruleListItem.querySelector('.rule-exclude-elements')
  excludeElementsEl.value = ruleData.excludeElements.join(', ')

  const excludeColorsEl = ruleListItem.querySelector('.rule-exclude-colors')
  excludeColorsEl.value = ruleData.excludeColors.join(', ')

  updateRuleSummaryText(ruleListItem, ruleData)

  enabledEl.addEventListener('change', () => {
    ruleData.enabled = enabledEl.checked
    updateRuleSummaryText(ruleListItem, ruleData)
    onChange()
  })

  ruleListItem.querySelector('.rule-delete')?.addEventListener('click', (clickEvent) => {
    clickEvent.preventDefault()
    onDelete(ruleData.id)
  })

  function bindRuleInput(selector, updateFn) {
    ruleListItem.querySelector(selector)?.addEventListener('change', (changeEvent) => {
      updateFn(changeEvent.target.value)
      updateRuleSummaryText(ruleListItem, ruleData)
      onChange()
    })
  }

  bindRuleInput('.rule-utilities', (inputValue) => {
    const parsedItems = inputValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    ruleData.utilities = parsedItems.length > 0 ? parsedItems : null
  })

  bindRuleInput('.rule-shade', (inputValue) => {
    const parsedNumber = parseInt(inputValue, 10)
    ruleData.shade = isNaN(parsedNumber) ? null : parsedNumber
  })

  bindRuleInput('.rule-dark-shade', (inputValue) => {
    const parsedNumber = parseInt(inputValue, 10)
    ruleData.darkShade = isNaN(parsedNumber) ? null : parsedNumber
  })

  bindRuleInput('.rule-colors', (inputValue) => {
    const parsedItems = inputValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    ruleData.colors = parsedItems.length > 0 ? parsedItems : null
  })

  bindRuleInput('.rule-exclude-elements', (inputValue) => {
    ruleData.excludeElements = inputValue
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  })

  bindRuleInput('.rule-exclude-colors', (inputValue) => {
    ruleData.excludeColors = inputValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  })

  return ruleListItem
}
