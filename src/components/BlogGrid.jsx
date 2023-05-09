import BlogCard from '@component/BlogCard'

export default function BlogGrid({ blogPosts }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((blogPost) => (
        <li key={blogPost.slug}>
          <BlogCard blogPost={blogPost} />
        </li>
      ))}
    </ul>
  )
}
