import { useEffect } from 'react'

import Head from 'next/head'

import Prism from 'prismjs'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { getChangelogPaths } from '@/services/api/changelogs'
import { ChangelogFrontmatter } from '@/interface/changelog'

type Props = {
  changelogSource: MDXRemoteProps
  changelogFrontmatter: ChangelogFrontmatter
}

function ChangelogShow({ changelogSource, changelogFrontmatter }: Props) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${changelogFrontmatter.title}`,
    image: ['https://www.hyperui.dev/og.jpg'],
    datePublished: `${changelogFrontmatter.date}`,
    dateModified: `${changelogFrontmatter.date}`,
  }

  useEffect(() => Prism.highlightAll())

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <title>{changelogFrontmatter.title} | HyperUI</title>
        <meta
          name="description"
          content={changelogFrontmatter.description}
          key="description"
        />
        <meta
          property="og:title"
          content={`${changelogFrontmatter.title} | HyperUI`}
          key="og:title"
        />
        <meta
          property="og:description"
          content={changelogFrontmatter.description}
          key="og:description"
        />
        <meta
          name="twitter:title"
          content={`${changelogFrontmatter.title} | HyperUI`}
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={changelogFrontmatter.description}
          key="twitter:description"
        />
      </Head>

      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <article className="prose mx-auto">
          <header>
            <h1>{changelogFrontmatter.title}</h1>
          </header>

          <MDXRemote {...changelogSource} />
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
  const source = fs.readFileSync(`./src/data/changelog/${slug}.mdx`)

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
      changelogFrontmatter: data,
      changelogSource: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const paths = getChangelogPaths()

  return {
    paths,
    fallback: false,
  }
}

export default ChangelogShow
