import { Component, ComponentGroup } from '../interface/component'
import { announcements, inputs } from './groups'

export const components: Array<ComponentGroup> = [
  {
    id: 'announcements',
    components: announcements,
  },
  {
    id: 'inputs',
    components: inputs,
    spacing: 'max-w-sm mx-auto p-4',
  },
]

export function currentCollectionComponents(id: string): Array<Component> | [] {
  let group = components.find((collection) => collection.id === id)

  return group ? group.components : []
}
