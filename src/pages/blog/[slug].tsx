import { useState, useEffect, useRef } from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import Prism from 'prismjs'

// @ts-ignore
import bionicReading from 'data-bionic-reading'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { getBlogPaths } from '@/services/api/blogs'
import { BlogFrontmatter } from '@/interface/blog'

import { useAppSelector } from '@/services/hooks/useStore'
import { settingsState } from '@/services/store/slices/settings'

const mdxComponents = {
  Preview: dynamic(() => import('@/components/BlogPreview')),
}

type Props = {
  blogSource: MDXRemoteProps
  blogFrontmatter: BlogFrontmatter
}

function BlogShow({ blogSource, blogFrontmatter }: Props) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${blogFrontmatter.title}`,
    image: ['https://www.hyperui.dev/og.jpg'],
    datePublished: `${blogFrontmatter.date}`,
    dateModified: `${blogFrontmatter.date}`,
  }

  const { bionic } = useAppSelector(settingsState)

  const refArticle = useRef(null)

  useEffect(() => Prism.highlightAll())

  useEffect(() => {
    const articleEl = refArticle.current as unknown as HTMLElement

    if (articleEl && bionic) {
      articleEl.setAttribute('data-bionic-reading', 'true')

      bionicReading()
    }
  }, [])

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <title>{blogFrontmatter.title} | HyperUI</title>
        <meta
          name="description"
          content={blogFrontmatter.description}
          key="description"
        />
        <meta
          property="og:title"
          content={`${blogFrontmatter.title} | HyperUI`}
          key="og:title"
        />
        <meta
          property="og:description"
          content={blogFrontmatter.description}
          key="og:description"
        />
        <meta
          name="twitter:title"
          content={`${blogFrontmatter.title} | HyperUI`}
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={blogFrontmatter.description}
          key="twitter:description"
        />
      </Head>

      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <article
          className="prose prose-img:w-full prose-img:rounded-lg mx-auto"
          ref={refArticle}
        >
          <header>
            <time className="text-sm text-gray-500">
              {blogFrontmatter.date}
            </time>

            <h1 className="mt-1">{blogFrontmatter.title}</h1>
          </header>

          <MDXRemote {...blogSource} components={mdxComponents} />
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
  const blogSlug = slug

  const blogSource = fs.readFileSync(`./src/data/posts/${blogSlug}.mdx`)

  const { content: blogContent, data: blogData } = matter(blogSource)

  const mdxSource = await serialize(blogContent, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [],
    },
    scope: blogData,
  })

  return {
    props: {
      blogFrontmatter: blogData,
      blogSource: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const blogPaths = getBlogPaths()

  return {
    paths: blogPaths,
    fallback: false,
  }
}

export default BlogShow
