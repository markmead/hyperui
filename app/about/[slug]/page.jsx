import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

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

async function getPage({ slug }) {
  try {
    const pageSlugs = join(process.cwd(), '/src/data/pages')

    const pagePath = join(pageSlugs, `${slug}.mdx`)
    const pageData = await fs.readFile(pagePath, 'utf-8')

    const mdxSource = await serialize(pageData, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
    })

    return {
      frontmatter: mdxSource.frontmatter,
      content: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page({ params }) {
  const { frontmatter, content } = await getPage(params)

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{frontmatter.title}</h1>

        <MdxRemoteRender mdxSource={content} />
      </article>
    </Container>
  )
}
