import { promises as fs } from 'node:fs'

import { getPost, formatSlug, postsDir } from '@service/database'

import MdxRemoteRender from '@component/MdxRemoteRender'
import DescriptionList from '@component/DescriptionList'

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
  const { frontmatter, readingTime, ...content } = await getPost(params)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: ['https://www.hyperui.dev/og.jpg'],
    url: `https://www.hyperui.dev/blog/${params.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.hyperui.dev/blog/${params.slug}`,
    },
    datePublished: frontmatter.published,
    dateModified: frontmatter.updated,
    author: {
      '@type': 'Person',
      name: 'HyperUI',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HyperUI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.hyperui.dev/og.jpg',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
        <article className="prose prose-pre:rounded-lg mx-auto">
          <h1>{frontmatter.title}</h1>

          <DescriptionList
            listItems={[
              { label: 'Reading:', value: <time>{readingTime} min</time> },
              { label: 'Published:', value: <time>{frontmatter.published}</time> },
              { label: 'Updated:', value: <time>{frontmatter.updated}</time> },
            ]}
          />

          <MdxRemoteRender mdxSource={content} />
        </article>
      </div>
    </>
  )
}
