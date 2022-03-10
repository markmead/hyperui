import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../../utils/mdx'

import { currentCollectionComponents } from '../../lib/collections'

import List from '../../components/list'

const components = {
  List,
}

export default function PostPage({ source, frontMatter, examples }) {
  const data = { examples }

  return (
    <>
      <h1>{frontMatter.title}</h1>

      <MDXRemote {...source} components={components} scope={data} />
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  let examples = currentCollectionComponents(params.slug)

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      examples,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
