'use client'

import { MDXRemote } from 'next-mdx-remote'

import Ad from '@component/global/Ad'
import BlogCallout from '@component/BlogCallout'
import CollectionList from '@component/CollectionList'

export default function MdxContent({ mdxSource, mdxScope = {} }) {
  const mdxComponents = { Ad, BlogCallout, CollectionList }

  return <MDXRemote {...mdxSource} scope={mdxScope} components={mdxComponents} />
}
