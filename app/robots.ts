import { SiteRobots } from '@type/site'

export default function robots(): SiteRobots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.hyperui.dev/sitemap.xml',
  }
}
