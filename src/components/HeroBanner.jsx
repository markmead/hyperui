import Ad from '@component/Ad'
import Container from '@component/Container'

export default function HeroBanner({ children, subtitle, title }) {
  return (
    <section className="bg-white text-center dark:bg-gray-900">
      <Container classNames="py-8 lg:py-12">
        <div className="flex flex-col space-y-4 space-y-reverse">
          <h1 className="order-last text-lg text-gray-700 dark:text-gray-200">{subtitle}</h1>

          <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl dark:text-white">{title}</h2>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base/relaxed text-gray-700 dark:text-gray-200">
          {children}
        </p>

        <div className="mt-4">
          <Ad />
        </div>
      </Container>
    </section>
  )
}
