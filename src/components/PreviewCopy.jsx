import { useState, useId, useEffect, useRef } from 'react'

import { useCopyToClipboard } from 'react-use'

import Button from '@component/global/Button'
import Tooltip from '@component/global/Tooltip'

export default function PreviewCopy({ componentCode = '' }) {
  const liveRegionId = useId()
  const resetTimerRef = useRef(null)

  const [buttonText, setButtonText] = useState('Copy')
  const [buttonEmoji, setButtonEmoji] = useState('📋')
  const [copyStatus, copyToClipboard] = useCopyToClipboard()
  const [announceText, setAnnounceText] = useState('')

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
      setButtonText('Error')
      setAnnounceText('Failed to copy code')
    }

    if (copyStatus.value) {
      setButtonEmoji('🎉')
      setButtonText('Copied')
      setAnnounceText('Copied code to clipboard')
    }

    resetTimerRef.current = setTimeout(() => {
      setButtonEmoji('📋')
      setButtonText('Copy')
    }, 1500)

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [copyStatus])

  function handleCopyToClipboard() {
    setAnnounceText('')
    copyToClipboard(componentCode)
  }

  return (
    <span className="hidden sm:block">
      <Tooltip tooltipContent="Copy code">
        <Button
          aria-label="Copy code"
          aria-describedby={liveRegionId}
          onClick={handleCopyToClipboard}
        >
          <span aria-hidden="true">{buttonEmoji}</span>
          <span>{buttonText}</span>
        </Button>
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
