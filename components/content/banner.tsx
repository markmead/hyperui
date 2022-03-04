import type { FunctionComponent } from 'react'

type Props = {
  subtitle?: string
  title: string
}

const Banner: FunctionComponent<Props> = ({ children, subtitle, title }) => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-16 mx-auto text-center lg:py-32">
        <h1 className="text-4xl font-bold sm:text-6xl">{title}</h1>

        {subtitle && <h2 className="mt-4 text-sm text-gray-500">{subtitle}</h2>}

        {children && (
          <p className="max-w-lg mx-auto mt-4 text-sm text-gray-500">
            {children}
          </p>
        )}
      </div>
    </section>
  )
}

export default Banner
