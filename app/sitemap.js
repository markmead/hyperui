import { getComponents, getPosts, getPages } from '@service/database'

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

async function getAboutEntries() {
  const aboutPages = await getPages()

  return aboutPages.map(({ slug, updated }) => ({
    pageUrl: `about/${slug}`,
    updatedAt: updated,
  }))
}

export default async function sitemap() {
  const [componentEntries, blogEntries, aboutEntries] = await Promise.all([
    getComponentEntries(),
    getBlogEntries(),
    getAboutEntries(),
  ])

  const dynamicEntries = [...componentEntries, ...blogEntries, ...aboutEntries].map(
    ({ pageUrl, updatedAt }) => {
      return buildSitemapEntry(pageUrl, updatedAt)
    }
  )

  return [
    { url: buildUrl('') },
    { url: buildUrl('blog') },
    { url: buildUrl('components/application') },
    { url: buildUrl('components/marketing') },
    ...dynamicEntries,
  ]
}
