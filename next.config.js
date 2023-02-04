/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },

  async redirects() {
    return [
      {
        source: '/components',
        destination: '/',
        permanent: true,
      },
      {
        source: '/marketing',
        destination: '/components/marketing',
        permanent: true,
      },
      {
        source: '/ecommerce',
        destination: '/components/ecommerce',
        permanent: true,
      },
      {
        source: '/application-ui',
        destination: '/components/application-ui',
        permanent: true,
      },
      {
        source: '/blog/whats-new-in-hyperui',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/hyperui-rewrite-whats-changed',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}
