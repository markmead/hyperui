import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'

import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'

const SORT_BY_DATE = 'SORT_BY_DATE'

export async function getPages(pagesDir = '', sortBy = '') {
  if (!pagesDir) {
    return []
  }

  try {
    const pageSlugs = await fs.readdir(pagesDir)

    const pageItems = await Promise.all(
      pageSlugs.map(async (pageSlug) => {
        const pagePath = join(pagesDir, pageSlug)
        const pageItem = await fs.readFile(pagePath, 'utf8')

        const { data: frontmatter } = matter(pageItem)

        return {
          ...frontmatter,
          slug: formatSlug(pageSlug),
        }
      })
    )

    if (sortBy === SORT_BY_DATE) {
      return sortByDate(pageItems)
    }

    return pageItems
  } catch {
    return []
  }
}

export async function getPage(pagesDir, pageSlug) {
  if (!pagesDir || !pageSlug) {
    return {}
  }

  try {
    const pagePath = join(pagesDir, `${pageSlug}.mdx`)
    const pageItem = await fs.readFile(pagePath, 'utf8')

    let readingTime = 1

    try {
      const { content } = matter(pageItem)

      const wordCount = content.split(/\s+/).filter(Boolean).length

      readingTime = Math.max(1, Math.ceil(wordCount / 200))
    } catch {
      // We do nothing
    }

    const mdxSource = await serialize(pageItem, {
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

export async function getComponentItems(componentsDir, categorySlug) {
  const componentsPath = join(componentsDir, categorySlug)

  let componentSlugs = []

  try {
    componentSlugs = await fs.readdir(componentsPath)
  } catch {
    return []
  }

  return Promise.all(
    componentSlugs.map(async (componentSlug) => {
      const componentPath = join(componentsPath, componentSlug)

      let componentItem = ''

      try {
        componentItem = await fs.readFile(componentPath, 'utf8')
      } catch {
        return {}
      }

      const { data: componentFrontmatter } = matter(componentItem)

      return {
        ...componentFrontmatter,
        category: categorySlug,
        id: `${categorySlug}-${formatSlug(componentSlug)}`,
        slug: formatSlug(componentSlug),
      }
    })
  )
}

export function sortByDate(dbItems) {
  return dbItems.toSorted((itemA, itemB) => {
    return new Date(itemB.updated) - new Date(itemA.updated)
  })
}

export function flattenComponents(id, slug, frontmatter) {
  const collectionCategory = id.split('-').at(0)

  return frontmatter.components.flatMap((componentItem, componentIndex) => {
    const componentId = componentIndex + 1
    const componentKey = `${collectionCategory}-${slug}-${componentId}`

    const componentData = {
      id: componentId,
      title: componentItem.title,
      slug: slug,
      category: collectionCategory,
      container: componentItem?.container || frontmatter?.container || '',
      wrapper: componentItem?.wrapper || frontmatter?.wrapper || 'h-[400px] lg:h-[600px]',
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

export const formatSlug = (fileName) => fileName.replace('.mdx', '')
