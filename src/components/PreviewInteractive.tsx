import ButtonStyle from '@/components/ButtonStyle'

type Props = {
  isInteractive: boolean
  handleSetIsInteractive: CallableFunction
}

function PreviewInteractive({ isInteractive, handleSetIsInteractive }: Props) {
  const buttonStyle = isInteractive
    ? 'bg-gray-900 text-white dark:bg-gray-700 dark:text-white'
    : ''

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

export default PreviewInteractive
