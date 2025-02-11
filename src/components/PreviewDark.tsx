import ButtonStyle from '@component/ButtonStyle'

interface iProps {
  isDarkMode: boolean
  handleSetIsDarkMode: (isDarkMode: boolean) => void
}

export default function PreviewDark({ isDarkMode, handleSetIsDarkMode }: iProps) {
  return (
    <button onClick={() => handleSetIsDarkMode(!isDarkMode)}>
      <ButtonStyle
        buttonActive={isDarkMode}
        buttonEmoji={isDarkMode ? '🌕' : '🌞'}
        buttonText={isDarkMode ? 'Dark' : 'Light'}
      />
    </button>
  )
}
