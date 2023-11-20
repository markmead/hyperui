import { notFound } from 'next/navigation'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'

import { ogMeta, twitterMeta } from '@data/metadata'

import FaqList from '@component/FaqList'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

const mdxComponents = {
  FaqList,
}

const pagesPath = join(process.cwd(), '/src/data/pages')

export async function generateMetadata({ params }) {
  const { pageData } = await getPage(params)

  return {
    title: `${pageData.title} | HyperUI`,
    description: pageData.description,
    openGraph: {
      title: `${pageData.title} | HyperUI`,
      description: pageData.description,
      ...ogMeta,
    },
    twitter: {
      title: `${pageData.title} | HyperUI`,
      description: pageData.description,
      ...twitterMeta,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(pagesPath)
}

async function getPage(params) {
  try {
    const pagePath = join(pagesPath, `${params.slug}.mdx`)
    const pageItem = await fs.readFile(pagePath, 'utf-8')

    const { content, data: frontmatter } = matter(pageItem)

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkSlug],
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
      scope: frontmatter,
    })

    return {
      pageData: frontmatter,
      pageContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page({ params }) {
  const { pageData, pageContent } = await getPage(params)

  return (
    <Container classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{pageData.title}</h1>

        <MdxRemoteRender mdxSource={pageContent} mdxComponents={mdxComponents} />
      </article>
    </Container>
  )
}
