import { iCategoryItem } from '@type/component'

export interface iSearchItem {
  id: string
  title: string
  slug: string
  emoji: string
  count: number
  category: Omit<iCategoryItem, 'description' | 'subtitle'>
}
