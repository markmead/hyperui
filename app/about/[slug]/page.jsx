import { promises as fs } from 'node:fs'
import { join } from 'node:path'

import { getPage, formatSlug } from '@util/db'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

const pagesPath = join(process.cwd(), '/src/data/pages')

export const dynamic = 'force-static'

export async function generateStaticParams() {
  let staticParams = []

  const pageFiles = await fs.readdir(pagesPath)

  for (const pageFile of pageFiles) {
    if (!pageFile.endsWith('.mdx')) {
      continue
    }

    staticParams = [...staticParams, { slug: formatSlug(pageFile) }]
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const { frontmatter } = await getPage(params)

  return {
    title: `${frontmatter.title} | HyperUI`,
    description: frontmatter.description,
    alternates: {
      canonical: `/about/${params.slug}`,
    },
  }
}

export default async function Page({ params }) {
  const { frontmatter, ...content } = await getPage(params)

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{frontmatter.title}</h1>

        <MdxRemoteRender mdxSource={content} />
      </article>
    </Container>
  )
}
