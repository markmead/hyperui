import { getCategory } from '@util/db'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

export const metadata = {
  alternates: {
    canonical: '/',
  },
}

async function getComponents() {
  const categorySlugs = ['application', 'marketing']

  const componentsByCategory = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const { frontmatter, components } = await getCategory({ category: categorySlug })
      return {
        categoryTitle: frontmatter?.title,
        componentItems: components,
      }
    })
  )

  return componentsByCategory
}

export default async function Page() {
  const componentsByCategory = await getComponents()

  return (
    <>
      <HeroBanner title="HyperUI" subtitle="Free Open Source Tailwind CSS v4 Components">
        HyperUI is a collection of free Tailwind CSS components that can be used in your next
        project. With a range of components, you can build your next marketing website, admin
        dashboard, eCommerce store and much more.
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12">
        <ul className="space-y-8">
          {componentsByCategory.map(({ categoryTitle, componentItems = [] }) => {
            return (
              <li className="space-y-4" key={categoryTitle}>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {categoryTitle} Components
                </h2>

                <CollectionGrid componentItems={componentItems} />
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
