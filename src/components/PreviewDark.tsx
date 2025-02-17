import ButtonStyle from '@component/ButtonStyle'

interface Props {
  isDarkMode: boolean
  handleSetIsDarkMode: (isDarkMode: boolean) => void
}

export default function PreviewDark({ isDarkMode, handleSetIsDarkMode }: Props) {
  const buttonEmoji: string = isDarkMode ? '🌕' : '🌞'
  const buttonText: string = isDarkMode ? 'Dark' : 'Light'

  return (
    <button type="button" onClick={() => handleSetIsDarkMode(!isDarkMode)}>
      <ButtonStyle buttonActive={isDarkMode} buttonEmoji={buttonEmoji} buttonText={buttonText} />
    </button>
  )
}
