import { notFound } from 'next/navigation'

import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

export async function generateMetadata({ params }) {
  const { categoryData } = await getCategory(params)

  return {
    title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
    description: categoryData.description,
    openGraph: {
      title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
      description: categoryData.description,
      ...ogMeta,
    },
    twitter: {
      title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
      description: categoryData.description,
      ...twitterMeta,
    },
  }
}

export async function generateStaticParams() {
  return ['application-ui', 'marketing']
}

async function getCategory(params) {
  try {
    const componentsPath = join(process.cwd(), '/src/data/components')
    const categoriesPath = join(process.cwd(), '/src/data/categories')

    const categorySlug = params.category
    const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)

    const componentSlugs = await fs.readdir(componentsPath)
    const categoryItem = await fs.readFile(categoryPath, 'utf-8')

    const { frontmatter: categoryData } = await serialize(categoryItem, {
      parseFrontmatter: true,
    })

    const componentItems = await Promise.all(
      componentSlugs
        .filter((componentSlug) => componentSlug.includes(categorySlug))
        .map(async (componentSlug) => {
          const componentPath = join(componentsPath, componentSlug)
          const componentItem = await fs.readFile(componentPath, 'utf-8')

          const { frontmatter: componentData } = await serialize(componentItem, {
            parseFrontmatter: true,
          })

          const componentSlugFormatted = componentSlug.replace('.mdx', '')
          const componentSlugTrue = componentSlugFormatted.replace(`${categorySlug}-`, '')
          const componentCount = Object.values(componentData.components).length

          return {
            title: componentData.title,
            slug: componentSlugTrue,
            category: componentData.category,
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
