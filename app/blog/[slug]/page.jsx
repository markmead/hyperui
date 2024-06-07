import { notFound } from 'next/navigation'

import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'

import { ogMeta, twitterMeta } from '@data/metadata'

import Ad from '@component/Ad'
import Container from '@component/Container'
import BlogPreview from '@component/BlogPreview'
import TableContent from '@component/BlogTableContent'
import MdxRemoteRender from '@component/MdxRemoteRender'

const mdxComponents = {
  BlogPreview,
}

const postsPath = join(process.cwd(), '/src/data/posts')

export async function generateMetadata({ params }) {
  const { blogData } = await getPost(params)

  return {
    title: `${blogData.title} | HyperUI`,
    description: blogData.description,
    openGraph: {
      title: `${blogData.title} | HyperUI`,
      description: blogData.description,
      ...ogMeta,
    },
    twitter: {
      title: `${blogData.title} | HyperUI`,
      description: blogData.description,
      ...twitterMeta,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(postsPath)
}

async function getPost(params) {
  try {
    const postPath = join(postsPath, `${params.slug}.mdx`)
    const postItem = await fs.readFile(postPath, 'utf-8')

    const mdxSource = await serialize(postItem, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkSlug],
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
    })

    return {
      blogData: mdxSource.frontmatter,
      blogContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page({ params }) {
  const { blogData, blogContent } = await getPost(params)

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${blogData.title}`,
    image: 'https://www.hyperui.dev/og.jpg',
    datePublished: `${blogData.date}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Container id="mainContent" classNames="py-8 lg:py-12 space-y-8">
        <Ad />

        <article data-article className="prose mx-auto">
          <header>
            <time className="text-sm text-gray-700">{blogData.date}</time>

            <h1 className="mt-1">{blogData.title}</h1>
          </header>

          <TableContent />

          <MdxRemoteRender mdxSource={blogContent} mdxComponents={mdxComponents} />
        </article>
      </Container>
    </>
  )
}
