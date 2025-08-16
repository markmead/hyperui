import { getPosts } from '@service/database'

import BlogGrid from '@component/BlogGrid'

import Hero from '@component/global/Hero'

export const metadata = {
  title: 'Tailwind CSS Blog | HyperUI',
  description: 'Tips and tricks for using Tailwind CSS in your projects.',
  alternates: {
    canonical: '/blog',
  },
}

export const dynamic = 'force-static'

export default async function Page() {
  const blogPosts = await getPosts()

  return (
    <>
      <Hero title="Tailwind CSS Blog" subtitle="Tips, Tricks & Real-World Solutions">
        Dive into this collection of Tailwind CSS insights that make development less painful and
        more fun. Whether you&#39;re just starting out or have battle scars from countless projects,
        there&#39;s something here to make your CSS life easier.
      </Hero>

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        <BlogGrid blogPosts={blogPosts} />
      </div>
    </>
  )
}
