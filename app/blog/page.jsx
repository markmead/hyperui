import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'

export const metadata = {
  title: 'Tailwind CSS Blog | HyperUI',
  description: 'Tips and tricks for using Tailwind CSS in your projects.',
  openGraph: {
    title: 'Tailwind CSS Blog | HyperUI',
    description: 'Tips and tricks for using Tailwind CSS in your projects.',
    ...ogMeta,
  },
  twitter: {
    title: 'Tailwind CSS Blog | HyperUI',
    description: 'Tips and tricks for using Tailwind CSS in your projects.',
    ...twitterMeta,
  },
}

const postsPath = join(process.cwd(), '/src/data/posts')

async function getPosts() {
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

export default async function Page() {
  const blogPosts = await getPosts()

  return (
    <>
      <HeroBanner title="Blog" subtitle="Tailwind CSS Blog with Tips and Tricks">
        Learn Tailwind CSS tips and tricks that you can use in your work to help write cleaner, more
        maintainable code and help you be more productive.
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={blogPosts} />
      </Container>
    </>
  )
}
