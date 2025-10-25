// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import rehypeExternalLinks from 'rehype-external-links'

import { defineConfig, fontProviders } from 'astro/config'

import alpinejs from '@astrojs/alpinejs'

// https://astro.build/config
export default defineConfig({
  site: 'https://hyperui.dev',
  integrations: [mdx(), sitemap(), alpinejs()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noreferrer'] }]],
  },
  experimental: {
    fonts: [
      {
        name: 'Inter',
        cssVariable: '--font-inter',
        weights: [400, 500, 600, 700],
        provider: fontProviders.google(),
      },
    ],
  },
})
