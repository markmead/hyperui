import ButtonStyle from '@component/ButtonStyle'

export default function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  handleSetPreviewWidth,
  breakpointWidth,
  breakpointText,
}) {
  return (
    <button type="button" onClick={() => handleSetPreviewWidth(breakpointWidth)}>
      <ButtonStyle
        buttonEmoji={breakpointEmoji}
        buttonText={breakpointText}
        buttonActive={breakpointActive}
      />
    </button>
  )
}
