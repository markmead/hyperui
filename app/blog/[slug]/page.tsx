import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

import { BlogItem, BlogSchema } from '@type/blog'
import { PageMeta } from '@type/site'
import { PageProps } from '@type/page'
import Ad from '@component/Ad'
import BlogPreview from '@component/BlogPreview'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

interface PageParams {
  slug: string
}

interface PageData {
  blogData: BlogItem
  blogContent: MDXRemoteSerializeResult
}

const mdxComponents = {
  BlogPreview,
}

const postsPath: string = join(process.cwd(), '/src/data/posts')

export async function generateMetadata(props: PageProps): Promise<PageMeta> {
  const params: Awaited<PageParams> = await props.params

  const { blogData }: Awaited<{ blogData: BlogItem }> = await getPost(params)

  return {
    title: `${blogData.title} | HyperUI`,
    description: blogData.description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  }
}

async function getPost(params: PageParams): Promise<PageData> {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blogData = mdxSource.frontmatter as any as BlogItem

    return {
      blogData,
      blogContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page(props: PageProps) {
  const params: Awaited<PageParams> = await props.params

  const { blogData, blogContent }: Awaited<PageData> = await getPost(params)

  const schemaData: BlogSchema = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@context': 'http://schema.org',
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
