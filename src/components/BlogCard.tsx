import Link from 'next/link'

import { BlogItem } from '@type/blog'
import CardTag from '@component/CardTag'

interface Props {
  blogPost: BlogItem
}

export default function BlogCard({ blogPost }: Props) {
  const {
    title: postTitle,
    slug: postSlug,
    emoji: postEmoji,
    date: postDate,
    tag: postTag,
  }: BlogItem = blogPost

  const postHasTag = Boolean(postTag)

  return (
    <Link href={`/blog/${postSlug}`}>
      <div className="flex h-full flex-col rounded-md border-2 border-gray-900 p-4 transition-transform hover:scale-105 sm:p-6">
        {postHasTag && <CardTag tagText={postTag} />}

        <div className="pt-12 sm:pt-16">
          <span aria-hidden="true" role="img" className="text-3xl sm:text-4xl">
            {postEmoji}
          </span>

          <time className="mt-4 block text-sm text-gray-700">{postDate}</time>

          <strong className="mt-1 block text-lg font-medium text-pretty text-gray-900 sm:text-xl">
            {postTitle}
          </strong>
        </div>
      </div>
    </Link>
  )
}
