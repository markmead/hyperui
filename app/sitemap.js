import { getBlogsSitemap } from '@util/blogs'
import { getCategoriesSitemap, getComponentsSitemap } from '@util/components'

export default async function sitemap() {
  const siteSlugs = await Promise.all([
    getCategoriesSitemap(),
    getComponentsSitemap(),
    getBlogsSitemap(),
  ])

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
