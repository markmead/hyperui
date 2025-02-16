import ButtonStyle from '@component/ButtonStyle'

interface Props {
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
}: Props) {
  return (
    <button type="button" onClick={() => handleSetPreviewWidth(breakpointWidth)}>
      <ButtonStyle
        buttonActive={breakpointActive}
        buttonEmoji={breakpointEmoji}
        buttonText={breakpointText}
      />
    </button>
  )
}
