import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Component } from '../interface/component'

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

export function getMarketingComponents(fields: string[] = []) {
  const slugs = getComponentSlugs()
  const components = slugs
    .map((slug) => getComponentBySlug(slug, fields))
    .filter((component) => !component.ecommerce && !component.application)

  return components
}

export function getEcommerceComponents(fields: string[] = []) {
  const slugs = getComponentSlugs()
  const components = slugs
    .map((slug) => getComponentBySlug(slug, fields))
    .filter((component) => component.ecommerce)

  return components
}

export function getApplicationComponents(fields: string[] = []) {
  const slugs = getComponentSlugs()
  const components = slugs
    .map((slug) => getComponentBySlug(slug, fields))
    .filter((component) => component.application)

  return components
}
