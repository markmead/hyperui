import Link from 'next/link'

import { getComponents } from '@service/database'

import Hero from '@component/global/Hero'
import CollectionGrid from '@component/CollectionGrid'

export const metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function Page() {
  const componentsByCategory = await getComponents()

  return (
    <>
      <Hero title="HyperUI" subtitle="Free Open Source Tailwind CSS v4 Components">
        HyperUI is a collection of free Tailwind CSS components that can be used in your next
        project. With a range of components, you can build your next marketing website, admin
        dashboard, eCommerce store and much more.
      </Hero>

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        <ul className="space-y-8">
          {componentsByCategory.map(({ categoryTitle, categorySlug, componentItems = [] }) => {
            return (
              <li className="space-y-4" key={categoryTitle}>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  <Link
                    href={`/components/${categorySlug}`}
                    className="underline-offset-2 hover:underline focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
                  >
                    {categoryTitle} Components
                  </Link>
                </h2>

                <CollectionGrid componentItems={componentItems} />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
