import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { getCategory } from '@util/db'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  let staticParams = []

  const categoryFolders = await fs.readdir(join(process.cwd(), '/src/data/components'))

  for (const categoryFolder of categoryFolders) {
    const categoryPath = join(process.cwd(), '/src/data/components', categoryFolder)
    const categoryStat = await fs.stat(categoryPath)

    if (!categoryStat.isDirectory()) {
      continue
    }

    staticParams = [...staticParams, { category: categoryFolder }]
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const { frontmatter } = await getCategory(params)

  return {
    title: `Tailwind CSS ${frontmatter.title} Components | HyperUI`,
    description: frontmatter.description,
    alternates: {
      canonical: `/components/${params.category}`,
    },
  }
}

export default async function Page({ params }) {
  const { frontmatter, components } = await getCategory(params)

  return (
    <>
      <HeroBanner title={frontmatter.title} subtitle={frontmatter.subtitle}>
        {frontmatter.description}
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={components} />
      </Container>
    </>
  )
}
