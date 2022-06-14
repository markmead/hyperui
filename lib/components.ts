import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

import { Collection } from '../interface/collection'
import { getCategories } from './categories'

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
  let categories = getCategories(['slug', 'collections'])

  return categories.flatMap((category: any) =>
    category.children.flatMap((collection: Collection) =>
      collection.components.flatMap((component: string) => {
        return {
          params: {
            category: category.slug,
            collection: collection.slug,
            slug: component,
          },
        }
      })
    )
  )
}
