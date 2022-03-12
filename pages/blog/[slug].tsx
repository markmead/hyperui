import type { NextPage } from 'next'

import Head from 'next/head'

import { useEffect } from 'react'

const prism = require('prismjs')

import { getPostBySlug, postSlugs } from '../../lib/posts'

import convert from '../../utils/markdown'

import { Post } from '../../interface/post'

type Props = {
  post: Post
}

const Blog: NextPage<Props> = ({ post }) => {
  const { seo } = post

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.hyperui.dev/blog/${post.slug}`,
    },
    headline: `${post.title}`,
    datePublished: `${post.date}`,
    dateModified: `${post.date}`,
    author: {
      '@type': 'Person',
      name: 'Mark Mead',
      url: 'https://twitter.com/itsmarkmead',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HyperUI',
    },
    articleBody: `${post.content}`,
    image: {
      '@type': 'ImageObject',
      url: 'https://www.hyperui.dev/og.png',
      height: 630,
      width: 1200,
    },
  }

  useEffect(() => {
    document
      .querySelectorAll('pre code')
      .forEach((code) => code.classList.add('language-html'))

    prism.highlightAll()
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

      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <article className="mx-auto prose prose-img:rounded-lg">
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

  const content = await convert(post.content || '')

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
