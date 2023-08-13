import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'

import FaqList from '@/components/FaqList'
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
      url: 'https://www.hyperui.dev/',
      siteName: 'HyperUI',
      type: 'website',
      image: 'https://www.hyperui.dev/og.jpg',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageData.title} | HyperUI`,
      description: pageData.description,
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
  const { pageData, pageContent } = await getPage(params)

  return (
    <Container classNames="py-8 lg:py-12">
      <article className="prose">
        <MdxRemoteRender
          mdxSource={pageContent}
          mdxComponents={mdxComponents}
        />
      </article>
    </Container>
  )
}
