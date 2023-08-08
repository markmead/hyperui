import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  const postsPath = join(process.cwd(), '/src/data/posts')

  const blogSlugs = await fs.readdir(postsPath)
  const blogSlugsFormatted = blogSlugs.map(
    (blogSlug) => `https://www.hyperui.dev/blog/${blogSlug.replace('.mdx', '')}`
  )

  return getServerSideSitemap(blogSlugsFormatted)
}
