import BlogCard from '@component/BlogCard'

import { iBlogItem } from '@type/blog'

interface iProps {
  blogPosts: iBlogItem[]
}

export default function BlogGrid({ blogPosts }: iProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((blogPost, postIndex) => (
        <li key={postIndex}>
          <BlogCard blogPost={blogPost} />
        </li>
      ))}
    </ul>
  )
}
