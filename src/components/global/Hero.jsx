import Container from '@component/global/Container'
import HeroUsps from '@component/global/HeroUsps'

export default function Hero({ children, subtitle, title }) {
  return (
    <section className="bg-white text-center">
      <Container classNames="py-8 lg:py-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg text-gray-700">{subtitle}</h1>

          <h2 className="order-first text-5xl font-bold text-gray-900 sm:text-6xl">{title}</h2>
        </div>

        <div className="mx-auto mt-6 max-w-xl space-y-6">
          <p className="leading-relaxed text-pretty text-gray-700">{children}</p>

          <HeroUsps />
        </div>
      </Container>
    </section>
  )
}
