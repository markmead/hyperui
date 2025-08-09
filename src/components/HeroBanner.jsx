import Container from '@component/global/Container'
import UspList from '@component/UspList'

export default function HeroBanner({ children, subtitle, title }) {
  return (
    <section className="bg-white">
      <Container classNames="py-8 lg:py-12">
        <h1 className="text-lg text-gray-700">{subtitle}</h1>

        <h2 className="mt-4 text-5xl font-bold text-gray-900 sm:text-6xl">{title}</h2>

        <div className="mt-6 max-w-xl space-y-6">
          <p className="leading-relaxed text-pretty text-gray-700">{children}</p>

          <UspList />
        </div>
      </Container>
    </section>
  )
}
