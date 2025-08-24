import Button from '@component/global/Button'
import Tooltip from '@component/global/Tooltip'

export default function PreviewRtl({ isRtl, handleSetIsRtl }) {
  const descriptiveContent = isRtl ? 'Switch to LTR layout' : 'Switch to RTL layout'

  return (
    <Tooltip tooltipContent={descriptiveContent}>
      <Button
        onClick={() => handleSetIsRtl(!isRtl)}
        aria-pressed={isRtl}
        aria-label={descriptiveContent}
      >
        <span aria-hidden="true">{isRtl ? '👈' : '👉'}</span>
        <span>{isRtl ? 'RTL' : 'LTR'}</span>
      </Button>
    </Tooltip>
  )
}
