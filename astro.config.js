// @ts-check
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig, fontProviders } from 'astro/config'

export default defineConfig({
  site: 'https://hyperui.dev',
  integrations: [
    mdx({
      optimize: true,
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ['noreferrer'],
          target: '_blank',
        },
      ],
    ],
    syntaxHighlight: false,
  },
  redirects: {
    '/components/marketing/forms': '/components/marketing/contact-forms',
  },
  experimental: {
    fonts: [
      {
        cssVariable: '--font-inter',
        name: 'Inter',
        provider: fontProviders.google(),
        weights: [400, 500, 600, 700, 800],
      },
    ],
  },
})
