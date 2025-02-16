import { CategoryItem } from '@type/component'

interface CategoryData extends Omit<CategoryItem, 'description' | 'subtitle'> {
  slug: string
}

export interface SearchItem {
  id: string
  title: string
  slug: string
  emoji: string
  count: number
  category: CategoryData
}
