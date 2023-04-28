import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

export async function generateStaticParams() {
  return ['application-ui', 'marketing', 'ecommerce']
}

async function getCategory(params) {
  const componentsPath = join(process.cwd(), '/data/components')
  const categoriesPath = join(process.cwd(), '/data/categories')

  const categorySlug = params.category
  const componentSlugs = await fs.readdir(componentsPath)
  const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)

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
        const componentCount = Object.values(componentData.components).length

        return {
          title: componentData.title,
          slug: componentSlugFormatted,
          category: componentData.category,
          emoji: componentData.emoji,
          count: componentCount,
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

      <Container classNames="py-8 lg:py-12 space-y-8">
        <CollectionGrid componentItems={componentItems} />
      </Container>
    </>
  )
}