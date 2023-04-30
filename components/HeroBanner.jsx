import Container from '@component/Container'

function HeroBanner({ children, subtitle, title }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <Container classNames="py-8 lg:py-12">
        <div className="flex flex-col space-y-4 space-y-reverse">
          <h1 className="order-last text-lg text-gray-700 dark:text-gray-200">
            {subtitle}
          </h1>

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            {title}
          </h2>
        </div>

        {children && (
          <p className="mt-6 max-w-lg text-base/relaxed text-gray-600 dark:text-gray-400">
            {children}
          </p>
        )}
      </Container>
    </section>
  )
}

export default HeroBanner
