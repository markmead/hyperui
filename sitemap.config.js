/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: 'https://www.hyperui.dev',
  exclude: ['/components/**/*.html'],
  generateIndexSitemap: false,
  generateRobotsTxt: true,
}

module.exports = sitemapConfig
