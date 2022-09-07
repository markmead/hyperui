import type { NextPage } from 'next'

import Head from 'next/head'

import { useEffect } from 'react'

import Prism from 'prismjs'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { postSlugs } from '../../lib/posts'
import { PostFrontmatter } from '../../interface/post'

const components = {}

type Props = {
  source: any
  frontMatter: PostFrontmatter
}

const Blog: NextPage<Props> = ({ source, frontMatter }) => {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${frontMatter.title}`,
    image: ['https://www.hyperui.dev/og.png'],
    datePublished: `${frontMatter.date}`,
    dateModified: `${frontMatter.date}`,
    author: {
      '@type': 'Person',
      name: 'Mark Mead',
      url: 'https://twitter.com/itsmarkmead',
    },
  }

  useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <title>{frontMatter.seo.title} | HyperUI</title>

        <meta
          content={frontMatter.seo.description}
          key="description"
          name="description"
        />
      </Head>

      <div className="px-4 py-12 mx-auto max-w-screen-xl">
        <article className="mx-auto prose prose-img:rounded-lg prose-img:w-full">
          <header>
            <time className="text-sm text-gray-500">{frontMatter.date}</time>

            <h1 className="mt-1">{frontMatter.title}</h1>
          </header>

          <MDXRemote {...source} components={components} />
        </article>
      </div>
    </>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params: { slug } }: Params) {
  const source = fs.readFileSync(`data/posts/${slug}.mdx`)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export async function getStaticPaths() {
  const paths = postSlugs()

  return {
    paths,
    fallback: false,
  }
}

export default Blog
