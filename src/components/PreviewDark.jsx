import ButtonStyle from '@component/ButtonStyle'

export default function PreviewDark({ isDarkMode, handleSetIsDarkMode }) {
  return (
    <button onClick={() => handleSetIsDarkMode(!isDarkMode)}>
      <ButtonStyle
        buttonEmoji={isDarkMode ? '🌕' : '🌞'}
        buttonText={isDarkMode ? 'Dark' : 'Light'}
        buttonActive={isDarkMode}
      />
    </button>
  )
}
