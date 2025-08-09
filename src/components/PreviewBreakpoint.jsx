import Button from '@component/Button'

export default function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  handleSetPreviewWidth,
  breakpointWidth,
  breakpointText,
}) {
  return (
    <Button onClick={() => handleSetPreviewWidth(breakpointWidth)} isActive={breakpointActive}>
      <span aria-hidden="true">{breakpointEmoji}</span>
      <span>{breakpointText}</span>
    </Button>
  )
}
