import { useState, useEffect, useRef } from 'react'

export default function useDebounce(inputValue, delayInMilliseconds) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue)
  const debounceTimerRef = useRef(null)

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, delayInMilliseconds)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [inputValue, delayInMilliseconds])

  return debouncedValue
}
