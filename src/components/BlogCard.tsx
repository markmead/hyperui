import Link from 'next/link'

import { BlogCard as BlogCardInterface } from '@/interface/blog'

type Props = {
  blogPost: BlogCardInterface
}

function BlogCard({ blogPost }: Props) {
  return (
    <Link href="/blog/[slug]" as={`/blog/${blogPost.slug}`}>
      <a
        title={`Tailwind CSS Blog - ${blogPost.title}`}
        className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900 dark:bg-gray-900 dark:before:border-gray-700"
      >
        <div className="h-full rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-gray-700 dark:bg-gray-900">
          <div className="px-8 pt-32 pb-8">
            <span aria-hidden="true" role="img" className="text-4xl">
              {blogPost.emoji}
            </span>

            <h2 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
              {blogPost.title}
            </h2>

            <time className="mt-1 text-xs text-gray-700 dark:text-gray-200">
              {blogPost.date}
            </time>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default BlogCard
