import ButtonStyle from '@component/ButtonStyle'

interface iProps {
  isInteractive: boolean
  handleSetIsInteractive: (isInteractive: boolean) => void
}

export default function PreviewInteractive({ isInteractive, handleSetIsInteractive }: iProps) {
  return (
    <button onClick={() => handleSetIsInteractive(!isInteractive)}>
      <ButtonStyle
        buttonActive={isInteractive}
        buttonEmoji={isInteractive ? '🙋‍♀️' : '🙅‍♀️'}
        buttonText="Alpine JS"
      />
    </button>
  )
}
