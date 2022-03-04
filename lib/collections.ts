import { Component } from '../interface/component'
import { Collection } from '../interface/collection'
import {
  alerts,
  announcements,
  banners,
  breadcrumbs,
  buttonGroups,
  buttons,
  cards,
  carts,
  checkouts,
  ctas,
  emptyStates,
  faqs,
  filters,
  footers,
  forms,
  inputs,
  navigations,
  offCanvasMenus,
  pagination,
  popups,
  productCards,
  productCollections,
  products,
  prose,
  radioGroups,
  reviews,
  sections,
  stats,
  steps,
  tables,
  tabs,
  tags,
  testimonials,
} from './components'

import { descriptions } from '../data/components/descriptions'

export const collections: Array<Collection> = [
  {
    components: alerts,
    count: alerts.length,
    description: descriptions['alerts'] ?? '',
    emoji: '🚨',
    id: 'alerts',
    spacing: 'max-w-sm p-4 space-y-8 mx-auto',
    title: 'Alerts',
  },

  {
    components: announcements,
    count: announcements.length,
    description: descriptions['announcements'] ?? '',
    emoji: '📣',
    id: 'announcements',
    spacing: 'space-y-8',
    title: 'Announcements',
  },

  {
    components: banners,
    count: banners.length,
    description: descriptions['banners'] ?? '',
    emoji: '✨',
    id: 'banners',
    title: 'Banners',
  },

  {
    components: breadcrumbs,
    count: breadcrumbs.length,
    description: descriptions['breadcrumbs'] ?? '',
    emoji: '🍞',
    id: 'breadcrumbs',
    spacing: 'p-8 max-w-sm mx-auto flex justify-center',
    title: 'Breadcrumbs',
  },

  {
    components: buttons,
    count: buttons.length,
    description: descriptions['buttons'] ?? '',
    emoji: '👆',
    id: 'buttons',
    spacing: 'p-8 flex flex-col space-y-8 items-center',
    title: 'Buttons',
  },

  {
    components: buttonGroups,
    count: buttonGroups.length,
    description: descriptions['buttonGroups'] ?? '',
    emoji: '🍮',
    id: 'button-groups',
    spacing: 'p-8 flex flex-col items-center',
    title: 'Button Groups',
  },

  {
    components: cards,
    count: cards.length,
    description: descriptions['cards'] ?? '',
    emoji: '🃏',
    id: 'cards',
    spacing: 'max-w-md w-screen mx-auto p-4',
    title: 'Cards',
  },

  {
    components: carts,
    count: carts.length,
    description: descriptions['carts'] ?? '',
    ecommerce: true,
    emoji: '🛒',
    id: 'carts',
    title: 'Carts',
  },

  {
    components: checkouts,
    count: checkouts.length,
    description: descriptions['checkouts'] ?? '',
    ecommerce: true,
    emoji: '💰',
    id: 'checkouts',
    title: 'Checkouts',
  },

  {
    components: ctas,
    count: ctas.length,
    description: descriptions['ctas'] ?? '',
    emoji: '🔗',
    id: 'ctas',
    title: 'CTAs',
  },

  {
    components: emptyStates,
    count: emptyStates.length,
    description: descriptions['emptyStates'] ?? '',
    emoji: '🤷‍♂️',
    id: 'empty-states',
    spacing: 'max-w-lg w-screen mx-auto p-4',
    title: 'Empty States',
  },

  {
    components: faqs,
    count: faqs.length,
    description: descriptions['faqs'] ?? '',
    emoji: '🤔',
    id: 'faqs',
    title: 'FAQs',
  },

  {
    components: filters,
    count: filters.length,
    description: descriptions['filters'] ?? '',
    ecommerce: true,
    emoji: '🔎',
    id: 'filters',
    title: 'Filters',
  },

  {
    components: footers,
    count: footers.length,
    description: descriptions['footers'] ?? '',
    emoji: '🚀',
    id: 'footers',
    title: 'Footers',
  },

  {
    components: forms,
    count: forms.length,
    description: descriptions['forms'] ?? '',
    emoji: '📝',
    id: 'forms',
    title: 'Forms',
  },

  {
    components: inputs,
    count: inputs.length,
    description: descriptions['inputs'] ?? '',
    emoji: '🖱',
    id: 'inputs',
    spacing: 'max-w-sm mx-auto p-8',
    title: 'Inputs',
  },

  {
    components: navigations,
    count: navigations.length,
    description: descriptions['navigations'] ?? '',
    emoji: '🗺️',
    id: 'navigations',
    title: 'Navigations',
  },

  {
    components: offCanvasMenus,
    count: offCanvasMenus.length,
    description: descriptions['offCanvasMenus'] ?? '',
    emoji: '👋',
    id: 'off-canvas-menus',
    title: 'Off Canvas Menus',
  },

  {
    components: pagination,
    count: pagination.length,
    description: descriptions['pagination'] ?? '',
    emoji: '🔢',
    id: 'pagination',
    spacing: 'p-4 max-w-xs mx-auto flex justify-center',
    title: 'Pagination',
  },

  {
    components: popups,
    count: popups.length,
    description: descriptions['popups'] ?? '',
    emoji: '🔥',
    id: 'popups',
    title: 'Popups',
  },

  {
    components: productCards,
    count: productCards.length,
    description: descriptions['productCards'] ?? '',
    ecommerce: true,
    emoji: '🃏',
    id: 'product-cards',
    spacing: 'max-w-md w-screen mx-auto p-4',
    title: 'Product Cards',
  },

  {
    components: productCollections,
    count: productCollections.length,
    description: descriptions['productCollections'] ?? '',
    ecommerce: true,
    emoji: '🛍️',
    id: 'product-collections',
    title: 'Product Collections',
  },

  {
    components: products,
    count: products.length,
    description: descriptions['products'] ?? '',
    ecommerce: true,
    emoji: '🏎️',
    id: 'products',
    title: 'Products',
  },

  {
    components: prose,
    count: prose.length,
    description: descriptions['prose'] ?? '',
    emoji: '📝',
    id: 'prose',
    spacing: 'flex justify-center p-8',
    title: 'Prose',
  },

  {
    components: radioGroups,
    count: radioGroups.length,
    description: descriptions['radioGroups'] ?? '',
    emoji: '📻',
    id: 'radio-groups',
    spacing: 'p-8 max-w-lg mx-auto',
    title: 'Radio Groups',
  },

  {
    components: reviews,
    count: reviews.length,
    description: descriptions['reviews'] ?? '',
    ecommerce: true,
    emoji: '👍',
    id: 'reviews',
    title: 'Reviews',
  },

  {
    components: sections,
    count: sections.length,
    description: descriptions['sections'] ?? '',
    emoji: '🧱',
    id: 'sections',
    title: 'Sections',
  },

  {
    components: stats,
    count: stats.length,
    description: descriptions['stats'] ?? '',
    emoji: '📈',
    id: 'stats',
    title: 'Stats',
  },

  {
    components: steps,
    count: steps.length,
    description: descriptions['steps'] ?? '',
    emoji: '🪜',
    id: 'steps',
    spacing: 'max-w-3xl mx-auto p-8',
    title: 'Steps',
  },

  {
    components: tables,
    count: tables.length,
    description: descriptions['tables'] ?? '',
    emoji: '🍽',
    id: 'tables',
    spacing: 'p-8 flex justify-center',
    title: 'Tables',
  },

  {
    components: tabs,
    count: tabs.length,
    description: descriptions['tabs'] ?? '',
    emoji: '📚',
    id: 'tabs',
    spacing: 'p-4 max-w-5xl mx-auto',
    title: 'Tabs',
  },

  {
    components: tags,
    count: tags.length,
    description: descriptions['tags'] ?? '',
    emoji: '🏷️',
    id: 'tags',
    spacing: 'p-8 flex flex-col space-y-8 items-center',
    title: 'Tags',
  },

  {
    components: testimonials,
    count: testimonials.length,
    description: descriptions['testimonials'] ?? '',
    emoji: '👍',
    id: 'testimonials',
    title: 'Testimonials',
  },
]

export function currentCollectionComponents(id: string): Array<Component> | [] {
  let collection = collections.find((collection) => collection.id === id)

  return collection ? collection.components : []
}

export function collectionIds(): Array<object> {
  return collections.map((collection) => {
    return {
      params: {
        id: collection.id,
      },
    }
  })
}

export function currentCollection(id: string): Collection | undefined {
  return collections.find((collection) => collection.id === id)
}
