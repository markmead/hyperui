import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { getCategory } from '@util/db'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const categoryFolders = await fs.readdir(join(process.cwd(), '/src/data/components'))
  const staticParams = []

  for (const categoryFolder of categoryFolders) {
    const categoryPath = join(process.cwd(), '/src/data/components', categoryFolder)
    const categoryStat = await fs.stat(categoryPath)

    if (!categoryStat.isDirectory()) {
      continue
    }

    staticParams.push({ category: categoryFolder })
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const { categoryData } = await getCategory(params)

  return {
    title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
    description: categoryData.description,
    alternates: {
      canonical: `/components/${params.category}`,
    },
  }
}

export default async function Page({ params }) {
  const { categoryData, componentItems } = await getCategory(params)

  return (
    <>
      <HeroBanner title={categoryData.title} subtitle={categoryData.subtitle}>
        {categoryData.description}
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={componentItems} />
      </Container>
    </>
  )
}
