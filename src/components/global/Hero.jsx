import Ad from '@component/global/Ad'
import HeroUsps from '@component/global/HeroUsps'

export default function Hero({ children, subtitle, title }) {
  return (
    <section className="bg-white text-center">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg text-stone-700">{subtitle}</h1>

          <h2 className="order-first text-5xl font-bold text-stone-900 sm:text-6xl">{title}</h2>
        </div>

        <div className="mx-auto mt-6 max-w-xl space-y-6">
          <p className="leading-relaxed text-pretty text-stone-700">{children}</p>

          <HeroUsps />

          <Ad />
        </div>
      </div>
    </section>
  )
}
