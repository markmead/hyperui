import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { useCopyToClipboard } from 'react-use'

export default function PreviewTitle({ componentTitle, shareUrl }) {
  const pagePathname = usePathname()

  const [buttonEmoji, setButtonEmoji] = useState('🔗')
  const [copyStatus, copyToClipboard] = useCopyToClipboard()

  const showShare = pagePathname !== '/favourites'

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
      {showShare && (
        <button
          type="button"
          className="hidden size-8 place-content-center rounded-lg border border-stone-300 text-sm shadow-sm transition-colors hover:bg-stone-100 sm:grid"
          aria-label="Copy URL"
          onClick={handleCopyToClipboard}
        >
          <span aria-hidden="true">{buttonEmoji}</span>
        </button>
      )}

      <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">{componentTitle}</h2>
    </div>
  )
}
