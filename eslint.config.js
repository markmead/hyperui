import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

import js from '@eslint/js'
import react from 'eslint-plugin-react'
import unicorn from 'eslint-plugin-unicorn'

const eslintConfig = defineConfig([
  ...nextVitals,

  js.configs.recommended,
  react.configs.flat.recommended,
  unicorn.configs.recommended,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  {
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/set-state-in-effect': 'warn',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/import-style': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/better-regex': 'error',
      'unicorn/no-keyword-prefix': 'error',
      'unicorn/no-unused-properties': 'error',
    },
  },
])

export default eslintConfig
