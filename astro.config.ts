import { defineConfig, fontProviders } from 'astro/config'

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import tailwindcss from '@tailwindcss/vite'

import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  site: 'https://hyperui.dev',

  integrations: [
    mdx(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    syntaxHighlight: false,
  },

  fonts: [
    {
      cssVariable: '--font-google-sans-flex',
      name: 'Google Sans Flex',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700, 800],
    },
  ],

  adapter: cloudflare(),
})
