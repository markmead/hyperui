import ButtonStyle from '@component/ButtonStyle'

interface Props {
  isInteractive: boolean
  handleSetIsInteractive: (isInteractive: boolean) => void
}

export default function PreviewInteractive({ isInteractive, handleSetIsInteractive }: Props) {
  const buttonEmoji = isInteractive ? '🙋‍♀️' : '🙅‍♀️'

  return (
    <button type="button" onClick={() => handleSetIsInteractive(!isInteractive)}>
      <ButtonStyle buttonActive={isInteractive} buttonEmoji={buttonEmoji} buttonText="Alpine JS" />
    </button>
  )
}
