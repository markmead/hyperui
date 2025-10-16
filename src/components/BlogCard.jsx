import Link from 'next/link'

export default function BlogCard({ blogPost }) {
  const { emoji, updated, title, slug } = blogPost

  return (
    <Link
      href={`/blog/${slug}`}
      className="block h-full rounded-lg border border-stone-300 bg-white p-4 shadow-sm transition-colors hover:border-indigo-500 hover:ring hover:ring-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none sm:p-6"
    >
      <span aria-hidden="true" className="text-xl sm:text-2xl">
        {emoji}
      </span>

      <time className="mt-4 block text-sm text-stone-700">{updated}</time>

      <h2 className="mt-1 font-medium text-pretty text-stone-900 sm:text-lg">{title}</h2>
    </Link>
  )
}
