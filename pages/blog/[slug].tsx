import { useEffect } from 'react'

import Head from 'next/head'

import Prism from 'prismjs'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { postSlugs } from '../../lib/posts'
import { BlogFrontmatter } from '../../interface/blog'

type Props = {
  blogSource: MDXRemoteProps
  blogFrontmatter: BlogFrontmatter
}

function BlogShow({ blogSource, blogFrontmatter }: Props) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${blogFrontmatter.title}`,
    image: ['https://www.hyperui.dev/og.png'],
    datePublished: `${blogFrontmatter.date}`,
    dateModified: `${blogFrontmatter.date}`,
    author: {
      '@type': 'Person',
      name: 'Mark Mead',
      url: 'https://twitter.com/itsmarkmead',
    },
  }

  useEffect(() => Prism.highlightAll())

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <title>{blogFrontmatter.title} | HyperUI</title>

        <meta
          content={blogFrontmatter.description}
          key="description"
          name="description"
        />
      </Head>

      <div className="max-w-screen-xl px-4 py-12 mx-auto">
        <article className="mx-auto prose prose-img:rounded-lg prose-img:w-full">
          <header>
            <time className="text-sm text-gray-500">
              {blogFrontmatter.date}
            </time>

            <h1 className="mt-1">{blogFrontmatter.title}</h1>
          </header>

          <MDXRemote {...blogSource} />
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

  const blogSource = fs.readFileSync(`data/posts/${blogSlug}.mdx`)

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
  const paths = postSlugs()

  return {
    paths,
    fallback: false,
  }
}

export default BlogShow
