import Link from 'next/link'

export default function BlogCard({ blogPost }) {
  return (
    <Link href={`/blog/${blogPost.slug}`}>
      <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-md before:border-2 before:border-dashed before:border-gray-900 dark:bg-gray-900 dark:before:border-white">
        <div className="h-full rounded-md border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2 dark:border-white dark:bg-gray-900">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mt-16 sm:mt-20 lg:mt-24">
              <span aria-hidden="true" role="img" className="text-3xl sm:text-4xl">
                {blogPost.emoji}
              </span>

              <h2 className="mt-4 text-pretty text-lg font-medium text-gray-900 sm:text-xl dark:text-white">
                {blogPost.title}
              </h2>

              <time className="mt-1 text-sm text-gray-700 dark:text-gray-200">{blogPost.date}</time>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
