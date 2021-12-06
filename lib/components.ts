import { Component, ComponentGroup } from '../interface/component'
import {
  alerts,
  announcements,
  banners,
  breadcrumbs,
  buttons,
  cards,
  ctas,
  emptyStates,
  faqs,
  footers,
  inputs,
} from './groups'

export const components: Array<ComponentGroup> = [
  {
    id: 'alerts',
    components: alerts,
    spacing: 'max-w-sm mx-auto p-4 space-y-4',
  },
  {
    id: 'announcements',
    components: announcements,
  },
  {
    id: 'banners',
    components: banners,
  },
  {
    id: 'buttons',
    components: buttons,
    spacing: 'flex justify-center p-4',
  },
  {
    id: 'breadcrumbs',
    components: breadcrumbs,
  },
  {
    id: 'cards',
    components: cards,
    spacing: 'max-w-md mx-auto p-4',
  },
  {
    id: 'ctas',
    components: ctas,
  },
  {
    id: 'empty-states',
    components: emptyStates,
    spacing: 'max-w-lg mx-auto p-4',
  },
  {
    id: 'faqs',
    components: faqs,
  },
  {
    id: 'footers',
    components: footers,
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
