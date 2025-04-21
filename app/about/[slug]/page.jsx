import { promises as fs } from 'node:fs'

import { getAboutPage, formatSlug, pagesDir } from '@util/db'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

export const dynamic = 'force-static'

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

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{pageData.title}</h1>

        <MdxRemoteRender mdxSource={pageContent} />
      </article>
    </Container>
  )
}
