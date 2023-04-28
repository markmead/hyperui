import ButtonStyle from '@component/ButtonStyle'

export default function PreviewDark({ isDarkMode, handleSetIsDarkMode }) {
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
