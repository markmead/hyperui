import { Collection } from '../interface/collection'
import { components } from './components'
import { startCase } from 'lodash'

function getCollections(): Array<Collection> {
  return components.map((component) => {
    let {
      id,
      components,
      spacing = '',
      height = '',
      center = false,
      ecommerce = false,
    } = component

    return {
      id,
      center,
      height,
      spacing,
      title: startCase(id),
      count: components.length,
      ecommerce,
    }
  })
}

export const collections: Array<Collection> = getCollections()

export function collectionIds(): Array<object> {
  let paths = collections.map((collection) => {
    return {
      params: {
        id: collection.id,
      },
    }
  })

  return paths
}

export function currentCollection(id: string): Collection | undefined {
  return collections.find((collection) => collection.id === id)
}
