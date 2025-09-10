import { useEffect } from 'react'

export default function useClickOutside(targetRef, clickHandler) {
  useEffect(() => {
    function clickListener(clickEvent) {
      if (!targetRef.current || targetRef.current.contains(clickEvent.target)) {
        return
      }

      clickHandler(clickEvent)
    }

    document.addEventListener('mousedown', clickListener)
    document.addEventListener('touchstart', clickListener)

    return () => {
      document.removeEventListener('mousedown', clickListener)
      document.removeEventListener('touchstart', clickListener)
    }
  }, [targetRef, clickHandler])
}
