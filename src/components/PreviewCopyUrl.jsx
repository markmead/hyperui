import { useState, useId, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { useCopyToClipboard } from 'react-use'

import Tooltip from '@component/global/Tooltip'

export default function PreviewCopyUrl({ shareUrl }) {
  const pagePathname = usePathname()
  const liveRegionId = useId()
  const resetTimerRef = useRef(null)

  const [buttonEmoji, setButtonEmoji] = useState('🔗')
  const [copyStatus, copyToClipboard] = useCopyToClipboard()
  const [announceText, setAnnounceText] = useState('')

  const showShare = pagePathname !== '/favourites'

  useEffect(() => {
    if (!copyStatus?.value) {
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
      setButtonEmoji('🔗')
    }, 1500)

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

  if (!showShare) {
    return <></>
  }

  return (
    <span>
      <Tooltip tooltipContent="Copy URL">
        <button
          type="button"
          className="hidden size-8 place-content-center rounded-lg border border-stone-300 text-sm shadow-sm transition-colors hover:bg-stone-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:grid"
          aria-label="Copy URL"
          aria-describedby={liveRegionId}
          onClick={handleCopyToClipboard}
        >
          <span aria-hidden="true">{buttonEmoji}</span>
        </button>
      </Tooltip>

      <span
        id={liveRegionId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announceText}
      </span>
    </span>
  )
}
