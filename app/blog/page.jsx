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

export default async function Page() {
  const blogPosts = await getPosts()

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Tailwind CSS Blog',
    description: 'Tips and tricks for using Tailwind CSS in your projects.',
    url: 'https://www.hyperui.dev/blog',
    blogPost: blogPosts.map((postItem) => ({
      '@type': 'BlogPosting',
      headline: postItem.title,
      url: `https://www.hyperui.dev/blog/${postItem.slug}`,
      dateModified: postItem.updated,
      datePublished: postItem.published,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

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
