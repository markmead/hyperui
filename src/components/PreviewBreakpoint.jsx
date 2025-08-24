import Button from '@component/global/Button'
import Tooltip from '@component/global/Tooltip'

export default function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  handleSetPreviewWidth,
  breakpointWidth,
  breakpointText,
}) {
  const descriptiveContent = `${breakpointText} breakpoint (${breakpointWidth})`

  return (
    <Tooltip tooltipContent={descriptiveContent}>
      <Button
        onClick={() => handleSetPreviewWidth(breakpointWidth)}
        isActive={breakpointActive}
        aria-label={descriptiveContent}
        aria-pressed={breakpointActive}
      >
        <span aria-hidden="true">{breakpointEmoji}</span>
        <span>{breakpointText}</span>
      </Button>
    </Tooltip>
  )
}
