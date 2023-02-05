import styles from '@/styles/button.module.css'

type Props = {
  isDarkMode: boolean
  handleSetIsDarkMode: CallableFunction
}

function Dark({ isDarkMode, handleSetIsDarkMode }: Props) {
  return (
    <button
      onClick={() => handleSetIsDarkMode(!isDarkMode)}
      className={`${styles.pill} ${
        isDarkMode ? 'bg-black text-white' : 'text-black'
      }`}
    >
      <span aria-hidden="true" role="img" className="text-sm">
        {isDarkMode ? '🌕' : '🌞'}
      </span>

      <span className="text-xs font-medium">
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}

export default Dark
