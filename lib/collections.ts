import { Component } from '../interface/component'
import { Collection } from '../interface/collection'
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
    spacing: 'max-w-sm w-screen mx-auto p-4',
  },

  {
    id: 'announcements',
    title: 'Announcements',
    components: announcements,
    count: announcements.length,
  },

  {
    id: 'banners',
    title: 'Banners',
    components: banners,
    count: banners.length,
  },

  {
    id: 'buttons',
    title: 'Buttons',
    components: buttons,
    count: buttons.length,
    spacing: 'p-4',
  },

  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    components: breadcrumbs,
    count: breadcrumbs.length,
  },

  {
    id: 'cards',
    title: 'Cards',
    components: cards,
    count: cards.length,
    spacing: 'max-w-md w-screen mx-auto p-4',
  },

  {
    id: 'carts',
    title: 'Carts',
    components: carts,
    count: carts.length,
  },

  {
    id: 'content',
    title: 'Content',
    components: content,
    count: content.length,
  },

  {
    id: 'ctas',
    title: 'CTAs',
    components: ctas,
    count: ctas.length,
  },

  {
    id: 'empty-states',
    title: 'Empty States',
    components: emptyStates,
    count: emptyStates.length,
    spacing: 'max-w-lg w-screen mx-auto p-4',
  },

  {
    id: 'faqs',
    title: 'FAQs',
    components: faqs,
    count: faqs.length,
  },

  {
    id: 'footers',
    title: 'Footers',
    components: footers,
    count: footers.length,
  },

  {
    id: 'forms',
    title: 'Forms',
    components: forms,
    count: forms.length,
  },

  {
    id: 'inputs',
    title: 'Inputs',
    components: inputs,
    count: inputs.length,
    spacing: 'w-screen max-w-sm mx-auto p-4',
  },

  {
    id: 'navigations',
    title: 'Navigations',
    components: navigations,
    count: navigations.length,
  },

  {
    id: 'off-canvas-menus',
    title: 'Off Canvas Menus',
    components: offCanvasMenus,
    count: offCanvasMenus.length,
  },

  {
    id: 'pagination',
    title: 'Pagination',
    components: pagination,
    count: pagination.length,
    spacing: 'p-4 max-w-xs mx-auto flex justify-center',
  },

  {
    id: 'popups',
    title: 'Popups',
    components: popups,
    count: popups.length,
  },

  {
    id: 'stats',
    title: 'Stats',
    components: stats,
    count: stats.length,
  },

  {
    id: 'tabs',
    title: 'Tabs',
    components: tabs,
    count: tabs.length,
    spacing: 'p-4 max-w-5xl mx-auto',
  },

  {
    id: 'tags',
    title: 'Tags',
    components: tags,
    count: tags.length,
    spacing: 'max-w-md w-screen mx-auto p-4 text-center',
  },

  {
    id: 'testimonials',
    title: 'Testimonials',
    components: testimonials,
    count: testimonials.length,
  },

  {
    id: 'titles',
    title: 'Titles',
    components: titles,
    count: titles.length,
  },

  // Ecommerce

  {
    id: 'filters',
    title: 'Filters',
    components: filters,
    count: filters.length,
    ecommerce: true,
  },

  {
    id: 'products',
    title: 'Products',
    components: products,
    count: products.length,
    ecommerce: true,
  },

  {
    id: 'product-cards',
    title: 'Product Cards',
    components: productCards,
    count: productCards.length,
    spacing: 'max-w-md w-screen mx-auto p-4',
    ecommerce: true,
  },

  {
    id: 'product-collections',
    title: 'Product Collections',
    components: productCollections,
    count: productCollections.length,
    ecommerce: true,
  },

  {
    id: 'reviews',
    title: 'Reviews',
    components: reviews,
    count: reviews.length,
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
