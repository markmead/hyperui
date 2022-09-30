import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

import { componentSlug } from '../utils/componentHelpers'

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
      let componentObjs = Object.values(data.components)
      let componentCount = componentObjs.length

      componentObjs.forEach((componentObj: any) => {
        if (componentObj.hasOwnProperty('variants')) {
          componentCount += Object.keys(componentObj.variants).length
        }
      })

      items[field] = componentCount
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function componentSlugs() {
  let components = getComponents(['title', 'slug', 'category'])

  return components.map((component: any) => {
    const slug: string = component.slug
    const category: string = component.category

    const realSlug = componentSlug(slug, category)

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

export function getCategorySlugs() {
  const categorySlugs = getComponents(['category'])
    .map((componentObject) => componentObject.category)
    .filter((categorySlug) => categorySlug)

  return [...new Set(categorySlugs)]
}

export function getCategoryPaths() {
  const categorySlugs = getCategorySlugs()

  return categorySlugs.map((categorySlug) => {
    return {
      params: {
        category: categorySlug,
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
    .filter((component) => component.category === category)
    .sort((componentA, componentB) => {
      const titleA: string = componentA.title as string
      const titleB: string = componentB.title as string

      return titleA.localeCompare(titleB)
    })

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
