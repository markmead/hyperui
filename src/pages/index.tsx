import { Category } from '@/interface/category'
import { ComponentCard } from '@/interface/component'

import {
  getCategoryBySlug,
  getCategorySlugs,
  getComponentsByCategory,
} from '@/lib/getComponents'

import Banner from '@/components/HeroBanner'
import Grid from '@/components/CollectionGrid'

type Props = {
  componentsByCategory: Array<CategoryProps>
}

type CategoryProps = {
  categoryDetail: Category
  categoryComponents: Array<ComponentCard>
}

function Home({ componentsByCategory }: Props) {
  return (
    <>
      <Banner
        title="HyperUI 1"
        subtitle="Free Open Source Tailwind CSS Components"
      >
        HyperUI is a collection of free Tailwind CSS components that can be used
        in your next project. With a range of components, you can build your
        next marketing website, admin dashboard, eCommerce store and much more.
      </Banner>

      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8">
        {componentsByCategory.map(
          ({ categoryDetail, categoryComponents }: CategoryProps) => {
            return (
              <div className="space-y-4" key={categoryDetail.title}>
                <h2 className="text-lg font-bold sm:text-xl">
                  {categoryDetail.title}
                </h2>

                <Grid
                  componentsData={categoryComponents}
                  categoryDetail={categoryDetail}
                />
              </div>
            )
          }
        )}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const categorySlugs = getCategorySlugs()

  const componentsByCategory = categorySlugs
    .map((categorySlug) => {
      const categoryDetail = getCategoryBySlug(`${categorySlug}`, ['title'])

      const categoryComponents = getComponentsByCategory(`${categorySlug}`, [
        'title',
        'slug',
        'emoji',
        'count',
        'category',
      ])

      return {
        categoryDetail,
        categoryComponents,
      }
    })
    .reverse()

  return {
    props: {
      componentsByCategory,
    },
  }
}

export default Home
