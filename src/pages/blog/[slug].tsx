import { useEffect } from 'react'

import Head from 'next/head'

import Prism from 'prismjs'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { getBlogPaths } from '@/services/api/blogs'
import { BlogFrontmatter } from '@/interface/blog'

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
        <article className="prose prose-img:w-full prose-img:rounded-lg mx-auto">
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
  const source = fs.readFileSync(`./src/data/blog/${slug}.mdx`)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      blogFrontmatter: data,
      blogSource: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const paths = getBlogPaths()

  return {
    paths,
    fallback: false,
  }
}

export default BlogShow
