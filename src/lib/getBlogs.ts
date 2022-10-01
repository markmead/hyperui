import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

type DynamicData = {
  [key: string]: string | number
}

const postsDirectory = join(process.cwd(), '/src/data/posts')

export function getBlogSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getBlogPaths() {
  const blogSlugs = getBlogSlugs().map(function (blogSlug: string) {
    return blogSlug.replace(/\.mdx$/, '')
  })

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
  const fullPath = join(postsDirectory, `${trueSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: fileData, content: fileContent } = matter(fileContents)

  const blogsData: DynamicData = {}

  dataFields.forEach((dataField: string) => {
    if (dataField === 'slug') {
      blogsData[dataField] = trueSlug
    }

    if (dataField === 'content') {
      blogsData[dataField] = fileContent
    }

    if (typeof fileData[dataField] !== 'undefined') {
      blogsData[dataField] = fileData[dataField]
    }
  })

  return blogsData
}

export function getBlogs(dataFields: string[] = []) {
  const blogSlugs = getBlogSlugs()

  const blogPosts = blogSlugs
    .map(function (blogSlug: string) {
      return getPostBySlug(blogSlug, dataFields)
    })
    .sort(function (blogPostA, blogPostB) {
      return new Date(blogPostA.date) < new Date(blogPostB.date) ? 1 : -1
    })

  return blogPosts
}
