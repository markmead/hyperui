import type { NextPage } from 'next'

import Head from 'next/head'

import { ComponentCard } from '../../interface/component'

import {
  getCategoryBySlug,
  getComponentCategorySlugs,
  getComponentsByCategory,
} from '../../lib/components'

import HeroBanner from '../../components/HeroBanner'
import Grid from '../../components/CollectionGrid'

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

      <HeroBanner
        title={categoryDetails.banner.title}
        subtitle={categoryDetails.banner.subtitle}
      >
        {categoryDetails.banner.description}
      </HeroBanner>

      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8">
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
