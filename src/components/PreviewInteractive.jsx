import ButtonStyle from '@component/ButtonStyle'

export default function PreviewInteractive({
  isInteractive,
  handleSetIsInteractive,
}) {
  return (
    <button onClick={() => handleSetIsInteractive(!isInteractive)}>
      <ButtonStyle
        buttonEmoji={isInteractive ? '🙋‍♀️' : '🙅‍♀️'}
        buttonText="Alpine JS"
        buttonActive={isInteractive}
      />
    </button>
  )
}
