import type { FunctionComponent } from 'react'

type Props = {
  title: string
  subtitle?: string
}

const Banner: FunctionComponent<Props> = ({ title, subtitle, children }) => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-24 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse">
          <h1 className="mt-3 text-xl font-medium md:text-3xl">{title}</h1>

          <h2 className="text-3xl font-bold md:text-5xl">{subtitle}</h2>
        </div>

        <p className="mt-8 max-w-prose text-lg !leading-relaxed md:text-xl">
          {children}
        </p>
      </div>
    </section>
  )
}

export default Banner
