/** @type {import('next-sitemap').IConfig} */

module.exports = {
  exclude: ['/components/**/*.html'],
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search.json'],
      },
    ],
  },
  siteUrl: 'https://www.hyperui.dev',
}
