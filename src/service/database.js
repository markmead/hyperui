import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'

import matter from 'gray-matter'

import { sortByTitle, formatSlug, formatCount } from '@service/database/helpers'

export const categorySlugs = ['application', 'marketing']

export const postsDir = join(process.cwd(), '/src/data/posts')
export const pagesDir = join(process.cwd(), '/src/data/pages')
export const categoriesDir = join(process.cwd(), '/src/data/categories')
export const componentsDir = join(process.cwd(), '/src/data/components')

export async function getCategory({ category }) {
  try {
    const categoryPath = join(categoriesDir, `${category}.mdx`)
    const categoryItem = await fs.readFile(categoryPath, 'utf8')

    const componentsPath = join(componentsDir, category)
    const componentSlugs = await fs.readdir(componentsPath)

    const { data: categoryData } = matter(categoryItem)

    const componentItems = await Promise.all(
      componentSlugs
        .filter((componentSlug) => componentSlug.includes('.mdx'))
        .map(async (componentSlug) => {
          const componentPath = join(componentsPath, componentSlug)
          const componentItem = await fs.readFile(componentPath, 'utf8')

          const { data: componentData } = matter(componentItem)

          const componentCount = formatCount(componentData.components)
          const componentSlugFormatted = formatSlug(componentSlug)

          return {
            title: componentData.title,
            slug: componentSlugFormatted,
            category,
            emoji: componentData.emoji,
            count: componentCount,
            tag: componentData.tag,
            id: componentSlugFormatted,
          }
        })
    )

    sortByTitle(componentItems)

    return {
      categoryData,
      componentItems,
    }
  } catch {
    return {}
  }
}

export async function getCollection({ category, collection }) {
  try {
    const componentPath = join(componentsDir, category, `${collection}.mdx`)
    const componentItem = await fs.readFile(componentPath, 'utf8')

    const mdxSource = await serialize(componentItem, {
      parseFrontmatter: true,
    })

    return {
      collectionData: {
        ...mdxSource.frontmatter,
        slug: collection,
        id: `${category}-${collection}`,
      },
      collectionContent: mdxSource,
    }
  } catch {
    return {}
  }
}

export async function getComponents() {
  try {
    const componentsByCategory = await Promise.all(
      categorySlugs.map(async (categorySlug) => {
        const categoryPath = join(categoriesDir, `${categorySlug}.mdx`)
        const categoryItem = await fs.readFile(categoryPath, 'utf8')

        const { data: categoryData } = matter(categoryItem)

        const componentSlugs = await fs.readdir(join(componentsDir, categorySlug))

        const componentItems = await Promise.all(
          componentSlugs
            .filter((componentSlug) => componentSlug.includes('.mdx'))
            .map(async (componentSlug) => {
              const componentPath = join(componentsDir, categorySlug, componentSlug)
              const componentItem = await fs.readFile(componentPath, 'utf8')

              const { data: componentData } = matter(componentItem)

              const componentCount = formatCount(componentData.components)
              const componentSlugFormatted = formatSlug(componentSlug)

              return {
                title: componentData.title,
                slug: componentSlugFormatted,
                category: categorySlug,
                emoji: componentData.emoji,
                count: componentCount,
                tag: componentData.tag,
                id: `${categorySlug}-${componentSlugFormatted}`,
                terms: componentData.terms || [],
              }
            })
        )

        sortByTitle(componentItems)

        return {
          categoryTitle: categoryData?.title,
          categorySlug,
          componentItems,
        }
      })
    )

    return componentsByCategory
  } catch {
    return []
  }
}

export { getPosts, getPost } from '@service/database/posts'
export { getPages, getPage } from '@service/database/pages'
