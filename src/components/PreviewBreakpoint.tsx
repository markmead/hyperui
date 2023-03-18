import ButtonStyle from '@/components/ButtonStyle'

type Props = {
  breakpointActive: boolean
  breakpointEmoji: string
  handleSetPreviewWidth: CallableFunction
  breakpointWidth: string
  breakpointText: string
}

function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  handleSetPreviewWidth,
  breakpointWidth,
  breakpointText,
}: Props) {
  const buttonStyle = breakpointActive
    ? 'bg-gray-900 text-white dark:bg-gray-700 dark:text-white'
    : ''

  return (
    <button onClick={() => handleSetPreviewWidth(breakpointWidth)}>
      <ButtonStyle
        emoji={breakpointEmoji}
        text={breakpointText}
        style={buttonStyle}
      />
    </button>
  )
}

export default PreviewBreakpoint
