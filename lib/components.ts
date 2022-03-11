import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const componentsDirectory = join(process.cwd(), '/data/components')

export function getComponentSlugs() {
  return fs.readdirSync(componentsDirectory)
}

export function getComponentBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(componentsDirectory, `${realSlug}.mdx`)
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

export function componentSlugs() {
  let slugs = getComponentSlugs().map((slug) => slug.replace(/\.mdx$/, ''))

  return slugs.map((slug) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export function getComponents(fields: string[] = []) {
  const slugs = getComponentSlugs()
  const components = slugs.map((slug) => getComponentBySlug(slug, fields))

  return components
}

export function getEcommerceComponents(fields: string[] = []) {
  const slugs = getComponentSlugs()
  const components = slugs
    .map((slug) => getComponentBySlug(slug, fields))
    .filter((component) => component.ecommerce)

  return components
}
