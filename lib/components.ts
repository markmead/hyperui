import { Component, ComponentGroup } from '../interface/component'
import { cards, banners } from './groups'

export const components: Array<ComponentGroup> = [
  {
    id: 'cards',
    components: cards,
  },
  {
    id: 'banners',
    components: banners,
  },
]

export function currentCollectionComponents(id: string): Array<Component> | [] {
  let group = components.find((collection) => collection.id === id)

  return group ? group.components : []
}
