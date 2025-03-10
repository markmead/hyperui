import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@formkit/auto-animate',
  ],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://www.hyperui.dev',
    name: 'HyperUI | Tailwind CSS Components',
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark-dimmed',
        },
      },
    },
  },
  routeRules: {
    '/components/application-ui': {
      redirect: '/components/application',
    },
    '/components/application-ui/**': {
      redirect: '/components/application/**',
    },
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
        quotes: 'single',
        commaDangle: 'only-multiline',
      },
    },
  },
  robots: {
    blockNonSeoBots: true,
    blockAiBots: true,
  },
  sitemap: {
    xslColumns: [
      { label: 'URL', width: '75%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
    ],
  },
})
