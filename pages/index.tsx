import type { NextPage } from 'next'

import {
  getComponentCategorySlugsSimple,
  getComponentsByCategory,
  getCategoryBySlug,
} from '../lib/components'

import Banner from '../components/content/banner'
import Grid from '../components/collection/grid'

export async function getStaticProps() {
  const categorySlugs = getComponentCategorySlugsSimple()

  const componentsByCategory = categorySlugs
    .map((category: any) => {
      const slug: string = category

      const categoryDetails = getCategoryBySlug(slug, ['title', 'banner'])

      const categoryComponents = getComponentsByCategory(slug, [
        'title',
        'slug',
        'emoji',
        'count',
        'tags',
        'category',
      ])

      return {
        category: categoryDetails,
        components: categoryComponents,
      }
    })
    .reverse()

  return {
    props: {
      componentsByCategory,
    },
  }
}

type Props = {
  componentsByCategory: any
}

const Home: NextPage<Props> = ({ componentsByCategory }) => {
  return (
    <>
      <Banner
        title="HyperUI"
        subtitle="Free Open Source Tailwind CSS Components"
      >
        HyperUI is a collection of free Tailwind CSS components that can be used
        in your next project. With a range of components, you can build your
        next marketing website, admin dashboard, ecommerce store and much more.
      </Banner>

      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-8">
        {componentsByCategory.map((item: any) => {
          return (
            <div className="space-y-4" key={item.category.title}>
              <h2 className="text-lg font-bold sm:text-xl">
                {item.category.banner.title}
              </h2>

              <Grid items={item.components} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
