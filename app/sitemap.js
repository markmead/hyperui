import { getComponents, getPosts } from '@service/database'

function buildUrl(pagePath) {
  return `https://www.hyperui.dev/${pagePath}`
}

function buildSitemapEntry(pageUrl, pageUpdatedAt) {
  return pageUpdatedAt
    ? { url: buildUrl(pageUrl), lastModified: pageUpdatedAt }
    : { url: buildUrl(pageUrl) }
}

async function getComponentEntries() {
  const componentsByCategory = await getComponents()

  return componentsByCategory.flatMap(({ componentItems }) =>
    componentItems.map(({ category, slug }) => ({
      pageUrl: `components/${category}/${slug}`,
      updatedAt: undefined,
    }))
  )
}

async function getBlogEntries() {
  const postItems = await getPosts()

  return postItems.map(({ slug, updated }) => ({
    pageUrl: `blog/${slug}`,
    updatedAt: updated,
  }))
}

export default async function sitemap() {
  const [componentEntries, blogEntries] = await Promise.all([
    getComponentEntries(),
    getBlogEntries(),
  ])

  const dynamicEntries = [...componentEntries, ...blogEntries].map(({ pageUrl, updatedAt }) => {
    return buildSitemapEntry(pageUrl, updatedAt)
  })

  return [
    { url: 'https://www.hyperui.dev' },
    { url: 'https://www.hyperui.dev/about/acknowledgements' },
    { url: 'https://www.hyperui.dev/about/faqs' },
    { url: 'https://www.hyperui.dev/blog' },
    { url: 'https://www.hyperui.dev/components/application' },
    { url: 'https://www.hyperui.dev/components/marketing' },
    ...dynamicEntries,
  ]
}
