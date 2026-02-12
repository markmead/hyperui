// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config'

import astro from 'eslint-plugin-astro'
import js from '@eslint/js'
import globals from 'globals'
import ts from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', '.astro']),

  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,

  {
    files: ['public/**', 'src/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
])
