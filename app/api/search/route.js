import { NextResponse } from 'next/server'

import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

async function getComponents() {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const categoriesPath = join(process.cwd(), '/src/data/categories')

  const categorySlugs = ['application-ui', 'marketing', 'ecommerce']
  const componentSlugs = await fs.readdir(componentsPath)

  const componentsByCategory = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
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
            const componentSlugTrue = componentSlugFormatted.replace(`${categorySlug}-`, '')
            const componentCount = Object.values(componentData.components).length

            return {
              id: componentSlugFormatted,
              title: componentData.title,
              slug: componentSlugTrue,
              emoji: componentData.emoji,
              count: componentCount,
              category: {
                title: categoryData.title,
                slug: categorySlug,
                emoji: categoryData.emoji,
              },
            }
          })
      )

      return componentItems
    })
  )

  return componentsByCategory.flatMap((componentItem) => componentItem)
}

export async function GET() {
  const componentsData = await getComponents()

  return NextResponse.json(componentsData)
}
