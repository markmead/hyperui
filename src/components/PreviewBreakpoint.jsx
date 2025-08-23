import Button from '@component/global/Button'

export default function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  handleSetPreviewWidth,
  breakpointWidth,
  breakpointText,
}) {
  return (
    <Button
      onClick={() => handleSetPreviewWidth(breakpointWidth)}
      isActive={breakpointActive}
      aria-label={`${breakpointText} breakpoint`}
      aria-pressed={breakpointActive}
    >
      <span aria-hidden="true">{breakpointEmoji}</span>
      <span>{breakpointText}</span>
    </Button>
  )
}
