import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { getPost, formatSlug, postsDir } from '@util/db'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const postFiles = await fs.readdir(postsDir)
  const staticParams = []

  for (const postFile of postFiles) {
    if (!postFile.endsWith('.mdx')) {
      continue
    }

    staticParams.push({ slug: formatSlug(postFile) })
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const { frontmatter } = await getPost(params)

  return {
    title: `${frontmatter.title} | HyperUI`,
    description: frontmatter.description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  }
}

export default async function Page({ params }) {
  const { frontmatter, ...content } = await getPost(params)

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    headline: `${frontmatter.title}`,
    image: 'https://www.hyperui.dev/og.jpg',
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
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
          <h1>{frontmatter.title}</h1>

          <p>
            Updated: <time>{frontmatter.date}</time>
          </p>

          <MdxRemoteRender mdxSource={content} />
        </article>
      </Container>
    </>
  )
}
