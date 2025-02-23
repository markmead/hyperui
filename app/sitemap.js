import { join } from 'path'
import { promises as fs } from 'fs'

export default async function sitemap() {
  async function getCategories() {
    const categorySlugs = ['application-ui', 'marketing']

    return await Promise.all(
      categorySlugs.map(async (categorySlug) => `components/${categorySlug}`)
    )
  }

  async function getComponents() {
    const componentsPath = join(process.cwd(), '/src/data/components')

    const categorySlugs = ['application-ui', 'marketing']
    const componentSlugs = await fs.readdir(componentsPath)

    const componentsByCategory = await Promise.all(
      categorySlugs.map(async (categorySlug) => {
        const componentItems = await Promise.all(
          componentSlugs
            .filter((componentSlug) => componentSlug.includes(categorySlug))
            .map(async (componentSlug) => {
              const componentSlugFormatted = componentSlug.replace('.mdx', '')
              const componentSlugTrue = componentSlugFormatted.replace(`${categorySlug}-`, '')

              return `components/${categorySlug}/${componentSlugTrue}`
            })
        )

        return componentItems
      })
    )

    return componentsByCategory.flatMap((componentItem) => componentItem)
  }

  async function getBlogs() {
    const blogsPath = join(process.cwd(), '/src/data/posts')

    const blogSlugs = await fs.readdir(blogsPath)

    return await Promise.all(
      blogSlugs.map(async (blogSlug) => {
        const blogSlugFormatted = blogSlug.replace('.mdx', '')

        return `blog/${blogSlugFormatted}`
      })
    )
  }

  const siteSlugs = await Promise.all([getCategories(), getComponents(), getBlogs()])

  const transformedSlugs = siteSlugs.flatMap((siteSlug) => {
    return siteSlug.flatMap((pageSlug) => {
      return {
        url: `https://www.hyperui.dev/${pageSlug}`,
        lastModified: new Date(),
      }
    })
  })

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
    ...transformedSlugs,
  ]
}
