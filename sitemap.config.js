/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: ['/api/*', '/server-sitemap-index.xml'],
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  siteUrl: 'https://www.hyperui.dev',
  robotsTxtOptions: {
    additionalSitemaps: ['https://www.hyperui.dev/server-sitemap-index.xml'],
  },
}
