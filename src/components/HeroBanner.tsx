import Ad from '@component/Ad'
import Container from '@component/Container'
import UspList from '@component/UspList'

interface Props {
  children: React.ReactNode
  subtitle: string
  title: string
}

export default function HeroBanner({ children, subtitle, title }: Props) {
  return (
    <section className="bg-white text-center">
      <Container classNames="py-8 lg:py-12">
        <div className="flex flex-col space-y-4 space-y-reverse">
          <h1 className="order-last text-lg text-gray-700">{subtitle}</h1>

          <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl">{title}</h2>
        </div>

        <div className="mx-auto mt-6 max-w-xl space-y-6">
          <p className="text-base/relaxed text-pretty text-gray-700">{children}</p>

          <UspList />
        </div>

        <div className="mt-4">
          <Ad />
        </div>
      </Container>
    </section>
  )
}
