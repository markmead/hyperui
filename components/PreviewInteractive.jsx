import ButtonStyle from '@component/ButtonStyle'

export default function PreviewInteractive({
  isInteractive,
  handleSetIsInteractive,
}) {
  const buttonStyle = isInteractive ? 'bg-gray-900 text-white' : ''

  return (
    <button onClick={() => handleSetIsInteractive(!isInteractive)}>
      <ButtonStyle
        emoji={isInteractive ? '🙋‍♀️' : '🙅‍♀️'}
        text="Alpine JS"
        style={buttonStyle}
      />
    </button>
  )
}
