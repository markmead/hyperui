import type { FunctionComponent } from 'react'

import Image from 'next/image'

import Button from './button'

import styles from '../styles/banner.module.css'
import pulse from '../public/pulse.jpeg'

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
    <section className="relative">
      <Image src={pulse} alt="pulse" layout="fill" quality={100} priority />

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
