import { FlatCompat } from '@eslint/eslintrc'

import js from '@eslint/js'
import react from 'eslint-plugin-react'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  { ignores: ['.next', 'node_modules', 'out'] },

  js.configs.recommended,
  react.configs.flat.recommended,

  ...compat.config({
    extends: ['next'],
  }),
]
