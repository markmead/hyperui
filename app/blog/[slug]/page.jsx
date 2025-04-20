import { promises as fs } from 'node:fs'
import { join } from 'node:path'

import { getPost, formatSlug } from '@util/db'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  let staticParams = []

  const postsDir = join(process.cwd(), '/src/data/posts')
  const postFiles = await fs.readdir(postsDir)

  for (const postFile of postFiles) {
    if (!postFile.endsWith('.mdx')) {
      continue
    }

    staticParams = [...staticParams, { slug: formatSlug(postFile) }]
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const mdxSource = await getPost(params)

  return {
    title: `${mdxSource.frontmatter.title} | HyperUI`,
    description: mdxSource.frontmatter.description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  }
}

export default async function Page({ params }) {
  const mdxSource = await getPost(params)

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    headline: `${mdxSource.frontmatter.title}`,
    image: 'https://www.hyperui.dev/og.jpg',
    datePublished: mdxSource.frontmatter.date,
    dateModified: mdxSource.frontmatter.date,
    author: {
      '@type': 'Person',
      name: 'HyperUI',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HyperUI',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Container id="mainContent" classNames="py-8 lg:py-12">
        <article className="prose mx-auto">
          <h1>{mdxSource.frontmatter.title}</h1>

          <p>
            Updated: <time>{mdxSource.frontmatter.date}</time>
          </p>

          <MdxRemoteRender mdxSource={mdxSource} />
        </article>
      </Container>
    </>
  )
}
