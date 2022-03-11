import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const examplesDirectory = join(process.cwd(), '/data/components')

export function getExampleSlugs() {
  return fs.readdirSync(examplesDirectory)
}

export function getExampleBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(examplesDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllExamples(fields: string[] = []) {
  const slugs = getExampleSlugs()
  const examples = slugs.map((slug) => getExampleBySlug(slug, fields))

  return examples
}

export function getAllEcommerceExamples(fields: string[] = []) {
  const slugs = getExampleSlugs()
  const examples = slugs.map((slug) => getExampleBySlug(slug, fields))
  const ecommerceExamples = examples.filter((example) => example.ecommerce)

  return ecommerceExamples
}
