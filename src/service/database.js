import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'

import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'

import { formatSlug } from '@service/database/helpers'

const categorySlugs = ['application', 'marketing']
const categoriesDir = join(process.cwd(), '/src/data/categories')

export const componentsDir = join(process.cwd(), '/src/data/components')

export async function getCategory(categorySlug) {
  try {
    const categoryPath = join(categoriesDir, `${categorySlug}.mdx`)
    const categoryItem = await fs.readFile(categoryPath, 'utf8')

    const componentsPath = join(componentsDir, categorySlug)
    const componentSlugs = await fs.readdir(componentsPath)

    const { data: categoryFrontmatter } = matter(categoryItem)

    const componentItems = await Promise.all(
      componentSlugs.map(async (componentSlug) => {
        const componentPath = join(componentsPath, componentSlug)
        const componentItem = await fs.readFile(componentPath, 'utf8')

        const { data: componentFrontmatter } = matter(componentItem)

        return {
          ...componentFrontmatter,
          id: formatSlug(componentSlug),
        }
      })
    )

    return {
      category: categoryFrontmatter,
      components: componentItems,
    }
  } catch {
    return {}
  }
}

export async function getCollection(categorySlug, collectionSlug) {
  try {
    const componentPath = join(componentsDir, categorySlug, `${collectionSlug}.mdx`)
    const componentItem = await fs.readFile(componentPath, 'utf8')

    const mdxSource = await serialize(componentItem, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noreferrer'] }]],
      },
    })

    return {
      ...mdxSource,
      id: `${categorySlug}-${collectionSlug}`,
      slug: collectionSlug,
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

        const { data: categoryFrontmatter } = matter(categoryItem)

        const componentSlugs = await fs.readdir(join(componentsDir, categorySlug))

        const componentItems = await Promise.all(
          componentSlugs.map(async (componentSlug) => {
            const componentPath = join(componentsDir, categorySlug, componentSlug)
            const componentItem = await fs.readFile(componentPath, 'utf8')

            const { data: componentFrontmatter } = matter(componentItem)

            const componentSlugFormatted = formatSlug(componentSlug)

            return {
              ...componentFrontmatter,
              category: categorySlug,
              id: `${categorySlug}-${componentSlugFormatted}`,
              slug: componentSlugFormatted,
            }
          })
        )

        return {
          category: {
            ...categoryFrontmatter,
            slug: categorySlug,
          },
          components: componentItems,
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
