import { useState } from 'react'

import { useCopyToClipboard } from 'react-use'

export default function PreviewTitle({ componentTitle, shareUrl }) {
  const [buttonEmoji, setButtonEmoji] = useState('🔗')
  const [copyStatus, copyToClipboard] = useCopyToClipboard()

  function handleCopyToClipboard() {
    copyToClipboard(shareUrl)

    if (copyStatus.error) {
      setButtonEmoji('🚨')

      return
    }

    setButtonEmoji('🎉')

    setTimeout(() => {
      setButtonEmoji('🔗')
    }, 3000)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="grid size-8 place-content-center rounded-lg border border-stone-300 text-sm shadow-sm transition-colors hover:bg-stone-100"
        aria-label="Copy URL to clipboard"
        onClick={handleCopyToClipboard}
      >
        <span aria-hidden="true">{buttonEmoji}</span>
      </button>

      <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">{componentTitle}</h2>
    </div>
  )
}
