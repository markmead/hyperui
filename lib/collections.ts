import { Component } from '../interface/component'
import { Collection } from '../interface/collection'
import {
  alerts,
  announcements,
  banners,
  breadcrumbs,
  buttons,
  buttonGroups,
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
  pagination,
  popups,
  stats,
  tabs,
  tags,
  testimonials,
  titles,

  // Ecommerce
  filters,
  products,
  productCards,
  productCollections,
  reviews,
} from './components'

export const collections: Array<Collection> = [
  {
    id: 'alerts',
    title: 'Alerts',
    components: alerts,
    count: alerts.length,
    emoji: '🚨',
    spacing: 'max-w-sm p-4 space-y-8 mx-auto',
  },

  {
    id: 'announcements',
    title: 'Announcements',
    components: announcements,
    count: announcements.length,
    emoji: '📣',
  },

  {
    id: 'banners',
    title: 'Banners',
    components: banners,
    count: banners.length,
    emoji: '✨',
  },

  {
    id: 'buttons',
    title: 'Buttons',
    components: buttons,
    count: buttons.length,
    emoji: '👆',
    spacing: 'p-8 flex flex-col space-y-8 items-center',
  },

  {
    id: 'button-groups',
    title: 'Button Groups',
    components: buttonGroups,
    count: buttonGroups.length,
    emoji: '🍮',
    spacing: 'p-8 flex flex-col items-center',
  },

  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    components: breadcrumbs,
    count: breadcrumbs.length,
    emoji: '🍞',
  },

  {
    id: 'cards',
    title: 'Cards',
    components: cards,
    count: cards.length,
    emoji: '🃏',
    spacing: 'max-w-md w-screen mx-auto p-4',
  },

  {
    id: 'carts',
    title: 'Carts',
    components: carts,
    count: carts.length,
    emoji: '🛒',
  },

  {
    id: 'content',
    title: 'Content',
    components: content,
    count: content.length,
    emoji: '📚',
  },

  {
    id: 'ctas',
    title: 'CTAs',
    components: ctas,
    count: ctas.length,
    emoji: '🔗',
  },

  {
    id: 'empty-states',
    title: 'Empty States',
    components: emptyStates,
    count: emptyStates.length,
    emoji: '🤷‍♂️',
    spacing: 'max-w-lg w-screen mx-auto p-4',
  },

  {
    id: 'faqs',
    title: 'FAQs',
    components: faqs,
    count: faqs.length,
    emoji: '🤔',
  },

  {
    id: 'footers',
    title: 'Footers',
    components: footers,
    count: footers.length,
    emoji: '🚀',
  },

  {
    id: 'forms',
    title: 'Forms',
    components: forms,
    count: forms.length,
    emoji: '📝',
  },

  {
    id: 'inputs',
    title: 'Inputs',
    components: inputs,
    count: inputs.length,
    emoji: '🖱',
    spacing: 'max-w-sm mx-auto p-8',
  },

  {
    id: 'navigations',
    title: 'Navigations',
    components: navigations,
    count: navigations.length,
    emoji: '🗺️',
  },

  {
    id: 'off-canvas-menus',
    title: 'Off Canvas Menus',
    components: offCanvasMenus,
    count: offCanvasMenus.length,
    emoji: '👋',
  },

  {
    id: 'pagination',
    title: 'Pagination',
    components: pagination,
    count: pagination.length,
    emoji: '🔢',
    spacing: 'p-4 max-w-xs mx-auto flex justify-center',
  },

  {
    id: 'popups',
    title: 'Popups',
    components: popups,
    count: popups.length,
    emoji: '🔥',
  },

  {
    id: 'stats',
    title: 'Stats',
    components: stats,
    count: stats.length,
    emoji: '📈',
  },

  {
    id: 'tabs',
    title: 'Tabs',
    components: tabs,
    count: tabs.length,
    emoji: '📚',
    spacing: 'p-4 max-w-5xl mx-auto',
  },

  {
    id: 'tags',
    title: 'Tags',
    components: tags,
    count: tags.length,
    emoji: '🏷️',
    spacing: 'max-w-md w-screen mx-auto p-4 text-center',
  },

  {
    id: 'testimonials',
    title: 'Testimonials',
    components: testimonials,
    count: testimonials.length,
    emoji: '👍',
  },

  {
    id: 'titles',
    title: 'Titles',
    components: titles,
    count: titles.length,
    emoji: '📚',
  },

  // Ecommerce

  {
    id: 'filters',
    title: 'Filters',
    components: filters,
    count: filters.length,
    emoji: '🔎',
    ecommerce: true,
  },

  {
    id: 'products',
    title: 'Products',
    components: products,
    count: products.length,
    emoji: '🏎️',
    ecommerce: true,
  },

  {
    id: 'product-cards',
    title: 'Product Cards',
    components: productCards,
    count: productCards.length,
    emoji: '🃏',
    spacing: 'max-w-md w-screen mx-auto p-4',
    ecommerce: true,
  },

  {
    id: 'product-collections',
    title: 'Product Collections',
    components: productCollections,
    count: productCollections.length,
    emoji: '🛍️',
    ecommerce: true,
  },

  {
    id: 'reviews',
    title: 'Reviews',
    components: reviews,
    count: reviews.length,
    emoji: '👍',
    ecommerce: true,
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
