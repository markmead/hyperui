import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  subtitle: string
  title: string
}

function HeroBanner({ children, subtitle, title }: Props) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
        <div className="flex flex-col">
          <h1 className="order-last mt-4 text-gray-700 dark:text-gray-200">
            {subtitle}
          </h1>

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            {title}
          </h2>
        </div>

        {children && (
          <p className="mt-6 max-w-lg text-sm/relaxed text-gray-600 dark:text-gray-400">
            {children}
          </p>
        )}
      </div>
    </section>
  )
}

export default HeroBanner
