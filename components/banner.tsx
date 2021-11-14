import type { FunctionComponent } from 'react'

import Button from './button'

import styles from '../styles/banner.module.css'

type Props = {
  title: string
  subtitle: string
  button: boolean
  buttonText?: string
  buttonLink?: string
}

const Banner: FunctionComponent<Props> = ({
  title,
  subtitle,
  button,
  buttonText,
  buttonLink,
}) => {
  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.title}>{title}</h1>

        <h2 className={styles.subtitle}>{subtitle}</h2>

        {button && (
          <Button className="mt-8" text={buttonText} link={buttonLink} />
        )}
      </div>
    </section>
  )
}

export default Banner
