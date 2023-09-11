export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/code/',
      },
      sitemap: 'https://www.hyperui.dev/sitemap.xml',
    }
  }
