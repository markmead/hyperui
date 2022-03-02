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
  titles,
} from './components'

import { descriptions } from './descriptions'

export const collections: Array<Collection> = [
  {
    id: 'alerts',
    title: 'Alerts',
    components: alerts,
    count: alerts.length,
    emoji: '🚨',
    spacing: 'max-w-sm p-4 space-y-8 mx-auto',
    description: descriptions['alerts'] ?? '',
  },

  {
    id: 'announcements',
    title: 'Announcements',
    components: announcements,
    count: announcements.length,
    emoji: '📣',
    spacing: 'space-y-8',
    description: descriptions['announcements'] ?? '',
  },

  {
    id: 'banners',
    title: 'Banners',
    components: banners,
    count: banners.length,
    emoji: '✨',
    description: descriptions['banners'] ?? '',
  },

  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    components: breadcrumbs,
    count: breadcrumbs.length,
    emoji: '🍞',
    spacing: 'p-8 max-w-sm mx-auto flex justify-center',
    description: descriptions['breadcrumbs'] ?? '',
  },

  {
    id: 'buttons',
    title: 'Buttons',
    components: buttons,
    count: buttons.length,
    emoji: '👆',
    spacing: 'p-8 flex flex-col space-y-8 items-center',
    description: descriptions['buttons'] ?? '',
  },

  {
    id: 'button-groups',
    title: 'Button Groups',
    components: buttonGroups,
    count: buttonGroups.length,
    emoji: '🍮',
    spacing: 'p-8 flex flex-col items-center',
    description: descriptions['buttonGroups'] ?? '',
  },

  {
    id: 'cards',
    title: 'Cards',
    components: cards,
    count: cards.length,
    emoji: '🃏',
    spacing: 'max-w-md w-screen mx-auto p-4',
    description: descriptions['cards'] ?? '',
  },

  {
    id: 'carts',
    title: 'Carts',
    components: carts,
    count: carts.length,
    emoji: '🛒',
    ecommerce: true,
    description: descriptions['carts'] ?? '',
  },

  {
    id: 'checkouts',
    title: 'Checkouts',
    components: checkouts,
    count: checkouts.length,
    emoji: '💰',
    ecommerce: true,
    description: descriptions['checkouts'] ?? '',
  },

  {
    id: 'ctas',
    title: 'CTAs',
    components: ctas,
    count: ctas.length,
    emoji: '🔗',
    description: descriptions['ctas'] ?? '',
  },

  {
    id: 'empty-states',
    title: 'Empty States',
    components: emptyStates,
    count: emptyStates.length,
    emoji: '🤷‍♂️',
    spacing: 'max-w-lg w-screen mx-auto p-4',
    description: descriptions['emptyStates'] ?? '',
  },

  {
    id: 'faqs',
    title: 'FAQs',
    components: faqs,
    count: faqs.length,
    emoji: '🤔',
    description: descriptions['faqs'] ?? '',
  },

  {
    id: 'filters',
    title: 'Filters',
    components: filters,
    count: filters.length,
    emoji: '🔎',
    ecommerce: true,
    description: descriptions['filters'] ?? '',
  },

  {
    id: 'footers',
    title: 'Footers',
    components: footers,
    count: footers.length,
    emoji: '🚀',
    description: descriptions['footers'] ?? '',
  },

  {
    id: 'forms',
    title: 'Forms',
    components: forms,
    count: forms.length,
    emoji: '📝',
    description: descriptions['forms'] ?? '',
  },

  {
    id: 'inputs',
    title: 'Inputs',
    components: inputs,
    count: inputs.length,
    emoji: '🖱',
    spacing: 'max-w-sm mx-auto p-8',
    description: descriptions['inputs'] ?? '',
  },

  {
    id: 'navigations',
    title: 'Navigations',
    components: navigations,
    count: navigations.length,
    emoji: '🗺️',
    description: descriptions['navigations'] ?? '',
  },

  {
    id: 'off-canvas-menus',
    title: 'Off Canvas Menus',
    components: offCanvasMenus,
    count: offCanvasMenus.length,
    emoji: '👋',
    description: descriptions['offCanvasMenus'] ?? '',
  },

  {
    id: 'pagination',
    title: 'Pagination',
    components: pagination,
    count: pagination.length,
    emoji: '🔢',
    spacing: 'p-4 max-w-xs mx-auto flex justify-center',
    description: descriptions['pagination'] ?? '',
  },

  {
    id: 'popups',
    title: 'Popups',
    components: popups,
    count: popups.length,
    emoji: '🔥',
    description: descriptions['popups'] ?? '',
  },

  {
    id: 'product-cards',
    title: 'Product Cards',
    components: productCards,
    count: productCards.length,
    emoji: '🃏',
    spacing: 'max-w-md w-screen mx-auto p-4',
    ecommerce: true,
    description: descriptions['productCards'] ?? '',
  },

  {
    id: 'product-collections',
    title: 'Product Collections',
    components: productCollections,
    count: productCollections.length,
    emoji: '🛍️',
    ecommerce: true,
    description: descriptions['productCollections'] ?? '',
  },

  {
    id: 'products',
    title: 'Products',
    components: products,
    count: products.length,
    emoji: '🏎️',
    ecommerce: true,
    description: descriptions['products'] ?? '',
  },

  {
    id: 'prose',
    title: 'Prose',
    components: prose,
    count: prose.length,
    emoji: '📝',
    spacing: 'flex justify-center p-8',
    description: descriptions['prose'] ?? '',
  },

  {
    id: 'radio-groups',
    title: 'Radio Groups',
    components: radioGroups,
    count: radioGroups.length,
    emoji: '📻',
    spacing: 'p-8 max-w-lg mx-auto',
    description: descriptions['radioGroups'] ?? '',
  },

  {
    id: 'reviews',
    title: 'Reviews',
    components: reviews,
    count: reviews.length,
    emoji: '👍',
    ecommerce: true,
    description: descriptions['reviews'] ?? '',
  },

  {
    id: 'sections',
    title: 'Sections',
    components: sections,
    count: sections.length,
    emoji: '🧱',
    description: descriptions['sections'] ?? '',
  },

  {
    id: 'stats',
    title: 'Stats',
    components: stats,
    count: stats.length,
    emoji: '📈',
    description: descriptions['stats'] ?? '',
  },

  {
    id: 'steps',
    title: 'Steps',
    components: steps,
    count: steps.length,
    emoji: '🪜',
    spacing: 'max-w-3xl mx-auto p-8',
    description: descriptions['steps'] ?? '',
  },

  {
    id: 'tables',
    title: 'Tables',
    components: tables,
    count: tables.length,
    emoji: '🍽',
    spacing: 'p-8 flex justify-center',
    description: descriptions['tables'] ?? '',
  },

  {
    id: 'tabs',
    title: 'Tabs',
    components: tabs,
    count: tabs.length,
    emoji: '📚',
    spacing: 'p-4 max-w-5xl mx-auto',
    description: descriptions['tabs'] ?? '',
  },

  {
    id: 'tags',
    title: 'Tags',
    components: tags,
    count: tags.length,
    emoji: '🏷️',
    spacing: 'p-8 flex flex-col space-y-8 items-center',
    description: descriptions['tags'] ?? '',
  },

  {
    id: 'testimonials',
    title: 'Testimonials',
    components: testimonials,
    count: testimonials.length,
    emoji: '👍',
    description: descriptions['testimonials'] ?? '',
  },

  {
    id: 'titles',
    title: 'Titles',
    components: titles,
    count: titles.length,
    emoji: '📚',
    description: descriptions['titles'] ?? '',
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
