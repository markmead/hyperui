import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'

import { ogMeta, twitterMeta } from '@data/metadata'

import FaqList from '@component/FaqList'
import SponsorGrid from '@component/SponsorGrid'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

const mdxComponents = {
  FaqList,
  SponsorGrid,
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
}

export default async function Page({ params }) {
  const { pageContent } = await getPage(params)

  return (
    <Container classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <MdxRemoteRender
          mdxSource={pageContent}
          mdxComponents={mdxComponents}
        />

        <div className="not-prose mx-auto max-w-xl text-center">
          <div
            data-ea-publisher="hyperuidev"
            data-ea-type="text"
            className="bordered horizontal"
            id="component-page"
          ></div>
        </div>
      </article>
    </Container>
  )
}
