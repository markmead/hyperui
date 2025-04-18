import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'

import rehypeExternalLinks from 'rehype-external-links'

const postsDir = join(process.cwd(), '/src/data/posts')
const pagesDir = join(process.cwd(), '/src/data/pages')

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
    // We do nothing
  }
}

export async function getPost(pageParams) {
  try {
    const { slug } = pageParams

    const postPath = join(postsDir, `${slug}.mdx`)
    const postItem = await fs.readFile(postPath, 'utf-8')

    const mdxSource = await serialize(postItem, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
    })

    return mdxSource
  } catch {
    notFound()
  }
}

export async function getAboutPage(pageParams) {
  try {
    const pagePath = join(pagesDir, `${pageParams.slug}.mdx`)
    const pageItem = await fs.readFile(pagePath, 'utf-8')

    const mdxSource = await serialize(pageItem, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
    })

    return {
      pageData: mdxSource.frontmatter,
      pageContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export async function getCategory(pageParams) {
  try {
    const categorySlug = pageParams.category

    const categoryPath = join(process.cwd(), '/src/data/categories', `${categorySlug}.mdx`)
    const componentsPath = join(process.cwd(), '/src/data/components', categorySlug)

    const componentSlugs = await fs.readdir(componentsPath)
    const categoryItem = await fs.readFile(categoryPath, 'utf-8')

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

          const componentSlugFormatted = componentSlug.replace('.mdx', '')

          return {
            title: componentData.title,
            slug: componentSlugFormatted,
            category: categorySlug,
            emoji: componentData.emoji,
            count: componentCount,
            tag: componentData.tag,
            id: componentSlugFormatted,
          }
        })
    )

    componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

    return {
      categoryData,
      componentItems,
    }
  } catch {
    notFound()
  }
}

export async function getCollection(pageParams) {
  try {
    const categorySlug = pageParams.category
    const componentSlug = pageParams.collection

    const componentsDirectory = join(process.cwd(), '/src/data/components')
    const componentPath = join(componentsDirectory, categorySlug, `${componentSlug}.mdx`)
    const componentItem = await fs.readFile(componentPath, 'utf-8')

    const mdxSource = await serialize(componentItem, {
      parseFrontmatter: true,
    })

    return {
      collectionData: {
        ...mdxSource.frontmatter,
        slug: pageParams.collection,
      },
      collectionContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export function sortByDate(dbItems) {
  return dbItems.sort((itemA, itemB) => {
    const dateA = new Date(itemA.date)
    const dateB = new Date(itemB.date)

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
