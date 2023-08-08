import { join } from 'path'
import { promises as fs } from 'fs'

export default async function sitemap() {
  async function getCategories() {
    const categorySlugs = ['application-ui', 'marketing', 'ecommerce']

    return await Promise.all(
      categorySlugs.map(async (categorySlug) => `components/${categorySlug}`)
    )
  }

  async function getComponents() {
    const componentsPath = join(process.cwd(), '/src/data/components')

    const categorySlugs = ['application-ui', 'marketing', 'ecommerce']
    const componentSlugs = await fs.readdir(componentsPath)

    const componentsByCategory = await Promise.all(
      categorySlugs.map(async (categorySlug) => {
        const componentItems = await Promise.all(
          componentSlugs
            .filter((componentSlug) => componentSlug.includes(categorySlug))
            .map(async (componentSlug) => {
              const componentSlugFormatted = componentSlug.replace('.mdx', '')
              const componentSlugTrue = componentSlugFormatted.replace(
                `${categorySlug}-`,
                ''
              )

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

  const siteSlugs = await Promise.all([
    getCategories(),
    getComponents(),
    getBlogs(),
  ])

  const [categorySlugs, componentSlugs, blogSlugs] = siteSlugs

  const categoryUrls = categorySlugs.map((categorySlug) => ({
    url: `https://www.hyperui.dev/${categorySlug}`,
    lastModified: new Date(),
  }))

  console.log(categoryUrls)

  return [...categoryUrls]
}
