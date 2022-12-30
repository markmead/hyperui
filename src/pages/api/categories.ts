import type { NextApiRequest, NextApiResponse } from 'next'

import { getCategoryBySlug, getCategorySlugs } from '@/lib/getComponents'

export default function handler(
  apiRequest: NextApiRequest,
  apiResponse: NextApiResponse
) {
  if (apiRequest.method !== 'GET') {
    return
  }

  const categorySlugs = getCategorySlugs()

  const componentsByCategory = categorySlugs.map(function (categorySlug) {
    return getCategoryBySlug(`${categorySlug}`, ['title', 'slug', 'emoji'])
  })

  const searchData = componentsByCategory

  apiResponse.status(200).json(JSON.stringify(searchData, null, 2))
}
