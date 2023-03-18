import ButtonStyle from '@/components/ButtonStyle'

type Props = {
  isDarkMode: boolean
  handleSetIsDarkMode: CallableFunction
}

function PreviewDark({ isDarkMode, handleSetIsDarkMode }: Props) {
  const buttonStyle = isDarkMode
    ? 'bg-gray-900 text-white dark:bg-gray-700 dark:text-white'
    : ''

  return (
    <button onClick={() => handleSetIsDarkMode(!isDarkMode)}>
      <ButtonStyle
        emoji={isDarkMode ? '🌕' : '🌞'}
        text={isDarkMode ? 'Dark' : 'Light'}
        style={buttonStyle}
      />
    </button>
  )
}

export default PreviewDark
