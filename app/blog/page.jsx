import { getPosts } from '@util/db'

import BlogGrid from '@component/BlogGrid'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'

export const metadata = {
  title: 'Tailwind CSS Blog | HyperUI',
  description: 'Tips and tricks for using Tailwind CSS in your projects.',
  alternates: {
    canonical: '/blog',
  },
}

export default async function Page() {
  const blogPosts = await getPosts()

  return (
    <>
      <HeroBanner title="Tailwind CSS Blog" subtitle="Tips, Tricks & Real-World Solutions">
        Dive into this collection of Tailwind CSS insights that make development less painful and
        more fun. Whether you're just starting out or have battle scars from countless projects,
        there's something here to make your CSS life easier.
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={blogPosts} />
      </Container>
    </>
  )
}
