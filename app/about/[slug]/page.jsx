import { promises as fs } from 'node:fs'

import { getAboutPage, formatSlug, pagesDir } from '@service/database'

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
  const { pageData } = await getAboutPage(params)

  return {
    title: `${pageData.title} | HyperUI`,
    description: pageData.description,
    alternates: {
      canonical: `/about/${params.slug}`,
    },
  }
}

export default async function Page({ params }) {
  const { pageData, pageContent } = await getAboutPage(params)

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.title,
    description: pageData.description,
    url: `https://www.hyperui.dev/about/${params.slug}`,
    datePublished: pageData.published,
    dateModified: pageData.updated,
  }

  return (
    <div id="mainContent" className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <article className="prose mx-auto">
        <h1>{pageData.title}</h1>

        <DescriptionList
          listItems={[
            { label: 'Published:', value: <time>{pageData.published}</time> },
            { label: 'Updated:', value: <time>{pageData.updated}</time> },
          ]}
        />

        <MdxRemoteRender mdxSource={pageContent} />
      </article>
    </div>
  )
}
