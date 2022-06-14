import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getCollectionBySlug } from './collections'

const categoriesDirectory = join(process.cwd(), '/data/categories')

export function getCategorySlugs() {
  return fs.readdirSync(categoriesDirectory)
}

export function getCategoryBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
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

    if (field === 'collections') {
      items['children'] = data.collections.map((collection: string) =>
        getCollectionBySlug(collection, [
          'title',
          'slug',
          'description',
          'components',
        ])
      )
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function categorySlugs() {
  let slugs = getCategorySlugs().map((slug) => slug.replace(/\.mdx$/, ''))

  return slugs.map((slug) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export function getCategories(fields: string[] = []) {
  const slugs = getCategorySlugs()
  const collections = slugs.map((slug) => getCategoryBySlug(slug, fields))

  return collections
}
