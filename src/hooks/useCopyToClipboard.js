import { useState, useRef, useEffect } from 'react'

export default function useCopyToClipboard(resetTime = 1500, initialEmoji = '📋') {
  const resetTimerRef = useRef(null)

  const [copyStatus, setCopyStatus] = useState({
    copyValue: '',
    hasCopied: false,
    hasError: false,
    errorMessage: 'Failed to copy to clipboard',
    successMessage: 'Copied to clipboard',
  })

  const [buttonEmoji, setButtonEmoji] = useState(initialEmoji)
  const [buttonText, setButtonText] = useState('Copy')
  const [announceText, setAnnounceText] = useState('')

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!copyStatus.hasCopied && !copyStatus.hasError) {
      return
    }

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = undefined
    }

    if (copyStatus.hasError) {
      setButtonEmoji('🚨')
      setButtonText('Error')
      setAnnounceText(copyStatus.errorMessage)
    }

    if (copyStatus.hasCopied) {
      setButtonEmoji('🎉')
      setButtonText('Copied')
      setAnnounceText(copyStatus.successMessage)
    }

    resetTimerRef.current = setTimeout(() => {
      setButtonEmoji(initialEmoji)
      setButtonText('Copy')
    }, resetTime)
  }, [copyStatus, resetTime, initialEmoji])

  async function copyToClipboard(copyText, copyOptions = {}) {
    setAnnounceText('')

    const { successMessage, errorMessage } = copyOptions

    try {
      await navigator.clipboard.writeText(copyText)

      setCopyStatus({
        copyValue: copyText,
        hasCopied: true,
        hasError: false,
        successMessage,
      })
    } catch {
      setCopyStatus({
        copyValue: copyText,
        hasCopied: false,
        hasError: true,
        errorMessage,
      })
    }
  }

  return {
    copyToClipboard,
    buttonEmoji,
    buttonText,
    announceText,
    ...copyStatus,
  }
}
