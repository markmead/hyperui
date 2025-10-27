// @ts-check
import { defineConfig } from 'eslint/config'

import baseEslint from '@eslint/js'
import globals from 'globals'
import astroEslint from 'eslint-plugin-astro'
import tsEslint from 'typescript-eslint'

export default defineConfig([
  {
    ignores: ['**/dist', '**/node_modules', '**/.astro'],
  },

  baseEslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...astroEslint.configs.recommended,

  {
    files: ['src/**', 'public/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
])
