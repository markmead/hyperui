import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const componentsDirectory = join(process.cwd(), '/data/components')
const categoriesDirectory = join(process.cwd(), '/data/categories')

export function getComponentSlugs() {
  return fs.readdirSync(componentsDirectory)
}

export function getComponentBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(componentsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string | number
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (field === 'count') {
      items[field] = Object.keys(data.components).length
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function componentSlugs() {
  let components = getComponents(['slug', 'category'])

  return components.map(({ slug, category }) => {
    const realSlug = slug.replace(`${category}-`, '')

    return {
      params: {
        category,
        slug: realSlug,
      },
    }
  })
}

export function getComponents(fields: string[] = []) {
  const slugs = getComponentSlugs()
  const components = slugs.map((slug) => getComponentBySlug(slug, fields))

  return components
}

export function getComponentCategorySlugsSimple() {
  const categorySlugs = getComponents(['category'])
    .map((component) => component.category)
    .filter((item) => item)

  return [...new Set(categorySlugs)]
}

export function getComponentCategorySlugs() {
  let categorySlugs = getComponents(['category'])
    .map((component) => component.category)
    .filter((item) => item)

  categorySlugs = [...new Set(categorySlugs)]

  return categorySlugs.map((category) => {
    return {
      params: {
        category,
      },
    }
  })
}

export function getComponentsByCategory(
  category: string,
  fields: string[] = []
) {
  const slugs = getComponentSlugs()

  const components = slugs
    .map((slug) => getComponentBySlug(slug, fields))
    .filter((component) => component.category == category)

  return components
}

export function getCategoryBySlug(category: string, fields: string[] = []) {
  const realSlug = category.replace(/\.mdx$/, '')
  const fullPath = join(categoriesDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)

  type Items = {
    [key: string]: string | number
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}
