import Link from 'next/link'

export default function BlogCard({ blogPost }) {
  return (
    <Link href={`/blog/${blogPost.slug}`}>
      <div className="h-full rounded bg-white p-4 shadow-xs ring ring-gray-300 transition-[box-shadow] hover:ring-2 hover:ring-pink-400 sm:p-6">
        <span aria-hidden="true" role="img" className="text-2xl sm:text-3xl">
          {blogPost.emoji}
        </span>

        <div className="mt-4 line-clamp-2">
          <strong className="text-lg font-medium text-pretty text-gray-900 sm:text-xl">
            {blogPost.title}
          </strong>
        </div>

        <time className="mt-1 block text-sm text-gray-700">{blogPost.date}</time>
      </div>
    </Link>
  )
}
