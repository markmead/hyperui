import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'

import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'

export const categorySlugs = ['application', 'marketing']

export const postsDir = join(process.cwd(), '/src/data/posts')
export const pagesDir = join(process.cwd(), '/src/data/pages')
export const categoriesDir = join(process.cwd(), '/src/data/categories')
export const componentsDir = join(process.cwd(), '/src/data/components')

export async function getPosts() {
  try {
    const postSlugs = await fs.readdir(postsDir)

    const blogPosts = await Promise.all(
      postSlugs.map(async (postSlug) => {
        const postPath = join(postsDir, postSlug)
        const postItem = await fs.readFile(postPath, 'utf8')

        const { data: frontmatter } = matter(postItem)

        return {
          ...frontmatter,
          slug: formatSlug(postSlug),
        }
      })
    )

    return sortByDate(blogPosts)
  } catch {
    return []
  }
}

export async function getPost({ slug }) {
  try {
    const postPath = join(postsDir, `${slug}.mdx`)
    const postItem = await fs.readFile(postPath, 'utf8')

    let readingTime = 1

    try {
      const { content: rawContent } = matter(postItem)

      const wordCount = rawContent.split(/\s+/).filter(Boolean).length

      readingTime = Math.max(1, Math.ceil(wordCount / 200))
    } catch {
      // We do nothing
    }

    const mdxSource = await serialize(postItem, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noreferrer'] }]],
      },
    })

    return { ...mdxSource, readingTime }
  } catch {
    return {}
  }
}

export async function getAboutPage({ slug }) {
  try {
    const pagePath = join(pagesDir, `${slug}.mdx`)
    const pageItem = await fs.readFile(pagePath, 'utf8')

    const mdxSource = await serialize(pageItem, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noreferrer'] }]],
      },
    })

    return {
      pageData: mdxSource.frontmatter,
      pageContent: mdxSource,
    }
  } catch {
    return {}
  }
}

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

export function sortByDate(dbItems) {
  return dbItems.toSorted((itemA, itemB) => {
    return new Date(itemB.updated) - new Date(itemA.updated)
  })
}

export function sortByTitle(dbItems) {
  return dbItems.toSorted((itemA, itemB) => {
    return itemA.title.localeCompare(itemB.title)
  })
}

export function formatCount(componentItems) {
  return componentItems.reduce((componentCount, componentItem) => {
    return componentCount + (componentItem.dark ? 2 : 1)
  }, 0)
}

export function formatSlug(fileName) {
  return fileName.replace('.mdx', '')
}

export function flattenComponents(collectionData) {
  const collectionCategory = collectionData.id.split('-').at(0)

  return collectionData.components.flatMap((componentItem, componentIndex) => {
    const componentId = componentIndex + 1
    const componentKey = `${collectionCategory}-${collectionData.slug}-${componentId}`

    const componentData = {
      id: componentId,
      title: componentItem.title,
      slug: collectionData.slug,
      category: collectionCategory,
      container: componentItem?.container || collectionData?.container || '',
      wrapper: componentItem?.wrapper || collectionData?.wrapper || 'h-[400px] lg:h-[600px]',
      contributors: componentItem?.contributors || ['markmead'],
      plugins: componentItem?.plugins || [],
      key: componentKey,
      dark: false,
    }

    if (!componentItem.dark) {
      return componentData
    }

    const darkData =
      Object.keys(componentItem.dark).length > 0
        ? {
            dark: true,
            contributors: ['markmead', ...(componentItem.dark.contributors || [])],
          }
        : { dark: true }

    return [
      componentData,
      {
        ...componentData,
        ...darkData,
        id: `${componentId}-dark`,
        title: `${componentData.title} (Dark)`,
        key: `${componentKey}-dark`,
      },
    ]
  })
}
