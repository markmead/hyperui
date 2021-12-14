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
    center: true,
    spacing: 'max-w-sm w-screen mx-auto p-4',
  },
  {
    id: 'announcements',
    components: announcements,
  },
  {
    id: 'banners',
    components: banners,
    height: 'lg:h-[600px]',
  },
  {
    id: 'buttons',
    components: buttons,
    center: true,
    spacing: 'p-4',
  },
  {
    id: 'breadcrumbs',
    components: breadcrumbs,
  },
  {
    id: 'cards',
    components: cards,
    center: true,
    height: 'lg:h-[600px]',
    spacing: 'max-w-md w-screen mx-auto p-4',
  },
  {
    id: 'carts',
    components: carts,
    height: 'lg:h-[600px]',
  },
  {
    id: 'content',
    components: content,
    height: 'lg:h-[600px]',
  },
  {
    id: 'ctas',
    components: ctas,
    height: 'lg:h-[500px]',
  },
  {
    id: 'empty-states',
    components: emptyStates,
    center: true,
    spacing: 'max-w-lg w-screen mx-auto p-4',
  },
  {
    id: 'faqs',
    components: faqs,
    height: 'lg:h-[500px]',
  },
  {
    id: 'footers',
    components: footers,
    height: 'lg:h-[500px]',
  },
  {
    id: 'forms',
    components: forms,
    height: 'lg:h-[500px]',
  },
  {
    id: 'inputs',
    components: inputs,
    center: true,
    spacing: 'w-screen max-w-sm mx-auto p-4',
  },
  {
    id: 'navigations',
    components: navigations,
  },
  {
    id: 'off-canvas-menus',
    components: offCanvasMenus,
    height: 'lg:h-[700px]',
  },
  {
    id: 'popups',
    components: popups,
    height: 'lg:h-[500px]',
  },
  {
    id: 'stats',
    components: stats,
    height: 'lg:h-[500px]',
  },
  {
    id: 'tabs',
    components: tabs,
    spacing: 'p-4 max-w-5xl mx-auto',
  },
  {
    id: 'tags',
    components: tags,
    center: true,
    spacing: 'max-w-md w-screen mx-auto p-4 text-center',
  },
  {
    id: 'testimonials',
    components: testimonials,
    height: 'lg:h-[500px]',
  },
  {
    id: 'titles',
    components: titles,
  },

  // Ecommerce
  {
    id: 'filters',
    components: filters,
    height: 'lg:h-[600px]',
    ecommerce: true,
  },
  {
    id: 'product-cards',
    components: productCards,
    center: true,
    height: 'lg:h-[600px]',
    spacing: 'max-w-md w-screen mx-auto p-4',
    ecommerce: true,
  },
  {
    id: 'product-collections',
    components: productCollections,
    height: 'lg:h-[600px]',
    ecommerce: true,
  },
  {
    id: 'reviews',
    components: reviews,
    height: 'lg:h-[600px]',
    ecommerce: true,
  },
]

export function currentCollectionComponents(id: string): Array<Component> | [] {
  let group = components.find((collection) => collection.id === id)

  return group ? group.components : []
}
