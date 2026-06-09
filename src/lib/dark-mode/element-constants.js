export const DEBOUNCE_DELAY_MS = 250

export const INPUT_NO_SPINNER =
  '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'

export const FORM_INPUT_CLASS =
  'mt-1 w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm focus:border-gray-400 focus:outline-none'

export const NUMBER_INPUT_CLASS = `${FORM_INPUT_CLASS} ${INPUT_NO_SPINNER}`

export const ICON_MOVE_RIGHT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4 shrink-0 text-gray-400"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>`

export const ICON_PLUS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3 shrink-0"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`

export const ICON_MINUS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3 shrink-0"><path d="M5 12h14"/></svg>`
