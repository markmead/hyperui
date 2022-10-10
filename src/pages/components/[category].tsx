import Head from 'next/head'

import {
  getCategoryBySlug,
  getCategoryPaths,
  getComponentsByCategory,
} from '@/lib/getComponents'

import { ComponentCard } from '@/interface/component'

import Banner from '@/components/HeroBanner'
import Grid from '@/components/CollectionGrid'

type Props = {
  categoryDetail: {
    title: string
    subtitle: string
    description: string
  }
  categoryComponents: Array<ComponentCard>
}

function Category({ categoryComponents, categoryDetail }: Props) {
  return (
    <>
      <Head>
        <title>Free Tailwind CSS {categoryDetail.title} | HyperUI</title>

        <meta
          name="description"
          key="description"
          content={categoryDetail.description}
        />
      </Head>

      <Banner
        title={`${categoryDetail.title} Components`}
        subtitle={categoryDetail.subtitle}
      >
        {categoryDetail.description}
      </Banner>

      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-12">
        <Grid
          componentsData={categoryComponents}
          categoryDetail={categoryDetail}
        />
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
  const categorySlug = category

  const categoryDetail = getCategoryBySlug(categorySlug, [
    'title',
    'subtitle',
    'description',
  ])

  const categoryComponents = getComponentsByCategory(categorySlug, [
    'title',
    'slug',
    'emoji',
    'count',
    'category',
  ])

  return {
    props: {
      categoryDetail,
      categoryComponents,
    },
  }
}

export async function getStaticPaths() {
  const categoryPaths = getCategoryPaths()

  return {
    paths: categoryPaths,
    fallback: false,
  }
}

export default Category
