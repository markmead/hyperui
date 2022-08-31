import type { NextPage } from 'next'

import Head from 'next/head'

import { useEffect } from 'react'

import Prism from 'prismjs'

import { getPostBySlug, postSlugs } from '../../lib/posts'

import { markdownToHtml } from '../../utils/markdown'

import { Post } from '../../interface/post'

type Props = {
  post: Post
}

const Blog: NextPage<Props> = ({ post }) => {
  const { seo } = post

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${post.title}`,
    image: ['https://www.hyperui.dev/og.png'],
    datePublished: `${post.date}`,
    dateModified: `${post.date}`,
    author: {
      '@type': 'Person',
      name: 'Mark Mead',
      url: 'https://twitter.com/itsmarkmead',
    },
  }

  useEffect(() => {
    let prismCode = [
      ...document.querySelectorAll('pre code'),
    ] as Array<HTMLPreElement>

    prismCode.forEach((code) => code.classList.add('language-html'))

    Prism.highlightAll()
  })

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <title>{seo.title} | Blog | HyperUI</title>

        <meta content={seo.description} key="description" name="description" />
      </Head>

      <div className="max-w-screen-xl px-4 py-12 mx-auto">
        <article className="mx-auto prose prose-img:rounded-lg prose-img:w-full">
          <header>
            <time className="text-sm text-gray-500">{post.date}</time>

            <h1 className="mt-1">{post.title}</h1>
          </header>

          <main dangerouslySetInnerHTML={{ __html: post.content }} />
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

export async function getStaticPaths() {
  const paths = postSlugs()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }: Params) {
  const post = getPostBySlug(slug, ['title', 'slug', 'date', 'seo', 'content'])

  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export default Blog
