import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogCard from '@component/BlogCard'

const postsPath = join(process.cwd(), '/data/posts')

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

      <Container classNames="py-8 lg:py-12">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {blogPosts.map((blogPost) => (
            <li key={blogPost.slug}>
              <BlogCard blogPost={blogPost} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}