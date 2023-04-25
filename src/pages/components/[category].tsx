import Head from 'next/head'

import { ComponentCard } from '@/interface/component'

import {
  getCategoryBySlug,
  getCategoryPaths,
  getComponentsByCategory,
} from '@/services/api/components'

import Banner from '@/components/HeroBanner'
import Grid from '@/components/CollectionGrid'

type Props = {
  categoryDetail: {
    title: string
    subtitle: string
    description: string
    emoji: string
  }
  categoryComponents: Array<ComponentCard>
}

function Category({ categoryComponents, categoryDetail }: Props) {
  return (
    <>
      <Head>
        <title>Tailwind CSS {categoryDetail.title} Components | HyperUI</title>
        <meta
          name="description"
          content={categoryDetail.description}
          key="description"
        />
        <meta
          property="og:title"
          content={`Tailwind CSS ${categoryDetail.title} Components | HyperUI`}
          key="og:title"
        />
        <meta
          property="og:description"
          content={categoryDetail.description}
          key="og:description"
        />
        <meta
          name="twitter:title"
          content={`Tailwind CSS ${categoryDetail.title} Components | HyperUI`}
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={categoryDetail.description}
          key="twitter:description"
        />
      </Head>

      <Banner
        title={`${categoryDetail.title}`}
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
