import type { FunctionComponent } from 'react'

import styles from '../styles/banner.module.css'

type Props = {
  title: string
  subtitle: string
}

const Banner: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <section>
      <div className={`max-w-screen-xl px-4 mx-auto ${styles.container}`}>
        <h1 className={styles.title}>{title}</h1>

        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
    </section>
  )
}

export default Banner
