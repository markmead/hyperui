let currentInspectorAbortController = null

export function buildRuleListItem(ruleData, ruleIndex, { onConfigure, onDelete, onToggleEnabled }) {
  const li = document.createElement('li')
  li.className = 'flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2'

  const defaultRuleName = `Rule ${ruleIndex + 1}`

  li.innerHTML = `
    <input
      type="checkbox"
      class="rule-enabled size-4 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-1"
      aria-label="Enable rule"
    />
    <span class="min-w-0 flex-1 truncate text-sm font-medium text-gray-700"></span>
    <button
      type="button"
      data-configure-rule
      class="shrink-0 rounded px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
    >Configure</button>
    <button
      type="button"
      class="rule-delete shrink-0 rounded p-0.5 text-gray-600 transition-colors hover:text-red-600"
      aria-label="Delete rule"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4" aria-hidden="true"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    </button>
  `

  const enabledCheckbox = li.querySelector('.rule-enabled')
  enabledCheckbox.checked = ruleData.enabled
  enabledCheckbox.addEventListener('change', () => {
    ruleData.enabled = enabledCheckbox.checked
    onToggleEnabled()
  })

  li.querySelector('span').textContent = ruleData.name || defaultRuleName

  li.querySelector('[data-configure-rule]').addEventListener('click', () => {
    onConfigure(ruleData.id)
  })

  li.querySelector('.rule-delete').addEventListener('click', () => {
    onDelete(ruleData.id)
  })

  return li
}

export function bindInspector(inspectorEl, ruleData, { onChange }) {
  if (currentInspectorAbortController) {
    currentInspectorAbortController.abort()
  }
  currentInspectorAbortController = new AbortController()
  const { signal } = currentInspectorAbortController

  const nameHeading = inspectorEl.querySelector('[data-inspector-rule-name]')
  const nameInput = inspectorEl.querySelector('[data-inspector-name]')
  const utilitiesInput = inspectorEl.querySelector('[data-inspector-utilities]')
  const shadeInput = inspectorEl.querySelector('[data-inspector-shade]')
  const colorsInput = inspectorEl.querySelector('[data-inspector-colors]')
  const darkShadeInput = inspectorEl.querySelector('[data-inspector-dark-shade]')
  const excludeElementsInput = inspectorEl.querySelector('[data-inspector-exclude-elements]')
  const excludeColorsInput = inspectorEl.querySelector('[data-inspector-exclude-colors]')

  nameInput.value = ruleData.name || ''
  utilitiesInput.value = (ruleData.utilities ?? []).join(', ')
  shadeInput.value = ruleData.shade !== null ? String(ruleData.shade) : ''
  colorsInput.value = (ruleData.colors ?? []).join(', ')
  darkShadeInput.value = ruleData.darkShade !== null ? String(ruleData.darkShade) : ''
  excludeElementsInput.value = ruleData.excludeElements.join(', ')
  excludeColorsInput.value = ruleData.excludeColors.join(', ')

  nameHeading.textContent = ruleData.name || 'Rule'

  nameInput.addEventListener(
    'change',
    () => {
      ruleData.name = nameInput.value.trim()
      nameHeading.textContent = ruleData.name || 'Rule'
      onChange()
    },
    { signal },
  )

  utilitiesInput.addEventListener(
    'change',
    () => {
      const items = utilitiesInput.value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      ruleData.utilities = items.length > 0 ? items : null
      onChange()
    },
    { signal },
  )

  shadeInput.addEventListener(
    'change',
    () => {
      const n = parseInt(shadeInput.value, 10)
      ruleData.shade = isNaN(n) ? null : n
      onChange()
    },
    { signal },
  )

  colorsInput.addEventListener(
    'change',
    () => {
      const items = colorsInput.value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      ruleData.colors = items.length > 0 ? items : null
      onChange()
    },
    { signal },
  )

  darkShadeInput.addEventListener(
    'change',
    () => {
      const n = parseInt(darkShadeInput.value, 10)
      ruleData.darkShade = isNaN(n) ? null : n
      onChange()
    },
    { signal },
  )

  excludeElementsInput.addEventListener(
    'change',
    () => {
      ruleData.excludeElements = excludeElementsInput.value
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
      onChange()
    },
    { signal },
  )

  excludeColorsInput.addEventListener(
    'change',
    () => {
      ruleData.excludeColors = excludeColorsInput.value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      onChange()
    },
    { signal },
  )
}
