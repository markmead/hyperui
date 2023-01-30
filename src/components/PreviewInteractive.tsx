import styles from '@/styles/button.module.css'

type Props = {
  isInteractive: boolean
  handleSetIsInteractive: CallableFunction
}

function Interactive({ isInteractive, handleSetIsInteractive }: Props) {
  return (
    <button
      onClick={() => handleSetIsInteractive(!isInteractive)}
      className={`${styles.pill} ${
        isInteractive ? 'bg-black text-white' : 'text-black'
      } disabled:pointer-events-none disabled:opacity-25`}
    >
      <span aria-hidden="true" role="img" className="text-sm">
        {isInteractive ? '⚡️' : '🧱'}
      </span>

      <span className="text-xs font-medium">
        {isInteractive ? 'Interactive' : 'No'}
      </span>
    </button>
  )
}

export default Interactive
