import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

import { getComponentBySlug } from './components'

import { Collection } from '../interface/collection'
import { getCategories } from './categories'

const collectionsDirectory = join(process.cwd(), '/data/collections')

export function getCollectionSlugs() {
  return fs.readdirSync(collectionsDirectory)
}

export function getCollectionBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(collectionsDirectory, `${realSlug}.mdx`)
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

    if (field === 'components') {
      items['children'] = data.components.map((component: string) =>
        getComponentBySlug(component, [
          'title',
          'slug',
          'ecommerce',
          'emoji',
          'count',
          'tags',
        ])
      )
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function collectionSlugs() {
  let categories = getCategories(['slug', 'collections'])

  return categories.flatMap((category: any) =>
    category.collections.flatMap((collection: string) => {
      return {
        params: {
          category: category.slug,
          collection: collection,
        },
      }
    })
  )
}

export function getCollections(fields: string[] = []) {
  const slugs = getCollectionSlugs()
  const collections = slugs.map((slug) => getCollectionBySlug(slug, fields))

  return collections
}
