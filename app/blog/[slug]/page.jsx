import { notFound } from 'next/navigation'

import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'

import Container from '@component/Container'
import BlogPreview from '@component/BlogPreview'
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
    alternates: {
      canonical: `/blog/${params.slug}`,
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

      <Container id="mainContent" classNames="py-8 lg:py-12">
        <article className="prose mx-auto">
          <h1>{blogData.title}</h1>

          <time className="text-gray-700">{blogData.date}</time>

          <MdxRemoteRender mdxSource={blogContent} mdxComponents={mdxComponents} />
        </article>
      </Container>
    </>
  )
}
