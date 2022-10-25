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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const categorySlugs = getCategorySlugs()

  let categoryData: Array<CategoryData> = []

  categorySlugs.map(function (categorySlug) {
    const foundCategory = getCategoryBySlug(`${categorySlug}`, ['title'])

    const foundCategoryData: CategoryData = {
      name: `${foundCategory.title}`,
      slug: `${categorySlug}`,
      count: 0,
    }

    categoryData.push(foundCategoryData)
  })

  const componentsByCategory = categorySlugs.map((categorySlug) => {
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
  })

  res.status(200).json(JSON.stringify(categoryData, null, 2))
}
