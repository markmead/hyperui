import { RefObject, useEffect } from 'react'

export function useClickOutside(
  targetRef: RefObject<HTMLElement>,
  targetValue: boolean,
  targetHandler: CallableFunction
) {
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  })

  function handleClickOutside(e: Event) {
    const dropdownEl = targetRef.current as HTMLDivElement | null
    const clickEl = e.target as HTMLElement

    if (dropdownEl && !dropdownEl.contains(clickEl)) {
      targetHandler()
    }
  }

  function handleEscape(e: KeyboardEvent) {
    if (!targetValue) {
      return
    }

    const isEscape = e.key === 'Escape'
    const inputEl = e.target as HTMLElement

    if (isEscape) {
      inputEl.blur()

      targetHandler()
    }
  }
}
