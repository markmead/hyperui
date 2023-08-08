/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: ['/components/**/*.html', '/blogs/*.html'],
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  siteUrl: 'https://www.hyperui.dev',
}
