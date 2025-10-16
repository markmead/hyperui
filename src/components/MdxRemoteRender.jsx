'use client'

import { MDXRemote } from 'next-mdx-remote'

import Ad from '@component/global/Ad'
import CollectionList from '@component/CollectionList'

export default function MdxContent({ mdxSource, mdxScope = {} }) {
  const mdxComponents = { Ad, CollectionList }

  return <MDXRemote {...mdxSource} scope={mdxScope} components={mdxComponents} />
}
