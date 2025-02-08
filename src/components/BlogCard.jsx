import Link from 'next/link'

export default function BlogCard({ blogPost }) {
  return (
    <Link href={`/blog/${blogPost.slug}`}>
      <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-md before:border-2 before:border-dashed before:border-gray-900">
        <div className="h-full rounded-md border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 group-hover:ltr:-translate-x-2 group-hover:rtl:translate-x-2">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mt-16 sm:mt-20 lg:mt-24">
              <span aria-hidden="true" role="img" className="text-3xl sm:text-4xl">
                {blogPost.emoji}
              </span>

              <time className="mt-4 block text-sm text-gray-700">{blogPost.date}</time>

              <strong className="mt-1 block text-lg font-medium text-pretty text-gray-900 sm:text-xl">
                {blogPost.title}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
