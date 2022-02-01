import type { FunctionComponent } from 'react'

type Props = {
  title: string
  subtitle: string
}

const Banner: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-16 mx-auto text-center lg:py-32">
        <h1 className="text-4xl font-bold sm:text-6xl">{title}</h1>

        <h2 className="mt-4 text-sm text-gray-500">{subtitle}</h2>
      </div>
    </section>
  )
}

export default Banner
