import type { FunctionComponent } from 'react'

import styles from '../../../styles/button.module.css'

type Props = {
  dark: boolean
  handleSetDark: CallableFunction
}

const Dark: FunctionComponent<Props> = ({ dark, handleSetDark }) => {
  return (
    <button onClick={() => handleSetDark(!dark)} className={styles.pill}>
      <span aria-hidden="true" className="text-sm" role="img">
        {dark ? '🌕' : '☀️'}
      </span>
    </button>
  )
}

export default Dark
