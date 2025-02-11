import ButtonStyle from '@component/ButtonStyle'

interface iBreakpoint {
  breakpointActive: boolean
  breakpointEmoji: string
  breakpointText: string
  breakpointWidth: string
  handleSetPreviewWidth: (width: string) => void
}

export default function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  breakpointText,
  breakpointWidth,
  handleSetPreviewWidth,
}: iBreakpoint) {
  return (
    <button onClick={() => handleSetPreviewWidth(breakpointWidth)}>
      <ButtonStyle
        buttonActive={breakpointActive}
        buttonEmoji={breakpointEmoji}
        buttonText={breakpointText}
      />
    </button>
  )
}
