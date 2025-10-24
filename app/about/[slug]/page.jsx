import { promises as fs } from 'node:fs'

import { getAboutPage, pagesDir } from '@service/database/pages'
import { formatSlug } from '@service/database/helpers'

import MdxRemoteRender from '@component/MdxRemoteRender'
import DescriptionList from '@component/DescriptionList'

export async function generateStaticParams() {
  const pageFiles = await fs.readdir(pagesDir)
  const staticParams = []

  for (const pageFile of pageFiles) {
    if (!pageFile.endsWith('.mdx')) {
      continue
    }

    staticParams.push({ slug: formatSlug(pageFile) })
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { frontmatter } = await getAboutPage(slug)

  return {
    title: `${frontmatter.title} | HyperUI`,
    description: frontmatter.description,
    alternates: {
      canonical: `/about/${slug}`,
    },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const { frontmatter, readingTime, ...content } = await getAboutPage(slug)

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: frontmatter.title,
    description: frontmatter.description,
    url: `https://www.hyperui.dev/about/${slug}`,
    datePublished: frontmatter.published,
    dateModified: frontmatter.updated,
  }

  return (
    <div id="mainContent" className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <article className="prose mx-auto">
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
  )
}
