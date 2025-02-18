import js from '@eslint/js'

import stylistic from '@stylistic/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'
import shopifyEslintPlugin from '@shopify/eslint-plugin'

import { FlatCompat } from '@eslint/eslintrc'

const flatCompat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  styleConfig: stylistic.configs.recommended,
  styleConfigTypescript: stylisticTs.configs['all-flat'],
  styleConfigJsx: stylisticJsx.configs['all-flat'],
})

const eslintConfig = [
  { ignores: ['**/.next/**', '**/public/**', '**/node_modules/**'] },

  { files: ['**/*.{js,jsx,ts,tsx}'] },

  {
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        document: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        window: 'readonly',
      },
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  },

  {
    plugins: {
      stylistic,
      stylisticJsx,
    },
  },

  ...shopifyEslintPlugin.configs.esnext,
  ...shopifyEslintPlugin.configs.typescript,
  ...shopifyEslintPlugin.configs.react,
  ...shopifyEslintPlugin.configs['typescript-type-checking'],

  {
    rules: {
      'stylistic/line-comment-position': ['warn', { position: 'above' }],
      'stylisticJsx/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          ignoreCase: false,
          locale: 'auto',
          multiline: 'last',
          noSortAlphabetically: true,
          reservedFirst: true,
          shorthandFirst: true,
        },
      ],
      '@shopify/binary-assignment-parens': 'off',
      '@shopify/jsx-no-hardcoded-content': 'off',
      '@shopify/strict-component-boundaries': 'off',
    },
  },

  ...flatCompat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
]

export default eslintConfig
