import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Post } from '../../interface/post'

type Props = {
  post: Post
}

const Card: FunctionComponent<Props> = ({ post }) => {
  return (
    <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
      <a className="relative block group">
        <span className="absolute inset-0 border-2 border-black border-dashed"></span>

        <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="px-8 pt-32 pb-8">
            <span className="text-4xl" role="img" aria-hidden="true">
              {post.emoji}
            </span>

            <h2 className="mt-4 text-xl font-medium">{post.title}</h2>

            <time className="mt-1 text-xs text-gray-500">{post.date}</time>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
