// @ts-check
import { defineConfig } from 'eslint/config'

import astroEslint from 'eslint-plugin-astro'
import baseEslint from '@eslint/js'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default defineConfig([
  {
    ignores: ['**/.astro', '**/dist', '**/node_modules', '**/public/*.css'],
  },

  baseEslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...astroEslint.configs.recommended,

  {
    files: ['public/**', 'src/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
])
