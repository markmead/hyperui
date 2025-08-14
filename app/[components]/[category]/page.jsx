import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { getCategory, componentsDir } from '@service/db'

import Container from '@component/global/Container'
import Hero from '@component/global/Hero'
import CollectionGrid from '@component/CollectionGrid'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const categoryFolders = await fs.readdir(componentsDir)
  const staticParams = []

  for (const categoryFolder of categoryFolders) {
    const categoryPath = join(componentsDir, categoryFolder)
    const categoryStat = await fs.stat(categoryPath)

    if (!categoryStat.isDirectory()) {
      continue
    }

    staticParams.push({ category: categoryFolder })
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const { category } = await params
  const { categoryData } = await getCategory({ category })

  return {
    title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
    description: categoryData.description,
    alternates: {
      canonical: `/components/${category}`,
    },
  }
}

export default async function Page({ params }) {
  const { category } = await params
  const { categoryData, componentItems } = await getCategory({ category })

  return (
    <>
      <Hero title={categoryData.title} subtitle={categoryData.subtitle}>
        {categoryData.description}
      </Hero>

      <Container id="mainContent" classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={componentItems} />
      </Container>
    </>
  )
}
