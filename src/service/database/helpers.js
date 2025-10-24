import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'

import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'

const SORT_BY_DATE = 'SORT_BY_DATE'
const SORT_BY_TITLE = 'SORT_BY_TITLE'

export async function getListings(listingDir = '', sortBy = '') {
  if (!listingDir) {
    return []
  }

  try {
    const listingSlugs = await fs.readdir(listingDir)

    const listingItems = await Promise.all(
      listingSlugs.map(async (listingSlug) => {
        const listingPath = join(listingDir, listingSlug)
        const listingItem = await fs.readFile(listingPath, 'utf8')

        const { data: frontmatter } = matter(listingItem)

        return {
          ...frontmatter,
          slug: formatSlug(listingSlug),
        }
      })
    )

    if (sortBy === SORT_BY_DATE) {
      return sortByDate(listingItems)
    }

    if (sortBy === SORT_BY_TITLE) {
      return sortByTitle(listingItems)
    }

    return listingItems
  } catch {
    return []
  }
}

export async function getListing(listingDir, listingSlug) {
  if (!listingDir || !listingSlug) {
    return {}
  }

  try {
    const listingPath = join(listingDir, `${listingSlug}.mdx`)
    const listingItem = await fs.readFile(listingPath, 'utf8')

    let readingTime = 1

    try {
      const { content } = matter(listingItem)

      const wordCount = content.split(/\s+/).filter(Boolean).length

      readingTime = Math.max(1, Math.ceil(wordCount / 200))
    } catch {
      // We do nothing
    }

    const mdxSource = await serialize(listingItem, {
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
