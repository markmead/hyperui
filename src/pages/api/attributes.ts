import type { NextApiRequest, NextApiResponse } from 'next'

import * as htmlparser2 from 'htmlparser2'

import {
  getCategoryBySlug,
  getCategorySlugs,
  getComponentsByCategory,
} from '@/lib/getComponents'

export default async function handler(
  apiRequest: NextApiRequest,
  apiResponse: NextApiResponse
) {
  if (apiRequest.method !== 'GET') {
    return
  }

  const categorySlugs = getCategorySlugs()

  const componentsByCategory = categorySlugs.map(function (categorySlug) {
    const categoryDetail = getCategoryBySlug(`${categorySlug}`, [
      'title',
      'slug',
    ])

    const categoryComponents = getComponentsByCategory(`${categorySlug}`, [
      'title',
      'category',
      'slug',
      'count',
    ])

    return {
      categoryDetail,
      categoryComponents,
    }
  })

  async function getComponentData(componentPath: string) {
    let componentData: any = []
    const componentUrl = `http://localhost:3000/components/${componentPath}.html`
    const fetchResponse = await fetch(componentUrl)

    if (!fetchResponse.ok) {
      return
    }

    const fileText = await fetchResponse.text()

    const domParser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        componentData.push({
          name,
          attributes,
        })
      },
      ontext() {},
      onclosetag() {},
    })

    domParser.write(fileText)
    domParser.end()

    return {
      componentPath,
      componentData,
    }
  }

  const componentPaths = componentsByCategory.flatMap(function ({
    categoryComponents,
  }) {
    return categoryComponents.flatMap((categoryComponent) => {
      const componentIds = Array.from(
        { length: Number(categoryComponent.count) },
        (_, countIndex: number) => countIndex + 1
      )

      return componentIds.map(function (componentId) {
        return `${categoryComponent.slug}/${componentId}`
      })
    })
  })

  const componentData = await Promise.all(
    componentPaths.map(async function (componentPath) {
      const fileData = await getComponentData(componentPath)

      return fileData
    })
  )

  apiResponse.status(200).json(JSON.stringify(componentData, null, 2))
}
