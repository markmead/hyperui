import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'

import rehypeExternalLinks from 'rehype-external-links'

const postsDir = join(process.cwd(), '/src/data/posts')

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
