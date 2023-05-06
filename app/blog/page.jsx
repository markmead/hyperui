import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'

export const metadata = {
  title: 'Tailwind CSS Blog | HyperUI',
  description: 'Tips and tricks for using Tailwind CSS in your projects.',
  openGraph: {
    title: 'Tailwind CSS Blog | HyperUI',
    description: 'Tips and tricks for using Tailwind CSS in your projects.',
    url: 'https://www.hyperui.dev/',
    siteName: 'HyperUI',
    type: 'website',
    image: 'https://www.hyperui.dev/og.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tailwind CSS Blog | HyperUI',
    description: 'Tips and tricks for using Tailwind CSS in your projects.',
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
        slug: blogSlug.replace('.mdx', ''),
        date: blogData.date,
        emoji: blogData.emoji,
      }
    })
  )

  return blogPosts
}

export default async function Page() {
  const blogPosts = await getPosts()

  return (
    <>
      <HeroBanner
        title="Blog"
        subtitle="Tailwind CSS Blog with Tips and Tricks"
      >
        Learn Tailwind CSS tips and tricks that you can use in your work to help
        write cleaner, more maintainable code and help you be more productive.
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={blogPosts} />
      </Container>
    </>
  )
}
