import ButtonStyle from '@component/ButtonStyle'

export default function PreviewBreakpoint({
  breakpointActive,
  breakpointEmoji,
  handleSetPreviewWidth,
  breakpointWidth,
  breakpointText,
}) {
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
