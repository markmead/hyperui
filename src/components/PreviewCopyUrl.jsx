import { useState, useId, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { useCopyToClipboard } from 'react-use'

export default function PreviewCopyUrl({ shareUrl }) {
  const pagePathname = usePathname()
  const liveRegionId = useId()
  const resetTimerRef = useRef(null)

  const [buttonEmoji, setButtonEmoji] = useState('🔗')
  const [copyStatus, copyToClipboard] = useCopyToClipboard()
  const [announceText, setAnnounceText] = useState('')

  const showShare = pagePathname !== '/favourites'

  useEffect(() => {
    if (!copyStatus) {
      return
    }

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }

    if (copyStatus.error) {
      setButtonEmoji('🚨')
      setAnnounceText('Failed to copy URL')
    }

    if (copyStatus.value) {
      setButtonEmoji('🎉')
      setAnnounceText('Copied URL to clipboard')
    }

    resetTimerRef.current = setTimeout(() => {
      setButtonEmoji('📋')
    }, 3000)

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [copyStatus])

  function handleCopyToClipboard() {
    setAnnounceText('')
    copyToClipboard(shareUrl)
  }

  return (
    <>
      {showShare && (
        <>
          <button
            type="button"
            className="hidden size-8 place-content-center rounded-lg border border-stone-300 text-sm shadow-sm transition-colors hover:bg-stone-100 md:grid"
            aria-label="Copy URL"
            aria-describedby={liveRegionId}
            onClick={handleCopyToClipboard}
          >
            <span aria-hidden="true">{buttonEmoji}</span>
          </button>

          <span
            id={liveRegionId}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {announceText}
          </span>
        </>
      )}
    </>
  )
}
