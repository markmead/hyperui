import type { FunctionComponent } from 'react'

type Props = {
  title: string
  subtitle?: string
}

const Banner: FunctionComponent<Props> = ({ title, subtitle, children }) => {
  return (
    <section>
      <h1>
        HyperUI
        <span>Free Open Source Tailwind CSS Components</span>
      </h1>

      {children && <p>{children}</p>}
    </section>
  )
}

export default Banner
