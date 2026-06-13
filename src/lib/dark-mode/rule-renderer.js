const INSPECTOR_ABORT_KEY = Symbol('inspectorAbortController')
const INSPECTOR_FLUSH_KEY = Symbol('inspectorFlush')

export function buildRuleListItem(ruleData, ruleIndex, { onConfigure, onDelete, onToggleEnabled }) {
  const ruleListItem = document.createElement('li')
  ruleListItem.className = 'flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2'

  const defaultRuleName = `Rule ${ruleIndex + 1}`

  ruleListItem.innerHTML = `
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

  const enabledCheckbox = ruleListItem.querySelector('.rule-enabled')
  enabledCheckbox.checked = ruleData.enabled
  enabledCheckbox.addEventListener('change', () => {
    ruleData.enabled = enabledCheckbox.checked
    onToggleEnabled()
  })

  ruleListItem.querySelector('span').textContent = ruleData.name || defaultRuleName

  ruleListItem.querySelector('[data-configure-rule]').addEventListener('click', () => {
    onConfigure(ruleData.id)
  })

  ruleListItem.querySelector('.rule-delete').addEventListener('click', () => {
    onDelete(ruleData.id)
  })

  return ruleListItem
}

export function bindInspector(inspectorElement, ruleData, ruleIndex, { onChange, onNameChange }) {
  const previousFlush = inspectorElement[INSPECTOR_FLUSH_KEY]
  if (previousFlush) {
    previousFlush()
  }

  if (inspectorElement[INSPECTOR_ABORT_KEY]) {
    inspectorElement[INSPECTOR_ABORT_KEY].abort()
  }

  const abortController = new AbortController()
  inspectorElement[INSPECTOR_ABORT_KEY] = abortController
  const { signal: abortSignal } = abortController

  const defaultRuleName = `Rule ${ruleIndex + 1}`

  const nameDisplay = inspectorElement.querySelector('[data-inspector-name-display]')
  const nameEditButton = inspectorElement.querySelector('[data-inspector-name-edit]')
  const nameInput = inspectorElement.querySelector('[data-inspector-name]')
  const utilitiesInput = inspectorElement.querySelector('[data-inspector-utilities]')
  const shadeInput = inspectorElement.querySelector('[data-inspector-shade]')
  const colorsInput = inspectorElement.querySelector('[data-inspector-colors]')
  const darkShadeInput = inspectorElement.querySelector('[data-inspector-dark-shade]')
  const darkColorInput = inspectorElement.querySelector('[data-inspector-dark-color]')
  const excludeElementsInput = inspectorElement.querySelector('[data-inspector-exclude-elements]')
  const excludeColorsInput = inspectorElement.querySelector('[data-inspector-exclude-colors]')

  nameDisplay.textContent = ruleData.name || defaultRuleName
  nameInput.value = ruleData.name || ''
  nameInput.placeholder = defaultRuleName
  utilitiesInput.value = (ruleData.utilities ?? []).join(', ')
  shadeInput.value = ruleData.shade !== null ? String(ruleData.shade) : ''
  colorsInput.value = (ruleData.colors ?? []).join(', ')
  darkShadeInput.value = ruleData.darkShade !== null ? String(ruleData.darkShade) : ''
  darkColorInput.value = ruleData.darkColor ?? ''
  excludeElementsInput.value = ruleData.excludeElements.join(', ')
  excludeColorsInput.value = ruleData.excludeColors.join(', ')

  nameInput.classList.add('hidden')
  nameDisplay.classList.remove('hidden')
  nameEditButton.classList.remove('hidden')

  inspectorElement[INSPECTOR_FLUSH_KEY] = () => {
    if (!nameInput.classList.contains('hidden')) {
      const pendingName = nameInput.value.trim()
      if (pendingName !== (ruleData.name || '')) {
        ruleData.name = pendingName
        onNameChange()
      }
    }
    inspectorElement[INSPECTOR_FLUSH_KEY] = null
  }

  nameEditButton.addEventListener(
    'click',
    () => {
      nameInput.value = ruleData.name || ''
      nameDisplay.classList.add('hidden')
      nameEditButton.classList.add('hidden')
      nameInput.classList.remove('hidden')
      nameInput.focus()
      nameInput.select()
    },
    { signal: abortSignal },
  )

  nameInput.addEventListener(
    'keydown',
    (keyEvent) => {
      if (keyEvent.key === 'Enter') {
        keyEvent.preventDefault()
        nameInput.blur()
      }
      if (keyEvent.key === 'Escape') {
        nameInput.value = ruleData.name || ''
        nameInput.blur()
      }
    },
    { signal: abortSignal },
  )

  nameInput.addEventListener(
    'blur',
    () => {
      const updatedName = nameInput.value.trim()
      if (updatedName !== (ruleData.name || '')) {
        ruleData.name = updatedName
        nameDisplay.textContent = updatedName || defaultRuleName
        onNameChange()
      } else {
        nameDisplay.textContent = ruleData.name || defaultRuleName
      }
      nameInput.classList.add('hidden')
      nameDisplay.classList.remove('hidden')
      nameEditButton.classList.remove('hidden')
    },
    { signal: abortSignal },
  )

  utilitiesInput.addEventListener(
    'change',
    () => {
      const parsedItems = utilitiesInput.value
        .split(',')
        .map((rawEntry) => rawEntry.trim())
        .filter(Boolean)
      ruleData.utilities = parsedItems.length > 0 ? parsedItems : null
      onChange()
    },
    { signal: abortSignal },
  )

  shadeInput.addEventListener(
    'change',
    () => {
      const parsedNumber = parseInt(shadeInput.value, 10)
      ruleData.shade = isNaN(parsedNumber) ? null : parsedNumber
      onChange()
    },
    { signal: abortSignal },
  )

  colorsInput.addEventListener(
    'change',
    () => {
      const parsedItems = colorsInput.value
        .split(',')
        .map((rawEntry) => rawEntry.trim())
        .filter(Boolean)
      ruleData.colors = parsedItems.length > 0 ? parsedItems : null
      onChange()
    },
    { signal: abortSignal },
  )

  darkShadeInput.addEventListener(
    'change',
    () => {
      const parsedNumber = parseInt(darkShadeInput.value, 10)
      ruleData.darkShade = isNaN(parsedNumber) ? null : parsedNumber
      onChange()
    },
    { signal: abortSignal },
  )

  darkColorInput.addEventListener(
    'change',
    () => {
      ruleData.darkColor = darkColorInput.value.trim() || null
      onChange()
    },
    { signal: abortSignal },
  )

  excludeElementsInput.addEventListener(
    'change',
    () => {
      ruleData.excludeElements = excludeElementsInput.value
        .split(',')
        .map((rawEntry) => rawEntry.trim().toLowerCase())
        .filter(Boolean)
      onChange()
    },
    { signal: abortSignal },
  )

  excludeColorsInput.addEventListener(
    'change',
    () => {
      ruleData.excludeColors = excludeColorsInput.value
        .split(',')
        .map((rawEntry) => rawEntry.trim())
        .filter(Boolean)
      onChange()
    },
    { signal: abortSignal },
  )
}
