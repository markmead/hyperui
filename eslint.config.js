import { FlatCompat } from '@eslint/eslintrc'

import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  { ignores: ['.next', 'node_modules'] },

  js.configs.recommended,
  pluginReact.configs.flat.recommended,

  ...compat.config({
    extends: ['next'],
  }),
]
