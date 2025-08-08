import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'

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
        const postItem = await fs.readFile(postPath, 'utf-8')

        const { frontmatter } = await serialize(postItem, {
          parseFrontmatter: true,
        })

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
    const postItem = await fs.readFile(postPath, 'utf-8')

    const mdxSource = await serialize(postItem, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noreferrer'] }]],
      },
    })

    return mdxSource
  } catch {
    return {}
  }
}

export async function getAboutPage({ slug }) {
  try {
    const pagePath = join(pagesDir, `${slug}.mdx`)
    const pageItem = await fs.readFile(pagePath, 'utf-8')

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
    const categoryItem = await fs.readFile(categoryPath, 'utf-8')

    const componentsPath = join(componentsDir, category)
    const componentSlugs = await fs.readdir(componentsPath)

    const { frontmatter: categoryData } = await serialize(categoryItem, {
      parseFrontmatter: true,
    })

    const componentItems = await Promise.all(
      componentSlugs
        .filter((componentSlug) => componentSlug.includes('.mdx'))
        .map(async (componentSlug) => {
          const componentPath = join(componentsPath, componentSlug)
          const componentItem = await fs.readFile(componentPath, 'utf-8')

          const { frontmatter: componentData } = await serialize(componentItem, {
            parseFrontmatter: true,
          })

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
    const componentItem = await fs.readFile(componentPath, 'utf-8')

    const mdxSource = await serialize(componentItem, {
      parseFrontmatter: true,
    })

    return {
      collectionData: {
        ...mdxSource.frontmatter,
        slug: collection,
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
        const categoryItem = await fs.readFile(categoryPath, 'utf-8')

        const { frontmatter: categoryData } = await serialize(categoryItem, {
          parseFrontmatter: true,
        })

        const componentSlugs = await fs.readdir(join(componentsDir, categorySlug))

        const componentItems = await Promise.all(
          componentSlugs
            .filter((componentSlug) => componentSlug.includes('.mdx'))
            .map(async (componentSlug) => {
              const componentPath = join(componentsDir, categorySlug, componentSlug)
              const componentItem = await fs.readFile(componentPath, 'utf-8')

              const { frontmatter: componentData } = await serialize(componentItem, {
                parseFrontmatter: true,
              })

              const componentCount = formatCount(componentData.components)
              const componentSlugFormatted = formatSlug(componentSlug)

              return {
                title: componentData.title,
                slug: componentSlugFormatted,
                category: categorySlug,
                emoji: componentData.emoji,
                count: componentCount,
                tag: componentData.tag,
                id: componentSlugFormatted,
                terms: componentData.terms || [],
              }
            })
        )

        sortByTitle(componentItems)

        return {
          categoryTitle: categoryData?.title,
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
  return dbItems.sort((itemA, itemB) => {
    const dateA = new Date(itemA.updated)
    const dateB = new Date(itemB.updated)

    return dateB - dateA
  })
}

export function sortByTitle(dbItems) {
  return dbItems.sort((itemA, itemB) => {
    const titleA = itemA.title
    const titleB = itemB.title

    return titleA.localeCompare(titleB)
  })
}

export function formatCount(componentItems) {
  return componentItems.reduce((componentCount, componentItem) => {
    const isDark = !!componentItem.dark

    return componentCount + (isDark ? 2 : 1)
  }, 0)
}

export function formatSlug(fileName) {
  return fileName.replace('.mdx', '')
}

export function flattenComponents(collectionData) {
  return collectionData.components.flatMap((componentItem, componentIndex) => {
    const { dark: isDark } = componentItem

    const componentId = componentIndex + 1

    const newComponent = {
      id: componentId,
      title: componentItem.title,
      slug: collectionData.slug,
      category: collectionData.category,
      container: componentItem?.container || collectionData?.container || '',
      wrapper: componentItem?.wrapper || collectionData?.wrapper || 'h-[400px] lg:h-[600px]',
      creator: componentItem?.creator || 'markmead',
      plugins: componentItem?.plugins || [],
      dark: false,
    }

    if (!isDark) {
      return newComponent
    }

    return [
      newComponent,
      {
        ...newComponent,
        id: `${componentId}-dark`,
        title: `${newComponent.title} (Dark)`,
        dark: true,
      },
    ]
  })
}
