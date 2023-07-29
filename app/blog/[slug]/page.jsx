import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'

import Container from '@component/Container'
import BlogPreview from '@component/BlogPreview'
import TableContent from '@/components/BlogTableContent'
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
      url: 'https://www.hyperui.dev/',
      siteName: 'HyperUI',
      type: 'website',
      image: 'https://www.hyperui.dev/og.jpg',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blogData.title} | HyperUI`,
      description: blogData.description,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(postsPath)
}

async function getPost(params) {
  const postPath = join(postsPath, `${params.slug}.mdx`)
  const postItem = await fs.readFile(postPath, 'utf-8')

  const { content, data: frontmatter } = matter(postItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
    },
    scope: frontmatter,
  })

  return {
    blogData: frontmatter,
    blogContent: mdxSource,
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

      <Container classNames="py-8 lg:py-12">
        <article className="prose prose-img:rounded-lg mx-auto">
          <header>
            <time className="text-sm text-gray-700">{blogData.date}</time>

            <h1 className="mt-1">{blogData.title}</h1>
          </header>

          <TableContent />

          <MdxRemoteRender
            mdxSource={blogContent}
            mdxComponents={mdxComponents}
          />
        </article>
      </Container>
    </>
  )
}
