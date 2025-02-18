import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { NextResponse } from 'next/server'
import { serialize } from 'next-mdx-remote/serialize'

import { CategoryItem, ComponentItem } from '@type/component'
import { SearchItem } from '@type/search'

interface ComponentFrontmatter extends ComponentItem {
  emoji: string
  components: ComponentItem[]
}

interface CategoryFrontmatter extends CategoryItem {
  components: ComponentItem[]
}

async function getComponents() {
  const componentsPath: string = join(process.cwd(), '/src/data/components')
  const categoriesPath: string = join(process.cwd(), '/src/data/categories')

  const categorySlugs: string[] = ['application-ui', 'marketing']
  const componentSlugs: string[] = await fs.readdir(componentsPath)

  const componentsByCategory = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const categoryPath: string = join(categoriesPath, `${categorySlug}.mdx`)
      const categoryItem: Awaited<string> = await fs.readFile(categoryPath, 'utf-8')

      const { frontmatter: categoryData }: Awaited<{ frontmatter: CategoryFrontmatter }> =
        await serialize(categoryItem, { parseFrontmatter: true })

      const componentItems: Awaited<SearchItem[]> = await Promise.all(
        componentSlugs
          .filter((componentSlug) => componentSlug.includes(categorySlug))
          .map(async (componentSlug) => {
            const componentPath: string = join(componentsPath, componentSlug)
            const componentItem: Awaited<string> = await fs.readFile(componentPath, 'utf-8')

            const { frontmatter: componentData }: Awaited<{ frontmatter: ComponentFrontmatter }> =
              await serialize(componentItem, { parseFrontmatter: true })

            const componentSlugFormatted: string = componentSlug.replace('.mdx', '')
            const componentSlugTrue: string = componentSlugFormatted.replace(`${categorySlug}-`, '')
            const componentCount: number = Object.values(componentData.components).length

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
  const componentsData: SearchItem[] = await getComponents()

  return NextResponse.json(componentsData)
}
