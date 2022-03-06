import type { NextPage } from 'next'

import markdownToHtml from '../../lib/markdown'
import { getPostBySlug, postSlugs } from '../../lib/posts'

import { Post } from '../../interface/post'

export async function getStaticPaths() {
  let paths = postSlugs()

  return {
    fallback: false,
    paths,
  }
}

export async function getStaticProps({ params: { slug } }: Params) {
  const post = getPostBySlug(slug, ['title', 'slug', 'date', 'content'])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

type Params = {
  params: {
    slug: string
  }
}

type Props = {
  post: Post
}

const Blog: NextPage<Props> = ({ post }) => {
  return (
    <>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <article className="mx-auto prose">
          <header>
            <time className="text-sm text-gray-500">{post.date}</time>
            <h1 className="mt-1">{post.title}</h1>
          </header>

          <main dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </>
  )
}

export default Blog
