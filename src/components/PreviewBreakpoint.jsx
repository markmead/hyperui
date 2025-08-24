import Button from '@component/global/Button'
import Tooltip from '@component/global/Tooltip'

export default function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  handleSetPreviewWidth,
  breakpointWidth,
  breakpointText,
}) {
  return (
    <Tooltip tooltipContent={`Set preview width to ${breakpointWidth}`}>
      <Button
        onClick={() => handleSetPreviewWidth(breakpointWidth)}
        isActive={breakpointActive}
        aria-label={`${breakpointText} breakpoint`}
        aria-pressed={breakpointActive}
      >
        <span aria-hidden="true">{breakpointEmoji}</span>
        <span>{breakpointText}</span>
      </Button>
    </Tooltip>
  )
}
