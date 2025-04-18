// ESLint flat config using FlatCompat for legacy config support (JS only)
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
})

export default [
  ...compat.extends('next'),
  {
    ignores: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
      curly: 'warn',
      'default-case': 'warn',
      'default-param-last': 'warn',
      'dot-notation': 'warn',
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-duplicate-imports': 'error',
      'no-else-return': 'warn',
      'no-empty': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'prefer-promise-reject-errors': 'off',
      'vue/multi-word-component-names': 'off',
      quotes: ['warn', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
]
