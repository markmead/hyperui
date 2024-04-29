import { notFound } from 'next/navigation'

import { getPosts } from '@util/blogs'

import BlogGrid from '@component/BlogGrid'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import Meta from '@component/Meta'

export async function getStaticProps() {
  try {
    const blogPosts = await getPosts()

    return {
      props: {
        blogPosts,
      },
    }
  } catch {
    notFound()
  }
}

export default function Page({ blogPosts }) {
  const metaContent = {
    title: 'Tailwind CSS Blog | HyperUI',
    description: 'Tips and tricks for using Tailwind CSS in your projects.',
  }

  return (
    <>
      <Meta metaContent={metaContent} />

      <HeroBanner title="Blog" subtitle="Tailwind CSS Blog with Tips and Tricks">
        Learn Tailwind CSS tips and tricks that you can use in your work to help write cleaner, more
        maintainable code and help you be more productive.
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={blogPosts} />
      </Container>
    </>
  )
}
