import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'

import { postFilePaths, POSTS_PATH } from '../../utils/mdx'

import {
  currentCollection,
  currentCollectionComponents,
} from '../../lib/collections'

import List from '../../components/list'

const components = {
  List,
}

export default function Example({ source, collection, examples, name }) {
  const data = { collection, examples, name }

  return (
    <section>
      <div className="max-w-screen-xl px-4 pt-24 pb-16 mx-auto">
        <div className="prose">
          <MDXRemote {...source} components={components} scope={data} />
        </div>
      </div>
    </section>
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

  const collection = currentCollection(params.slug)
  const examples = currentCollectionComponents(params.slug)
  const name = params.slug

  return {
    props: {
      source: mdxSource,
      // frontMatter: data,
      collection,
      examples,
      name,
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
