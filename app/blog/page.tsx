import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { serialize } from 'next-mdx-remote/serialize'

import { iBlogItem } from '@type/blog'
import { iPageMeta } from '@type/site'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'

export const metadata: iPageMeta = {
  title: 'Tailwind CSS Blog | HyperUI',
  description: 'Tips and tricks for using Tailwind CSS in your projects.',
  alternates: {
    canonical: '/blog',
  },
}

const postsPath: string = join(process.cwd(), '/src/data/posts')

async function getPosts() {
  const blogSlugs: Awaited<string[]> = await fs.readdir(postsPath)

  const blogPosts: Awaited<iBlogItem[]> = await Promise.all(
    blogSlugs.map(async (blogSlug) => {
      const postPath: string = join(postsPath, blogSlug)
      const blogItem: Awaited<string> = await fs.readFile(postPath, 'utf-8')

      const { frontmatter: blogData }: Awaited<{ frontmatter: iBlogItem }> = await serialize(
        blogItem,
        { parseFrontmatter: true }
      )

      return {
        slug: blogSlug.replace('.mdx', ''),
        ...blogData,
      }
    })
  )

  return blogPosts.sort((blogA, blogB) => {
    const dateA: Date = new Date(blogA.date)
    const dateB: Date = new Date(blogB.date)

    return dateA > dateB ? -1 : 1
  })
}

export default async function Page() {
  const blogPosts: iBlogItem[] = await getPosts()

  return (
    <>
      <HeroBanner title="Blog" subtitle="Tailwind CSS Blog with Tips and Tricks">
        Learn Tailwind CSS tips and tricks that you can use in your work to help write cleaner, more
        maintainable code and help you be more productive.
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={blogPosts} />
      </Container>
    </>
  )
}
