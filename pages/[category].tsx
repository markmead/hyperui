import type { NextPage } from 'next'

import { ComponentCard } from '../interface/component'

import {
  getComponentCategorySlugs,
  getComponentsByCategory,
} from '../lib/components'

import Banner from '../components/content/banner'
import Grid from '../components/collection/grid'

type Props = {
  categoryComponents: Array<ComponentCard>
}

const Category: NextPage<Props> = ({ categoryComponents }) => {
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
        <div className="space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">Marketing Components</h2>

          <Grid items={categoryComponents} />
        </div>
      </div>
    </>
  )
}

type Params = {
  params: {
    category: string
  }
}

export async function getStaticProps({ params: { category } }: Params) {
  const categoryComponents = getComponentsByCategory(category, [
    'title',
    'slug',
    'emoji',
    'count',
    'tags',
    'category',
  ])

  return {
    props: {
      categoryComponents,
    },
  }
}

export async function getStaticPaths() {
  const paths = getComponentCategorySlugs()

  return {
    paths,
    fallback: false,
  }
}

export default Category
