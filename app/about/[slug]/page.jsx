import { notFound } from 'next/navigation'

import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

import { ogMeta, twitterMeta } from '@data/metadata'

import Ad from '@component/Ad'
import FaqList from '@component/FaqList'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

const mdxComponents = {
  FaqList,
}

const pagesPath = join(process.cwd(), '/src/data/pages')

export async function generateMetadata(props) {
  const params = await props.params
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

async function getPage(params) {
  try {
    const pagePath = join(pagesPath, `${params.slug}.mdx`)
    const pageItem = await fs.readFile(pagePath, 'utf-8')

    const mdxSource = await serialize(pageItem, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }], rehypeSlug],
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
    <Container id="mainContent" classNames="py-8 lg:py-12 space-y-8">
      <Ad />

      <article className="prose mx-auto">
        <h1>{pageData.title}</h1>

        <MdxRemoteRender mdxSource={pageContent} mdxComponents={mdxComponents} />
      </article>
    </Container>
  )
}
