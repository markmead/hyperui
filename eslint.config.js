import { FlatCompat } from '@eslint/eslintrc'

import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

import * as pluginMdx from 'eslint-plugin-mdx'

const compat = new FlatCompat({
  //   baseDirectory: import.meta.dirname,
  baseDirectory: import.meta.url,
})

export default [
  { ignores: ['.next', 'node_modules'] },

  js.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    ...pluginMdx.flat,
  },

  ...compat.config({
    extends: ['next'],
  }),
]
