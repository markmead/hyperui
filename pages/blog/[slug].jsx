import { notFound } from 'next/navigation'

import { getPost, getPostPaths } from '@util/blogs'

import Ad from '@component/Ad'
import BlogPreview from '@component/BlogPreview'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'
import Meta from '@component/Meta'
import TableContent from '@component/BlogTableContent'

const mdxComponents = {
  BlogPreview,
}

export async function getStaticPaths() {
  const postPaths = await getPostPaths()

  return {
    paths: postPaths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  try {
    const { postData, postContent } = await getPost(params)

    return {
      props: {
        postData,
        postContent,
      },
    }
  } catch {
    notFound()
  }
}

export default function Page({ postData, postContent }) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${postData.title}`,
    image: 'https://www.hyperui.dev/og.jpg',
    datePublished: `${postData.date}`,
  }

  const metaContent = {
    title: `${postData.title} | HyperUI`,
    description: postData.description,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Meta metaContent={metaContent} />

      <Container classNames="py-8 lg:py-12">
        <article className="prose mx-auto">
          <header>
            <time className="text-sm text-gray-700">{postData.date}</time>

            <h1 className="mt-1">{postData.title}</h1>
          </header>

          <Ad isCenter adStyle="stickybox" />

          <TableContent />

          <MdxRemoteRender mdxSource={postContent} mdxComponents={mdxComponents} />
        </article>
      </Container>
    </>
  )
}
