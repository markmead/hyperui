import rss from '@astrojs/rss'

import { getCollection } from 'astro:content'

import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .map(({ data }) => data)
    .sort((a, b) => b.updatedDate.valueOf() - a.updatedDate.valueOf())

  return rss({
    description: SITE_DESCRIPTION,
    site: context.site,
    title: SITE_TITLE,
    items: posts.map((post) => ({
      ...post,
      link: `/blog/${post.slug}/`,
    })),
  })
}
