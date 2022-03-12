import type { FunctionComponent } from 'react'

import styles from '../../../styles/button.module.css'

type Props = {
  active: boolean
  emoji: string
  handleWidth: CallableFunction
  size: string
  text: string
}

const Breakpoint: FunctionComponent<Props> = ({
  active,
  emoji,
  handleWidth,
  size,
  text,
}) => {
  return (
    <button
      onClick={() => handleWidth(size)}
      className={`${styles.pill} ${
        active ? 'bg-black text-white' : 'text-black'
      }`}
    >
      <span aria-hidden="true" className="mr-1.5 text-sm" role="img">
        {emoji}
      </span>

      <span className="text-xs font-medium">{text}</span>
    </button>
  )
}

export default Breakpoint
