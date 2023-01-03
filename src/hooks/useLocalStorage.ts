import { useEffect } from 'react'

export function useLocalStorage(
  eventKey: string,
  targetHandler: CallableFunction
) {
  useEffect(() => {
    window.addEventListener(eventKey, handlerFunction)

    return () => {
      window.removeEventListener(eventKey, handlerFunction)
    }
  })

  function handlerFunction() {
    targetHandler()
  }
}
