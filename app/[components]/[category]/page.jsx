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
  const mdxSource = await getCategory(params)

  return {
    title: `Tailwind CSS ${mdxSource.frontmatter.title} Components | HyperUI`,
    description: mdxSource.frontmatter.description,
    alternates: {
      canonical: `/components/${params.category}`,
    },
  }
}

export default async function Page({ params }) {
  const mdxSource = await getCategory(params)

  return (
    <>
      <HeroBanner title={mdxSource.frontmatter.title} subtitle={mdxSource.frontmatter.subtitle}>
        {mdxSource.frontmatter.description}
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={mdxSource.components} />
      </Container>
    </>
  )
}
