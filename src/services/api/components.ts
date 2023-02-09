import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

import { Component } from '@/interface/component'

import { componentSlug } from '@/services/utils/transformers'

type DynamicData = {
  [key: string]: string | number
}

const componentsDirectory = join(process.cwd(), '/src/data/components')
const categoriesDirectory = join(process.cwd(), '/src/data/categories')

export function getComponentSlugs() {
  return fs.readdirSync(componentsDirectory)
}

export function getComponentPaths() {
  const componentsData: Array<DynamicData> = getComponents([
    'title',
    'slug',
    'category',
  ])

  return componentsData.map(function (componentData: DynamicData) {
    const trueSlug = componentSlug(
      `${componentData.slug}`,
      `${componentData.category}`
    )

    return {
      params: {
        category: componentData.category,
        slug: trueSlug,
      },
    }
  })
}

export function getComponentBySlug(
  componentSlug: string,
  dataFields: string[] = []
) {
  const trueSlug = componentSlug.replace(/\.mdx$/, '')
  const fullPath = join(componentsDirectory, `${trueSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: fileData, content: fileContent } = matter(fileContents)

  const componentData: DynamicData = {}

  dataFields.forEach(function (dataField: string) {
    if (dataField === 'slug') {
      componentData[dataField] = trueSlug
    }

    if (dataField === 'content') {
      componentData[dataField] = fileContent
    }

    if (dataField === 'count') {
      const componentsData: Array<Component> = Object.values(
        fileData.components
      )

      componentData[dataField] = componentsData.length
    }

    if (typeof fileData[dataField] !== 'undefined') {
      componentData[dataField] = fileData[dataField]
    }
  })

  return componentData
}

export function getCategorySlugs() {
  const categorySlugs = getComponents(['category'])
    .map((componentObject: DynamicData) => componentObject.category)
    .filter((categorySlug) => categorySlug)

  return Array.from(new Set(categorySlugs))
}

export function getCategoryPaths() {
  const categorySlugs = getCategorySlugs()

  return categorySlugs.map(function (categorySlug: string | number) {
    return {
      params: {
        category: `${categorySlug}`,
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
    .sort(function (componentA, componentB) {
      const titleA: string = componentA.title as string
      const titleB: string = componentB.title as string

      return titleA.localeCompare(titleB)
    })

  return components
}

export function getCategoryBySlug(
  categorySlug: string,
  dataFields: string[] = []
) {
  const trueSlug = categorySlug.replace(/\.mdx$/, '')
  const fullPath = join(categoriesDirectory, `${trueSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: fileData } = matter(fileContents)

  const categoryData: DynamicData = {}

  dataFields.forEach(function (dataField: string) {
    if (dataField === 'slug') {
      categoryData[dataField] = trueSlug
    }

    if (typeof fileData[dataField] !== 'undefined') {
      categoryData[dataField] = fileData[dataField]
    }
  })

  return categoryData
}

function getComponents(dataFields: string[] = []) {
  const componentSlugs = getComponentSlugs()
  const componentsData = componentSlugs.map((componentSlug: string) =>
    getComponentBySlug(componentSlug, dataFields)
  )

  return componentsData
}
