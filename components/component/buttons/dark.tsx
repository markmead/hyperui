import type { FunctionComponent } from 'react'

import styles from '../../../styles/button.module.css'

type Props = {
  themed: boolean
  dark: boolean
  handleSetDark: CallableFunction
}

const Dark: FunctionComponent<Props> = ({ themed, dark, handleSetDark }) => {
  return (
    <button
      onClick={() => handleSetDark(!dark)}
      className={`${styles.pill} ${
        dark && themed ? 'bg-black text-white' : 'text-black'
      } disabled:opacity-25 disabled:pointer-events-none`}
      disabled={!themed}
    >
      <span aria-hidden="true" className="text-sm mr-1.5" role="img">
        {dark && themed ? '🌕' : '🌞'}
      </span>

      <span className="text-xs font-medium">
        {dark && themed ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}

export default Dark
