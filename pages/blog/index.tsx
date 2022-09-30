import type { NextPage } from 'next'

import Head from 'next/head'

import { PostCard } from '../../interface/post'

import { getAllPosts } from '../../lib/posts'

import HeroBanner from '../../components/HeroBanner'
import Card from '../../components/BlogCard'

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'slug', 'date', 'emoji'])

  return {
    props: { posts },
  }
}

type Props = {
  posts: Array<PostCard>
}

const Blogs: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Tailwind CSS Blog | HyperUI</title>

        <meta
          content="Read the HyperUI blog for tips and tricks on using Tailwind CSS in your projects."
          name="description"
          key="description"
        />
      </Head>

      <HeroBanner
        title="HyperUI Blog"
        subtitle="Tailwind CSS Blog with Tips and Tricks"
      >
        Learn Tailwind CSS tips and tricks that you can use in your work to help
        write cleaner, more maintainable code and help you be more productive.
      </HeroBanner>

      <div className="max-w-screen-xl px-4 py-12 mx-auto">
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
