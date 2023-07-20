import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

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
      url: 'https://www.hyperui.dev/',
      siteName: 'HyperUI',
      type: 'website',
      image: 'https://www.hyperui.dev/og.jpg',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
      description: categoryData.description,
    },
  }
}

export async function generateStaticParams() {
  return ['application-ui', 'marketing', 'ecommerce']
}

async function getCategory(params) {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const categoriesPath = join(process.cwd(), '/src/data/categories')

  const categorySlug = params.category
  const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)

  const componentSlugs = await fs.readdir(componentsPath)
  const categoryItem = await fs.readFile(categoryPath, 'utf-8')

  const { data: categoryData } = matter(categoryItem)

  const componentItems = await Promise.all(
    componentSlugs
      .filter((componentSlug) => componentSlug.includes(categorySlug))
      .map(async (componentSlug) => {
        const componentPath = join(componentsPath, componentSlug)
        const componentItem = await fs.readFile(componentPath, 'utf-8')

        const { data: componentData } = matter(componentItem)

        const componentSlugFormatted = componentSlug.replace('.mdx', '')
        const componentSlugTrue = componentSlugFormatted.replace(
          `${categorySlug}-`,
          ''
        )
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

  return {
    categoryData,
    componentItems,
  }
}

export default async function Page({ params }) {
  const { categoryData, componentItems } = await getCategory(params)

  return (
    <>
      <HeroBanner
        title={`${categoryData.title}`}
        subtitle={categoryData.subtitle}
      >
        {categoryData.description}
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={componentItems} />
      </Container>
    </>
  )
}
