import js from '@eslint/js'
import globals from 'globals'
import nextPlugin from '@next/eslint-plugin-next'
import react from 'eslint-plugin-react'
import unicorn from 'eslint-plugin-unicorn'

const eslintConfig = [
  {
    ignores: ['**/.next/**', '**/node_modules/**', '**/out/**'],
  },

  js.configs.recommended,
  react.configs.flat.recommended,
  unicorn.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@next/next': nextPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
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
]

export default eslintConfig
