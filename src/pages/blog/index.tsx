import Head from 'next/head'

import { getAllPosts } from '@/lib/posts'

import { BlogCard } from '@/interface/blog'

import Banner from '@/components/HeroBanner'
import Card from '@/components/BlogCard'

type Props = {
  blogPosts: Array<BlogCard>
}

function BlogIndex({ blogPosts }: Props) {
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

      <Banner
        title="HyperUI Blog"
        subtitle="Tailwind CSS Blog with Tips and Tricks"
      >
        Learn Tailwind CSS tips and tricks that you can use in your work to help
        write cleaner, more maintainable code and help you be more productive.
      </Banner>

      <div className="max-w-screen-xl px-4 py-12 mx-auto">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {blogPosts.map((blogPost: BlogCard) => (
            <li key={blogPost.slug}>
              <Card blogPost={blogPost} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const blogPosts = getAllPosts(['title', 'slug', 'date', 'emoji'])

  return {
    props: { blogPosts },
  }
}

export default BlogIndex
