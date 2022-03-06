import type { NextPage } from 'next'

import { getAllPosts, getPostBySlug, postSlugs } from '../../lib/posts'
import { Post } from '../../interface/post'
import markdownToHtml from '../../lib/markdown'

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
      <article className="prose">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  )
}

export default Blog
