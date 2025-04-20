import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'

import rehypeExternalLinks from 'rehype-external-links'

const postsDir = join(process.cwd(), '/src/data/posts')
const pagesDir = join(process.cwd(), '/src/data/pages')
const categoriesDir = join(process.cwd(), '/src/data/categories')
const componentsDir = join(process.cwd(), '/src/data/components')

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

export async function getPage(pageParams) {
  try {
    const { slug } = pageParams

    const pagePath = join(pagesDir, `${slug}.mdx`)
    const pageItem = await fs.readFile(pagePath, 'utf-8')

    const mdxSource = await serialize(pageItem, {
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

export async function getCategory(pageParams) {
  try {
    const { category } = pageParams

    const categoryPath = join(categoriesDir, `${category}.mdx`)
    const categoryComponentsPath = join(componentsDir, category)

    const componentSlugs = await fs.readdir(categoryComponentsPath)
    const categoryItem = await fs.readFile(categoryPath, 'utf-8')

    const categoryMdxSource = await serialize(categoryItem, {
      parseFrontmatter: true,
    })

    const componentItems = await Promise.all(
      componentSlugs
        .filter((componentSlug) => componentSlug.includes('.mdx'))
        .map(async (componentSlug) => {
          const componentPath = join(categoryComponentsPath, componentSlug)
          const componentItem = await fs.readFile(componentPath, 'utf-8')

          const componentMdxSource = await serialize(componentItem, {
            parseFrontmatter: true,
          })

          const componentCount = formatCount(componentMdxSource.frontmatter.components)

          const slug = formatSlug(componentSlug)

          return {
            title: componentMdxSource.frontmatter.title,
            slug,
            category,
            emoji: componentMdxSource.frontmatter.emoji,
            count: componentCount,
            tag: componentMdxSource.frontmatter.tag,
            id: slug,
          }
        })
    )

    componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

    return {
      ...categoryMdxSource,
      components: componentItems,
    }
  } catch {
    notFound()
  }
}

export async function getCollection(pageParams) {
  try {
    const { category, collection } = pageParams

    const componentPath = join(componentsDir, category, `${collection}.mdx`)
    const componentItem = await fs.readFile(componentPath, 'utf-8')

    const mdxSource = await serialize(componentItem, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
    })

    return {
      ...mdxSource,
      slug: formatSlug(collection),
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
