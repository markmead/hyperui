import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

import { PageMeta } from '@type/site'
import { PageAbout, PageProps } from '@type/page'
import Ad from '@component/Ad'
import Container from '@component/Container'
import FaqList from '@component/FaqList'
import MdxRemoteRender from '@component/MdxRemoteRender'

interface PageParams {
  slug: string
}

interface PageData {
  pageData: PageAbout
  pageContent: MDXRemoteSerializeResult
}

const mdxComponents = {
  FaqList,
}

const pagesPath: string = join(process.cwd(), '/src/data/pages')

export async function generateMetadata(props: PageProps): Promise<PageMeta> {
  const params: Awaited<PageParams> = await props.params

  const { pageData }: Awaited<{ pageData: PageAbout }> = await getPage(params)

  return {
    title: `${pageData.title} | HyperUI`,
    description: pageData.description,
    alternates: {
      canonical: `/about/${params.slug}`,
    },
  }
}

async function getPage(params: PageParams): Promise<PageData> {
  try {
    const pagePath: string = join(pagesPath, `${params.slug}.mdx`)
    const pageItem: Awaited<string> = await fs.readFile(pagePath, 'utf-8')

    const mdxSource: Awaited<MDXRemoteSerializeResult> = await serialize(pageItem, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }], rehypeSlug],
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageData = mdxSource.frontmatter as any as PageAbout

    return {
      pageData,
      pageContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page(props: PageProps) {
  const params: Awaited<PageParams> = await props.params

  const { pageData, pageContent }: Awaited<PageData> = await getPage(params)

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
