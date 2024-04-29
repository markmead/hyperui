import { notFound } from 'next/navigation'

// import { ogMeta, twitterMeta } from '@data/metadata'

import { getCategory, getCategoryPaths } from '@util/components'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

export async function getStaticPaths() {
  const categoryPaths = await getCategoryPaths()

  return {
    paths: categoryPaths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  try {
    const { categoryData, componentItems } = await getCategory(params)

    return {
      props: {
        categoryData,
        componentItems,
      },
    }
  } catch {
    notFound()
  }
}

export default function Page({ categoryData, componentItems }) {
  return (
    <>
      <HeroBanner title={categoryData.title} subtitle={categoryData.subtitle}>
        {categoryData.description}
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={componentItems} />
      </Container>
    </>
  )
}
