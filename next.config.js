/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote'],
  redirects: async () => {
    return [
      {
        source: '/components/application-ui',
        destination: '/components/application',
        permanent: true,
      },
      {
        source: '/components/application-ui/:slug',
        destination: '/components/application/:slug',
        permanent: true,
      },
    ]
  },
}
