import type { FunctionComponent } from 'react'

import styles from '../styles/button.module.css'

type Props = {
  text?: string
  link?: string
  className?: string
}

const Button: FunctionComponent<Props> = ({ text, link, className }) => {
  return (
    <a href={link} className={`${className} ${styles.button}`}>
      {text}
    </a>
  )
}

export default Button
