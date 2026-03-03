import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

import {
  SEO_DESCRIPTION_APPLICATION_COMPONENTS,
  SEO_DESCRIPTION_MARKETING_COMPONENTS,
  SEO_DESCRIPTION_NEOBRUTALISM_COMPONENTS,
} from '../consts'

const categoryMeta = {
  application: {
    label: 'Application',
    description: SEO_DESCRIPTION_APPLICATION_COMPONENTS,
  },
  marketing: {
    label: 'Marketing',
    description: SEO_DESCRIPTION_MARKETING_COMPONENTS,
  },
  neobrutalism: {
    label: 'Neobrutalism',
    description: SEO_DESCRIPTION_NEOBRUTALISM_COMPONENTS,
  },
} as const

export async function GET(context: { site: URL | undefined }) {
  const site = context.site ?? 'https://hyperui.dev'

  const [application, marketing, neobrutalism] = await Promise.all([
    getCollection('application'),
    getCollection('marketing'),
    getCollection('neobrutalism'),
  ])

  const items = [...application, ...marketing, ...neobrutalism]
    .map(({ data }) => data)
    .sort((a, b) => a.title.localeCompare(b.title))

  return rss({
    title: 'HyperUI Components Collections',
    description:
      'Latest component collection updates across Application, Marketing, and Neobrutalism.',
    site,
    items: items.map((item) => ({
      title: `${item.title} (${categoryMeta[item.category].label})`,
      description: item.description || categoryMeta[item.category].description,
      link: `/components/${item.category}/${item.slug}/`,
    })),
  })
}
