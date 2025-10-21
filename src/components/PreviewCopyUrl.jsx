import { useId } from 'react'
import { usePathname } from 'next/navigation'

import useCopyToClipboard from '@hook/useCopyToClipboard'

import Tooltip from '@component/global/Tooltip'

export default function PreviewCopyUrl({ shareUrl }) {
  const pagePathname = usePathname()
  const liveRegionId = useId()

  const { copyToClipboard, buttonEmoji, announceText } = useCopyToClipboard(1500, '🔗')

  const showShare = pagePathname !== '/favourites'

  if (!showShare) {
    return null
  }

  return (
    <span className="hidden md:block">
      <Tooltip tooltipContent="Copy URL">
        <button
          type="button"
          className="grid size-8 place-content-center rounded-lg border border-stone-300 text-sm shadow-sm transition-colors hover:bg-stone-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
          aria-label="Copy URL"
          aria-describedby={liveRegionId}
          onClick={() => copyToClipboard(shareUrl)}
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
