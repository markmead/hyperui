import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

async function getCategories() {
  const categoriesPath = join(process.cwd(), '/data/categories')
  const categorySlugs = ['application-ui', 'marketing', 'ecommerce']

  const categoryItems = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)
      const categoryItem = await fs.readFile(categoryPath, 'utf-8')

      const { data: categoryData } = matter(categoryItem)

      return categoryData
    })
  )

  return categoryItems
}

export default async function handler(apiRequest, apiResponse) {
  if (apiRequest.method !== 'GET') {
    return
  }

  const categoriesData = await getCategories()

  apiResponse.status(200).json(categoriesData)
}
