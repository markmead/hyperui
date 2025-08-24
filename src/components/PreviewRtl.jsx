import Button from '@component/global/Button'
import Tooltip from '@component/global/Tooltip'

export default function PreviewRtl({ isRtl, handleSetIsRtl }) {
  return (
    <Tooltip tooltipContent={isRtl ? 'Switch to LTR layout' : 'Switch to RTL layout'}>
      <Button
        onClick={() => handleSetIsRtl(!isRtl)}
        aria-pressed={isRtl}
        aria-label={isRtl ? 'Switch to LTR layout' : 'Switch to RTL layout'}
      >
        <span aria-hidden="true">{isRtl ? '👈' : '👉'}</span>
        <span>{isRtl ? 'RTL' : 'LTR'}</span>
      </Button>
    </Tooltip>
  )
}
