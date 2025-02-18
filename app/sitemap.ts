import { join } from 'node:path'
import { promises as fs } from 'node:fs'

interface Route {
  url: string
  lastModified: Date
}

export default async function sitemap(): Promise<Route[]> {
  async function getComponents(): Promise<string[]> {
    const componentsPath: string = join(process.cwd(), '/src/data/components')

    const categorySlugs: string[] = ['application-ui', 'marketing']
    const componentSlugs: Awaited<string[]> = await fs.readdir(componentsPath)

    const componentsByCategory: Awaited<string[][]> = await Promise.all(
      categorySlugs.map(async (categorySlug) => {
        const componentItems: Awaited<string[]> = await Promise.all(
          componentSlugs
            .filter((componentSlug) => componentSlug.includes(categorySlug))
            .map((componentSlug) => {
              const componentSlugFormatted: string = componentSlug.replace('.mdx', '')
              const componentSlugTrue: string = componentSlugFormatted.replace(
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

  async function getBlogs(): Promise<string[]> {
    const blogsPath: string = join(process.cwd(), '/src/data/posts')
    const blogSlugs: Awaited<string[]> = await fs.readdir(blogsPath)

    const formattedSlugs: string[] = blogSlugs.map((blogSlug) => {
      const blogSlugFormatted: string = blogSlug.replace('.mdx', '')

      return `blog/${blogSlugFormatted}`
    })

    return formattedSlugs
  }

  const siteSlugs: Awaited<string[][]> = await Promise.all([getComponents(), getBlogs()])

  const transformedSlugs: Route[] = siteSlugs.flatMap((siteSlug) => {
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
    {
      url: 'https://www.hyperui.dev/components/application-ui',
      lastModified: new Date(),
    },
    {
      url: 'https://www.hyperui.dev/components/marketing',
      lastModified: new Date(),
    },
    ...transformedSlugs,
  ]
}
