import type { FunctionComponent } from 'react'

import styles from '../styles/breakpoint.module.css'

type Props = {
  text: string
  size: string
  handleWidth: any
}

const Breakpoint: FunctionComponent<Props> = ({ text, size, handleWidth }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => handleWidth(size)}
    >
      {text}
    </button>
  )
}

export default Breakpoint
