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

export async function generateMetadata({ params }) {
  const { frontmatter } = await getPost(params)

  return {
    title: `${frontmatter.title} | HyperUI`,
    description: frontmatter.description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  }
}

async function getPost({ slug }) {
  try {
    const blogSlugs = join(process.cwd(), '/src/data/posts')

    const blogPath = join(blogSlugs, `${slug}.mdx`)
    const blogData = await fs.readFile(blogPath, 'utf-8')

    const mdxSource = await serialize(blogData, {
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
  const { frontmatter, content } = await getPost(params)

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${frontmatter.title}`,
    image: 'https://www.hyperui.dev/og.jpg',
    datePublished: `${frontmatter.date}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Container id="mainContent" classNames="py-8 lg:py-12">
        <article className="prose mx-auto">
          <h1>{frontmatter.title}</h1>

          <time className="text-gray-700">{frontmatter.date}</time>

          <MdxRemoteRender mdxSource={content} mdxComponents={mdxComponents} />
        </article>
      </Container>
    </>
  )
}
