import type { FunctionComponent } from 'react'

import Image from 'next/image'

type Props = {
  title: string
  subtitle?: string
}

const Banner: FunctionComponent<Props> = ({ title, subtitle, children }) => {
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

        <div className="mt-8 sm:justify-center sm:items-center sm:flex">
          <p className="text-xs tracking-wide text-gray-400 uppercase">
            Proudly supported by
          </p>

          <a
            href="https://getcandy.io/"
            target="_blank"
            rel="noreferrer"
            className="relative block w-40 h-10 mx-auto mt-4 sm:m-0"
          >
            <Image
              src="/brands/getcandy.svg"
              alt="GetCandy - Laravel eCommerce"
              layout="fill"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Banner
