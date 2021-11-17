import type { FunctionComponent } from 'react'

import styles from '../styles/breakpoint.module.css'

type Props = {
  text: string
  size: string
  handleWidth: any
  emoji: string
}

const Breakpoint: FunctionComponent<Props> = ({
  text,
  size,
  handleWidth,
  emoji,
}) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => handleWidth(size)}
    >
      <span role="img" className="mr-1.5">
        {emoji}
      </span>

      {text}
    </button>
  )
}

export default Breakpoint
