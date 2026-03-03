import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

import { SITE_TITLE, SEO_DESCRIPTION_BLOG } from '../consts'

export async function GET(context: { site: URL | undefined }) {
  const site = context.site ?? 'https://hyperui.dev'

  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf(),
  )

  return rss({
    title: `${SITE_TITLE} Blog`,
    description: SEO_DESCRIPTION_BLOG,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.data.slug}/`,
    })),
  })
}
