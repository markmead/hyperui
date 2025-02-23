import { NextResponse } from 'next/server'

import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

async function getComponents() {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const categoriesPath = join(process.cwd(), '/src/data/categories')

  const categorySlugs = ['application-ui', 'marketing']
  const componentSlugs = await fs.readdir(componentsPath)

  const componentsByCategory = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)
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

      componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

      return componentItems
    })
  )

  return componentsByCategory.flatMap((componentItem) => componentItem)
}

export async function GET() {
  const componentsData = await getComponents()

  return NextResponse.json(componentsData)
}
