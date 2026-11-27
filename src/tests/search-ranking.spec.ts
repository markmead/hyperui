import { test, expect } from './fixtures'

import { relatedItems, scoreItem, searchItems, type SearchItem } from '../lib/search'

const items: SearchItem[] = [
  {
    title: 'Announcements',
    description: 'Banners that promote a new product launch',
    terms: ['banner'],
  },
  { title: 'Cards', description: 'Cards for profiles and posts', terms: ['profile', 'post'] },
  { title: 'Product Cards', description: 'Cards for an online store', terms: ['ecommerce'] },
  { title: 'Product Collections', description: 'Collections of products', terms: ['store'] },
  { title: 'Sidebars', description: 'Navigation down the side', terms: ['menu'] },
  { title: 'Testimonials', description: 'Quotes from customers about a product', terms: [] },
]

const titles = (query: string) => searchItems(items, query).map(({ title }) => title)

test.describe('Search ranking', () => {
  test('puts a title match ahead of description matches', () => {
    expect(titles('product').slice(0, 2).sort()).toEqual(['Product Cards', 'Product Collections'])
  })

  test('puts an exact title first', () => {
    expect(titles('cards')[0]).toBe('Cards')
    expect(titles('card')[0]).toBe('Cards')
  })

  test('treats singular and plural as the same word', () => {
    expect(titles('sidebar')[0]).toBe('Sidebars')
    expect(titles('testimonial')[0]).toBe('Testimonials')
  })

  test('matches the start of a word', () => {
    expect(titles('side')[0]).toBe('Sidebars')
  })

  test('matches terms and descriptions', () => {
    expect(titles('ecommerce')).toContain('Product Cards')
    expect(titles('menu')).toEqual(['Sidebars'])
  })

  test('needs every word in the query to match', () => {
    expect(titles('product cards')[0]).toBe('Product Cards')
    expect(titles('product zebra')).toEqual([])
  })

  test('ignores case and punctuation', () => {
    expect(titles('  PRODUCT-cards! ')[0]).toBe('Product Cards')
  })

  test('scores nothing for an empty or unmatched query', () => {
    expect(scoreItem(items[0] as SearchItem, '')).toBe(0)
    expect(titles('zzzz')).toEqual([])
  })

  const relatedTo = (current: SearchItem) =>
    relatedItems(
      current,
      items.filter((item) => item !== current),
    ).map(({ title }) => title)

  test('relates collections that share a word in their titles', () => {
    expect(relatedTo(items[1] as SearchItem)).toContain('Product Cards')
    expect(relatedTo(items[2] as SearchItem)).toEqual(['Cards', 'Product Collections'])
  })

  test('never relates a collection to unrelated ones', () => {
    expect(relatedTo(items[4] as SearchItem)).toEqual([])
  })
})
