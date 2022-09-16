import type { FunctionComponent } from 'react'

import Image from 'next/image'

type Props = {
  title: string
  subtitle?: string
}

const Banner: FunctionComponent<Props> = ({ title, subtitle, children }) => {
  return (
    <>
      <section>
        <div className="max-w-screen-xl px-4 py-16 mx-auto text-center lg:py-32">
          <h1 className="text-4xl font-bold sm:text-6xl">{title}</h1>

          {subtitle && <h2 className="mt-4 text-gray-500">{subtitle}</h2>}

          {children && (
            <p className="max-w-lg mx-auto mt-4 text-sm leading-relaxed text-gray-500">
              {children}
            </p>
          )}

          <div className="mt-8 sm:justify-center sm:items-center sm:flex sm:gap-2">
            <p className="text-xs tracking-wide text-gray-400 uppercase">
              Proudly supported by
            </p>

            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a
              href="https://lunarphp.io/?ref=hyperui.dev"
              target="_blank"
              rel="noopener"
              className="relative block w-24 h-8 mx-auto mt-4 sm:m-0"
            >
              <Image
                src="/brands/lunar.svg"
                alt="Lunar - Laravel eCommerce"
                layout="fill"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Banner
