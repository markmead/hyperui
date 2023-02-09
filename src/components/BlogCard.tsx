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
        className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-black"
      >
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
