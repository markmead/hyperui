import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

type DynamicData = {
  [key: string]: string | number
}

const blogsDirectory = join(process.cwd(), '/src/data/blog')

export function getBlogSlugs() {
  return fs.readdirSync(blogsDirectory)
}

export function getBlogPaths() {
  const blogSlugs = getBlogSlugs().map((blogSlug: string) =>
    blogSlug.replace(/\.mdx$/, '')
  )

  return blogSlugs.map((blogSlug: string) => {
    return {
      params: {
        slug: blogSlug,
      },
    }
  })
}

export function getPostBySlug(blogSlug: string, dataFields: string[] = []) {
  const trueSlug = blogSlug.replace(/\.mdx$/, '')
  const fullPath = join(blogsDirectory, `${trueSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: fileData, content: fileContent } = matter(fileContents)

  const blogData: DynamicData = {}

  dataFields.forEach(function (dataField: string) {
    if (dataField === 'slug') {
      blogData[dataField] = trueSlug
    }

    if (dataField === 'content') {
      blogData[dataField] = fileContent
    }

    if (typeof fileData[dataField] !== 'undefined') {
      blogData[dataField] = fileData[dataField]
    }
  })

  return blogData
}

export function getBlogs(dataFields: string[] = []) {
  const blogSlugs = getBlogSlugs()

  const blogPosts = blogSlugs
    .map((blogSlug: string) => getPostBySlug(blogSlug, dataFields))
    .sort((blogA, blogB) =>
      new Date(blogA.date) < new Date(blogB.date) ? 1 : -1
    )

  return blogPosts
}
