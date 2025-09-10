import { useEffect, useRef } from 'react'

export default function useClickOutside(targetRef, clickHandler) {
  const handlerRef = useRef(clickHandler)

  useEffect(() => {
    handlerRef.current = clickHandler
  }, [clickHandler])

  useEffect(() => {
    function clickListener(clickEvent) {
      if (!targetRef.current || targetRef.current.contains(clickEvent.target)) {
        return
      }

      handlerRef.current(clickEvent)
    }

    document.addEventListener('mousedown', clickListener)
    document.addEventListener('touchstart', clickListener)

    return () => {
      document.removeEventListener('mousedown', clickListener)
      document.removeEventListener('touchstart', clickListener)
    }
  }, [targetRef])
}
