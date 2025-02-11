import { iPageRobots } from '@type/site'

export default function robots(): iPageRobots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.hyperui.dev/sitemap.xml',
  }
}
