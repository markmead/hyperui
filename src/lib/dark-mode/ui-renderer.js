import { INPUT_NO_SPINNER, ICON_MOVE_RIGHT, ICON_PLUS, ICON_MINUS } from './element-constants.js'
import { buildRuleListItem } from './rule-renderer.js'

export function renderUtilityToggles(containerElement, configData, onChangeCallback) {
  containerElement.innerHTML = ''

  for (const [utilityName, isEnabled] of Object.entries(configData.utilities)) {
    const toggleLabel = document.createElement('label')
    toggleLabel.className = 'cursor-pointer'

    const toggleCheckbox = document.createElement('input')
    toggleCheckbox.type = 'checkbox'
    toggleCheckbox.className = 'sr-only peer'
    toggleCheckbox.checked = isEnabled
    toggleCheckbox.setAttribute('aria-label', `${isEnabled ? 'Disable' : 'Enable'} ${utilityName}`)

    toggleCheckbox.addEventListener('change', () => {
      configData.utilities[utilityName] = toggleCheckbox.checked
      toggleCheckbox.setAttribute(
        'aria-label',
        `${toggleCheckbox.checked ? 'Disable' : 'Enable'} ${utilityName}`,
      )
      onChangeCallback()
    })

    const disabledPill = document.createElement('span')
    disabledPill.className =
      'peer-checked:hidden inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-500'
    disabledPill.innerHTML = `${ICON_PLUS}${utilityName}`

    const enabledPill = document.createElement('span')
    enabledPill.className =
      'hidden peer-checked:inline-flex items-center gap-1 rounded-full border border-gray-900 bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white'
    enabledPill.innerHTML = `${ICON_MINUS}${utilityName}`

    toggleLabel.appendChild(toggleCheckbox)
    toggleLabel.appendChild(disabledPill)
    toggleLabel.appendChild(enabledPill)
    containerElement.appendChild(toggleLabel)
  }
}

export function renderShadeMap(containerElement, configData, onChangeCallback) {
  containerElement.innerHTML = ''

  for (const [shadeValue, darkShadeValue] of Object.entries(configData.shadeMap)) {
    const shadeWrapper = document.createElement('div')
    shadeWrapper.className = 'flex items-center gap-2'

    const shadeLabel = document.createElement('span')
    shadeLabel.className = 'w-8 text-right shrink-0 text-sm font-medium text-gray-700'
    shadeLabel.textContent = shadeValue

    const iconWrapper = document.createElement('span')
    iconWrapper.innerHTML = ICON_MOVE_RIGHT

    const inputId = `dark-mode-shade-${shadeValue}`

    const visualLabel = document.createElement('label')
    visualLabel.className = 'sr-only'
    visualLabel.setAttribute('for', inputId)
    visualLabel.textContent = `Dark shade for shade-${shadeValue}`

    const shadeInput = document.createElement('input')
    shadeInput.type = 'number'
    shadeInput.id = inputId
    shadeInput.className = `w-16 rounded-md border-gray-200 align-bottom text-sm ${INPUT_NO_SPINNER}`
    shadeInput.value = String(darkShadeValue)
    shadeInput.min = '50'
    shadeInput.max = '950'
    shadeInput.step = '50'

    shadeInput.addEventListener('change', () => {
      const parsedValue = parseInt(shadeInput.value, 10)
      if (!isNaN(parsedValue)) {
        configData.shadeMap[parseInt(shadeValue, 10)] = parsedValue
        onChangeCallback()
      }
    })

    shadeWrapper.appendChild(visualLabel)
    shadeWrapper.appendChild(shadeLabel)
    shadeWrapper.appendChild(iconWrapper)
    shadeWrapper.appendChild(shadeInput)
    containerElement.appendChild(shadeWrapper)
  }
}

export function renderRules(containerElement, configData, { onDelete, onChange, onConfigure }) {
  containerElement.innerHTML = ''

  if (configData.rules.length === 0) {
    const emptyMessage = document.createElement('p')
    emptyMessage.className = 'text-sm text-gray-600'
    emptyMessage.textContent = 'No rules. Add one to override shade map defaults.'
    containerElement.appendChild(emptyMessage)
    return
  }

  configData.rules.forEach((ruleData, ruleIndex) => {
    containerElement.appendChild(
      buildRuleListItem(ruleData, ruleIndex, {
        onConfigure,
        onDelete,
        onToggleEnabled: onChange,
      }),
    )
  })
}
