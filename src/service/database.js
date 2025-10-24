import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'

import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'

import { getComponentItems } from '@service/database/helpers'

const categorySlugs = ['application', 'marketing']
const categoriesDir = join(process.cwd(), '/src/data/categories')

export const componentsDir = join(process.cwd(), '/src/data/components')

export async function getCategory(categorySlug) {
  try {
    const categoryPath = join(categoriesDir, `${categorySlug}.mdx`)
    const categoryItem = await fs.readFile(categoryPath, 'utf8')

    const { data: categoryFrontmatter } = matter(categoryItem)

    const componentItems = await getComponentItems(componentsDir, categorySlug)

    return {
      category: categoryFrontmatter,
      components: componentItems,
    }
  } catch {
    return { category: {}, components: [] }
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

        const componentItems = await getComponentItems(componentsDir, categorySlug)

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
