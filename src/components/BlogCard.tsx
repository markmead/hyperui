import Link from 'next/link'

import { BlogCard as iBlogCard } from '@/interface/blog'

type Props = {
  blogPost: iBlogCard
}

function BlogCard({ blogPost }: Props) {
  return (
    <Link href="/blog/[slug]" as={`/blog/${blogPost.slug}`}>
      <a className="group relative block h-full">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-lg border-2 border-dashed border-black"
        ></span>

        <div className="h-full rounded-lg border-2 border-black bg-white transition group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="px-8 pt-32 pb-8">
            <span aria-hidden="true" role="img" className="text-4xl">
              {blogPost.emoji}
            </span>

            <p className="mt-4 text-xl font-medium">{blogPost.title}</p>

            <time className="mt-1 text-xs text-gray-500">{blogPost.date}</time>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default BlogCard
