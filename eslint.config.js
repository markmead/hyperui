import { FlatCompat } from '@eslint/eslintrc'

import js from '@eslint/js'
import react from 'eslint-plugin-react'
import unicorn from 'eslint-plugin-unicorn'

const flatCompat = new FlatCompat()

const eslintConfig = [
  {
    ignores: ['**/.next/**', '**/node_modules/**', '**/out/**'],
  },

  js.configs.recommended,
  react.configs.flat.recommended,
  unicorn.configs.recommended,

  {
    rules: {
      'unicorn/better-regex': 'error',
      'unicorn/no-keyword-prefix': 'error',
      'unicorn/no-unused-properties': 'error',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/import-style': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },

  ...flatCompat.config({
    extends: ['next/core-web-vitals'],
  }),
]

export default eslintConfig
