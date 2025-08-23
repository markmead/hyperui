import { useState, useId, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { useCopyToClipboard } from 'react-use'

export default function PreviewTitle({ componentTitle, shareUrl }) {
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
      setButtonText('Error')
      setAnnounceText('Failed to copy URL')
    }

    if (copyStatus.value) {
      setButtonEmoji('🎉')
      setButtonText('Copied')
      setAnnounceText('Copied URL to clipboard')
    }

    resetTimerRef.current = setTimeout(() => {
      setButtonEmoji('📋')
      setButtonText('Copy')
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
    <div className="flex items-center gap-2">
      {showShare && (
        <>
          <button
            type="button"
            className="hidden size-8 place-content-center rounded-lg border border-stone-300 text-sm shadow-sm transition-colors hover:bg-stone-100 sm:grid"
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

      <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">{componentTitle}</h2>
    </div>
  )
}
