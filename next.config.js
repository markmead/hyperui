/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote'],
  redirects: async () => [
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
  ],
}

export default nextConfig
