import type { APIContext } from 'astro'

import { getCollection } from 'astro:content'

import rss from '@astrojs/rss'

import { SITE_TITLE, SEO_DESCRIPTION_BLOG } from '../consts'

export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://hyperui.dev')

  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf(),
  )

  return rss({
    title: `${SITE_TITLE} Blog`,
    description: SEO_DESCRIPTION_BLOG,
    site,
    items: posts.map(({ data }) => ({
      title: data.title,
      pubDate: data.pubDate,
      description: data.description,
      link: `/blog/${data.slug}`,
    })),
  })
}
