import { promises as fs } from 'node:fs'
import { join } from 'node:path'

import { getPage } from '@util/db'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

const pagesPath = join(process.cwd(), '/src/data/pages')

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const pageFiles = await fs.readdir(pagesPath)
  const staticParams = []

  for (const pageFile of pageFiles) {
    if (!pageFile.endsWith('.mdx')) {
      continue
    }

    staticParams.push({ slug: pageFile.replace('.mdx', '') })
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const mdxSource = await getPage(params)

  return {
    title: `${mdxSource.frontmatter.title} | HyperUI`,
    description: mdxSource.frontmatter.description,
    alternates: {
      canonical: `/about/${params.slug}`,
    },
  }
}

export default async function Page({ params }) {
  const mdxSource = await getPage(params)

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{mdxSource.frontmatter.title}</h1>

        <MdxRemoteRender mdxSource={mdxSource} />
      </article>
    </Container>
  )
}
