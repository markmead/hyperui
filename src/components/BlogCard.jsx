import Link from 'next/link'

export default function BlogCard({ blogPost }) {
  return (
    <Link href={`/blog/${blogPost.slug}`}>
      <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-pink-400 sm:p-6">
        <span aria-hidden="true" className="text-xl sm:text-2xl">
          {blogPost.emoji}
        </span>

        <div className="mt-4 line-clamp-2">
          <strong className="font-medium text-pretty text-gray-900 sm:text-lg">
            {blogPost.title}
          </strong>
        </div>

        <time className="mt-1 block text-sm text-gray-700">{blogPost.date}</time>
      </div>
    </Link>
  )
}
