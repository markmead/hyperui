'use client'

import { MDXRemote } from 'next-mdx-remote'

import BlogCallout from '@component/BlogCallout'
import CollectionList from '@component/CollectionList'

export default function MdxContent({ mdxSource, mdxScope = {} }) {
  const mdxComponents = { BlogCallout, CollectionList }

  return <MDXRemote {...mdxSource} scope={mdxScope} components={mdxComponents} />
}
