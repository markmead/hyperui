import type { NextPage } from 'next'
import Link from 'next/link'

import Banner from '../../components/content/banner'

import { getAllPosts } from '../../lib/posts'
import { Post } from '../../interface/post'
import Card from '../../components/blog/card'

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'slug', 'date', 'emoji'])

  return {
    props: { posts },
  }
}

type Props = {
  posts: Array<Post>
}

const Blogs: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Banner
        title="HyperUI Blog"
        subtitle="Learn Tailwind CSS Tips and Tricks"
      />

      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Card post={post} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Blogs
