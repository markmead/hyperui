import { FORM_INPUT_CLASS, NUMBER_INPUT_CLASS } from './element-constants.js'

export function buildRuleElement(ruleData, ruleIndex, { onDelete, onChange }) {
  const ruleListItem = document.createElement('li')

  ruleListItem.innerHTML = `
    <details class="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <summary class="flex cursor-pointer items-center justify-between gap-2 p-4 transition-colors hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
        <div class="flex min-w-0 items-center gap-2">
          <input type="checkbox" class="rule-enabled size-5 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-1" aria-label="Enable rule" />
          <span class="rule-name-display min-w-0 flex-1 cursor-text truncate text-sm font-medium text-gray-700"></span>
          <input type="text" class="rule-name-input hidden min-w-0 flex-1 rounded border border-gray-200 bg-white px-2 py-0.5 text-sm font-medium text-gray-700 focus:border-gray-400 focus:outline-none" />
        </div>
        <div class="flex shrink-0 items-center gap-1">
          <svg data-rule-chevron class="size-4 shrink-0 text-gray-600 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          <button type="button" class="rule-delete rounded p-0.5 text-gray-600 transition-colors hover:text-red-600" aria-label="Delete rule">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4" aria-hidden="true"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </summary>

      <div class="space-y-4 border-t border-gray-200 p-4">
        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700">Apply when</h4>
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
          <h4 class="mb-2 text-sm font-medium text-gray-700">In dark mode</h4>
          <label class="block text-sm text-gray-600">
            Use shade (blank = shade map)
            <input type="number" class="rule-dark-shade ${NUMBER_INPUT_CLASS}" placeholder="e.g. 300" min="50" max="950" step="50" />
          </label>
        </div>

        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700">Skip when</h4>
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

  const ruleDetailsEl = ruleListItem.querySelector('details')
  const ruleChevronEl = ruleListItem.querySelector('[data-rule-chevron]')

  ruleDetailsEl?.addEventListener('toggle', () => {
    ruleChevronEl?.classList.toggle('rotate-180', ruleDetailsEl.open)
  })

  const enabledCheckbox = ruleListItem.querySelector('.rule-enabled')
  enabledCheckbox.checked = ruleData.enabled
  enabledCheckbox.addEventListener('click', (clickEvent) => {
    clickEvent.stopPropagation()
  })

  const defaultRuleName = `Rule ${ruleIndex + 1}`
  const ruleNameDisplay = ruleListItem.querySelector('.rule-name-display')
  const ruleNameInput = ruleListItem.querySelector('.rule-name-input')

  ruleNameDisplay.textContent = ruleData.name || defaultRuleName

  ruleNameDisplay.addEventListener('click', (clickEvent) => {
    clickEvent.stopPropagation()
    ruleNameInput.value = ruleData.name || ''
    ruleNameInput.placeholder = defaultRuleName
    ruleNameDisplay.classList.add('hidden')
    ruleNameInput.classList.remove('hidden')
    ruleNameInput.focus()
    ruleNameInput.select()
  })

  ruleNameInput.addEventListener('click', (clickEvent) => {
    clickEvent.stopPropagation()
  })

  ruleNameInput.addEventListener('keydown', (keyEvent) => {
    keyEvent.stopPropagation()
    if (keyEvent.key === 'Enter') {
      keyEvent.preventDefault()
      ruleNameInput.blur()
    }
    if (keyEvent.key === 'Escape') {
      ruleNameInput.value = ruleData.name || ''
      ruleNameInput.blur()
    }
  })

  ruleNameInput.addEventListener('blur', () => {
    const updatedName = ruleNameInput.value.trim()
    ruleData.name = updatedName
    ruleNameDisplay.textContent = updatedName || defaultRuleName
    ruleNameInput.classList.add('hidden')
    ruleNameDisplay.classList.remove('hidden')
    onChange()
  })

  const utilitiesInput = ruleListItem.querySelector('.rule-utilities')
  utilitiesInput.value = (ruleData.utilities ?? []).join(', ')

  const shadeInput = ruleListItem.querySelector('.rule-shade')
  if (ruleData.shade !== null) {
    shadeInput.value = String(ruleData.shade)
  }

  const darkShadeInput = ruleListItem.querySelector('.rule-dark-shade')
  if (ruleData.darkShade !== null) {
    darkShadeInput.value = String(ruleData.darkShade)
  }

  const colorsInput = ruleListItem.querySelector('.rule-colors')
  colorsInput.value = (ruleData.colors ?? []).join(', ')

  const excludeElementsInput = ruleListItem.querySelector('.rule-exclude-elements')
  excludeElementsInput.value = ruleData.excludeElements.join(', ')

  const excludeColorsInput = ruleListItem.querySelector('.rule-exclude-colors')
  excludeColorsInput.value = ruleData.excludeColors.join(', ')

  enabledCheckbox.addEventListener('change', () => {
    ruleData.enabled = enabledCheckbox.checked
    onChange()
  })

  ruleListItem.querySelector('.rule-delete')?.addEventListener('click', (clickEvent) => {
    clickEvent.preventDefault()
    onDelete(ruleData.id)
  })

  function bindRuleInput(inputSelector, updateCallback) {
    ruleListItem.querySelector(inputSelector)?.addEventListener('change', (changeEvent) => {
      updateCallback(changeEvent.target.value)
      onChange()
    })
  }

  bindRuleInput('.rule-utilities', (inputValue) => {
    const parsedItems = inputValue
      .split(',')
      .map((rawEntry) => rawEntry.trim())
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
      .map((rawEntry) => rawEntry.trim())
      .filter(Boolean)
    ruleData.colors = parsedItems.length > 0 ? parsedItems : null
  })

  bindRuleInput('.rule-exclude-elements', (inputValue) => {
    ruleData.excludeElements = inputValue
      .split(',')
      .map((rawEntry) => rawEntry.trim().toLowerCase())
      .filter(Boolean)
  })

  bindRuleInput('.rule-exclude-colors', (inputValue) => {
    ruleData.excludeColors = inputValue
      .split(',')
      .map((rawEntry) => rawEntry.trim())
      .filter(Boolean)
  })

  return ruleListItem
}
