import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { getPosts, formatSlug } from '@util/db'

export default async function sitemap() {
  const categorySlugs = ['application', 'marketing']
  const categoryPaths = categorySlugs.map((categorySlug) => `components/${categorySlug}`)

  const componentsDirectoryPath = join(process.cwd(), '/src/data/components')

  let componentCollectionPaths = []

  for (const categorySlug of categorySlugs) {
    const categoryDirectoryPath = join(componentsDirectoryPath, categorySlug)
    const collectionFileNames = await fs.readdir(categoryDirectoryPath)

    componentCollectionPaths.push(
      ...collectionFileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => `components/${categorySlug}/${formatSlug(fileName)}`)
    )
  }

  const postItems = await getPosts()
  const postPaths = postItems.map((blogPost) => `blog/${blogPost.slug}`)

  const allPagePaths = [...categoryPaths, ...componentCollectionPaths, ...postPaths]

  const sitemapEntries = allPagePaths.map((pagePath) => ({
    url: `https://www.hyperui.dev/${pagePath}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: 'https://www.hyperui.dev',
      lastModified: new Date(),
    },
    {
      url: 'https://www.hyperui.dev/about/faqs',
      lastModified: new Date(),
    },
    {
      url: 'https://www.hyperui.dev/about/acknowledgements',
      lastModified: new Date(),
    },
    {
      url: 'https://www.hyperui.dev/blog',
      lastModified: new Date(),
    },
    ...sitemapEntries,
  ]
}
