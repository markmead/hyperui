import type { ReactNode } from 'react'

import Image from 'next/image'

type Props = {
  children?: ReactNode
  subtitle: string
  title: string
}

function HeroBanner({ children, subtitle, title }: Props) {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-16 mx-auto text-center lg:py-32">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          {title}
        </h1>

        {subtitle && <h2 className="mt-4 text-gray-700">{subtitle}</h2>}

        {children && (
          <p className="max-w-lg mx-auto mt-4 text-sm leading-relaxed text-gray-500">
            {children}
          </p>
        )}
      </div>
    </section>
  )
}

export default HeroBanner
