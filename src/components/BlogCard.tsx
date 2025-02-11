import Link from 'next/link'

import { iBlogItem } from '@type/blog'

interface iProps {
  blogPost: iBlogItem
}

export default function BlogCard({ blogPost }: iProps) {
  const {
    title: postTitle,
    slug: postSlug,
    emoji: postEmoji,
    date: postDate,
    tag: postTag,
  }: iBlogItem = blogPost

  return (
    <Link href={`/blog/${postSlug}`}>
      <div className="flex h-full flex-col rounded-md border-2 border-gray-900 p-4 sm:p-6">
        <CardTag postTag={postTag} />

        <div className="pt-12 sm:pt-16">
          <span aria-hidden="true" role="img" className="text-3xl sm:text-4xl">
            {postEmoji}
          </span>

          <time className="mt-4 block text-gray-700">{postDate}</time>

          <strong className="mt-1 block text-lg font-medium text-pretty text-gray-900 sm:text-xl">
            {postTitle}
          </strong>
        </div>
      </div>
    </Link>
  )
}

function CardTag({ postTag }: { postTag: string }) {
  if (!postTag) {
    return <></>
  }

  return (
    <span className="self-end rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-blue-700">
      {postTag}
    </span>
  )
}
