import { getComponents, getPosts, categorySlugs } from '@service/database'

export default async function sitemap() {
  async function getCategorySlugs() {
    return categorySlugs.map((categorySlug) => `components/${categorySlug}`)
  }

  async function getComponentSlugs() {
    const componentsByCategory = await getComponents()

    return componentsByCategory.flatMap(({ componentItems }) =>
      componentItems.map(({ category, slug }) => `components/${category}/${slug}`)
    )
  }

  async function getBlogSlugs() {
    const postItems = await getPosts()

    return postItems.map(({ slug }) => `blog/${slug}`)
  }

  const pageSlugs = await Promise.all([getCategorySlugs(), getComponentSlugs(), getBlogSlugs()])

  const sitemapEntries = pageSlugs.flatMap((slugList) =>
    slugList.map((pageSlug) => ({
      url: `https://www.hyperui.dev/${pageSlug}`,
      lastModified: new Date(),
    }))
  )

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
