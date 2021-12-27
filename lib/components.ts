import { Component, ComponentGroup } from '../interface/component'
import {
  alerts,
  announcements,
  banners,
  breadcrumbs,
  buttons,
  cards,
  carts,
  content,
  ctas,
  emptyStates,
  faqs,
  footers,
  forms,
  inputs,
  navigations,
  offCanvasMenus,
  popups,
  stats,
  tabs,
  tags,
  testimonials,
  titles,

  // Ecommerce
  filters,
  productCards,
  productCollections,
  reviews,
} from './groups'

export const components: Array<ComponentGroup> = [
  {
    id: 'alerts',
    components: alerts,
    spacing: 'max-w-sm w-screen mx-auto p-4',
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
    spacing: 'p-4',
  },
  {
    id: 'breadcrumbs',
    components: breadcrumbs,
  },
  {
    id: 'cards',
    components: cards,
    spacing: 'max-w-md w-screen mx-auto p-4',
  },
  {
    id: 'carts',
    components: carts,
  },
  {
    id: 'content',
    components: content,
  },
  {
    id: 'ctas',
    components: ctas,
  },
  {
    id: 'empty-states',
    components: emptyStates,
    spacing: 'max-w-lg w-screen mx-auto p-4',
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
    id: 'forms',
    components: forms,
  },
  {
    id: 'inputs',
    components: inputs,
    spacing: 'w-screen max-w-sm mx-auto p-4',
  },
  {
    id: 'navigations',
    components: navigations,
  },
  {
    id: 'off-canvas-menus',
    components: offCanvasMenus,
  },
  {
    id: 'popups',
    components: popups,
  },
  {
    id: 'stats',
    components: stats,
  },
  {
    id: 'tabs',
    components: tabs,
    spacing: 'p-4 max-w-5xl mx-auto',
  },
  {
    id: 'tags',
    components: tags,
    spacing: 'max-w-md w-screen mx-auto p-4 text-center',
  },
  {
    id: 'testimonials',
    components: testimonials,
  },
  {
    id: 'titles',
    components: titles,
  },

  // Ecommerce

  {
    id: 'filters',
    components: filters,
    ecommerce: true,
  },
  {
    id: 'product-cards',
    components: productCards,
    spacing: 'max-w-md w-screen mx-auto p-4',
    ecommerce: true,
  },
  {
    id: 'product-collections',
    components: productCollections,
    ecommerce: true,
  },
  {
    id: 'reviews',
    components: reviews,
    ecommerce: true,
  },
]

export function currentCollectionComponents(id: string): Array<Component> | [] {
  let group = components.find((collection) => collection.id === id)

  return group ? group.components : []
}
