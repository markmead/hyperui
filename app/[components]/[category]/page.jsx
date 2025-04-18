import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'

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

async function getCategory(params) {
  try {
    const categorySlug = params.category

    const categoryPath = join(process.cwd(), '/src/data/categories', `${categorySlug}.mdx`)
    const componentsPath = join(process.cwd(), '/src/data/components', categorySlug)

    const componentSlugs = await fs.readdir(componentsPath)
    const categoryItem = await fs.readFile(categoryPath, 'utf-8')

    const { frontmatter: categoryData } = await serialize(categoryItem, {
      parseFrontmatter: true,
    })

    const componentItems = await Promise.all(
      componentSlugs
        .filter((componentSlug) => componentSlug.includes('.mdx'))
        .map(async (componentSlug) => {
          const componentPath = join(componentsPath, componentSlug)
          const componentItem = await fs.readFile(componentPath, 'utf-8')

          const { frontmatter: componentData } = await serialize(componentItem, {
            parseFrontmatter: true,
          })

          const componentCount = componentData.components.reduce((currentCount, componentItem) => {
            const isDark = !!componentItem.dark

            return currentCount + (isDark ? 2 : 1)
          }, 0)

          const componentSlugFormatted = componentSlug.replace('.mdx', '')

          return {
            title: componentData.title,
            slug: componentSlugFormatted,
            category: categorySlug,
            emoji: componentData.emoji,
            count: componentCount,
            tag: componentData.tag,
            id: componentSlugFormatted,
          }
        })
    )

    componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

    return {
      categoryData,
      componentItems,
    }
  } catch {
    notFound()
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
