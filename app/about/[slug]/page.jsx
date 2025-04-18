import { notFound } from 'next/navigation'

import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'

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
  const { pageData } = await getPage(params)

  return {
    title: `${pageData.title} | HyperUI`,
    description: pageData.description,
    alternates: {
      canonical: `/about/${params.slug}`,
    },
  }
}

async function getPage(params) {
  try {
    const pagePath = join(pagesPath, `${params.slug}.mdx`)
    const pageItem = await fs.readFile(pagePath, 'utf-8')

    const mdxSource = await serialize(pageItem, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
    })

    return {
      pageData: mdxSource.frontmatter,
      pageContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page({ params }) {
  const { pageData, pageContent } = await getPage(params)

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{pageData.title}</h1>

        <MdxRemoteRender mdxSource={pageContent} />
      </article>
    </Container>
  )
}
