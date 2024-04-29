import { getComponents } from '@util/components'

import CollectionGrid from '@component/CollectionGrid'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'

export async function getStaticProps() {
  const componentsByCategory = await getComponents()

  return {
    props: {
      componentsByCategory,
    },
  }
}

export default function Page({ componentsByCategory }) {
  return (
    <>
      <HeroBanner title="HyperUI" subtitle="Free Open Source Tailwind CSS Components">
        HyperUI is a collection of free Tailwind CSS components that can be used in your next
        project. With a range of components, you can build your next marketing website, admin
        dashboard, eCommerce store and much more.
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <ul className="space-y-8">
          {componentsByCategory.map(({ categoryData, componentItems }) => {
            return (
              <li className="space-y-4" key={categoryData.slug}>
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{categoryData.title}</h2>

                <CollectionGrid componentItems={componentItems} />
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
