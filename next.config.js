/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://hyperui-git-update-use-api-markmead.vercel.app/api/:path*',
      },
    ]
  },
}
