import matter from 'gray-matter'
import remarkSlug from 'remark-slug'
import rehypeExternalLinks from 'rehype-external-links'

import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

export async function getPagePaths() {
  const pagesPath = join(process.cwd(), '/src/data/pages')
  const pageFiles = await fs.readdir(pagesPath)

  const pagePaths = pageFiles.map((pageFile) => {
    return {
      params: {
        slug: pageFile.replace(/\.mdx$/, ''),
      },
    }
  })

  return pagePaths
}

export async function getPage(params) {
  const pagesPath = join(process.cwd(), '/src/data/pages')

  const pagePath = join(pagesPath, `${params.slug}.mdx`)
  const pageItem = await fs.readFile(pagePath, 'utf-8')

  const { content, data: frontmatter } = matter(pageItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
    },
    scope: frontmatter,
  })

  return {
    pageData: frontmatter,
    pageContent: mdxSource,
  }
}
