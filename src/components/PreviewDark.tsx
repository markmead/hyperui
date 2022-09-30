import styles from '../styles/button.module.css'

type Props = {
  hasDarkMode: boolean
  isDarkMode: boolean
  handleSetIsDarkMode: CallableFunction
}

function Dark({ hasDarkMode, isDarkMode, handleSetIsDarkMode }: Props) {
  return (
    <button
      onClick={() => handleSetIsDarkMode(!isDarkMode)}
      className={`${styles.pill} ${
        isDarkMode && hasDarkMode ? 'bg-black text-white' : 'text-black'
      } disabled:opacity-25 disabled:pointer-events-none`}
      disabled={!hasDarkMode}
    >
      <span aria-hidden="true" className="text-sm" role="img">
        {isDarkMode && hasDarkMode ? '🌕' : '🌞'}
      </span>

      <span className="text-xs font-medium">
        {isDarkMode && hasDarkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}

export default Dark
