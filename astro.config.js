// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import rehypeExternalLinks from 'rehype-external-links'
import tailwindcss from '@tailwindcss/vite'

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
        cssVariable: '--font-google-sans-flex',
        name: 'Google Sans Flex',
        provider: fontProviders.google(),
        weights: [400, 500, 600, 700, 800],
      },
    ],
  },
})
