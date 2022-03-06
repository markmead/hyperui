import type { NextPage } from 'next'
import Link from 'next/link'

import Banner from '../../components/content/banner'

import { getAllPosts } from '../../lib/posts'
import { Post } from '../../interface/post'

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
        <ul className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
                <a className="relative block group">
                  <span className="absolute inset-0 border-2 border-black border-dashed"></span>

                  <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                    <div className="px-8 pt-32 pb-8">
                      <span className="text-4xl" role="img" aria-hidden="true">
                        {post.emoji}
                      </span>

                      <h2 className="mt-4 text-xl font-medium">{post.title}</h2>

                      <time className="mt-1 text-xs text-gray-500">
                        {post.date}
                      </time>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Blogs
