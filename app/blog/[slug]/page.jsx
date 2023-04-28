import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import Container from '@component/Container'
import BlogPreview from '@component/BlogPreview'
import MdxRemoteRender from '@component/MdxRemoteRender'

const mdxComponents = {
  BlogPreview,
}

const postsPath = join(process.cwd(), '/data/posts')

export async function generateStaticParams() {
  return await fs.readdir(postsPath)
}

async function getPost(params) {
  const postPath = join(postsPath, `${params.slug}.mdx`)
  const postItem = await fs.readFile(postPath, 'utf-8')

  const { content, data: frontmatter } = matter(postItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
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
    image: ['https://www.hyperui.dev/og.jpg'],
    datePublished: `${blogData.date}`,
    dateModified: `${blogData.date}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Container classNames="py-8 lg:py-12">
        <article className="prose prose-img:rounded-lg dark:prose-invert dark:prose-headings:text-white mx-auto">
          <header>
            <time className="text-sm text-gray-700 dark:text-gray-200">
              {blogData.date}
            </time>

            <h1 className="mt-1">{blogData.title}</h1>
          </header>

          <MdxRemoteRender
            mdxSource={blogContent}
            mdxComponents={mdxComponents}
          />
        </article>
      </Container>
    </>
  )
}
