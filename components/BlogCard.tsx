import Link from 'next/link'

import { PostCard } from '../interface/post'

type Props = {
  blogPost: PostCard
}

function Card({ blogPost }: Props) {
  return (
    <Link href="/blog/[slug]" as={`/blog/${blogPost.slug}`}>
      <a className="relative block h-full group">
        <span
          aria-hidden="true"
          className="absolute inset-0 border-2 border-black border-dashed rounded-lg"
        ></span>

        <div className="h-full transition bg-white border-2 border-black rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
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

export default Card
