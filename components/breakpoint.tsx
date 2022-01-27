import type { FunctionComponent } from 'react'

import styles from '../styles/button.module.css'

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
      className={styles.pill}
      onClick={() => handleWidth(size)}
    >
      <span role="img" className="mr-1.5 text-sm">
        {emoji}
      </span>

      <span className="text-xs font-medium">{text}</span>
    </button>
  )
}

export default Breakpoint
