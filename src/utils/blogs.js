import matter from 'gray-matter'
import remarkSlug from 'remark-slug'
import rehypeExternalLinks from 'rehype-external-links'

import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

export async function getPostPaths() {
  const postsPath = join(process.cwd(), '/src/data/posts')
  const postFiles = await fs.readdir(postsPath)

  const postPaths = postFiles.map((postFile) => {
    return {
      params: {
        slug: postFile.replace(/\.mdx$/, ''),
      },
    }
  })

  return postPaths
}

export async function getPosts() {
  const postsPath = join(process.cwd(), '/src/data/posts')
  const blogSlugs = await fs.readdir(postsPath)

  const blogPosts = await Promise.all(
    blogSlugs.map(async (blogSlug) => {
      const postPath = join(postsPath, blogSlug)
      const blogItem = await fs.readFile(postPath, 'utf-8')

      const { data: blogData } = matter(blogItem)

      return {
        title: blogData.title,
        date: blogData.date,
        emoji: blogData.emoji,
        slug: blogSlug.replace('.mdx', ''),
      }
    })
  )

  return blogPosts.sort((blogA, blogB) => {
    const dateA = new Date(blogA.date)
    const dateB = new Date(blogB.date)

    return dateB - dateA
  })
}

export async function getPost(params) {
  const postsPath = join(process.cwd(), '/src/data/posts')

  const postPath = join(postsPath, `${params.slug}.mdx`)
  const postItem = await fs.readFile(postPath, 'utf-8')

  const { content, data: frontmatter } = matter(postItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
    },
    scope: frontmatter,
  })

  return {
    postData: frontmatter,
    postContent: mdxSource,
  }
}

export async function getBlogsSitemap() {
  const blogsPath = join(process.cwd(), '/src/data/posts')

  const blogSlugs = await fs.readdir(blogsPath)

  return await Promise.all(
    blogSlugs.map(async (blogSlug) => {
      const blogSlugFormatted = blogSlug.replace('.mdx', '')

      return `blog/${blogSlugFormatted}`
    })
  )
}
