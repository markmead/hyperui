import { useEffect } from 'react'

export function useClickOutside(targetRef, targetValue, targetHandler) {
  const handleClickOutside = (e: Event) => {
    const dropdownEl = targetRef.current as HTMLDivElement | null
    const clickEl = e.target as HTMLElement

    if (dropdownEl && !dropdownEl.contains(clickEl)) {
      targetHandler()
    }
  }

  const handleEscape = (e: KeyboardEvent) => {
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

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  })
}
