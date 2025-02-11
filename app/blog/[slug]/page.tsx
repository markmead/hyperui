import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'

import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

import { iBlogItem, iBlogSchema } from '@type/blog'
import { iPageMeta } from '@type/site'
import { iPageProps } from '@type/page'

import Ad from '@component/Ad'
import BlogPreview from '@component/BlogPreview'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

interface iPageParams {
  slug: string
}

interface iPageData {
  blogData: Partial<iBlogItem>
  blogContent: MDXRemoteSerializeResult
}

const mdxComponents = {
  BlogPreview,
}

const postsPath: string = join(process.cwd(), '/src/data/posts')

export async function generateMetadata(props: iPageProps): Promise<iPageMeta> {
  const params: Awaited<iPageParams> = await props.params

  const { blogData }: Awaited<{ blogData: Partial<iBlogItem> }> = await getPost(params)

  return {
    title: `${blogData.title} | HyperUI`,
    description: blogData.description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  }
}

async function getPost(params: iPageParams): Promise<iPageData> {
  try {
    const postPath: string = join(postsPath, `${params.slug}.mdx`)
    const postItem: Awaited<string> = await fs.readFile(postPath, 'utf-8')

    const mdxSource: Awaited<MDXRemoteSerializeResult> = await serialize(postItem, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }], rehypeSlug],
      },
    })

    const blogData: Partial<iBlogItem> = mdxSource.frontmatter

    return {
      blogData,
      blogContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page(props: iPageProps) {
  const params: Awaited<iPageParams> = await props.params

  const { blogData, blogContent }: Awaited<iPageData> = await getPost(params)

  const schemaData: iBlogSchema = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${blogData.title}`,
    image: 'https://www.hyperui.dev/og.jpg',
    datePublished: `${blogData.date}`,
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        type="application/ld+json"
      />

      <Container id="mainContent" classNames="py-8 lg:py-12 space-y-8">
        <Ad />

        <article className="prose mx-auto">
          <header>
            <time className="text-sm text-gray-700">{blogData.date}</time>

            <h1 className="mt-1">{blogData.title}</h1>
          </header>

          <MdxRemoteRender mdxSource={blogContent} mdxComponents={mdxComponents} />
        </article>
      </Container>
    </>
  )
}
