import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'

export const metadata = {
  title: 'Tailwind CSS Blog | HyperUI',
  description: 'Tips and tricks for using Tailwind CSS in your projects.',
  alternates: {
    canonical: '/blog',
  },
}

const postsPath = join(process.cwd(), '/src/data/posts')

async function getBlogs() {
  const blogSlugs = await fs.readdir(postsPath)

  const blogPosts = await Promise.all(
    blogSlugs.map(async (blogSlug) => {
      const blogPath = join(postsPath, blogSlug)
      const blogData = await fs.readFile(blogPath, 'utf-8')

      const { frontmatter } = await serialize(blogData, {
        parseFrontmatter: true,
      })

      return {
        ...frontmatter,
        slug: blogSlug.replace('.mdx', ''),
      }
    })
  )

  return blogPosts.sort((blogA, blogB) => {
    return new Date(blogB.date) - new Date(blogA.date)
  })
}

export default async function Page() {
  const blogPosts = await getBlogs()

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
