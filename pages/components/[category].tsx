import type { NextPage } from 'next'

import Head from 'next/head'

import { ComponentCard } from '../../interface/component'

import {
  getCategoryBySlug,
  getComponentCategorySlugs,
  getComponentsByCategory,
} from '../../lib/components'

import Banner from '../../components/content/banner'
import Grid from '../../components/collection/grid'

type Props = {
  categoryComponents: Array<ComponentCard>
  categoryDetails: any
}

const Category: NextPage<Props> = ({ categoryComponents, categoryDetails }) => {
  return (
    <>
      <Head>
        <title>
          Free Tailwind CSS {categoryDetails.banner.title} | HyperUI
        </title>

        <meta
          name="description"
          key="description"
          content={categoryDetails.banner.description}
        />
      </Head>

      <Banner
        title={categoryDetails.banner.title}
        subtitle={categoryDetails.banner.subtitle}
      >
        {categoryDetails.banner.description}
      </Banner>

      <div className="px-4 py-12 mx-auto max-w-screen-xl space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">
            {categoryDetails.title} Components
          </h2>

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
    'category',
  ])

  const categoryDetails = getCategoryBySlug(category, ['title', 'banner'])

  return {
    props: {
      categoryComponents,
      categoryDetails,
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
