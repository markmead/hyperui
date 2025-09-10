import { useId } from 'react'

import useCopyToClipboard from '@hook/useCopyToClipboard'

import Button from '@component/global/Button'
import Tooltip from '@component/global/Tooltip'

export default function PreviewCopy({ componentCode = '' }) {
  const liveRegionId = useId()

  const { copyToClipboard, buttonEmoji, buttonText, announceText } = useCopyToClipboard()

  return (
    <span className="hidden sm:block">
      <Tooltip tooltipContent="Copy code">
        <Button
          aria-label="Copy code"
          aria-describedby={liveRegionId}
          onClick={() => copyToClipboard(componentCode)}
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
