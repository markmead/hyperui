import Link from 'next/link'

export default function BlogCard({ blogPost }) {
  return (
    <Link href="/blog/[slug]" as={`/blog/${blogPost.slug}`}>
      <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
        <div className="h-full rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
          <div className="px-8 pb-8 pt-32">
            <span aria-hidden="true" role="img" className="text-4xl">
              {blogPost.emoji}
            </span>

            <h2 className="mt-4 text-xl font-medium text-gray-900">
              {blogPost.title}
            </h2>

            <time className="mt-1 text-xs text-gray-700">{blogPost.date}</time>
          </div>
        </div>
      </div>
    </Link>
  )
}
