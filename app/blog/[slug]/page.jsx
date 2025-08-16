import { promises as fs } from 'node:fs'

import { getPost, formatSlug, postsDir } from '@service/database'

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
    datePublished: frontmatter.published,
    dateModified: frontmatter.updated,
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

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
        <article className="prose mx-auto">
          <h1>{frontmatter.title}</h1>

          <p>
            Updated: <time>{frontmatter.updated}</time>
            <br />
            Published: <time>{frontmatter.published}</time>
          </p>

          <MdxRemoteRender mdxSource={content} />
        </article>
      </div>
    </>
  )
}
