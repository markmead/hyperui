import BlogCard from '@component/BlogCard'

export default function BlogGrid({ blogPosts }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((blogPost, postIndex) => (
        <li key={postIndex}>
          <BlogCard blogPost={blogPost} />
        </li>
      ))}
    </ul>
  )
}
