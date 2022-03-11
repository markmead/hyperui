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
import Head from 'next/head'

const components = {
  List,
}

export default function Example({
  source,
  collection,
  examples,
  name,
  frontMatter,
}) {
  const data = { collection, examples, name, spacing: frontMatter.spacing }

  return (
    <>
      <Head>
        <title>{frontMatter.seo.title}</title>
        <meta
          name="description"
          key="description"
          content={frontMatter.seo.description}
        />
      </Head>

      <section>
        <div className="max-w-screen-xl px-4 pt-24 pb-16 mx-auto">
          <div className="prose">
            <MDXRemote {...source} components={components} scope={data} />
          </div>
        </div>
      </section>
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

  const collection = currentCollection(params.slug)
  const examples = currentCollectionComponents(params.slug)
  const name = params.slug

  return {
    props: {
      source: mdxSource,
      collection,
      examples,
      name,
      frontMatter: data,
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
