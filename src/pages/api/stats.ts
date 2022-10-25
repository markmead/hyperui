import type { NextApiRequest, NextApiResponse } from 'next'

import {
  getCategoryBySlug,
  getCategorySlugs,
  getComponentsByCategory,
} from '@/lib/getComponents'

type CategoryData = {
  name: string
  slug: string
  count: number
}

export default function handler(
  apiRequest: NextApiRequest,
  apiResponse: NextApiResponse
) {
  if (apiRequest.method !== 'GET') {
    return
  }

  const categorySlugs = getCategorySlugs()

  let categoryData: Array<CategoryData> = []
  let totalCount = 0

  categorySlugs.map(function (categorySlug) {
    const foundCategory = getCategoryBySlug(`${categorySlug}`, ['title'])

    categoryData.push({
      name: `${foundCategory.title}`,
      slug: `${categorySlug}`,
      count: 0,
    })
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
    ])

    return {
      categoryDetail,
      categoryComponents,
    }
  })

  componentsByCategory.map(function ({ categoryDetail, categoryComponents }) {
    const foundCategory = categoryData.filter(
      (categoryItem: CategoryData) => categoryItem.slug === categoryDetail.slug
    )[0]

    const categoryComponentCount = categoryComponents
      .map((categoryData) => categoryData.count)
      .reduce((valueA, valueB) => Number(valueA) + Number(valueB), 0)

    foundCategory.count = Number(categoryComponentCount)
    totalCount += Number(categoryComponentCount)
  })

  const allComponentData = [...categoryData, { total: totalCount }]

  apiResponse.status(200).json(JSON.stringify(allComponentData, null, 2))
}
