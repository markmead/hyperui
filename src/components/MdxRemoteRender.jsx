'use client'

import { MDXRemote } from 'next-mdx-remote'

export default function MdxContent({
  mdxSource,
  mdxComponents = {},
  mdxScope = {},
}) {
  return (
    <MDXRemote {...mdxSource} components={mdxComponents} scope={mdxScope} />
  )
}
