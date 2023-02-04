import type { NextApiRequest, NextApiResponse } from 'next'

import {
  getCategoryBySlug,
  getCategorySlugs,
  getComponentsByCategory,
} from '@/services/api/components'

type ComponentItem = {
  name: string
  slug: string
  count: number
}

type CategoryItem = {
  name: string
  slug: string
  count: number
  components: Array<ComponentItem>
}

export default function handler(
  apiRequest: NextApiRequest,
  apiResponse: NextApiResponse
) {
  if (apiRequest.method !== 'GET') {
    return
  }

  const categorySlugs = getCategorySlugs()

  let totalCount = 0

  const categoryItems: Array<CategoryItem> = categorySlugs.map(function (
    categorySlug
  ) {
    const foundCategory = getCategoryBySlug(`${categorySlug}`, ['title'])

    const categoryItem: CategoryItem = {
      name: foundCategory.title,
      slug: categorySlug,
      count: 0,
      components: [],
    } as CategoryItem

    return categoryItem
  })

  const componentsByCategory = categorySlugs.map(function (categorySlug) {
    const categoryDetail = getCategoryBySlug(`${categorySlug}`, [
      'title',
      'slug',
    ])

    const categoryComponents = getComponentsByCategory(`${categorySlug}`, [
      'title',
      'count',
      'category',
      'slug',
    ])

    return {
      categoryDetail,
      categoryComponents,
    }
  })

  componentsByCategory.map(function ({ categoryDetail, categoryComponents }) {
    const foundCategory = categoryItems.filter(
      (categoryItem: CategoryItem) => categoryItem.slug === categoryDetail.slug
    )[0]
    categoryComponents.map(function (componentData) {
      const componentItem: CategoryItem = {
        name: componentData.title,
        slug: componentData.slug,
        count: componentData.count,
      } as CategoryItem

      foundCategory.components = [...foundCategory.components, componentItem]
    })

    const categoryComponentCount = categoryComponents
      .map((categoryData) => categoryData.count)
      .reduce((valueA, valueB) => Number(valueA) + Number(valueB), 0)

    foundCategory.count = Number(categoryComponentCount)
    totalCount += Number(categoryComponentCount)
  })

  const categoryData = [...categoryItems, { total: totalCount }]

  apiResponse.status(200).json(JSON.stringify(categoryData, null, 2))
}
