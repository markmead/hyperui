import type { FunctionComponent } from 'react'

type Props = {
  title: string
  subtitle?: string
}

const Banner: FunctionComponent<Props> = ({ title, subtitle, children }) => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 pt-16 mx-auto sm:pt-24 lg:pt-32 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
          HyperUI
          <span className="block mt-4 text-3xl">
            Free Open Source Tailwind CSS Components
          </span>
        </h1>

        {children && (
          <p className="max-w-lg mt-8 text-lg leading-relaxed">{children}</p>
        )}
      </div>
    </section>
  )
}

export default Banner
