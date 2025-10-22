import { getComponents, getPosts, categorySlugs } from '@service/database'

const SITE_URL = 'https://www.hyperui.dev'
const SITE_STATIC_URLS = ['', 'about/faqs', 'about/acknowledgements', 'blog']

export default async function sitemap() {
  const siteUrls = new Map()

  function addSiteUrl(pageUrl, lastModified) {
    if (siteUrls.has(pageUrl)) {
      return
    }

    const urlEntry = lastModified ? { url: pageUrl, lastModified } : { url: pageUrl }

    siteUrls.set(pageUrl, urlEntry)
  }

  const categorySlugsList = categorySlugs.map((categorySlug) => `components/${categorySlug}`)

  let componentsByCategory = []
  let postItems = []

  try {
    componentsByCategory = (await getComponents()) || []
  } catch {
    // We do nothing
  }

  try {
    postItems = (await getPosts()) || []
  } catch {
    // We do nothing
  }

  const componentSlugs = componentsByCategory.flatMap(({ componentItems = [] }) =>
    componentItems.map(({ category, slug }) => `components/${category}/${slug}`)
  )

  const blogSlugs = postItems.map(({ slug, updated }) => ({
    pageSlug: `blog/${slug}`,
    lastModified: updated,
  }))

  const allSlugs = [
    ...SITE_STATIC_URLS.map((pageSlug) => ({ pageSlug, lastModified: undefined })),
    ...categorySlugsList.map((pageSlug) => ({ pageSlug, lastModified: undefined })),
    ...componentSlugs.map((pageSlug) => ({ pageSlug, lastModified: undefined })),
    ...blogSlugs,
  ]

  for (const { pageSlug, lastModified } of allSlugs) {
    const pageUrl = pageSlug === '' ? SITE_URL : `${SITE_URL}/${pageSlug}`

    addSiteUrl(pageUrl, lastModified)
  }

  return [...siteUrls.values()]
}
